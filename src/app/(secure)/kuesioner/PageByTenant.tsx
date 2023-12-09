"use client";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  Image,
  SimpleGrid,
  Center,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import Loading from "./loading";
import { useRouter } from "next/navigation";
import { Column } from "react-table";
import DataTable from "@/app/components/datatable/data-table";
import TenantModalKuesioner from "./TenantModalKuesioner";
import TenantNilaiMentor from "./TenantNilaiMentor";

interface DataItem {
  id: string;
  title: string;
  type: string;
}

function PageByTenant() {
  let hidenCols: string[] = ["id"];
  const filterOptions = [{ key: "title", label: "Judul Kuesioner" }];

  const columns: ReadonlyArray<Column<DataItem>> = [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "Judul Kuesioner",
      accessor: "title",
      Cell: ({ value }) => (
        <Text
          textOverflow={"ellipsis"}
          overflow={"hidden"}
          flex="1"
          noOfLines={2}
          whiteSpace="normal"
        >
          {value}
        </Text>
      ),
      // width: "450px",
      // minWidth: 260,
      // maxWidth: 550,
    },
  ];

  const [datKuesionerTenant, setDatKuesionerTenant] = useState<Array<DataItem>>(
    [
      {
        id: "1234",
        title: "Saya Cobaa",
        type: "tahunan",
      },
    ],
  );

  const renderActions = (rowData: any) => {
    return (
      <>
        <Button onClick={onOpen}>Nilai Mentor</Button>
      </>
    );
    // <TenantModalKuesioner />;
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    // <Stack spacing={{ base: 4, md: 6 }}>
    <>
      <DataTable
        data={datKuesionerTenant}
        column={columns}
        hiddenColumns={hidenCols}
        filterOptions={filterOptions}
      >
        {(rowData: any) => renderActions(rowData)}
      </DataTable>

      <TenantNilaiMentor isOpen={isOpen} onClose={onClose} />
    </>
    // </Stack>
  );
}

export default PageByTenant;
