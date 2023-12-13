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
  Avatar,
  Heading,
} from "@chakra-ui/react";
import { MdArrowBackIosNew } from "react-icons/md/";
import { Column } from "react-table";
import DataTable from "@/app/components/datatable/data-table";
import { axiosCustom } from "@/app/api/axios";
import { useRouter } from "next/navigation";
import Loading from "@/app/(secure)/kelas/loading";
import { useAuth } from "@/app/components/utils/AuthContext";
import IngatkanTenant from "@/app/(secure)/kelas/[id]/sesi-kelas/[id_sesi]/review/[id_tugas]/IngatkanTenant";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import DeleteHasilPenilaian from "./DeleteHasilPenilaian";
import ViewHasilPenilaian from "./ViewHasilPenilaian";
import { FindDefaultRoute } from "@/app/components/utils/FindDefaultRoute";
import NotFound from "@/app/components/template/NotFound";
import DownloadExcel from "@/app/components/utils/DownloadExcel";

interface DataItem {
  id: string;
  id_tenant: string;
  image: string;
  fullname: string;
  course: string;
  tenant: string;
  status: string;
  send_email_url: string;
  last_nilai: string;
}

function page() {
  const { setBreadcrumbs } = useBreadcrumbContext();
  const getForCrumbs: any = FindDefaultRoute();
  useEffect(() => {
    if (getForCrumbs) setBreadcrumbs(getForCrumbs);
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  let getUser: any = null; // Inisialisasikan getUser di sini

  if (user !== null && user !== 401) {
    getUser = user; // Setel nilai getUser jika user ada
    if (getUser.role !== "Super Admin" && getUser.role !== "Manajemen")
      return (
        <NotFound
          statusCode={403}
          msg={"Access Denied"}
          statusDesc="Akses Ditolak. Anda tidak diizinkan mengakses halaman ini."
        />
      );
  }

  const router = useRouter();

  const columns: ReadonlyArray<Column<DataItem>> = [
    {
      Header: "Mentor",
      accessor: "fullname",
      Cell: ({ value, row }) => (
        <HStack
          onClick={() => handleShowHasil(row.values)}
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
      Header: "Kelas",
      accessor: "course",
      width: "350px",
      minWidth: 280,
      maxWidth: 350,
    },
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "ID T",
      accessor: "id_tenant",
    },
    {
      Header: "Dinilai Oleh :",
      accessor: "tenant",
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
      Header: "Status Penilaian",
      accessor: "status",
      Cell: ({ value, row }) =>
        value === "Sudah Dinilai" ? (
          <Stack>
            <Text>Sudah Dinilai :</Text>
            <Text>{row.values.last_nilai}</Text>
          </Stack>
        ) : (
          <Stack>
            <Text>Belum Dinilai :</Text>
            <IngatkanTenant Url={row.values.send_email_url} />
          </Stack>
        ),
    },
  ];

  const hidenCols = [
    "id",
    "image",
    "send_email_url",
    "last_nilai",
    "id_tenant",
  ];

  const filterOptions = [
    {
      key: "fullname",
      label: "Mentor",
    },
    {
      key: "tenant",
      label: "Tenant",
    },
    {
      key: "status",
      label: "Status",
      values: ["Sudah Dinilai", "Belum Dinilai"],
    },
  ];

  const [dataHasilNilai, setDataHasilNilai] = useState<DataItem[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  const handleShowHasil = (data: any) => {
    setOpenHasil({
      idTenant: data.id_tenant,
      idKuesioner: data.id,
      tenantName: data.tenant,
      tglKirim: data.last_nilai,
    });
    onOpen();
  };

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
            <DownloadExcel Url={`/export-tenant-nilai-mentor`} />
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
      <ViewHasilPenilaian
        idTenant={openHasil.idTenant}
        idKuesioner={openHasil.idKuesioner}
        tenantName={openHasil.tenantName}
        // tglKirim={openHasil.tglKirim}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Suspense>
  );
}

export default page;
