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
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Column, useFilters, usePagination, useTable } from "react-table";
import Loading from "../../loading";
import { axiosCustom } from "@/app/api/axios";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Pagination from "@/app/components/datatable/pagination";
import { useAuth } from "@/app/components/utils/AuthContext";
import { useRouter } from "next/navigation";
import { MdArrowBackIosNew } from "react-icons/md";

interface listTenant {
  id: string;
  name: string;
  image_url: string;
}

const PenilaianTugasByMentor = ({ roleAccess }: { roleAccess: string }) => {
  const [listTenant, setListTenant] = useState<{
    isLoading: boolean;
    data: listTenant[] | [];
  }>({
    isLoading: true,
    data: [],
  });

  useEffect(() => {
    getTenantParticipant();
  }, []);

  const router = useRouter();

  const getTenantParticipant = async () => {
    let Url: string = "";
    try {
      switch (roleAccess) {
        case "Super Admin":
        case "Manajemen":
          Url = "/grades-assigment/tenant";
          break;
        case "Mentor":
          Url = "/grades-assigment/tenant-mentor";
          break;
      }
      const response = await axiosCustom.get(Url);
      const timer = setTimeout(() => {
        setListTenant({
          isLoading: false,
          data: response.data.data,
        });
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setListTenant({
        isLoading: false,
        data: [],
      });
    }
  };

  const columns: ReadonlyArray<Column<listTenant>> = [
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

  return listTenant.isLoading ? (
    <Loading />
  ) : (
    <Stack spacing={{ base: 4, md: 6 }}>
      <Flex
        justifyContent={"space-between"}
        pb="2"
        direction={["column", "row"]}
      >
        <Heading fontSize={"2xl"}>NILAI TUGAS TENANT</Heading>
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
      </Flex>
      {/* konten disinii (daftar participant) */}
      {listTenant.data.length > 0 ? (
        <CardTable data={listTenant.data} column={columns} />
      ) : (
        <Stack justifyContent={"center"} spacing={0} alignItems={"center"}>
          <Image
            src="/img/grades-notfound.png"
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
                  cursor={"pointer"}
                  onClick={() =>
                    router.push(`/penilaian/tugas/${row.values.id}`)
                  }
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

export default PenilaianTugasByMentor;
