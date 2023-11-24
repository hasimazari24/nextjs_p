"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
  Img,
  Center,
  Wrap,
  WrapItem,
  SimpleGrid,
  Spinner,
  Skeleton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
// import { usePublic } from "../utils/PublicContext";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { axiosCustom } from "@/app/api/axios";
import dynamic from "next/dynamic";
import Loading from "../loading";
import Pagination from "@/app/components/datatable/pagination";
import { Column, useFilters, useGlobalFilter, useTable } from "react-table";
import { SearchIcon } from "@chakra-ui/icons";

interface Beranda {
  id: string;
  name: string;
  motto: string;
  slug: string;
  level_tenant: string;
  image_url: string;
  image_banner_url: string;
  valuasi: any;
}

function Tenant() {
  // const { beranda, loadingBeranda } = usePublic();
  // console.log(beranda);
  const columns: ReadonlyArray<Column<Beranda>> = [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "name",
      accessor: "name",
    },
    {
      Header: "Motto",
      accessor: "motto",
    },
    {
      Header: "slug",
      accessor: "slug",
    },
    {
      Header: "image_url",
      accessor: "image_url",
    },
    {
      Header: "valuasi",
      accessor: "valuasi",
    },
    {
      Header: "Level Tenant",
      accessor: "level_tenant",
      filter: (rows, id, filterValues) => {
        if (filterValues === "") {
          return rows;
        }
        return rows.filter(
          (row) => row.values["level_tenant"] === filterValues,
        );
      },
    },
    {
      Header: "image_banner_url",
      accessor: "image_banner_url",
    },
  ];
  const [beranda, setBeranda] = useState<Beranda[] | []>([]);
  const [loadingBeranda, setLoadingBeranda] = useState<boolean>(true);
  const [listValuasi, setListValuasi] = useState<any[] | []>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [status, setstatus] = useState<
    "success" | "info" | "warning" | "error"
  >("error");

  const getTenant = async () => {
    setLoadingBeranda(true);
    try {
      await Promise.all([
        axiosCustom.get("/public/tenant"),
        axiosCustom.get("/public/valuasi"), // ganti dengan endpoint API kedua Anda
      ]).then((responses) => {
        const [response1, response2] = responses;
        setBeranda(response1.data.data);
        setListValuasi(response2.data.data);
        // lakukan sesuatu dengan response2
        setLoadingBeranda(false);
      });
    } catch (error: any) {
      // console.log(error);
      if (error?.response) {
        setMsg(`Terjadi Kesalahan: ${error.response.data.message}`);
      } else setMsg(`Terjadi Kesalahan: ${error.message}`);
      setstatus("error");
      setIsOpen(true);
      setLoadingBeranda(false);
    }
  };

  useEffect(() => {
    getTenant();
  }, []);

  return (
    <div>
      <Container maxW={"8xl"} px={{ base: 6, md: 20, "2xl": 55 }}>
        <Stack
          //   spacing={{ base: 8, md: 10 }}
          py={{ base: 10, md: 10 }}
          overflow={"hidden"}
        >
          <Stack w={"full"} flex={1} spacing={{ base: 5, md: 10 }} mb="3">
            <Heading
              lineHeight={1.2}
              fontWeight={500}
              fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}
              textAlign={"center"}
            >
              Tenant Solo Technopark
            </Heading>
          </Stack>

          {loadingBeranda ? (
            <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={"15px"}>
              {[1, 2, 3, 4, 5].map((index) => (
                <Skeleton
                  key={index}
                  minW={{ base: "150px", md: "180px" }}
                  w={"full"}
                  rounded="xl"
                  borderWidth={"1px"}
                  shadow="md"
                  height={{
                    base: "80px",
                    sm: "80px",
                    md: "100px",
                    lg: "100px",
                  }}
                />
              ))}
            </SimpleGrid>
          ) : (
            <>
              {beranda && beranda.length > 0 ? (
                <CardTable
                  data={beranda}
                  column={columns}
                  dataValuasi={listValuasi}
                />
              ) : (
                <Box textAlign="center" py={10} px={6}>
                  <Heading
                    display="inline-block"
                    as="h2"
                    size="2xl"
                    bgGradient="linear(to-r, red.400, red.600)"
                    backgroundClip="text"
                  >
                    404
                  </Heading>
                  <Text fontSize="18px" mt={3} mb={2}>
                    Not Found
                  </Text>
                  <Text color={"gray.500"} mb={6}>
                    Mungkin saja karena sudah dihapus atau belum dibuat. Coba
                    hubungi admin untuk info lebih lanjut atau kembali ke Home.
                  </Text>

                  <NextLink href={`${process.env.APP_URL}`} passHref>
                    <Button
                      colorScheme="red"
                      bgGradient="linear(to-r, red.400, red.500, red.600)"
                      color="white"
                      variant="solid"
                    >
                      Kembali ke Beranda
                    </Button>
                  </NextLink>
                </Box>
              )}
            </>
          )}
        </Stack>
      </Container>
    </div>
  );
}

