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
import { HiChevronRight } from "react-icons/hi";
import { GrMoreVertical } from "react-icons/gr";
import { BsUiRadios } from "react-icons/bs";
interface DataItem {
  id: string;
  title: string;
  type: string;
}
function page() {
  const { setBreadcrumbs } = useBreadcrumbContext();
  const getForCrumbs: any = FindDefaultRoute();
  const [daftarPertanyaan, setDataPertanyaan] = useState<any[] | []>();
  const [isLoading, setIsLoading] = useState(true);

  let hidenCols: string[] = ["id"];
  const filterOptions = [{ key: "title", label: "Judul Kuesioner" }];

  const router = useRouter();

  const columns: ReadonlyArray<Column<DataItem>> = [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "Model",
      accessor: "type",
    },
    {
      Header: "Judul Kuesioner",
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
      // maxWidth: 550,
    },
  ];
  const renderActions = (rowData: any) => {
    return (
      <HStack alignItems={"end"}>
        {rowData?.type !== "short_text" && rowData?.type !== "long_text" && (
          <Button
            bgColor="yellow.500"
            _hover={{
              bg: "yellow.400",
            }}
            color="white"
            title="Buat Value Pertanyaan"
            // onClick={() => handleDetail(rowData)}
            key="kelola"
            size={"sm"}
          >
            <BsUiRadios fontSize={"17px"} />
          </Button>
        )}

        <Popover placement="bottom">
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
          <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
            <PopoverArrow />
            <PopoverBody>
              <Stack>
                <EditPertanyaan
                  type={rowData.type}
                  formdata={rowData}
                  onSubmit={() => getDaftar()}
                />
                <DeletePertanyaan
                  dataDelete={rowData}
                  onSubmit={() => getDaftar()}
                />
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    );
  };

  const getDaftar = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      // const response = await axiosCustom.get(`/course/all`);
      const timer = setTimeout(() => {
        setDataPertanyaan([
          { id: "1234", title: "drtfhsjkl", type: "checkbox" },
          { id: "1235", title: "Lrem 67 tye", type: "short_text" },
        ]);
        setIsLoading(false);
      }, 3000);
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
            <BtnAddPertanyaan />
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
