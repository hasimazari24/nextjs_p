"use client";
import React, { useState, useEffect, Suspense } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Image,
  Select,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Column, useFilters, usePagination, useTable } from "react-table";
import Loading from "../loading";
import { axiosCustom } from "@/app/api/axios";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Pagination from "@/app/components/datatable/pagination";
import { useRouter } from "next/navigation";
import { BiDoorOpen, BiPlus } from "react-icons/bi";
import AddTenantRated from "./addTenantRated";
import DeleteTenantRated from "./deleteTenantRated";
import { MdArrowBackIosNew } from "react-icons/md";
import { Mentor } from "@/app/type/class-type";
import ProfileMentor from "@/app/(secure)/kelas/pages/profileMentor";
import DownloadExcel from "@/app/components/utils/DownloadExcel";

interface listPenilaian {
  id: string;
  tenant_id: string;
  tenant_name: string;
  tenant_image_id: string;
  tenant_image_url: string;
  last_grade_date: string;
  last_grade_time: string;
  mentor: Mentor;
}

const PenilaianTenantUmum = ({ roleAccess }: { roleAccess: string }) => {
  const [listTenant, setListTenant] = useState<listPenilaian[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    getTenantRated();
  }, []);

  const getTenantRated = async () => {
    let Url: string = "";
    try {
      setIsLoading(true);
      switch (roleAccess) {
        case "Super Admin":
        case "Manajemen":
          Url = "/mentor-nilai-tenant";
          break;
        case "Mentor":
          Url = "/general-grades-tenant";
          break;
      }
      const response = await axiosCustom.get(Url);
      const timer = setTimeout(() => {
        setListTenant(response.data.data);
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setIsLoading(false);
    }
  };

  const columns: ReadonlyArray<Column<listPenilaian>> = [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "tenant_id",
      accessor: "tenant_id",
    },
    {
      Header: "tenant_name",
      accessor: "tenant_name",
    },
    {
      Header: "tenant_image_url",
      accessor: "tenant_image_url",
    },
    {
      Header: "last_grade_date",
      accessor: "last_grade_date",
    },
    {
      Header: "last_grade_time",
      accessor: "last_grade_time",
    },
    {
      Header: "Mentor",
      accessor: "mentor",
      filter: (rows, id, filterValue) => {
        return rows.filter((row) =>
          row.values.mentor.fullname
            .toLowerCase()
            .includes(filterValue.toLowerCase()),
        );
      },
      // Cell: ({ cell }) => cell.value.fullname, // Display only the fullname in the table cell
    },
  ];

  return isLoading ? (
    <Loading />
  ) : (
    <Stack spacing={{ base: 4, md: 6 }}>
      <Flex
        justifyContent={"space-between"}
        direction={["column-reverse", "row"]}
      >
        <Heading fontSize={"2xl"}>NILAI TENANT</Heading>
        <HStack spacing={2} mb={{ base: 2, md: 0 }} flexWrap={"wrap"}>
          <Button
            leftIcon={<MdArrowBackIosNew />}
            colorScheme="blue"
            variant="outline"
            aria-label="btn-email"
            size={"sm"}
            onClick={() => router.push("/penilaian")}
          >
            Kembali
          </Button>
          <DownloadExcel Url="/export-mentor-nilai-tenant" />
          {roleAccess === "Mentor" && (
            <AddTenantRated onSubmit={() => getTenantRated()} />
          )}
        </HStack>
      </Flex>
      {/* konten disinii (daftar participant) */}
      {listTenant.length > 0 ? (
        <CardTable
          data={listTenant}
          column={columns}
          roleAccess={roleAccess}
          onSubmit={() => getTenantRated()}
        />
      ) : (
        <Stack justifyContent={"center"} spacing={0} alignItems={"center"}>
          <Image
            src="/img/classroom.png"
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
            Data Nilai Tugas Tenant Kosong
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
  );
};

interface CardTableProps<T extends object> {
  data: T[];
  column: ReadonlyArray<Column<T>>;
  roleAccess: string;
  onSubmit: () => void;
}

function CardTable<T extends object>(props: CardTableProps<T>) {
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
      data: props.data,
      columns: props.column,
      initialState: {
        pageSize: 5,
      },
    },
    useFilters,
    usePagination,
  );

  const router = useRouter();

  return (
    <Stack spacing={6}>
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
                placeholder={`Cari Nama Tenant`}
                // onChange={(e) => setFilter(option.key, e.target.value)}
                onChange={(e) => setFilter("tenant_name", e.target.value)}
                mb="2"
              />
            </InputGroup>
            {props.roleAccess !== "Mentor" && (
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Button pl="1rem" leftIcon={<SearchIcon />}></Button>
                </InputLeftElement>
                <Input
                  pl="3rem"
                  type="text"
                  placeholder={`Cari Mentor`}
                  onChange={(e) => {
                    setFilter("mentor", e.target.value);
                  }}
                  mb="2"
                />
              </InputGroup>
            )}
          </Stack>
        </Flex>

        <Flex
          justifyContent={["center", "flex-end"]}
          alignItems={"center"}
          mt={{ base: "0", md: "-2" }}
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
            // w="fit-content"
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
                  // w={{
                  //   base: "13rem",
                  //   // sm: "13rem",
                  //   // md: "13rem",
                  //   // lg:"12rem",
                  //   sm: "14rem",
                  // }}
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
                        row.values.tenant_image_url ||
                        "/img/tenant-logo-default.png"
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
                    {row.values.tenant_name}
                  </Text>

                  <VStack spacing={0} textAlign={"center"}>
                    <Text>Terakhir Dinilai :</Text>
                    <Text>
                      {row.values.last_grade_date
                        ? `${row.values.last_grade_date}, ${row.values.last_grade_time}`
                        : "-"}
                    </Text>
                  </VStack>
                  {props.roleAccess !== "Mentor" && (
                    <ProfileMentor mentor={row.values.mentor} />
                  )}

                  <Stack
                    spacing={1}
                    direction={{ base: "row", md: "column", xl: "row" }}
                    w="full"
                  >
                    <Button
                      bgColor="gray.500"
                      _hover={{
                        bg: "gray.400",
                      }}
                      color="white"
                      // color="white"
                      w="full"
                      size={"sm"}
                      alignContent={"center"}
                      onClick={() =>
                        router.push(`/penilaian/tenant/${row.values.id}`)
                      }
                      title="Masuk ke penilaian tenant"
                    >
                      <BiDoorOpen size="20px" />
                      &nbsp;Masuk
                    </Button>
                    {props.roleAccess === "Mentor" && (
                      <DeleteTenantRated
                        dataDelete={row.values}
                        onSubmit={() => props.onSubmit()}
                      />
                    )}
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
            src="/img/grades-notfound.png"
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

export default PenilaianTenantUmum;
