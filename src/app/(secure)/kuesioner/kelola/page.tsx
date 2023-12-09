"use client";
import React, { useEffect, Suspense, useState } from "react";
import {
  Box,
  Text,
  Flex,
  HStack,
  Stack,
  Icon,
  Button,
  Image,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Select,
  Heading,
} from "@chakra-ui/react";
import { MdArrowBackIosNew, MdOutlinePeople } from "react-icons/md";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { MdDateRange } from "react-icons/md";
import { BiDoorOpen } from "react-icons/bi";
import { SearchIcon } from "@chakra-ui/icons";
import { GrMoreVertical } from "react-icons/gr";
import Pagination from "@/app/components/datatable/pagination";
import { useRouter } from "next/navigation";
import { Column, useFilters, usePagination, useTable } from "react-table";
import DownloadExcel from "@/app/components/utils/DownloadExcel";
import AddKuesioner from "./AddKuesioner";
import EditKuesioner from "./EditKuesioner";
import DeleteKuesioner from "./DeleteKuesioner";
import { axiosCustom } from "@/app/api/axios";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import { FindDefaultRoute } from "@/app/components/utils/FindDefaultRoute";
import Loading from "../loading";
import OnOffKuesioner from "./OnOffKuesioner";

interface KelolaProps {
  id: string;
  title: string;
  description: string | null;
  is_active: boolean;
  responden_count: string;
  created_at: string;
}

const page = () => {
  const { setBreadcrumbs } = useBreadcrumbContext();
  const getForCrumbs: any = FindDefaultRoute();
  const [dataKuesioner, setDataKuesioner] = useState<any[] | []>();
  const [isLoading, setIsLoading] = useState(true);

  const columns: ReadonlyArray<Column<KelolaProps>> = [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "title",
      accessor: "title",
    },
    {
      Header: "is_active",
      accessor: "is_active",
    },
    {
      Header: "description",
      accessor: "description",
    },
    {
      Header: "responden_count",
      accessor: "responden_count",
    },
    {
      Header: "created_at",
      accessor: "created_at",
    },
  ];

  const router = useRouter();

  const getKuesioner = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(`/kuesioner-tahunan`);
      const timer = setTimeout(() => {
        setDataKuesioner(response.data.data);
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getKuesioner();
  }, []);

  useEffect(() => {
    if (getForCrumbs) setBreadcrumbs(getForCrumbs);
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <Suspense fallback={<Loading />}>
      <Stack spacing={{ base: 2, md: 4 }}>
        <Flex
          flexDirection={{ base: "column", md: "row" }} // Arah tata letak berdasarkan layar
          justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
          // align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
        >
          <Heading fontSize={"2xl"} mb="2">
            KELOLA KUESIONER
          </Heading>
          <HStack align="start" mb={{ base: 2, md: 0 }}>
            <Button
              leftIcon={<MdArrowBackIosNew />}
              colorScheme="blue"
              variant="outline"
              aria-label="btn-email"
              title={`Kembali ke Halaman Sebelumnya`}
              onClick={() => router.push(`/kuesioner`)}
              size={"sm"}
            >
              Kembali
            </Button>
            <AddKuesioner onSubmit={() => getKuesioner()} />
          </HStack>
        </Flex>
        {dataKuesioner && dataKuesioner.length > 0 ? (
          <CardTable
            data={dataKuesioner}
            column={columns}
            onSubmit={() => getKuesioner()}
            // roleAccess={roleAccess}
          />
        ) : (
          <Stack justifyContent={"center"} spacing={0} alignItems={"center"}>
            <Image
              src="/img/kuesioner-notfound.png"
              h={{ base: "200px", sm: "250px", md: "350px" }}
              w="auto"
              // w="auto"
              // objectFit={"cover"}
            />
            <Text
              as="b"
              fontWeight={"bold"}
              fontSize={{ base: "16px", md: "17px" }}
              textAlign={"center"}
            >
              Daftar Kuesioner yang perlu dikelola kosong
            </Text>
            <Text
              fontSize={{ base: "15.5px", md: "16.5px" }}
              textAlign={"center"}
            >
              Mungkin belum dibuat atau sudah dihapus
            </Text>
          </Stack>
        )}
      </Stack>
    </Suspense>
  );
};

