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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  CheckIcon,
  DeleteIcon,
  Search2Icon,
  SearchIcon,
} from "@chakra-ui/icons";

import { Column, useFilters, usePagination, useTable } from "react-table";
import Loading from "../../../loading";
import { axiosCustom } from "@/app/api/axios";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Pagination from "@/app/components/datatable/pagination";
import dynamic from "next/dynamic";

interface ChooseProps {
  onChoose: (tenant: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ChooseResponden = ({ onChoose, isOpen, onClose }: ChooseProps) => {
  //   const [dataPartisipan, setDataPartisipan] =
  //     useState<ClassInfo.Partisipan | null>(null);
  //   const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     // if (need_updated === true)
  //     getUpdatedPartisipan();
  //   }, []);
  //   const getUpdatedPartisipan = async () => {
  //     try {
  //       setIsLoading(true);
  //       // Panggil API menggunakan Axios dengan async/await
  //       const response = await axiosCustom.get(`/course/participant`);
  //       const timer = setTimeout(() => {
  //         // setIdTenant(id);
  //         setDataPartisipan(response.data.data); // Set isLoading to false to stop the spinner
  //         setIsLoading(false);
  //       }, 1000);
  //       return () => clearTimeout(timer);
  //     } catch (error: any) {
  //       console.error("Gagal memuat data:", error);
  //       setIsLoading(false);
  //     }
  //   };

  const columns: ReadonlyArray<Column<{ id: string; name: string }>> = [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "name",
      accessor: "name",
    },
    // {
    //   Header: "image_url",
    //   accessor: "image_url",
    // },
  ];

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pilih Responden Tenant</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <CardTable
              data={[
                {
                  id: "35353",
                  name: "jhdfgnsdf",
                },
                {
                  id: "35373",
                  name: "jhdfgnsdf",
                },
                {
                  id: "353787",
                  name: "jhdfgnsdf",
                },
                {
                  id: "3537390",
                  name: "Loremmm",
                },
              ]}
              column={columns}
              onClose={() => onClose()}
              onChoose={(tenant) => onChoose(tenant)}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

interface CardTableProps<T extends object> {
  data: T[];
  column: ReadonlyArray<Column<T>>;
  onChoose: (tenant: any) => void;
  onClose: () => void;
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
                    colorScheme="yellow"
                    key="choose"
                    size="sm"
                    onClick={() => {
                      props.onClose();
                      props.onChoose(row.values);
                    }}
                  >
                    <CheckIcon />
                    &nbsp;Pilih Responden
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

export default ChooseResponden;

// export default dynamic(() => Promise.resolve(ChooseResponden), {
//   ssr: false,
//   // suspense: true,
//   loading: () => <Loading />,
// });