interface CardTableProps<T extends object> {
  data: T[];
  column: ReadonlyArray<Column<T>>;
  dataValuasi: any;
}

function CardTable<T extends object>(props: CardTableProps<T>) {
  const router = useRouter();

  const [isHovered, setIsHovered] = useState<{ [key: number]: boolean }>({});

  const handleMouseEnter = (index: number) => {
    setIsHovered((prevState) => ({ ...prevState, [index]: true }));
  };

  const handleMouseLeave = (index: number) => {
    setIsHovered((prevState) => ({ ...prevState, [index]: false }));
  };

  const {
    getTableProps,
    // getTableBodyProps,
    // headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable(
    {
      data: props.data,
      columns: props.column,
    },
    useFilters,
    useGlobalFilter,
  );

  // console.log("Page:", page);

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
            <Select
              onChange={(e) => setFilter("valuasi", e.target.value)}
              mb="2"
              style={{ width: "auto" }}
            >
              <option value="">Semua Valuasi Tenant</option>
              {props.dataValuasi &&
                Array.isArray(props.dataValuasi) &&
                props.dataValuasi.map((data: any) => (
                  <option key={data.valuasi} value={data.valuasi}>
                    {data.valuasi}
                  </option>
                ))}
            </Select>

            <Select
              onChange={(e) => setFilter("level_tenant", e.target.value)}
              mb="2"
            >
              {/* "Pra Inkubasi", "Inkubasi", "Inkubasi Lanjutan", "Scale Up" */}
              <option value="">Semua Level Tenant</option>
              <option value="Pra Inkubasi">Pra Inkubasi</option>
              <option value="Inkubasi">Inkubasi</option>
              <option value="Inkubasi Lanjutan">Inkubasi Lanjutan</option>
              <option value="Scale Up">Scale Up</option>
            </Select>
          </Stack>
        </Flex>
      </Stack>
      {rows && rows.length > 0 ? (
        <SimpleGrid
          columns={{ base: 2, md: 3, lg: 5 }}
          spacing={"15px"}
          {...getTableProps()}
        >
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Box
                {...row.getRowProps()}
                position="relative"
                cursor="pointer"
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={() => handleMouseLeave(i)}
                title={row.values.name}
                key={i}
                onClick={() => router.push(`/tenant-detail/${row.values.slug}`)}
              >
                <Box
                  minW={{ base: "150px", md: "180px" }}
                  w={"full"}
                  rounded="xl"
                  borderWidth={"1px"}
                  shadow="md"
                  height={{
                    base: "80px",
                    sm: "80px",
                    md: "100px",
                    lg: "100px",
                  }}
                  transition="background-color 0.3s ease"
                  filter={isHovered[i] ? "brightness(100%)" : "brightness(60%)"}
                  bg={
                    isHovered[i]
                      ? "white"
                      : `url(${
                          row.values.image_banner_url ||
                          "/img/tenant-banner-default.jpg"
                        }) center/cover no-repeat`
                  }
                ></Box>
                <Center
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  zIndex="1"
                >
                  <Image
                    className="module-inside"
                    src={row.values.image_url || "/img/tenant-logo-default.png"}
                    alt="Slide"
                    height={{
                      base: "40px",
                      sm: "40px",
                      md: "60px",
                      lg: "60px",
                    }}
                    fit={"cover"}
                    // shadow="md"
                  />
                </Center>
              </Box>
            );
          })}
        </SimpleGrid>
      ) : (
        <Box textAlign="center" p={6}>
          <Heading
            display="inline-block"
            as="h2"
            size="2xl"
            bgGradient="linear(to-r, red.400, red.600)"
            backgroundClip="text"
          >
            404
          </Heading>
          <Text fontSize="18px" mt={3} mb={2}>
            Not Found
          </Text>
          <Text color={"gray.500"} mb={6}>
            Tidak ada data ditemukan. Silahkan coba pencarian lain.
          </Text>
        </Box>
      )}
    </Stack>
  );
}

export default dynamic(() => Promise.resolve(Tenant), {
  ssr: false,
  // suspense: true,
  loading: () => <Loading />,
});