interface CardTableProps<T extends object> {
  data: T[];
  column: ReadonlyArray<Column<T>>;
  onSubmit: () => void;
  // roleAccess: string;
}

function CardTable<T extends object>(props: CardTableProps<T>) {
  const {
    page,
    prepareRow,
    // getTableBodyProps,
    // headerGroups,
    getTableProps,
    // setGlobalFilter,
    setFilter,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    pageSize,
    pageOptions,
    gotoPage,
    state: { pageIndex },
  } = useTable(
    {
      data: props.data,
      columns: props.column,
      initialState: {
        pageSize: 4,
      },
    },
    useFilters,
    // useGlobalFilter,
    usePagination,
  );

  const router = useRouter();

  return (
    <Stack mt="4" spacing={6}>
      <Stack
        justifyContent="space-between"
        direction={["column", "row"]}
        flexWrap={"wrap"}
      >
        <Flex justifyContent={["center", "flex-start"]} flexWrap={"wrap"}>
          <Stack
            direction={{ base: "column", md: "row", lg: "row" }}
            // alignItems={"center"}
            spacing={3}
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Button pl="1rem" leftIcon={<SearchIcon />}></Button>
              </InputLeftElement>
              <Input
                pl="3rem"
                // key={option.key}
                type="text"
                placeholder={`Cari Judul Kuesioner`}
                // onChange={(e) => setFilter(option.key, e.target.value)}
                onChange={(e) => setFilter("title", e.target.value)}
                mb="2"
              />
            </InputGroup>
          </Stack>
        </Flex>
        <Flex
          justifyContent={["center", "flex-end"]}
          alignItems={"center"}
          mt="-2"
        >
          {/* <Stack direction={["column","row"]}> */}
          <Text>Showing</Text>
          <Select
            w="auto"
            minW="20"
            fontSize="sm"
            onChange={(e) => {
              setPageSize(+e.target.value);
            }}
            cursor="pointer"
            pl="2"
            pr="2"
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="24">24</option>
            <option value="100">100</option>
          </Select>
          <Text>Data Per Page</Text>
          {/* </Stack> */}
        </Flex>
      </Stack>
      {page.length > 0 ? (
        <Stack spacing={6}>
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "1fr 1fr",
              lg: "1fr 1fr 1fr",
              xl: "1fr 1fr 1fr 1fr",
            }}
            {...getTableProps()}
            alignItems={"center"}
            justifyItems={"center"}
            gap={{ base: 8, sm: 6, lg: 8 }}
          >
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <Stack
                  {...row.getRowProps()}
                  alignItems={"center"}
                  spacing={3}
                  w="full"
                  h="full"
                  p={6}
                  boxShadow={"lg"}
                  rounded={"2xl"}
                  bgColor={"gray.50"}
                  key={i}
                  // display="flex"
                >
                  <Box>
                    <Image
                      maxW={{
                        base: "13rem",
                        sm: "9rem",
                        md: "10rem",
                        // lg: "11rem",
                        xl: "13rem",
                      }}
                      objectFit={"cover"}
                      // src={
                      //   row.values.course_ends === true
                      //     ? "/img/class-ends-min.png"
                      //     : "/img/class-avatar.png"
                      // }
                      src="/img/kelola-kuesioner-detail.png"
                      alt="#"
                      // boxShadow={"xl"}
                    />
                  </Box>
                  <Text
                    as="b"
                    fontWeight={"bold"}
                    fontSize={{ base: "16px", md: "17px" }}
                    textOverflow="ellipsis"
                    flex="1"
                    overflow="hidden"
                    title={row.values.title}
                    noOfLines={2}
                  >
                    {row.values.title}
                  </Text>
                  <Stack w="fit-content" spacing={2}>
                    <Box
                      borderColor={"blue.500"}
                      rounded={"7px"}
                      borderWidth={1}
                      pr={2}
                      pl={2}
                      title="Responden"
                    >
                      <HStack
                        flexWrap={"wrap"}
                        spacing={1}
                        fontSize={{ base: "sm", sm: "xs", lg: "sm" }}
                        justifyContent={"center"}
                        color="blue.500"
                      >
                        <Icon
                          as={MdOutlinePeople}
                          boxSize={{ base: "20px", sm: "17px", lg: "20px" }}
                        />
                        <p>{row.values.responden_count}&nbsp;Responden</p>
                      </HStack>
                    </Box>
                    <Box
                      borderColor={"blue.400"}
                      rounded={"7px"}
                      borderWidth={1}
                      pr={2}
                      pl={2}
                      title="Tanggal Dibuat"
                    >
                      <HStack
                        flexWrap={"wrap"}
                        spacing={1}
                        fontSize={{ base: "sm", sm: "xs", lg: "sm" }}
                        color="blue.500"
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Icon
                          as={MdDateRange}
                          boxSize={{ base: "18px", sm: "17px", lg: "20px" }}
                        />
                        <p>{row.values.created_at}</p>
                      </HStack>
                    </Box>
                  </Stack>

                  <Stack spacing={2} direction={"row"} w="full">
                    <Button
                      bgColor="gray.500"
                      _hover={{
                        bg: "gray.400",
                      }}
                      color="white"
                      w="full"
                      size={{ base: "xs", sm: "sm" }}
                      title={"Masuk untuk kelola kuesioner"}
                      // alignContent={"center"}
                      onClick={() =>
                        router.push(`/kuesioner/kelola/${row.values.id}`)
                      }
                    >
                      <BiDoorOpen size="20px" />
                      &nbsp;Masuk
                    </Button>
                    <Popover placement="bottom">
                      <PopoverTrigger>
                        <Button
                          bgColor="teal.400"
                          _hover={{
                            bg: "teal.300",
                          }}
                          // colorScheme="aqua"
                          title="More ..."
                          color="white"
                          // onClick={() => handleDetail(rowData)}
                          key="more"
                          size={{ base: "xs", sm: "sm" }}
                        >
                          <GrMoreVertical />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        w="fit-content"
                        _focus={{ boxShadow: "none" }}
                      >
                        <PopoverArrow />
                        <PopoverBody>
                          <Stack>
                            <EditKuesioner
                              rowData={row.values}
                              onSubmit={() => props.onSubmit()}
                            />
                            <OnOffKuesioner
                              dataKuesioner={row.values}
                              onSubmit={() => props.onSubmit()}
                              onoff={row.values.is_active}
                            />
                            <DeleteKuesioner
                              dataDelete={row.values}
                              onSubmit={() => props.onSubmit()}
                            />
                          </Stack>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Stack>
                </Stack>
              );
            })}
          </Grid>
          <Flex justify="flex-end" alignItems="center">
            <HStack>
              <Pagination
                currentPage={pageIndex}
                totalPages={pageOptions.length}
                data={pageOptions}
                onClick={gotoPage}
              />
              <Button
                disabled={!canPreviousPage}
                onClick={previousPage}
                colorScheme="blue"
                size="sm"
                leftIcon={<HiChevronLeft />}
              >
                Prev
              </Button>
              <Button
                disabled={!canNextPage}
                onClick={nextPage}
                colorScheme="blue"
                size="sm"
                rightIcon={<HiChevronRight />}
              >
                Next
              </Button>
            </HStack>
          </Flex>
        </Stack>
      ) : (
        <Stack justifyContent={"center"} spacing={0} alignItems={"center"}>
          <Image
            src="/img/classroom.png"
            h={{ base: "200px", sm: "250px", md: "350px" }}
            w="auto"
            // w="auto"
            // objectFit={"cover"}
          />
          <Text
            as="b"
            fontWeight={"bold"}
            fontSize={{ base: "16px", md: "17px" }}
            textAlign={"center"}
          >
            Hasil Pencarian Tidak Ditemukan
          </Text>
        </Stack>
      )}
    </Stack>
  );
}

export default page;
