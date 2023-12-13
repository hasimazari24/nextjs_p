"use client";
import React, { useState, useEffect, Suspense } from "react";
import {
  Stack,
  Flex,
  Heading,
  HStack,
  Button,
  Text,
  useDisclosure,
  Avatar,
  Box,
} from "@chakra-ui/react";
import Loading from "../../loading";
import { MdArrowBackIosNew } from "react-icons/md/";
import { notFound, useRouter } from "next/navigation";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import IngatkanTenant from "@/app/(secure)/kelas/[id]/sesi-kelas/[id_sesi]/review/[id_tugas]/IngatkanTenant";
import { axiosCustom } from "@/app/api/axios";
import { Column } from "react-table";
import DataTable from "@/app/components/datatable/data-table";
import NotFound from "@/app/components/template/NotFound";
import ReviewHasil from "./ReviewHasil";
import DownloadExcel from "@/app/components/utils/DownloadExcel";

interface DataItem {
  id_tenant: string;
  name: string;
  image: string;
  image_url: string;
  status: string;
  last_nilai: string;
  send_email_url: string;
}

function page({ params }: { params: { id_kuesioner: string } }) {
  const getParamsId = params.id_kuesioner;
  if ((getParamsId && getParamsId.length === 0) || !getParamsId) {
    return notFound();
  }
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const columns: ReadonlyArray<Column<DataItem>> = [
    {
      Header: "RESPONDEN TENANT",
      accessor: "name",
      Cell: ({ value, row }) => (
        <HStack
          onClick={() => handleShowHasil(row.values)}
          cursor="pointer"
          alignItems={"center"}
        >
          <Avatar src={row.values["image_url"]} />
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
      Header: "id_tenant",
      accessor: "id_tenant",
    },
    {
      Header: "Image_url",
      accessor: "image_url",
    },
    {
      Header: "send_email_url",
      accessor: "send_email_url",
    },
    {
      Header: "Terakhir Dinilai",
      accessor: "last_nilai",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value, row }) =>
        value === "Sudah Mengisi" ? (
          <Stack>
            <Text>Sudah Mengisi :</Text>
            <Text>{row.values.last_nilai}</Text>
          </Stack>
        ) : (
          <Stack>
            <Text>Belum Mengisi :</Text>
            <IngatkanTenant Url={row.values.send_email_url} />
          </Stack>
        ),
    },
  ];

  const hidenCols = [
    "id_tenant",
    "image_url",
    "send_email_url",
    "last_nilai",
    "action",
  ];

  const filterOptions = [
    {
      key: "name",
      label: "Responden",
    },
    {
      key: "status",
      label: "Status",
      values: ["Sudah Mengisi", "Belum Mengisi"],
    },
  ];

  const [dataKuesioner, setDataKuesioner] = useState<any | null>(null);
  const [openHasil, setOpenHasil] = useState<{
    idKuesioner: string;
    idTenant: string;
    tenantName: string;
    tglKirim: string;
  }>({
    idKuesioner: "",
    idTenant: "",
    tenantName: "",
    tglKirim: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const { setBreadcrumbs, breadcrumbs } = useBreadcrumbContext();
  // const router = useRouter;
  const getResponden = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(
        `/kuesioner-tahunan/${getParamsId}/review/responden`,
      );
      // Membuat nilai baru
      const newValue = {
        name: response.data.data?.kuesioner,
        href: `/kuesioner/review/${getParamsId}`,
      };
      // Cek apakah nilai baru sudah ada dalam breadcrumbs
      const alreadyExists = breadcrumbs.some(
        (breadcrumb) => JSON.stringify(breadcrumb) === JSON.stringify(newValue),
      );
      // Jika belum ada, tambahkan ke breadcrumbs
      if (!alreadyExists) {
        setBreadcrumbs([...breadcrumbs, newValue]);
      }
      setDataKuesioner(response.data.data);
      setIsLoading(false);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setIsLoading(false);
    }
  };

  const handleShowHasil = (data: any) => {
    setOpenHasil({
      idTenant: data.id_tenant,
      idKuesioner: getParamsId,
      tenantName: data.name,
      tglKirim: data.last_nilai,
    });
    onOpen();
  };

  useEffect(() => {
    // if (need_updated === true)
    getResponden();
  }, []);

  return isLoading ? (
    <Loading />
  ) : dataKuesioner && dataKuesioner.kuesioner ? (
    <Suspense fallback={<Loading />}>
      <Stack spacing={{ base: 2, md: 4 }}>
        <Flex
          flexDirection={{ base: "column-reverse", md: "row" }} // Arah tata letak berdasarkan layar
          justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
          // align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
        >
          <Heading fontSize={"2xl"} mb={2} textTransform={"uppercase"}>
            REVIEW KUESIONER : {dataKuesioner.kuesioner}
          </Heading>
          <HStack align="start" mb={{ base: 2, md: 0 }}>
            <Button
              leftIcon={<MdArrowBackIosNew />}
              colorScheme="blue"
              variant="outline"
              aria-label="btn-email"
              title={`Kembali ke Halaman Sebelumnya`}
              onClick={() => router.push(`/kuesioner/review`)}
              size={"sm"}
            >
              Kembali
            </Button>
            <DownloadExcel Url={`/export-kuesioner/${getParamsId}`} />
          </HStack>
        </Flex>
        <DataTable
          data={
            Array.isArray(dataKuesioner.responden)
              ? dataKuesioner.responden
              : []
          }
          column={columns}
          hiddenColumns={hidenCols}
          filterOptions={filterOptions}
        ></DataTable>
      </Stack>
      <ReviewHasil
        isOpen={isOpen}
        onClose={onClose}
        idKuesioner={openHasil.idKuesioner}
        idTenant={openHasil.idTenant}
        tenantName={openHasil.tenantName}
        tglKirim={openHasil.tglKirim}
      />
    </Suspense>
  ) : (
    <NotFound
      statusCode={404}
      msg="Not Found"
      statusDesc="Halaman tidak ditemukan. Periksa kembali URL Halaman yang anda kunjungi atau kembali ke halaman sebelum ini."
      backToHome="/kuesioner/review"
    />
  );
}

export default page;
