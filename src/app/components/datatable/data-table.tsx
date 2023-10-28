"use client"
/* eslint-disable react/jsx-key */
/* eslint react/forbid-prop-types: 0 */
/* eslint-disable react/jsx-key */

import { Box } from "@chakra-ui/layout";
import {
  Select,
  HStack,
  Button,
  Checkbox,
  TableContainer,Stack,
  Flex,
  Text,
  Wrap,
  WrapItem,
  InputLeftElement,
  InputGroup,Input,
} from "@chakra-ui/react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React, { ReactNode, useState } from "react";
import {
  HiArrowDown,
  HiArrowUp,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Column,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
  useResizeColumns,
  useBlockLayout,
} from "react-table";
import GotoForm from "./goto-form";
import Pagination from "./pagination";
// import TextField from "./text-field";
// import { EditIcon } from "lucide-react";

type DataTableProps<T extends object> = {
  data: T[];
  column: ReadonlyArray<Column<T>>;
  // onCellClick: (rowData: any) => void;
  hiddenColumns: string[];
  filterOptions: {
    key: string;
    label: string;
    values?: string[];
    type?: string;
  }[];
  children: (rowData: any) => ReactNode; // Properti children yang menerima fungsi
  onSelectedRowsChange?: (selectedRows: T[]) => void;
};

