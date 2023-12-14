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
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import { FindDefaultRoute } from "@/app/components/utils/FindDefaultRoute";
import { axiosCustom } from "@/app/api/axios";
import { Column } from "react-table";
import DataTable from "@/app/components/datatable/data-table";
import { useRouter } from "next/navigation";
import { MdArrowBackIosNew } from "react-icons/md";
import { HiChevronRight } from "react-icons/hi";
import { GrMoreVertical } from "react-icons/gr";
import { BsUiRadios } from "react-icons/bs";

interface DataItem {
  id: string;
  title: string;
  pertanyaan_count: string;
  pertanyaan_aktif_count: string;
  pertanyaan_nonaktif_count: string;
  created_at: string;
}

import AddGroup from "./AddGroup";
import EditGroup from "./EditGroup";
import DeleteGroup from "./DeleteGroup";

function page() {
  const [dataGroup, setDataGroup] = useState<DataItem[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  let hidenCols: string[] = [
    "id",
    "pertanyaan_nonaktif_count",
    "pertanyaan_aktif_count",
  ];
  const filterOptions = [{ key: "title", label: "Judul Grup" }];

  const router = useRouter();

  const columns: ReadonlyArray<Column<DataItem>> = [
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
      width: "450px",
      minWidth: 260,
      maxWidth: 450,
    },
    {
      Header: "pertanyaan_aktif_count",
      accessor: "pertanyaan_aktif_count",
    },
    {
      Header: "pertanyaan_nonaktif_count",
      accessor: "pertanyaan_nonaktif_count",
    },
    {
      Header: "Pertanyaan",
      accessor: "pertanyaan_count",
      Cell: ({ value, row }) => (
        <Stack>
          <Text as="b">
            Total : <span style={{ fontWeight: "normal" }}>{value}</span>
          </Text>
          <Text as="b">
            Aktif :{" "}
            <span style={{ fontWeight: "normal" }}>
              {row.values["pertanyaan_aktif_count"]}
            </span>
          </Text>
          <Text as="b">
            Nonaktif :{" "}
            <span style={{ fontWeight: "normal" }}>
              {row.values["pertanyaan_nonaktif_count"]}
            </span>
          </Text>
        </Stack>
      ),
    },
    {
      Header: "Tgl Dibuat",
      accessor: "created_at",
    },
  ];
  const renderActions = (rowData: any) => {
    return (
      <div>
        <HStack>
          <Button
            bgColor="yellow.300"
            _hover={{
              bg: "yellow.200",
            }}
            color="gray.500"
            title="Kelola Pertanyaan untuk dibuat grup"
            onClick={() => router.push(`/kuesioner/grup/${rowData.id}`)}
            key="kelola"
            size={"sm"}
          >
            <BsUiRadios fontSize={"17px"} />
          </Button>
          <Popover placement="bottom-end">
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
                    size={"sm"}
                  >
                    <GrMoreVertical />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  w="fit-content"
                  _focus={{ boxShadow: "none" }}
                  display={isOpen ? "block" : "none"}
                >
                  <PopoverArrow />
                  <PopoverBody>
                    <Stack>
                      <EditGroup
                        formData={rowData}
                        onSubmit={() => getGroup()}
                      />
                      <DeleteGroup
                        dataDelete={rowData}
                        onSubmit={() => getGroup()}
                      />
                    </Stack>
                  </PopoverBody>
                </PopoverContent>
              </>
            )}
          </Popover>
        </HStack>
      </div>
    );
  };

  const getGroup = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(
        `/kuesioner-tahunan/pertanyaan-header`,
      );
      const timer = setTimeout(() => {
        setDataGroup(response.data.data);
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

  const { setBreadcrumbs } = useBreadcrumbContext();
  const getForCrumbs: any = FindDefaultRoute();
  useEffect(() => {
    if (getForCrumbs) setBreadcrumbs(getForCrumbs);
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <Suspense fallback={<Loading />}>
      <Stack spacing={{ base: 4, md: 6 }}>
        <Flex
          flexDirection={{ base: "column-reverse", md: "row" }} // Arah tata letak berdasarkan layar
          justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
          // align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
        >
          <Heading fontSize={"2xl"}>DAFTAR GRUP PERTANYAAN</Heading>
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
            <AddGroup onSubmit={() => getGroup()} />
          </HStack>
        </Flex>
        {dataGroup && dataGroup.length > 0 ? (
          <DataTable
            data={dataGroup}
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
              Daftar Grup Pertanyaan Kuesioner Kosong
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
