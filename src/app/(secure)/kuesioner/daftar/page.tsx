"use client";
import React, { useState, useEffect, Suspense } from "react";
import {
  Stack,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Center,
  Checkbox,
  Portal,
} from "@chakra-ui/react";
import Loading from "../loading";
import BtnAddPertanyaan from "./BtnAddPertanyaan";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import { FindDefaultRoute } from "@/app/components/utils/FindDefaultRoute";
import { axiosCustom } from "@/app/api/axios";
import { Column } from "react-table";
import EditPertanyaan from "./EditPertanyaan";
import DeletePertanyaan from "./DeletePertanyaan";
import DataTable from "@/app/components/datatable/data-table";
import { useRouter } from "next/navigation";
import { MdArrowBackIosNew } from "react-icons/md";
import { GrMoreVertical } from "react-icons/gr";
import { BsUiRadios } from "react-icons/bs";
import OnOffPertanyaan from "./OnOffPertanyaan";

interface DataItem {
  id: string;
  pertanyaan: string;
  type: string;
  is_required: boolean;
  note: string | null;
  is_active: boolean;
  opsi: string | null;
}

function page() {
  const { setBreadcrumbs } = useBreadcrumbContext();
  const getForCrumbs: any = FindDefaultRoute();
  const [daftarPertanyaan, setDataPertanyaan] = useState<any[] | []>();
  const [isLoading, setIsLoading] = useState(true);

  let hidenCols: string[] = ["id"];
  const filterOptions = [
    { key: "pertanyaan", label: "Judul Pertanyaan" },
    {
      key: "is_active",
      label: "Status",
      values: ["Aktif", "Nonaktif"],
    },
    {
      key: "type",
      label: "Model",
      values: ["Opsi Pilihan", "Checkbox", "Teks Pendek", "Teks Panjang"],
    },
    {
      key: "is_required",
      label: "Wajib Isi",
      type: "val_check",
    },
  ];

  const router = useRouter();

  const columns: ReadonlyArray<Column<DataItem>> = [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "Judul Pertanyaan",
      accessor: "pertanyaan",
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
      width: "450px",
      minWidth: 260,
      maxWidth: 550,
    },
    {
      Header: "Model",
      accessor: "type",
      filter: (rows, id, filterValues) => {
        if (filterValues === "Opsi Pilihan")
          return rows.filter((row) => row.values["type"] === "radio");
        else if (filterValues === "Checkbox")
          return rows.filter((row) => row.values["type"] === "checkbox");
        else if (filterValues === "Teks Pendek")
          return rows.filter((row) => row.values["type"] === "short_text");
        else if (filterValues === "Teks Panjang")
          return rows.filter((row) => row.values["type"] === "long_text");
        else return rows;
      },
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
      filter: (rows, id, filterValues) => {
        if (filterValues === "Aktif")
          return rows.filter((row) => row.values["is_active"] === true);
        else if (filterValues === "Nonaktif")
          return rows.filter((row) => row.values["is_active"] === false);
        else return rows;
      },
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
      Header: "Catatan",
      accessor: "note",
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
      width: "300px",
      minWidth: 260,
      maxWidth: 300,
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
  const renderActions = (rowData: any) => {
    return (
      <HStack>
        {rowData?.type !== "short_text" && rowData?.type !== "long_text" && (
          <Button
            bgColor="yellow.300"
            _hover={{
              bg: "yellow.200",
            }}
            color="gray.500"
            title="Buat Value Pertanyaan"
            onClick={() => router.push(`/kuesioner/daftar/${rowData.id}`)}
            key="kelola"
            size={"sm"}
          >
            <BsUiRadios fontSize={"17px"} />
          </Button>
        )}

        <Popover closeOnBlur={false} isLazy>
          {({ isOpen }) => (
            <>
              <PopoverTrigger>
                <Button
                  bgColor="teal.400"
                  _hover={{
                    bg: "teal.300",
                  }}
                  // colorScheme="aqua"
                  title="More ..."
                  color="white"
                  // onClick={() => handleDetail(rowData)}
                  key="more"
                  size={{ base: "xs", sm: "sm" }}
                >
                  <GrMoreVertical />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                w="fit-content"
                _focus={{ boxShadow: "none" }}
                display={isOpen ? "block" : "none"}
                overflowX={"auto"}
                rootProps={{ style: { left: 0 } }}
              >
                <PopoverArrow />
                <PopoverBody>
                  <Stack>
                    <EditPertanyaan
                      type={rowData.type}
                      formdata={rowData}
                      onSubmit={() => getDaftar()}
                    />
                    <OnOffPertanyaan
                      onoff={rowData.is_active}
                      onSubmit={() => getDaftar()}
                      dataPertanyaan={rowData}
                    />
                    <DeletePertanyaan
                      dataDelete={rowData}
                      onSubmit={() => getDaftar()}
                    />
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </>
          )}
        </Popover>
      </HStack>
    );
  };

  const getDaftar = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(`/kuesioner-tahunan/pertanyaan`);
      const timer = setTimeout(() => {
        setDataPertanyaan(response.data.data);
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDaftar();
  }, []);

  useEffect(() => {
    if (getForCrumbs) setBreadcrumbs(getForCrumbs);
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <Suspense fallback={<Loading />}>
      <Stack spacing={{ base: 2, md: 4 }}>
        <Flex
          flexDirection={{ base: "column-reverse", md: "row" }} // Arah tata letak berdasarkan layar
          justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
          // align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
        >
          <Heading fontSize={"2xl"}>DAFTAR PERTANYAAN</Heading>
          <HStack align="start" mb={{ base: 2, md: 0 }}>
            <Button
              leftIcon={<MdArrowBackIosNew />}
              colorScheme="blue"
              variant="outline"
              aria-label="btn-email"
              title={`Kembali ke Halaman Sebelumnya`}
              onClick={() => router.push(`/kuesioner`)}
              size={"sm"}
            >
              Kembali
            </Button>
            <BtnAddPertanyaan onSubmit={() => getDaftar()} />
          </HStack>
        </Flex>
        {daftarPertanyaan && daftarPertanyaan?.length > 0 ? (
          <DataTable
            data={daftarPertanyaan}
            column={columns}
            hiddenColumns={hidenCols}
            filterOptions={filterOptions}
          >
            {(rowData: any) => renderActions(rowData)}
          </DataTable>
        ) : (
          <Stack justifyContent={"center"} spacing={0} alignItems={"center"}>
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
              Daftar Pertanyaan Kuesioner Kosong
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

export default page;