function DataTable<T extends object>(props: DataTableProps<T>) {
  // const [selectedRow, setSelectedRow] = useState<any | null>(null);

  // const handleRowEdit = (rowData: any) => {
  //   // setSelectedRow(rowData);
  //   props.handleEdit(rowData); // Memicu tampilan modal di komponen lain
  //   // console.log(rowData);
  // };

  // const handleRowHapus = (rowData: any) => {
  //   // setSelectedRow(rowData);
  //   props.handleDelete(rowData); // Memicu tampilan modal di komponen lain
  //   // console.log(rowData);
  // };
  const {
    page,
    prepareRow,
    getTableBodyProps,
    headerGroups,
    getTableProps,
    setGlobalFilter,
    setFilter,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    pageSize,
    pageOptions,
    gotoPage,
    selectedFlatRows,
    state: { pageIndex },
  } = useTable(
    {
      data: props.data,
      columns: props.column,
      initialState: {
        pageSize: 5,
        hiddenColumns: props.hiddenColumns,
      },
      // autoResetPage: false,
      // autoResetFilters: false,
    },
    useResizeColumns, // Aktifkan useResizeColumns
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    //Menampilkan checkbox
    // (hooks) => {
    //   if (props.checkbox) {
    //     hooks.visibleColumns.push((columns) => [
    //       {
    //         id: "selection",
    //         Header: ({ getToggleAllPageRowsSelectedProps }) => {
    //           const { checked, ...props } = getToggleAllPageRowsSelectedProps();
    //           return (
    //             <Box>
    //               <Checkbox {...props} isChecked={checked} />
    //             </Box>
    //           );
    //         },
    //         Cell: ({ row }: any) => {
    //           const { checked, ...props } = row.getToggleRowSelectedProps();
    //           return (
    //             <Box>
    //               <Checkbox {...props} isChecked={checked} />
    //             </Box>
    //           );
    //         },
    //         disableFilters: true,
    //       },
    //       ...columns,
    //     ]);
    //   } 
    // }
  );

  if (props.onSelectedRowsChange) {
    props.onSelectedRowsChange(selectedFlatRows.map((d) => d.original));
  }

  return (
    <Box>
      <Stack
        mt="4"
        mb="2"
        // justifyItems="center"
        justifyContent="space-between"
        direction={["column", "row"]}
        flexWrap={"wrap"}
      >
        <Flex justifyContent={["center", "flex-start"]} flexWrap={"wrap"}>
          <Stack
            direction={{ base: "column", md: "row", lg: "row" }}
            alignItems={"center"}
          >
            {props.filterOptions.map((option) => {
              if (Array.isArray(option.values)) {
                return (
                  <Select
                    onChange={(e) => setFilter(option.key, e.target.value)}
                    mb="2"
                  >
                    <option value="">Semua {option.label}</option>
                    {option.values.map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                );
              }
              if (option.type) {
                return (
                  <>
                    <HStack mb="2" alignItems={"center"} pr="3">
                      <Text
                        whiteSpace={{
                          base: "nowrap",
                          md: "normal",
                          lg: "nowrap",
                        }}
                      >
                        {option.label}
                      </Text>
                      <Checkbox
                        onChange={(e) =>
                          setFilter(option.key, e.target.checked ? true : null)
                        }
                        size="lg"
                      />
                    </HStack>
                  </>
                );
              } else
                return (
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Button pl="1rem" leftIcon={<SearchIcon />}></Button>
                    </InputLeftElement>
                    <Input
                      pl="3rem"
                      key={option.key}
                      type="text"
                      placeholder={`Cari ${option.label}`}
                      onChange={(e) => setFilter(option.key, e.target.value)}
                      mb="2"
                    />
                  </InputGroup>
                );
            })}
          </Stack>
        </Flex>
        <Flex
          justifyContent={["center", "flex-start"]}
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
            <option value="100">100</option>
          </Select>
          <Text>Data Per Page</Text>
          {/* </Stack> */}
        </Flex>
      </Stack>

      <TableContainer>
        <Table {...getTableProps()} mt="4" variant="striped" w="100%">
          {/* <Table variant="striped" color="blue.50" className="table"> */}
          <Thead>
            {headerGroups.map((headerGroups, i) => {
              return (
                <Tr {...headerGroups.getHeaderGroupProps()} key={i}>
                  {headerGroups.headers.map((column, i) => {
                    const attrCol = props.column.find(
                      (col) => col.accessor === column.id,
                    );
                    return (
                      <Th
                        {...(column.getHeaderProps() || {})}
                        key={i}
                        fontSize="sm"
                        w={attrCol ? attrCol?.width : "auto"}
                        minW={attrCol ? attrCol?.minWidth : "auto"}
                        maxW={attrCol ? attrCol?.maxWidth : "auto"}
                      >
                        <Box mb="2" {...column.getSortByToggleProps()}>
                          <HStack
                            display="flex"
                            alignItems="center"
                            // spacing="2"
                          >
                            <Text
                              whiteSpace={{
                                base: "nowrap",
                                md: "normal",
                                lg: "normal",
                              }}
                            >
                              {column.render("Header")}
                            </Text>
                            {/* <Box></Box> */}
                            {column.isSorted ? (
                              <>
                                {column.isSortedDesc ? (
                                  <HiArrowDown />
                                ) : (
                                  <HiArrowUp />
                                )}
                              </>
                            ) : null}
                          </HStack>
                        </Box>
                        {/* memfilter setiap kolom */}

                        {/* {column.canFilter ? (
                              <TextField
                                onChangeDebounce={(value) =>
                                  setFilter(column.id, value)
                                }
                                placeholder={`Search ${column.id.toLocaleLowerCase()}`}
                              />
                            ) : null} */}
                      </Th>
                    );
                  })}
                  <Th
                    width="100px"
                    fontSize="sm"
                    id="action"
                    display={
                      props.hiddenColumns.includes("action")
                        ? "none"
                        : "table-cell"
                    }
                    borderBottom={"none"}
                  >
                    <Text>Action</Text>
                  </Th>
                </Tr>
              );
            })}
          </Thead>
          {/* ...get__props mendapatkan semua properti dalam element tsb */}
          <Tbody {...getTableBodyProps()}>
            {/* untuk perncarian jika data tidak ditemukan */}
            {page.length === 0 ? (
              <Tr key={props.column.length}>
                <Td
                  colSpan={props.column.length + 1}
                  textAlign="center"
                  key={0}
                >
                  Tidak Ada Data
                </Td>
              </Tr>
            ) : (
              page.map((row, i) => {
                prepareRow(row);
                //jika terdapat row dengan values id
                return row.values.id ? (
                  <Tr {...row.getRowProps()} key={i}>
                    {row.cells.map((cell, x) => {
                      const attrCol = props.column.find(
                        (col) => col.accessor === cell.column.id,
                      );
                      return (
                        <Td
                          {...(cell.getCellProps() || {})} // Gunakan {} jika cell.getCellProps() adalah undefined
                          // minW={cell.column.id === "selection" ? "0" : "160px"}
                          className={cell.column.id}
                          key={cell.column.id}
                          w={attrCol ? attrCol?.width : "auto"}
                          minW={attrCol ? attrCol?.minWidth : "auto"}
                          maxW={attrCol ? attrCol?.minWidth : "auto"}
                        >
                          {cell.render("Cell")}
                        </Td>
                      );
                    })}
                    {/* <Td>{props.children(props.data[i])}</Td> */}
                    <Td>{props.children(row.values)}</Td>
                  </Tr>
                ) : (
                  //jika tidak ada row values id, maka ...
                  <Tr key={i}>
                    <Td
                      colSpan={row.cells.length + 1}
                      textAlign="center"
                      key={0}
                    >
                      Tidak Ada Data
                    </Td>
                  </Tr>
                );
              })
            )}
          </Tbody>
        </Table>
      </TableContainer>
     
      <Flex justify="flex-end" alignItems="center">
        <Box mt="4" display="flex">
          {/* Berpindah halaman */}
          {/* <GotoForm
          onSubmit={(page) => {
            gotoPage(page - 1);
          } } /> */}
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
        </Box>
      </Flex>
    </Box>
  );
}

export default DataTable;

