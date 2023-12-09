"use client";
import { DropResult } from "react-beautiful-dnd";
import React, { useEffect, useState, Suspense } from "react";
import { Column } from "react-table";
import DndTable from "@/app/components/datatable/DndTable";
import {
  Stack,
  Flex,
  Heading,
  HStack,
  Button,
  Center,
  Text,
  Icon,
  Box,
  Image,
  Checkbox,
} from "@chakra-ui/react";
import Loading from "../../loading";
import { MdArrowBackIosNew } from "react-icons/md/";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import { FindDefaultRoute } from "@/app/components/utils/FindDefaultRoute";
import { useRouter } from "next/navigation";
import { HiFolderOpen } from "react-icons/hi";
import { ViewIcon } from "@chakra-ui/icons";
import DeleteDaftar from "./DeleteDaftar";
import { axiosCustom } from "@/app/api/axios";
import AddPertanyaanToGroup from "./AddPertanyaanToGroup";
import NotFound from "@/app/components/template/NotFound";
import ModalNotif from "@/app/components/modal/modal-notif";
import PreviewGroup from "./PreviewGroup";

interface PertanyaanProps {
  id: string;
  pertanyaan: string;
  type: string;
  is_required: boolean;
  note: string;
  is_active: boolean;
  opsi: string;
}

interface GroupProps {
  id: string;
  title: string;
}

