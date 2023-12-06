"use client";
import React, { ReactNode, useState, useEffect } from "react";
import {
  Column,
  useTable,
  useRowSelect,
  useFilters,
  useGlobalFilter,
} from "react-table";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

type DndTableProps<T extends object> = {
  data: T[];
  columns: ReadonlyArray<Column<T>>;
  onDragEnd: (result: DropResult) => void;
  droppableId: string;
  filterOptions?: {
    key: string;
    label: string;
  }[];
  hiddenColumns: string[];
  children?: (rowData: any) => ReactNode;
  isLoading: boolean;
  disabledDrag?: boolean;
};

function DndTable<T extends object>({
  data,
  columns,
  onDragEnd,
  droppableId,
  filterOptions,
  hiddenColumns,
  children,
  isLoading,
  disabledDrag,
}: DndTableProps<T>) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { filters, globalFilter },
    setFilter,
  } = useTable(
    {
      columns: columns,
      data: data,
      autoResetSelectedRows: false,
      initialState: {
        hiddenColumns: hiddenColumns,
      },
    },
    useFilters,
    useGlobalFilter,
    useRowSelect,
  );

  useEffect(() => {
    setIsDisableDraggable(isLoading);
  }, [isLoading]);

  const [isDisableDraggable, setIsDisableDraggable] = useState(false);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter("title", value); // Replace "yourColumnName" with the actual column name you want to filter
    setIsDisableDraggable(value !== "" ? true : false); // Disable drag and drop if the filter is active
  };

  return (
    <Stack w="full">
      <Flex justifyContent={["center", "flex-start"]} flexWrap={"wrap"}>
        <Stack
          direction={{ base: "column", md: "row", lg: "row" }}
          alignItems={"center"}
        >
          {filterOptions &&
            filterOptions.map((filter, index) => (
              <InputGroup key={index}>
                <InputLeftElement pointerEvents="none">
                  <Button pl="1rem" leftIcon={<SearchIcon />}></Button>
                </InputLeftElement>
                <Input
                  pl="3rem"
                  type="text"
                  placeholder={`Cari ${filter.label}`}
                  onChange={handleFilterChange}
                  mb="2"
                  isDisabled={isLoading}
                />
              </InputGroup>
            ))}
        </Stack>
      </Flex>

      <TableContainer>
        <Table {...getTableProps()} variant="simple" w="100%">
          <Thead>
            {headerGroups.map((headerGroup, i) => {
              return (
                <Tr {...headerGroup.getHeaderGroupProps()} key={i}>
                  <Th key="noUrut" width="50px" fontSize="sm">
                    No
                  </Th>
                  {headerGroup.headers.map((column, idx) => {
                    return (
                      <Th {...column.getHeaderProps()} key={idx} fontSize="sm">
                        <Box>{column.render("Header")}</Box>
                      </Th>
                    );
                  })}
                  {!hiddenColumns.includes("action") && (
                    <Th
                      key={"theadAction"}
                      width="100px"
                      fontSize="sm"
                      id="action"
                      borderBottom={"none"}
                    >
                      <Box>Action</Box>
                    </Th>
                  )}
                </Tr>
              );
            })}
          </Thead>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={`${droppableId}`}>
              {(provided) => (
                <Tbody
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  {...getTableBodyProps()}
                  w="full"
                >
                  {rows.length === 0 ? (
                    <Tr key={columns.length}>
                      <Td
                        colSpan={columns.length + 1}
                        textAlign="center"
                        key={0}
                      >
                        Tidak Ada Data
                      </Td>
                    </Tr>
                  ) : (
                    rows.map((row, index) => {
                      prepareRow(row);
                      return row.values ? (
                        <Draggable
                          key={row.id}
                          draggableId={row.id.toString()}
                          index={index}
                          isDragDisabled={
                            disabledDrag ? disabledDrag : isDisableDraggable
                          }
                        >
                          {(provided, snapshot) => (
                            <Tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              // key={index}
                              {...row.getRowProps()}
                              backgroundColor={
                                snapshot.isDragging ? "blue.100" : "white"
                              }
                            >
                              <Td>
                                <Skeleton isLoaded={!isLoading}>
                                  {index + 1}
                                </Skeleton>
                              </Td>
                              {row.cells.map((cell, i) => {
                                return (
                                  <Td
                                    {...cell.getCellProps()}
                                    // borderBottom={
                                    //   snapshot.isDragging
                                    //     ? "none"
                                    //     : "1px solid gray.100"
                                    // }
                                    key={i}
                                    w="full"
                                  >
                                    <Skeleton isLoaded={!isLoading}>
                                      {cell.render("Cell")}
                                    </Skeleton>
                                  </Td>
                                );
                              })}
                              {children && !hiddenColumns.includes("action") ? (
                                <Td key={index}>
                                  <Skeleton isLoaded={!isLoading}>
                                    {children(row.values)}
                                  </Skeleton>
                                </Td>
                              ) : null}
                            </Tr>
                          )}
                        </Draggable>
                      ) : (
                        <Tr key={index}>
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
                  {provided.placeholder}
                </Tbody>
              )}
            </Droppable>
          </DragDropContext>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default DndTable;
