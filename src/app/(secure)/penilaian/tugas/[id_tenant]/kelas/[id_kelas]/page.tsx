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
import ModalNotif from "@/app/components/modal/modal-notif";
import IngatkanTenant from "@/app/(secure)/kelas/[id]/sesi-kelas/[id_sesi]/review/[id_tugas]/IngatkanTenant";

interface DataItem {
  //   course_item_id: string;
  assigment_id: string;
  title: string;
  //   assigment_closed: boolean;
  //   assigment_close_date: string;
  //   assigment_close_time: string;
  answer_id: string | null;
  //   answer_file_id: string | null;
  send_email_url: string | null;
  answer_file_view_url: string | null;
  answer_file_download_url: string | null;
  submitted_date: string | null;
  submitted_time: string | null;
  grade_status: string;
  graded_answer_id: string | null;
  graded_answer_grade: string | null;
  graded_answer_feedback: string | null;
  graded_answer_review_date: string | null;
  graded_answer_review_time: string | null;
}

interface Data {
  course_name: string;
  tenant_name: string;
  course_ends: boolean;
  grades: DataItem;
}

function page({ params }: { params: { id_tenant: string; id_kelas: string } }) {
  const idKelas: string = params.id_kelas;
  const idTenant: string = params.id_tenant;
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

  const columns: ReadonlyArray<Column<DataItem>> = [
    {
      Header: "Jawaban Tugas",
      accessor: "title",
      Cell: ({ value, row }) => (
        <HStack
          onClick={() => handleReviewShow(row.values)}
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
    },
    {
      Header: "Status",
      accessor: "grade_status",
      Cell: ({ value, row }) =>
        value === "Ingatkan Tenant" ? (
          <IngatkanTenant Url={row.values.send_email_url} />
        ) : (
          // </Link>
          <div>{value}</div>
        ),
    },
    {
      Header: "Nilai",
      accessor: "graded_answer_grade",
    },
    {
      Header: "ID",
      accessor: "answer_id",
    },
    {
      Header: "assigment_id",
      accessor: "assigment_id",
    },
    {
      Header: "send_email_url",
      accessor: "send_email_url",
    },
    {
      Header: "Tanggal Penilaian",
      accessor: "graded_answer_review_date",
      Cell: ({ value, row }) =>
        value && (
          <Text>
            {value}, {row.values["graded_answer_review_time"]}
          </Text>
        ),
    },
    {
      Header: "graded_answer_review_time",
      accessor: "graded_answer_review_time",
    },
    {
      Header: "Tanggal Dikirim",
      accessor: "submitted_date",
    },
    {
      Header: "Waktu Dikirim",
      accessor: "submitted_time",
    },
    {
      Header: "answer_file_download_url",
      accessor: "answer_file_download_url",
    },
    {
      Header: "answer_file_view_url",
      accessor: "answer_file_view_url",
    },
    {
      Header: "graded_answer_feedback",
      accessor: "graded_answer_feedback",
    },
    {
      Header: "graded_answer_id",
      accessor: "graded_answer_id",
    },
  ];

  const hidenCols = [
    "action",
    "assigment_id",
    "submitted_time",
    "answer_file_download_url",
    "answer_file_view_url",
    "answer_id",
    "send_email_url",
    "graded_answer_feedback",
    "graded_answer_id",
    "submitted_date",
    "graded_answer_review_time",
  ];

  const filterOptions = [
    {
      key: "grade_status",
      label: "Status",
      values: [
        "Belum Dinilai",
        "Sudah Dinilai",
        "Ingatkan Tenant",
        "Tidak Mengerjakan",
      ],
    },
    {
      key: "title",
      label: "Jawaban Tugas",
    },
  ];

  const [dataReview, setDataReview] = useState<Data | null>(null);
  const [dataReviewShow, setDataReviewShow] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter;
  const getDataReview = async () => {
    let Url: string = "";
    try {
      switch (getUser?.role) {
        case "Super Admin":
        case "Manajemen":
          Url = `/grades-assigment/tenant-course/${idTenant}/course/${idKelas}`;
          break;
        case "Mentor":
          Url = `/grades-assigment/tenant-course-mentor/${idTenant}/course/${idKelas}`;
          break;
        case "Tenant":
          Url = `/grades-assigment/tenant-course/${idKelas}`;
          break;
      }
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(Url);
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

  const [isLoadingIngatkan, setLoadingIngatkan] = useState(false);

  const sendIngatkanTenant = async (Url: string) => {
    try {
      setLoadingIngatkan(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(Url);
      const timer = setTimeout(() => {
        handleShowMessage(response.data?.message, false);
        setLoadingIngatkan(false);
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal mengingatkan Tenant :", error);
      setLoadingIngatkan(false);
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

  // console.log(itemData);
  const [titleTugas, setTitleTugas] = useState("");
  const handleReviewShow = (data: any) => {
    setDataReviewShow(data);
    setTitleTugas(data?.title);
    if (getUser?.role === "Tenant") {
      onOpenTenant();
    } else onOpen();
  };

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
          <VStack spacing={0} align="flex-start" mr={2}>
            <Text as="b" fontWeight={"bold"} fontSize={["17px", "xl", "2xl"]}>
              {dataReview?.course_name.toUpperCase()}
            </Text>
            <Text>
              Tenant :{" "}
              <span style={{ color: "green" }}>{dataReview.tenant_name}</span>
            </Text>
          </VStack>

          <Button
            leftIcon={<MdArrowBackIosNew />}
            colorScheme="blue"
            variant="outline"
            aria-label="btn-email"
            size={"sm"}
            mb={2}
            onClick={() =>
              router.push(
                getUser.role === "Tenant"
                  ? `/penilaian/`
                  : `/penilaian/tugas/${idTenant}`,
              )
            }
          >
            Kembali
          </Button>
        </Flex>
        <DataTable
          data={itemData}
          column={columns}
          hiddenColumns={hidenCols}
          filterOptions={filterOptions}
        />
        <ReviewMentor
          isOpen={isOpen}
          onClose={() => onClose()}
          onSubmit={() => getDataReview()}
          dataReview={dataReviewShow}
          namaTugas={titleTugas}
          namaTenant={dataReview?.tenant_name}
          roleAccess={getUser.role}
        />
        <ReviewTenant
          rowData={dataReviewShow}
          isOpen={isOpenTenant}
          onClose={onCloseTenant}
        />
        <ModalNotif
          isOpen={stateNotif.isNotifShow}
          onClose={() =>
            setStateNotif({
              msg: "",
              isError: false,
              isNotifShow: false,
            })
          }
          message={stateNotif.msg}
          isError={stateNotif.isError}
          onSubmit={() => getDataReview()}
        />
      </Stack>
    </Suspense>
  ) : (
    <NotFound
      statusCode={404}
      msg={"Not Found"}
      statusDesc="Terjadi kesalahan. Periksa kembali URL Halaman yang anda kunjungi atau kembali ke halaman Nilai Tugas Tenant."
      backToHome={
        getUser.role === "Tenant"
          ? `/penilaian/`
          : `/penilaian/tugas/${idTenant}`
      }
    />
  );
}

export default page;