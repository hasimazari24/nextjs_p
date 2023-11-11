"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { BiDoorOpen } from "react-icons/bi";
import { axiosCustom } from "@/app/api/axios";
import Loading from "../../loading";
import { MdArrowBackIosNew } from "react-icons/md";
import { Column } from "react-table";
import DataTable from "@/app/components/datatable/data-table";

interface Item_Progress {
  id: string;
  title: string;
  progress: string;
  assigment_count: number;
  assigment_answered_count: number;
  last_comment: string | null;
}

interface ProgressTenant {
  id: string;
  course_ends: boolean;
  name: string;
  description: string;
  created_at: string;
  item_count: number;
  tenant_name: string;
  item: Item_Progress;
}

function Progress({
  idTenant,
  idKelas,
}: {
  idTenant: string;
  idKelas: string;
}) {
  const [dataProgress, setProgress] = useState<ProgressTenant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const ItemProgress: Item_Progress[] =
    dataProgress && Array.isArray(dataProgress.item)
      ? dataProgress.item.map((data) => ({
          id: data.id,
          title: data.title,
          progress: data.progress,
          assigment_count: data.assigment_count,
          assigment_answered_count: data.assigment_answered_count,
          last_comment: data.last_comment,
        }))
      : [];

  const getDataProgress = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(
        `/course/${idKelas}/tenant/${idTenant}/progress`,
      );
      const timer = setTimeout(() => {
        setProgress(response.data.data); // Set isLoading to false to stop the spinner
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataProgress();
  }, [idTenant, idKelas]);

  const columns: ReadonlyArray<Column<Item_Progress>> = [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "Judul Sesi",
      accessor: "title",
    },
    {
      Header: "Progress",
      accessor: "progress",
    },
    {
      Header: "Assigment_answered_count",
      accessor: "assigment_answered_count",
    },
    {
      Header: "Tugas",
      accessor: "assigment_count",
      Cell: ({ value, row }) => (
        <div>
          {row.values["assigment_answered_count"]} Selesai / {value} Tugas
        </div>
      ),
    },
    {
      Header: "Komentar",
      accessor: "last_comment",
      Cell: ({ value }) => (
        <Text
          textOverflow={"ellipsis"}
          overflow={"hidden"}
          flex="1"
          noOfLines={1}
          whiteSpace="normal"
        >
          {value}
        </Text>
      ),
      width: "450px",
      minWidth: 260,
      maxWidth: 450,
    },
  ];

  let hidenCols: string[] = ["id", "assigment_answered_count"];

  const filterOptions = [{ key: "title", label: "Nama Sesi" }];

  return isLoading ? (
    <Loading />
  ) : (
    <Stack spacing={{ base: 6, md: 8 }}>
      <Flex
        flexDirection={{ base: "column", sm: "row" }} // Arah tata letak berdasarkan layar
        justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
      >
        <VStack spacing={0} align="flex-start" mr={2}>
          <Text fontWeight={"bold"} fontSize={["lg", "xl"]}>
            Partisipan Kelas
          </Text>
          <Text fontWeight="medium">
            Tenant :{" "}
            <span style={{ color: "green" }}>{dataProgress?.tenant_name}</span>
          </Text>
        </VStack>
        <HStack spacing={2} align="start">
          <Button
            leftIcon={<MdArrowBackIosNew />}
            colorScheme="blue"
            variant="outline"
            aria-label="btn-kembali"
            size={"sm"}
            mb={6}
          >
            Kembali
          </Button>
        </HStack>
      </Flex>

      <DataTable
        data={ItemProgress}
        column={columns}
        hiddenColumns={hidenCols}
        filterOptions={filterOptions}
      />
    </Stack>
  );
}

export default Progress;
