"use client";
import React, { useState } from "react";
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
  Stack
} from "@chakra-ui/react";

type DndTableProps<T extends object> = {
  data: T[];
  columns: ReadonlyArray<Column<T>>;
  onDragEnd: (result: DropResult) => void;
  droppableId: string;
};

function DndTable<T extends object>({
  data,
  columns,
  onDragEnd,
  droppableId,
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
    { columns: columns, data: data, autoResetSelectedRows: false },
    useFilters,
    useGlobalFilter,
    useRowSelect,
  );

  const [isDisableDraggable, setIsDisableDraggable] = useState(false);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter("title", value); // Replace "yourColumnName" with the actual column name you want to filter
    setIsDisableDraggable(value !== "" ? true : false); // Disable drag and drop if the filter is active
  };

  return (
    <Stack>
      <div>
        <label htmlFor="search">Search:</label>
        <input id="search" type="text" onChange={handleFilterChange} />
      </div>
      <TableContainer>
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup, i) => {
              return (
                <Tr {...headerGroup.getHeaderGroupProps()} key={i}>
                  <Th key="noUrut">No</Th>
                  {headerGroup.headers.map((column, idx) => {
                    return (
                      <Th {...column.getHeaderProps()} key={idx}>
                        {column.render("Header")}
                      </Th>
                    );
                  })}
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
                >
                  {rows.map((row, index) => {
                    prepareRow(row);
                    return (
                      <Draggable
                        key={row.id}
                        draggableId={row.id.toString()}
                        index={index}
                        isDragDisabled={isDisableDraggable}
                      >
                        {(provided) => (
                          <Tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            // key={index}
                            {...row.getRowProps()}
                          >
                            <Td>{index + 1}</Td>
                            {row.cells.map((cell) => {
                              return (
                                <Td {...cell.getCellProps()}>
                                  {cell.render("Cell")}
                                </Td>
                              );
                            })}
                          </Tr>
                        )}
                      </Draggable>
                    );
                  })}
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
