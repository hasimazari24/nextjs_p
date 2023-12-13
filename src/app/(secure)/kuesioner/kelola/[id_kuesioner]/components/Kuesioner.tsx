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
} from "@chakra-ui/react";
import { DeleteIcon, Search2Icon, SearchIcon } from "@chakra-ui/icons";

import { Column, useFilters, usePagination, useTable } from "react-table";
import Loading from "../../../loading";
import { axiosCustom } from "@/app/api/axios";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Pagination from "@/app/components/datatable/pagination";
import dynamic from "next/dynamic";
import { DropResult } from "react-beautiful-dnd";
import DndTable from "@/app/components/datatable/DndTable";
import DeleteGroupKuesioner from "./DeleteGroupKuesioner";
import AddGroupKuesioner from "./AddGroupKuesioner";
import ModalNotif from "@/app/components/modal/modal-notif";

interface GrupListProps {
  id: string;
  title: string;
  // pertanyaan_count: string;
  // pertanyaan_aktif_count: string;
  // pertanyaan_nonaktif_count: string;
  // created_at: string;
}

interface GrupPertanyaanProps {
  grup_pertanyaan_count: number;
  grup_pertanyaan: GrupListProps;
}

function Kuesioner({ idKuesioner }: { idKuesioner: string }) {
  const [dataGrup, setDataGrup] = useState<GrupPertanyaanProps | null>(null);
  const [dataListGrup, setDataListGrup] = useState<GrupListProps[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [stateNotif, setStateNotif] = useState({
    msg: "",
    isError: false,
    isNotifShow: false,
  });
  const handleShowMessage = (msg: string, err: boolean) => {
    setStateNotif({
      msg: msg,
      isError: err,
      isNotifShow: true,
    });
  };

  useEffect(() => {
    // if (need_updated === true)
    getGrup();
  }, []);
  const getGrup = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(
        `/kuesioner-tahunan/${idKuesioner}/grup-pertanyaan`,
      );
      const timer = setTimeout(() => {
        // setIdTenant(id);
        setDataGrup(response.data.data); // Set isLoading to false to stop the spinner
        setDataListGrup(response.data.data.grup_pertanyaan);
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setIsLoading(false);
    }
  };

  const columns: ReadonlyArray<Column<GrupListProps>> = [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "Judul Grup",
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
      // maxWidth: 450,
    },
    // {
    //   Header: "pertanyaan_aktif_count",
    //   accessor: "pertanyaan_aktif_count",
    // },
    // {
    //   Header: "pertanyaan_nonaktif_count",
    //   accessor: "pertanyaan_nonaktif_count",
    // },
    // {
    //   Header: "Pertanyaan",
    //   accessor: "pertanyaan_count",
    //   Cell: ({ value, row }) => (
    //     <Stack>
    //       <Text as="b">
    //         Total : <span style={{ fontWeight: "normal" }}>{value}</span>
    //       </Text>
    //       <Text as="b">
    //         Aktif :{" "}
    //         <span style={{ fontWeight: "normal" }}>
    //           {row.values["pertanyaan_aktif_count"]}
    //         </span>
    //       </Text>
    //       <Text as="b">
    //         Nonaktif :{" "}
    //         <span style={{ fontWeight: "normal" }}>
    //           {row.values["pertanyaan_nonaktif_count"]}
    //         </span>
    //       </Text>
    //     </Stack>
    //   ),
    // },
    // {
    //   Header: "Tgl Dibuat",
    //   accessor: "created_at",
    // },
  ];

  const filterOptions = [{ key: "title", label: "Judul Grup" }];

  const [loadingDragging, setLoadingDragging] = useState(false);
  const handleDragEnd = async (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    setLoadingDragging(true);

    // Update the order in your state (or wherever you keep it)
    const newData: GrupListProps[] =
      dataGrup && Array.isArray(dataGrup.grup_pertanyaan)
        ? dataGrup.grup_pertanyaan
        : [];
    const [removed] = newData.splice(source.index, 1);
    newData.splice(destination.index, 0, removed);

    const updatedData = newData.map((item, index) => {
      return { ...item, no_urut: index + 1 };
    });

    try {
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom
        .post(`/kuesioner-tahunan/grup/reorder-row`, {
          updatedRowData: updatedData,
        })
        .then(() => {
          setDataListGrup([...newData]);
          setLoadingDragging(false);
        });
    } catch (error: any) {
      if (error?.response) {
        handleShowMessage(
          `Pemindahan posisi tabel gagal : ${error.response.data.message}`,
          true,
        );
      } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
      setLoadingDragging(false);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Suspense fallback={<Loading />}>
      <Stack spacing={{ base: 4, md: 6 }}>
        <Flex
          flexDirection={{ base: "column", sm: "row" }} // Arah tata letak berdasarkan layar
          justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
          // align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
        >
          <VStack spacing={0} align="flex-start" mr={2}>
            <Text fontWeight={"bold"} fontSize={["lg", "xl"]}>
              Grup Pertanyaan Kuesioner
            </Text>
            <Text fontWeight="medium">
              Total :{" "}
              <span style={{ color: "green" }}>
                {dataGrup?.grup_pertanyaan_count} Grup Pertanyaan
              </span>
            </Text>
          </VStack>
          <HStack spacing={2} align="start">
            <AddGroupKuesioner
              idKuesioner={idKuesioner}
              onSubmit={() => getGrup()}
            />
          </HStack>
        </Flex>
        {/* konten disinii (daftar participant) */}
        {dataListGrup &&
        Array.isArray(dataListGrup) &&
        dataListGrup.length > 0 ? (
          <DndTable
            columns={columns}
            data={dataListGrup}
            droppableId={"GrubKuesionerTable"}
            onDragEnd={(result) => handleDragEnd(result)}
            hiddenColumns={[
              "id",
              // "pertanyaan_nonaktif_count",
              // "pertanyaan_aktif_count",
            ]}
            isLoading={loadingDragging}
            filterOptions={filterOptions}
          >
            {(rowData: any) => (
              <DeleteGroupKuesioner
                dataDelete={rowData}
                onSubmit={() => getGrup()}
              />
            )}
          </DndTable>
        ) : (
          <Stack justifyContent={"center"} spacing={0} alignItems={"center"}>
            <Image
              src="/img/kuesioner-item.png"
              h={{ base: "150px", sm: "170px", md: "250px" }}
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
              Data Grup Pertanyaan Kosong
            </Text>
            <Text
              fontSize={{ base: "15.5px", md: "16.5px" }}
              textAlign={"center"}
            >
              Mungkin belum dibuat atau sudah dihapus
            </Text>
          </Stack>
        )}
      </Stack>
    </Suspense>
  );
}

export default Kuesioner;