function page({ params }: { params: { id_group: string } }) {
  const { setBreadcrumbs } = useBreadcrumbContext();
  const getForCrumbs: any = FindDefaultRoute();
  //   useEffect(() => {
  //     if (getForCrumbs) setBreadcrumbs(getForCrumbs);
  //   }, []);
  const paramsId = params.id_group;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingDragging, setLoadingDragging] = useState(false);

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

  const [data, setData] = useState<GroupProps | null>(null);
  const [dataPertanyaan, setDataPertanyaan] = useState<PertanyaanProps[] | []>(
    [],
  );
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
    const newData = Array.from(dataPertanyaan);
    const [removed] = newData.splice(source.index, 1);
    newData.splice(destination.index, 0, removed);
    const updatedData = newData.map((item, index) => {
      return { ...item, no_urut: index + 1 };
    });

    try {
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom
        .post(`/grup-pertanyaan/reorder-row`, {
          updatedRowData: updatedData,
        })
        .then(() => {
          setDataPertanyaan([...newData]);
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

  const columns: ReadonlyArray<Column<PertanyaanProps>> = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Judul Pertanyaan",
      accessor: "pertanyaan",
    },
    {
      Header: "Model",
      accessor: "type",
      Cell: ({ value }) =>
        value === "checkbox" ? (
          <Text>Checkbox</Text>
        ) : value === "radio" ? (
          <Text>Opsi Pilihan</Text>
        ) : value === "short_text" ? (
          <Text>Teks Pendek</Text>
        ) : (
          <Text>Teks Panjang</Text>
        ),
    },
    {
      Header: "Status",
      accessor: "is_active",
      Cell: ({ value }) =>
        value === true ? <Text>Aktif</Text> : <Text>Non Aktif</Text>,
    },
    {
      Header: "Wajib Isi",
      accessor: "is_required",
      Cell: ({ value }) =>
        value === true ? (
          <Center>
            <Checkbox defaultChecked isDisabled size="lg" />
          </Center>
        ) : null,
    },
    {
      Header: "Value Jawaban",
      accessor: "opsi",
      Cell: ({ value }) =>
        value ? (
          <Text
            textOverflow={"ellipsis"}
            overflow={"hidden"}
            flex="1"
            noOfLines={2}
            whiteSpace="normal"
          >
            {value}
          </Text>
        ) : (
          "-"
        ),
      width: "260px",
      minWidth: 200,
      maxWidth: 260,
    },
  ];

  const getGroup = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(
        `/kuesioner-tahunan/grup-pertanyaan/${paramsId}`,
      );
      const timer = setTimeout(() => {
        setData(response.data.data);
        setDataPertanyaan(response.data.data.pertanyaan);
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGroup();
  }, []);

  const renderActions = (rowData: any) => {
    return (
      <div>
        <HStack>
          <DeleteDaftar dataDelete={rowData} onSubmit={() => getGroup()} />
        </HStack>
      </div>
    );
  };

  return isLoading ? (
    <Loading />
  ) : data ? (
    <Suspense fallback={<Loading />}>
      <Stack spacing={{ base: 2, md: 4 }}>
        <Flex
          flexDirection={{ base: "column-reverse", md: "row" }} // Arah tata letak berdasarkan layar
          justify="space-between"
        >
          <Heading fontSize={"2xl"}>DAFTAR GRUP PERTANYAAN</Heading>
          <HStack align="start">
            <Button
              leftIcon={<MdArrowBackIosNew />}
              colorScheme="blue"
              variant="outline"
              aria-label="btn-email"
              title={`Kembali ke Halaman Sebelumnya`}
              onClick={() => router.push(`/kuesioner/grup`)}
              size={"sm"}
            >
              Kembali
            </Button>
          </HStack>
        </Flex>
        <Stack spacing={{ base: 2, md: 4 }}>
          <Flex
            flexDirection={{ base: "column", md: "row" }} // Arah tata letak berdasarkan layar
            justify="space-between"
            mb={{ base: 2, md: 0 }}
          >
            <HStack color={"blue.500"} mb={{ base: 2, md: 0 }}>
              {/* <FaRegFileAlt fontSize="18px" fontWeight={"bold"} /> */}
              <Icon
                as={HiFolderOpen}
                fontSize={["18px", "20px"]}
                fontWeight={"bold"}
              />
              <Text fontWeight={"semibold"} fontSize={["md", "lg"]} mr={2}>
                {data.title}
              </Text>
            </HStack>
            <HStack>
              <AddPertanyaanToGroup
                idGroup={paramsId}
                onSubmit={() => getGroup()}
              />
              <PreviewGroup idGroup={paramsId} />
            </HStack>
          </Flex>

          <Box
            p={{ base: 3, md: 6 }}
            rounded={["md", "lg"]}
            borderWidth={"4px"}
            borderColor={"blue.500"}
            w="full"
          >
            {dataPertanyaan.length > 0 ? (
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                spacing={3}
                w="full"
              >
                <Text fontWeight={"bold"} fontSize={["md", "lg"]}>
                  DAFTAR PERTANYAAN :
                </Text>
                <DndTable
                  columns={columns}
                  data={dataPertanyaan}
                  droppableId={"KelolaGroupDnd"}
                  onDragEnd={(result) => handleDragEnd(result)}
                  hiddenColumns={["id"]}
                  filterOptions={[{ key: "title", label: "Judul" }]}
                  isLoading={loadingDragging}
                >
                  {(rowData: any) => renderActions(rowData)}
                </DndTable>
              </Stack>
            ) : (
              <Stack
                justifyContent={"center"}
                spacing={0}
                alignItems={"center"}
              >
                <Image
                  src="/img/kuesioner-notfound.png"
                  h={{ base: "200px", sm: "250px", md: "350px" }}
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
                  Daftar Pertanyaan dalam Grup Kuesioner Kosong
                </Text>
                <Text
                  fontSize={{ base: "15.5px", md: "16.5px" }}
                  textAlign={"center"}
                >
                  Mungkin belum dibuat atau sudah dihapus
                </Text>
              </Stack>
            )}
          </Box>
        </Stack>
      </Stack>
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
        // onSubmit={() => onSubmit()}
      />
    </Suspense>
  ) : (
    <NotFound
      statusCode={404}
      msg="Not Found"
      statusDesc="Halaman tidak ditemukan. Periksa kembali URL Halaman yang anda kunjungi atau kembali ke halaman sebelum ini."
      backToHome="/kuesioner/grup"
    />
  );
}

export default page;
