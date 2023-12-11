"use client";
import React, { useState, useEffect, Suspense } from "react";
import {
  Button,
  HStack,
  Stack,
  Flex,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { MdArrowBackIosNew } from "react-icons/md/";
import { Column } from "react-table";
import DataTable from "@/app/components/datatable/data-table";
import { axiosCustom } from "@/app/api/axios";
import { useRouter } from "next/navigation";
import Loading from "@/app/(secure)/kelas/loading";
import { useAuth } from "@/app/components/utils/AuthContext";
import NotFound from "@/app/components/template/NotFound";
import AddGraded from "./addGraded";
import UpdateGraded from "./updateGraded";
import DeleteGraded from "./deleteGraded";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";

interface DataItem {
  id: string;
  aspek_penilaian: string;
  grade: string;
  feedback: string;
  grades_date: string;
  grades_time: string;
}

interface Data {
  tenant_name: string;
  mentor_fullname: string;
  grades: DataItem;
}

function page({ params }: { params: { id_graded: string } }) {
  const idGraded: string = params.id_graded;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useAuth();
  let getUser: any = null; // Inisialisasikan getUser di sini

  if (user !== null && user !== 401) {
    getUser = user; // Setel nilai getUser jika user ada
  }

  const router = useRouter();
  const columns: ReadonlyArray<Column<DataItem>> = [
    {
      Header: "Tanggal Penilaian",
      accessor: "grades_date",
      Cell: ({ value, row }) =>
        value && (
          <Text>
            {value}, {row.values["grades_time"]}
          </Text>
        ),
    },
    {
      Header: "grades_time",
      accessor: "grades_time",
    },
    {
      Header: "Aspek Penilaian",
      accessor: "aspek_penilaian",
      Cell: ({ value }) => (
        <Text
          noOfLines={2}
          textOverflow={"ellipsis"}
          overflow={"hidden"}
          flex="1"
          whiteSpace="normal"
        >
          {value}
        </Text>
      ),
    },
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Nilai",
      accessor: "grade",
    },
    {
      Header: "Komentar",
      accessor: "feedback",
      width: "450px",
      minWidth: 260,
      maxWidth: 450,
      // dibikin kayak gni biar auto wrap ketika textnya kepanjangan shg tdk merusak col width
      Cell: ({ value }) => (
        <Text
          noOfLines={2}
          textOverflow={"ellipsis"}
          overflow={"hidden"}
          flex="1"
          whiteSpace="normal"
        >
          {value}
        </Text>
      ),
    },
  ];

  const hidenCols = ["id", "grades_time"];

  const filterOptions = [
    {
      key: "grade",
      label: "Nilai",
      values: ["A", "B", "C", "D", "E"],
    },
    {
      key: "aspek_penilaian",
      label: "Aspek Nilai",
    },
  ];

  const renderActions = (rowData: any) => {
    return (
      <HStack spacing={2}>
        <UpdateGraded
          rowData={rowData}
          roleAccess={getUser.role}
          onSubmit={() => getDataReview()}
        />
        {getUser.role === "Mentor" && (
          <DeleteGraded dataDelete={rowData} onSubmit={() => getDataReview()} />
        )}
      </HStack>
    );
  };

  const [dataReview, setDataReview] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setBreadcrumbs, breadcrumbs } = useBreadcrumbContext();
  // const router = useRouter;
  const getDataReview = async () => {
    let Url: string = "";
    try {
      switch (getUser?.role) {
        case "Super Admin":
        case "Manajemen":
          Url = `/mentor-nilai-tenant/${idGraded}`;
          break;
        case "Mentor":
          Url = `/general-grades-tenant/${idGraded}`;
          break;
      }
      setIsLoading(true);
      const response = await axiosCustom.get(Url);
      // Membuat nilai baru
      const newValue = {
        name: response.data.data?.tenant_name,
        href: `/penilaian/tenant/${idGraded}`,
      };
      // Cek apakah nilai baru sudah ada dalam breadcrumbs
      const alreadyExists = breadcrumbs.some(
        (breadcrumb) => JSON.stringify(breadcrumb) === JSON.stringify(newValue),
      );
      // Jika belum ada, tambahkan ke breadcrumbs
      if (!alreadyExists) {
        setBreadcrumbs([...breadcrumbs, newValue]);
      } else {
        // Jika sudah ada, buat array baru tanpa nilai breadcrumb terakhir
        // ini diperlukan jika berpindah dari sub-route yg ada didalam route ini
        // const newBreadcrumbs = breadcrumbs.slice(0, breadcrumbs.length - 1);
        // setBreadcrumbs(newBreadcrumbs);
      }
      
      const timer = setTimeout(() => {
        // setIdTenant(id);
        setDataReview(response.data.data); // Set isLoading to false to stop the spinner
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // if (need_updated === true)
    getDataReview();
  }, []);

  const itemData: DataItem[] =
    dataReview && Array.isArray(dataReview.grades)
      ? dataReview.grades.map((data) => data)
      : [];

  return isLoading ? (
    <Loading />
  ) : dataReview ? (
    <Suspense fallback={<Loading />}>
      <Stack spacing={{ base: 4, md: 6 }}>
        <Flex
          flexDirection={{ base: "column-reverse", md: "row" }} // Arah tata letak berdasarkan layar
          justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
          align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
        >
          {getUser.role === "Mentor" ? (
            <VStack spacing={0} align="flex-start" mr={2}>
              <Text as="b" fontWeight={"bold"} fontSize={["17px", "xl", "2xl"]}>
                NILAI TENANT
              </Text>
              <Text>
                Tenant :{" "}
                <span style={{ color: "green" }}>{dataReview.tenant_name}</span>
              </Text>
            </VStack>
          ) : (
            <VStack spacing={0} align="flex-start" mr={2}>
              <Text as="b" fontWeight={"bold"} fontSize={["17px", "xl", "2xl"]}>
                {dataReview.tenant_name}
              </Text>
              <Text>
                Mentor :{" "}
                <span style={{ color: "green" }}>
                  {dataReview.mentor_fullname}
                </span>
              </Text>
            </VStack>
          )}
          <HStack spacing={2} mb={{ base: 2, md: 0 }}>
            <Button
              leftIcon={<MdArrowBackIosNew />}
              colorScheme="blue"
              variant="outline"
              aria-label="btn-email"
              size={"sm"}
              onClick={() => router.push("/penilaian/tenant")}
              title={"Kembali ke halaman Penilaian Tenant"}
            >
              Kembali
            </Button>
            {getUser.role === "Mentor" && (
              <AddGraded idGraded={idGraded} onSubmit={() => getDataReview()} />
            )}
          </HStack>
        </Flex>
        <DataTable
          data={itemData}
          column={columns}
          hiddenColumns={hidenCols}
          filterOptions={filterOptions}
        >
          {(rowData: any) => renderActions(rowData)}
        </DataTable>
      </Stack>
    </Suspense>
  ) : (
    <NotFound
      statusCode={404}
      msg={"Not Found"}
      statusDesc="Terjadi kesalahan. Periksa kembali URL Halaman yang anda kunjungi atau kembali ke halaman Nilai Tugas Tenant."
      backToHome={"/penilaian/tenant"}
    />
  );
}

export default page;
