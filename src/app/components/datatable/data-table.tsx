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
  TableContainer,
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
} from "react-table";
import GotoForm from "./goto-form";
import Pagination from "./pagination";
// import TextField from "./text-field";
import { Columns } from "lucide-react";
// import { EditIcon } from "lucide-react";

type DataTableProps<T extends object> = {
  data: T[];
  column: ReadonlyArray<Column<T>>;
  // onCellClick: (rowData: any) => void;
  hiddenColumns: string[];
  filterOptions: { key: string; label: string; values?: string[]; type?:string; }[];
  children: (rowData: any) => ReactNode; // Properti children yang menerima fungsi
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
    pageOptions,
    gotoPage,
    state: { pageIndex },
  } = useTable(
    {
      data: props.data,
      columns: props.column,
      initialState: {
        pageSize: 5,
        hiddenColumns: props.hiddenColumns
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    //Menampilkan checkbox
    // (hooks) => {
    //   hooks.visibleColumns.push((columns) => [
    //     {
    //       id: "selection",
    //       Header: ({ getToggleAllPageRowsSelectedProps }) => {
    //         const { checked, ...props } = getToggleAllPageRowsSelectedProps();
    //         return (
    //           <Box>
    //             <Checkbox {...props} isChecked={checked} />
    //           </Box>
    //         );
    //       },
    //       Cell: ({ row }: any) => {
    //         const { checked, ...props } = row.getToggleRowSelectedProps();
    //         return (
    //           <Box>
    //             <Checkbox {...props} isChecked={checked} />
    //           </Box>
    //         );
    //       },
    //       disableFilters: true,
    //     },
    //     ...columns,
    //   ]);
    // }
  );

  return (
    <Box>
      <Flex
        mt="4"
        mb="2"
        // justifyItems="center"
        justifyContent="space-between"
        width="100%"
        direction={["column", "row"]}
      >
        <HStack justifyContent="flex-start" display="flex">
          <Flex direction={["column", "row"]}>
            {props.filterOptions.map((option) => {
              if (Array.isArray(option.values)) {
                return (
                  <Select
                    onChange={(e) => setFilter(option.key, e.target.value)}
                    width="100%"
                    mb="2"
                  >
                    <option value="">Semua {option.label}</option>
                    {option.values.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                );
              }
              if (option.type) {
                return (
                  <>
                    <HStack width="100%" mb="2">
                      <p>{option.label}</p>
                      <Checkbox
                        onChange={(e) =>
                          setFilter(option.key, e.target.checked ? true : null)
                        }
                        pl="2"
                        pr="2"
                        size="lg"
                      />
                    </HStack>
                  </>
                );
              } else
                return (
                  <InputGroup px="2">
                    <InputLeftElement pointerEvents="none">
                      <Button leftIcon={<SearchIcon />}></Button>
                    </InputLeftElement>
                    <Input
                      width="100%"
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
          </Flex>
        </HStack>
        <HStack justifyContent="flex-start" display="flex">
          <p>&nbsp; Showing</p>
          <Select
            w="20"
            fontSize="sm"
            onChange={(e) => {
              setPageSize(+e.target.value);
            }}
            cursor="pointer"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="75">75</option>
            <option value="100">100</option>
          </Select>
          <p>Data Per Page</p>
        </HStack>
      </Flex>

      <TableContainer>
        <Table {...getTableProps()} mt="4" variant="striped">
          {/* <Table variant="striped" color="blue.50" className="table"> */}
          <Thead>
            {headerGroups.map((headerGroups, i) => {
              return (
                <Tr {...headerGroups.getHeaderGroupProps()} key={i}>
                  {headerGroups.headers.map((column, i) => {
                    return (
                      <Th {...column.getHeaderProps()} key={i} fontSize="sm">
                        <Box mb="2" {...column.getSortByToggleProps()}>
                          <HStack
                            display="flex"
                            alignItems="center"
                            // spacing="2"
                          >
                            <Box>{column.render("Header")}</Box>
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
                  <Th width="100px">Action</Th>
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
                    {row.cells.map((cell) => {
                      return (
                        <Td
                          {...cell.getCellProps()}
                          minW={cell.column.id === "selection" ? "0" : "160px"}
                          className={cell.column.id}
                          key={cell.column.id}
                        >
                          {cell.render("Cell")}
                        </Td>
                      );
                    })}
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

