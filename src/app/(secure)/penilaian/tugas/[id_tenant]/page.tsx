"use client";
import React, { Suspense, useEffect, useState } from "react";
import {
  Box,
  Text,
  Flex,
  HStack,
  Stack,
  Button,
  Image,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Heading,
} from "@chakra-ui/react";
import { Mentor } from "@/app/type/class-type";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { BiDoorOpen } from "react-icons/bi";
import { SearchIcon } from "@chakra-ui/icons";
import Pagination from "@/app/components/datatable/pagination";
import ProfileMentor from "@/app/(secure)/kelas/pages/profileMentor";
import { useRouter } from "next/navigation";
import { Column, useFilters, usePagination, useTable } from "react-table";
import { useAuth } from "@/app/components/utils/AuthContext";
import { axiosCustom } from "@/app/api/axios";
import Loading from "../../loading";
import { UUID } from "crypto";
import { MdArrowBackIosNew } from "react-icons/md";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";

interface ClassProps {
  id: string;
  name: string;
  course_ends: boolean;
  mentor: Mentor;
}

interface DataTugas {
  tenant_name : string;
  course: ClassProps;
}

const ListKelas = ({ params }: { params: { id_tenant: string } }) => {
  const idTenant = params.id_tenant;
  const [listKelas, setListKelas] = useState<{
    isLoading: boolean;
    data: DataTugas | null;
  }>({
    isLoading: true,
    data: null,
  });

  useEffect(() => {
    getTenantClass();
  }, []);

  const { user } = useAuth();
  let getUser: any = null; // Inisialisasikan getUser di sini

  if (user !== null && user !== 401) {
    getUser = user; // Setel nilai getUser jika user ada
  }

  const { setBreadcrumbs, breadcrumbs } = useBreadcrumbContext();

  const router = useRouter();

  const getTenantClass = async () => {
    let Url: string = "";
    try {
      switch (getUser?.role) {
        case "Super Admin":
        case "Manajemen":
          Url = `/grades-assigment/tenant/${idTenant}`;
          break;
        case "Mentor":
          Url = `/grades-assigment/tenant-course-mentor/${idTenant}`;
          break;
        case "Tenant":
          Url = `/grades-assigment/tenant-course`;
          break;
      }
      const response = await axiosCustom.get(Url);
      if (getUser.role !== "Tenant") {
        // Membuat nilai baru
        const newValue = {
          name: response.data.data?.tenant_name,
          href: `/penilaian/tugas/${idTenant}`,
        };
        // Cek apakah nilai baru sudah ada dalam breadcrumbs
        const alreadyExists = breadcrumbs.some(
          (breadcrumb) =>
            JSON.stringify(breadcrumb) === JSON.stringify(newValue),
        );
        // Jika belum ada, tambahkan ke breadcrumbs
        if (!alreadyExists) {
          setBreadcrumbs([...breadcrumbs, newValue]);
        } else {
          //else brarti ada, lakukan pemeriksaan lagi
          //cek apakah rute penilaian dihapus
          // (artinya navigasi dari halaman sblumnya /kelas/[id_kelas])
          const deletedRute = { name: "Data Penilaian", href: "/penilaian" };

          const prevPage = breadcrumbs.some(
            (breadcrumb) =>
              JSON.stringify(breadcrumb) === JSON.stringify(deletedRute),
          );
          if (!prevPage) {
            //jika ternyata tidak ada deletedRoute,
            //maka Menghapus elemen terakhir dari array, masukan deleted di awal elemen
            const newBreadcrumbs = breadcrumbs.slice(0, breadcrumbs.length - 1);
            setBreadcrumbs([deletedRute, ...newBreadcrumbs]);
          }
        }
      }

      const timer = setTimeout(() => {
        setListKelas({
          isLoading: false,
          data: response.data.data,
        });
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setListKelas({
        isLoading: false,
        data: null,
      });
    }
  };

  const columns: ReadonlyArray<Column<ClassProps>> = [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "name",
      accessor: "name",
    },
    {
      Header: "ClassEnd",
      accessor: "course_ends",
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

  return listKelas.isLoading ? (
    <Loading />
  ) : (
    <Suspense fallback={<Loading />}>
      <Stack spacing={{ base: 4, md: 6 }}>
        {getUser.role === "Tenant" ? (
          <Flex
            flexDirection={{ base: "column-reverse", md: "row" }} // Arah tata letak berdasarkan layar
            justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
            align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
          >
            <Heading fontSize={"2xl"}>DATA PENILAIAN TUGAS TENANT</Heading>
          </Flex>
        ) : (
          <Flex
            flexDirection={{ base: "column-reverse", md: "row" }} // Arah tata letak berdasarkan layar
            justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
            align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
          >
            <Heading fontSize={"2xl"}>NILAI TUGAS TENANT</Heading>
            <Button
              leftIcon={<MdArrowBackIosNew />}
              colorScheme="blue"
              variant="outline"
              aria-label="btn-email"
              size={"sm"}
              mb={2}
              onClick={() =>
                router.push(
                  getUser.role === "Tenant"
                    ? `/penilaian`
                    : `/penilaian/tugas/`,
                )
              }
            >
              Kembali
            </Button>
          </Flex>
        )}

        {getUser?.role === "Tenant" ? (
          listKelas.data &&
          Array.isArray(listKelas.data) &&
          listKelas.data.length > 0 ? (
            <CardTable
              data={listKelas.data}
              column={columns}
              roleAccess={getUser?.role}
              idTenant={idTenant}
            />
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
          )
        ) : listKelas.data &&
          Array.isArray(listKelas.data.course) &&
          listKelas.data.course.length > 0 ? (
          <CardTable
            data={listKelas.data.course}
            column={columns}
            roleAccess={getUser?.role}
            idTenant={idTenant}
          />
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
    </Suspense>
  );
};

interface CardTableProps<T extends object> {
  data: T[];
  column: ReadonlyArray<Column<T>>;
  roleAccess: string;
  idTenant: string;
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
        pageSize: 4,
      },
    },
    useFilters,
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
                placeholder={`Cari Nama Kelas`}
                // onChange={(e) => setFilter(option.key, e.target.value)}
                onChange={(e) => setFilter("name", e.target.value)}
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
                      src={
                        row.values.course_ends === true
                          ? "/img/class-ends-min.png"
                          : "/img/class-avatar.png"
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
                    flex="1"
                    cursor={"default"}
                    overflow="hidden"
                    title={row.values.name}
                    noOfLines={2}
                  >
                    {row.values.name}
                  </Text>

                  <ProfileMentor mentor={row.values.mentor} />

                  <Stack spacing={2} direction={"row"} w="full">
                    <Button
                      bgColor="gray.500"
                      _hover={{
                        bg: "gray.400",
                      }}
                      color="white"
                      w="full"
                      size={{ base: "xs", sm: "sm" }}
                      alignContent={"center"}
                      onClick={() =>
                        router.push(
                          `/penilaian/tugas/${props.idTenant}/kelas/${row.values.id}`,
                        )
                      }
                    >
                      <BiDoorOpen size="20px" />
                      &nbsp;Masuk
                    </Button>
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

export default ListKelas;
