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
  HStack,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import { Column } from "react-table";
import DataTable from "@/app/components/datatable/data-table";
import TenantModalKuesioner from "./TenantModalKuesioner";
import TenantNilaiMentor from "./TenantNilaiMentor";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { axiosCustom } from "@/app/api/axios";

interface DataItem {
  id: string;
  kuesioner: string;
  type: string;
}

function PageByTenant() {
  let hidenCols: string[] = ["id", "action", "type"];
  const filterOptions = [
    { key: "kuesioner", label: "Judul Kuesioner" },
    // {
    //   key: "type",
    //   label: "Tipe",
    //   values: ["Tahunan", "Penilaian Mentor"],
    // },
  ];

  const columns: ReadonlyArray<Column<DataItem>> = [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "type",
      accessor: "type",
    },
    {
      Header: "Judul Kuesioner",
      accessor: "kuesioner",
      Cell: ({ value, row }) => (
        <HStack
          onClick={() => handleShowKuesioner(row.values)}
          cursor="pointer"
          alignItems={"center"}
        >
          <Text as="u" color="blue.500" _hover={{ color: "blue.400" }}>
            {value}
          </Text>
          <Box>
            <ExternalLinkIcon
              color={"blue.500"}
              _hover={{ color: "blue.400" }}
            />
          </Box>
        </HStack>
      ),
      // width: "450px",
      // minWidth: 260,
      // maxWidth: 550,
    },
    // {
    //   Header: "Tipe Kuesioner",
    //   accessor: "type",
    //   filter: (rows, id, filterValues) => {
    //     if (filterValues === "Tahunan")
    //       return rows.filter((row) => row.values["type"] === "tahunan");
    //     else if (filterValues === "Penilaian Mentor")
    //       return rows.filter((row) => row.values["type"] === "nilai_mentor");
    //     else return rows;
    //   },
    //   Cell: ({ value }) =>
    //     value === "tahunan" ? "Tahunan" : "Penilaian Mentor",
    // },
  ];

  const [datKuesionerTenant, setDatKuesionerTenant] = useState<Array<DataItem>>(
    [],
  );

  const [isLoading, setIsLoading] = useState(true);

  const getKuesioner = async () => {
    try {
      setIsLoading(true);
      const response = await axiosCustom.get(`/tenant-kuesioner/`);
      setDatKuesionerTenant(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getKuesioner();
  }, []);

  const {
    isOpen: isOpenTahunan,
    onOpen: onOpenTahunan,
    onClose: onCloseTahunan,
  } = useDisclosure();

  const {
    isOpen: isOpenNilaiMentor,
    onOpen: onOpenNilaiMentor,
    onClose: onCloseNilaiMentor,
  } = useDisclosure();

  const [idKuesioner, setIdKuesioner] = useState("");

  const handleShowKuesioner = (data: any) => {
    if (data?.type === "tahunan") {
      onOpenTahunan();
    } else if (data?.type === "nilai_mentor") {
      onOpenNilaiMentor();
    }
    setIdKuesioner(data.id);
  };

  return isLoading ? (
    <Loading />
  ) : (
    // <Stack spacing={{ base: 4, md: 6 }}>
    <>
      <DataTable
        data={datKuesionerTenant}
        column={columns}
        hiddenColumns={hidenCols}
        filterOptions={filterOptions}
      />

      <TenantModalKuesioner
        isOpen={isOpenTahunan}
        onClose={() => {
          onCloseTahunan();
          setIdKuesioner("");
        }}
        idKuesioner={idKuesioner}
        onSubmit={() => getKuesioner()}
      />
      <TenantNilaiMentor
        isOpen={isOpenNilaiMentor}
        onClose={() => {
          onCloseNilaiMentor();
          setIdKuesioner("");
        }}
        idKuesioner={idKuesioner}
        onSubmit={() => getKuesioner()}
      />
    </>
    // </Stack>
  );
}

export default PageByTenant;
