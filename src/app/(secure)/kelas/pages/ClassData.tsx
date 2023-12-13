"use client";
import React, { useEffect } from "react";
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
  useDisclosure,
  Img,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  AiFillTwitterCircle,
  AiOutlineFacebook,
  AiOutlineCrown,
  AiOutlineGlobal,
} from "react-icons/ai";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoYoutube,
} from "react-icons/io5";
import * as TenantTypes from "@/app/type/tenant-type.d";
import Link from "next/link";
import { Kelas, Mentor } from "@/app/type/class-type";
import { MdOutlinePeople } from "react-icons/md";
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineNewspaper,
} from "react-icons/hi";
import { BiDoorOpen } from "react-icons/bi";
import {
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { GrMoreVertical } from "react-icons/gr";
import { useMemo, useState } from "react";
import Pagination from "@/app/components/datatable/pagination";
import EditClass from "./editClass";
import ProfileMentor from "./profileMentor";
import { useRouter } from "next/navigation";
import DeleteClass from "./deleteClass";
import { Column, useFilters, usePagination, useTable } from "react-table";
import EndClass from "./endClass";

interface ClassProps {
  rowData: Kelas[];
  onSubmit: () => void;
  roleAccess: string;
}

const ClassData = ({ rowData, onSubmit, roleAccess }: ClassProps) => {
  const columns: ReadonlyArray<Column<Kelas>> = [
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
      Header: "description",
      accessor: "description",
    },
    {
      Header: "participant_count",
      accessor: "participant_count",
    },
    {
      Header: "activity_count",
      accessor: "activity_count",
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

  return (
    <>
      <Stack mt="4" spacing={6}>
        <CardTable
          data={rowData}
          column={columns}
          onSubmit={() => onSubmit()}
          roleAccess={roleAccess}
        />
      </Stack>
    </>
  );
};

interface CardTableProps<T extends object> {
  data: T[];
  column: ReadonlyArray<Column<T>>;
  onSubmit: () => void;
  roleAccess: string;
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
                placeholder={`Cari Nama Kelas`}
                // onChange={(e) => setFilter(option.key, e.target.value)}
                onChange={(e) => setFilter("name", e.target.value)}
                mb="2"
              />
            </InputGroup>

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
                    overflow="hidden"
                    title={row.values.name}
                    noOfLines={2}
                  >
                    {row.values.name}
                  </Text>
                  <HStack w="full" justifyContent={"center"} spacing={2}>
                    <Box
                      borderColor={"blue.500"}
                      rounded={"7px"}
                      borderWidth={1}
                      pr={2}
                      pl={2}
                      title="Partisipan"
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
                        <p>{row.values.participant_count}</p>
                      </HStack>
                    </Box>
                    <Box
                      borderColor={"blue.400"}
                      rounded={"7px"}
                      borderWidth={1}
                      pr={2}
                      pl={2}
                      title="Sesi Pertemuan"
                    >
                      <HStack
                        flexWrap={"wrap"}
                        spacing={1}
                        fontSize={{ base: "sm", sm: "xs", lg: "sm" }}
                        color="blue.500"
                        justifyContent={"center"}
                      >
                        <Icon
                          as={HiOutlineNewspaper}
                          boxSize={{ base: "20px", sm: "17px", lg: "20px" }}
                        />
                        <p>{row.values.activity_count}</p>
                      </HStack>
                    </Box>
                  </HStack>

                  <ProfileMentor mentor={row.values.mentor} />

                  <Stack spacing={2} direction={"row"} w="full">
                    <Button
                      bgColor="gray.500"
                      _hover={{
                        bg: "gray.400",
                      }}
                      color="white"
                      w="full"
                      size={"sm"}
                      alignContent={"center"}
                      onClick={() => router.push(`/kelas/${row.values.id}`)}
                    >
                      <BiDoorOpen size="20px" />
                      &nbsp;Masuk
                    </Button>
                    {props.roleAccess !== "Tenant" && (
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
                              <EditClass
                                rowData={row.values}
                                onSubmit={() => props.onSubmit()}
                                roleAccess={props.roleAccess}
                              />
                              <EndClass
                                endClass={row.values.course_ends}
                                dataClass={row.values}
                                onSubmit={() => props.onSubmit()}
                              />
                              <DeleteClass
                                dataDelete={row.values}
                                onSubmit={() => props.onSubmit()}
                                roleAccess={props.roleAccess}
                              />
                            </Stack>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
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

export default ClassData;
