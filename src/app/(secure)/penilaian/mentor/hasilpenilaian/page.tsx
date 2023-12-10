"use client";
import React, { useState, useEffect, Suspense } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Stack,
  Flex,
  Text,
  useDisclosure,
  VStack,
  Avatar,
  Heading,
} from "@chakra-ui/react";
import { MdAlarm, MdArrowBackIosNew, MdTask } from "react-icons/md/";
import { Column } from "react-table";
import DataTable from "@/app/components/datatable/data-table";
import Link from "next/link";
import { axiosCustom } from "@/app/api/axios";
import { useRouter } from "next/navigation";
import Loading from "@/app/(secure)/kelas/loading";
import ReviewMentor from "@/app/(secure)/kelas/[id]/sesi-kelas/[id_sesi]/review/[id_tugas]/reviewMentor";
import { useAuth } from "@/app/components/utils/AuthContext";
// import ReviewTenant from "@/app/(secure)/kelas/[id]/progress/[id_progress]/Tugas/review/reviewTenant";
import ReviewTenant from "@/app/(secure)/kelas/[id]/sesi-kelas/[id_sesi]/review/[id_tugas]/reviewTenant";
import NotFound from "@/app/components/template/NotFound";
import DownloadExcel from "@/app/components/utils/DownloadExcel";
import IngatkanTenant from "@/app/(secure)/kelas/[id]/sesi-kelas/[id_sesi]/review/[id_tugas]/IngatkanTenant";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import DeleteHasilPenilaian from "./DeleteHasilPenilaian";

interface DataItem {
  id: string;
  image: string;
  fullname: string;
  course: string;
  tenant: string;
  last_nilai: string;
}

function page() {
  const { breadcrumbs, setBreadcrumbs } = useBreadcrumbContext();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenTenant,
    onOpen: onOpenTenant,
    onClose: onCloseTenant,
  } = useDisclosure();
  const { user } = useAuth();
  let getUser: any = null; // Inisialisasikan getUser di sini

  if (user !== null && user !== 401) {
    getUser = user; // Setel nilai getUser jika user ada
  }

  const router = useRouter();

  const columns: ReadonlyArray<Column<DataItem>> = [
    {
      Header: "Mentor",
      accessor: "fullname",
      Cell: ({ value, row }) => (
        <HStack
          // onClick={() => handleReviewShow(row.values)}
          cursor="pointer"
          alignItems={"center"}
        >
          <Avatar src={row.values["image"]} />
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
    },
    {
      Header: "Image",
      accessor: "image",
    },
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Dinilai Oleh :",
      accessor: "tenant",
    },
    {
      Header: "Terakhir Dinilai",
      accessor: "last_nilai",
      // Cell: ({ value, row }) =>
      //   value && (
      //     <Text>
      //       {value}, {row.values["graded_answer_review_time"]}
      //     </Text>
      //   ),
    },
  ];

  const hidenCols = ["id", "image"];

  const filterOptions = [
    {
      key: "mentor",
      label: "Mentor",
    },
    {
      key: "tenant",
      label: "Tenant",
    },
  ];

  const [dataHasilNilai, setDataHasilNilai] = useState<DataItem[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter;
  const getDataHasilNilai = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get("/tenant-nilai-mentor");
      setDataHasilNilai(response.data.data);
      setIsLoading(false);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setIsLoading(false);
    }
  };

  // console.log(breadcrumbs);

  useEffect(() => {
    // if (need_updated === true)
    getDataHasilNilai();
  }, []);

  const renderActions = (rowData: any) => {
    return (
      <DeleteHasilPenilaian
        dataDelete={rowData}
        onSubmit={() => getDataHasilNilai()}
      />
    );
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Suspense fallback={<Loading />}>
      <Stack spacing={{ base: 4, md: 6 }}>
        <Flex
          justifyContent={"space-between"}
          direction={["column-reverse", "row"]}
        >
          <Heading fontSize={"2xl"}>
            HASIL PENILAIAN TENANT NILAI MENTOR
          </Heading>
          <HStack mb={{ base: 2, md: 0 }}>
            {/* <DownloadExcel
              Url={`/export-nilai-tugas/${idTenant}/course/${idKelas}`}
            /> */}
            <Button
              leftIcon={<MdArrowBackIosNew />}
              colorScheme="blue"
              variant="outline"
              aria-label="btn-email"
              size={"sm"}
              onClick={() => router.push("/penilaian/mentor")}
            >
              Kembali
            </Button>
          </HStack>
        </Flex>
        <DataTable
          data={dataHasilNilai}
          column={columns}
          hiddenColumns={hidenCols}
          filterOptions={filterOptions}
        >
          {(rowData: any) => renderActions(rowData)}
        </DataTable>
      </Stack>
    </Suspense>
  );
}

export default page;
