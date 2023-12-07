"use client";
import React, { useState, useEffect, ReactNode, Suspense } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Stack,
  Text,
  VStack,
  Image,
  Select,
} from "@chakra-ui/react";
import { DeleteIcon, Search2Icon, SearchIcon } from "@chakra-ui/icons";

import { Column, useFilters, usePagination, useTable } from "react-table";
import Loading from "../../../loading";
import { axiosCustom } from "@/app/api/axios";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Pagination from "@/app/components/datatable/pagination";
import dynamic from "next/dynamic";

interface RespondenList {
  id: string;
  name: string;
  image_id: string;
  image_url: string;
}

interface RespondenProps {
  responden_count: number;
  responden: RespondenList;
}

const Responden = ({ idKuesioner }: { idKuesioner: string }) => {
  const [dataResponden, setDataResponden] = useState<RespondenProps | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // if (need_updated === true)
    getResponden();
  }, []);
  const getResponden = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(
        `/kuesioner-tahunan/${idKuesioner}/responden`,
      );
      const timer = setTimeout(() => {
        // setIdTenant(id);
        setDataResponden(response.data.data); // Set isLoading to false to stop the spinner
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setIsLoading(false);
    }
  };

  const columns: ReadonlyArray<Column<RespondenList>> = [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "name",
      accessor: "name",
    },
    {
      Header: "image_url",
      accessor: "image_url",
    },
  ];

  return isLoading ? (
    <Loading />
  ) : (
    <Suspense fallback={<Loading />}>
      <Stack spacing={{ base: 4, md: 6 }}>
        <Flex
          flexDirection={{ base: "column", sm: "row" }} // Arah tata letak berdasarkan layar
          justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
          // align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
        >
          <VStack spacing={0} align="flex-start" mr={2}>
            <Text fontWeight={"bold"} fontSize={["lg", "xl"]}>
              Responden Kuesioner
            </Text>
            <Text fontWeight="medium">
              Total :{" "}
              <span style={{ color: "green" }}>
                {dataResponden?.responden_count} Responden
              </span>
            </Text>
          </VStack>
          <HStack spacing={2} align="start">
            <Stack spacing={4}>
              <Spacer />
            </Stack>
          </HStack>
        </Flex>
        {/* konten disinii (daftar participant) */}
        {dataResponden &&
        Array.isArray(dataResponden.responden) &&
        dataResponden.responden.length > 0 ? (
          <CardTable
            data={dataResponden?.responden}
            column={columns}
            onSubmit={() => getResponden()}
          />
        ) : (
          <Stack justifyContent={"center"} spacing={0} alignItems={"center"}>
            <Image
              src="/img/kuesioner-item.png"
              h={{ base: "150px", sm: "170px", md: "250px" }}
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
              Data Responden Kosong
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
  //   roleAccess: string;
  //   classEnd: boolean;
  //   idKelas: string;
  onSubmit: () => void;
  //   idTenant: (id: string) => void;
  //   tabIndex: () => void;
}

function CardTable<T extends object>(props: CardTableProps<T>) {
  const { data, column, onSubmit } = props;
  const {
    page,
    prepareRow,
    getTableProps,
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
      data: data,
      columns: column,
      initialState: {
        pageSize: 5,
      },
    },
    useFilters,
    usePagination,
  );

  return (
    <Stack spacing={4}>
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
                maxW={60}
                pl="3rem"
                // key={option.key}
                type="text"
                placeholder={`Cari Nama Tenant`}
                onChange={(e) => setFilter("name", e.target.value)}
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
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="75">75</option>
          </Select>
          <Text>Data Per Page</Text>
          {/* </Stack> */}
        </Flex>
      </Stack>
      {page.length > 0 ? (
        <Stack spacing={4}>
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
              lg: "1fr 1fr 1fr 1fr",
              xl: "1fr 1fr 1fr 1fr 1fr",
            }}
            {...getTableProps()}
            alignItems={"center"}
            justifyItems={"center"}
            gap={{ base: 8, sm: 6, lg: 8 }}
            mb={2}
          >
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <Stack
                  {...row.getRowProps()}
                  alignItems={"center"}
                  spacing={4}
                  maxW={{
                    base: "13rem",
                    // sm: "13rem",
                    // md: "13rem",
                    // lg:"12rem",
                    sm: "14rem",
                  }}
                  w="full"
                  h="full"
                  // bgColor="gray.200"
                  borderColor="blue.500"
                  borderWidth="4px"
                  shadow="2xl"
                  // w="full"
                  // h="full"
                  p={3}
                  boxShadow={"lg"}
                  rounded={"2xl"}
                  bgColor={"white"}
                  key={i}
                  // display="flex"
                >
                  <Box

                  // p={{ base: 4, sm: 2, lg: 4 }}
                  >
                    <Image
                      maxW={{
                        base: "7rem",
                        // sm: "5.5rem",
                        sm: "6.5rem",
                        // lg: "11rem",
                        xl: "7.5rem",
                      }}
                      shadow="xl"
                      // rounded={"full"}
                      borderRadius={"full"}
                      objectFit={"cover"}
                      bgColor={"red.50"}
                      src={
                        row.values.image_url || "/img/tenant-logo-default.png"
                      }
                      alt="#"
                      // boxShadow={"xl"}
                    />
                  </Box>

                  <Text
                    as="b"
                    fontWeight={"bold"}
                    fontSize={{ base: "16px", md: "17px" }}
                    textOverflow="ellipsis"
                    // maxW={{
                    //   base: "auto",
                    //   sm: "340px",
                    //   md: "408px",
                    //   lg: "544px",
                    // }}
                    // w="auto"
                    // whiteSpace="nowrap"
                    flex="1"
                    cursor={"default"}
                    overflow="hidden"
                    // title={data.name}
                    noOfLines={2}
                  >
                    {row.values.name}
                  </Text>
                  <Button
                    colorScheme="red"
                    key="preview"
                    size="sm"
                    //   onClick={() => onOpen()}
                  >
                    <DeleteIcon />
                    &nbsp;Hapus Responden
                  </Button>
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

export default Responden;

// export default dynamic(() => Promise.resolve(Responden), {
//   ssr: false,
//   // suspense: true,
//   loading: () => <Loading />,
// });
