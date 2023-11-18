"use client";
import React, { useState, useEffect } from "react";
import {
  DownloadIcon,
  AddIcon,
  EditIcon,
  DeleteIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Stack,
  Image,
  Avatar,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Flex,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { MdAlarm, MdArrowBackIosNew, MdTask } from "react-icons/md/";
import { Column } from "react-table";
import DataTable from "@/app/components/datatable/data-table";
import Link from "next/link";
import { axiosCustom } from "@/app/api/axios";
import { useRouter } from "next/navigation";
import Loading from "@/app/(secure)/kelas/loading";
import ReviewMentor from "../review/reviewMentor";
import { useAuth } from "@/app/components/utils/AuthContext";

interface answer_sheet {
  answer_file_download_url: string | null;
  // answer_file_id: string | null;
  answer_file_view_url: string | null;
  answer_id: string | null;
  grade_status: string | null;
  graded_answer_feedback: string | null;
  graded_answer_grade: string | null;
  graded_answer_id: string | null;
  send_email_url: string | null;
  submitted_date: string | null;
  submitted_time: string | null;
  tenant_id: string;
  // tenant_image_id: string;
  tenant_image_url: string;
  tenant_name: string;
}

interface DataItem {
  assigment_id: string;
  course_ends: boolean;
  course_item_id: string;
  course_item_name: string;
  title: string;
  description: string;
  open_date: string;
  open_date_format: string;
  open_time_format: string;
  close_date: string;
  close_date_format: string;
  close_time_format: string;
  assigment_closed: boolean;
  answer_sheet: answer_sheet;
}

function page({ params }: { params: { id_tugas: string } }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  let getUser: any = null; // Inisialisasikan getUser di sini

  if (user !== null && user !== 401) {
    getUser = user; // Setel nilai getUser jika user ada
  }
  const columns: ReadonlyArray<Column<answer_sheet>> = [
    {
      Header: "Logo",
      accessor: "tenant_image_url",
      Cell: ({ value }) => <Avatar size={"sm"} src={value} />,
      width: "30px",
    },
    {
      Header: "Nama Tenant",
      accessor: "tenant_name",
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
      Header: "ID",
      accessor: "tenant_id",
    },
    {
      Header: "send_email_url",
      accessor: "send_email_url",
    },
    {
      Header: "Tanggal Dikirim",
      accessor: "submitted_date",
      Cell: ({ value, row }) =>
        value && (
          <Text>
            {value}, {row.values["submitted_time"]}
          </Text>
        ),
    },
    {
      Header: "Waktu Dikirim",
      accessor: "submitted_time",
    },
    {
      Header: "answer_file_download_url",
      accessor: "answer_file_download_url",
    },
    // {
    //   Header: "answer_file_id",
    //   accessor: "answer_file_id",
    // },
    {
      Header: "answer_file_view_url",
      accessor: "answer_file_view_url",
    },
    {
      Header: "answer_id",
      accessor: "answer_id",
    },
    {
      Header: "graded_answer_feedback",
      accessor: "graded_answer_feedback",
    },
    {
      Header: "graded_answer_grade",
      accessor: "graded_answer_grade",
    },
    {
      Header: "graded_answer_id",
      accessor: "graded_answer_id",
    },
    // {
    //   Header: "tenant_image_id",
    //   accessor: "tenant_image_id",
    // },
    {
      Header: "Keterangan",
      accessor: "grade_status",
      Cell: ({ value, row }) =>
        value === "Ingatkan Tenant" ? (
          <Link href={row.values.send_email_url} target="_blank">
            <Button
              leftIcon={<MdAlarm />}
              colorScheme="gray"
              variant="outline"
              aria-label="btn-remain"
              fontWeight={"Thin"}
              size={"md"}
            >
              {value}
            </Button>
          </Link>
        ) : (
          <div>{value}</div>
        ),
    },
  ];

  const hidenCols = [
    "action",
    "tenant_id",
    "send_email_url",
    "assigment_id",
    "submitted_time",
    "answer_file_download_url",
    "answer_file_view_url",
    "answer_id",
    "graded_answer_feedback",
    "graded_answer_grade",
    "graded_answer_id",
  ];

  const filterOptions = [
    {
      key: "grade_status",
      label: "Keterangan",
      values: ["Belum Dinilai", "Sudah Dinilai", "Ingatkan Tenant"],
    },
  ];

  const [dataReview, setDataReview] = useState<DataItem | null>(null);
  const [dataReviewShow, setDataReviewShow] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter;

  const getDataReview = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(
        `/assigment/${params.id_tugas}/review`,
      );
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

  const itemData: answer_sheet[] =
    dataReview && Array.isArray(dataReview.answer_sheet)
      ? dataReview.answer_sheet.map((data) => data)
      : [];

  // console.log(dataReview ? dataReview.answer_sheet.map((data) => data) : []);

  // console.log(itemData);
  const handleReviewShow = (data: any) => {
    setDataReviewShow(data);
    onOpen();
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Stack spacing={{ base: 4, md: 6 }}>
      <Flex
        flexDirection={{ base: "column-reverse", md: "row" }} // Arah tata letak berdasarkan layar
        justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
        // align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
      >
        <Text as="b" fontWeight={"bold"} fontSize={["17px", "xl", "2xl"]}>
          {dataReview?.title}
        </Text>
        <Button
          leftIcon={<MdArrowBackIosNew />}
          colorScheme="blue"
          variant="outline"
          aria-label="btn-email"
          size={"sm"}
          // onClick={() => router.push(`/kelas/${idKelas}/progress/${d.id}`)}
        >
          Kembali
        </Button>
      </Flex>
      {dataReview?.description && (
        <Box w="full">
          <Text
            textAlign="justify"
            dangerouslySetInnerHTML={{ __html: dataReview?.description }}
          />
        </Box>
      )}
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
        namaTugas={dataReview && dataReview.title}
        roleAccess={getUser.role}
      />
    </Stack>
  );
}

export default page;
