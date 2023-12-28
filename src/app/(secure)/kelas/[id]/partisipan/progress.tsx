"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { axiosCustom } from "@/app/api/axios";
import Loading from "../../loading";
import { MdArrowBackIosNew } from "react-icons/md";
import { Column } from "react-table";
import DataTable from "@/app/components/datatable/data-table";
import dynamic from "next/dynamic";
import Link from "next/link";

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
  tabIndex,
}: {
  idTenant: string;
  idKelas: string;
  tabIndex: () => void;
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
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
    }
  };

  useEffect(() => {
    getDataProgress();
  }, [idTenant]);

  const columns: ReadonlyArray<Column<Item_Progress>> = [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "Judul Sesi",
      accessor: "title",
      Cell: ({ value, row }) => (
        <div>
          <Link href={`/kelas/${idKelas}/sesi-kelas/${row.values.id}/`}>
            <Text as="u" color="blue.500" _hover={{ color: "blue.400" }}>
              {value}
            </Text>
          </Link>
        </div>
      ),
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
      Header: "Komentar Terakhir",
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

  let hidenCols: string[] = ["id", "assigment_answered_count", "action"];

  const filterOptions = [{ key: "title", label: "Nama Sesi" }];

  // console.log(ItemProgress);

  return isLoading ? (
    <Loading />
  ) : (
    <Stack spacing={{ base: 2, md: 4 }}>
      <Flex
        flexDirection={{ base: "column-reverse", sm: "row" }} // Arah tata letak berdasarkan layar
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
        <HStack mb={{ base:2, md:0 }} align="start">
          <Button
            leftIcon={<MdArrowBackIosNew />}
            colorScheme="blue"
            variant="outline"
            aria-label="btn-kembali"
            size={"sm"}
            mb={6}
            onClick={() => tabIndex()}
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

export default dynamic(() => Promise.resolve(Progress), {
  ssr: false,
  loading: () => <Loading />,
});
