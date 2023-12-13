"use client";
import React, { useState, useEffect, Suspense } from "react";
import {
  Stack,
  Flex,
  Heading,
  HStack,
  Button,
  VStack,
  Text,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Box,
} from "@chakra-ui/react";
import Loading from "../../loading";
import { MdArrowBackIosNew } from "react-icons/md/";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import { notFound, useRouter } from "next/navigation";
import { Column } from "react-table";
import { DropResult } from "react-beautiful-dnd";
import DndTable from "@/app/components/datatable/DndTable";
import EditValueJawaban from "./EditValueJawaban";
import DeleteValueJawaban from "./DeleteValueJawaban";
import AddValueJawaban from "./AddValueJawaban";
import { axiosCustom } from "@/app/api/axios";
import NotFound from "@/app/components/template/NotFound";
import ModelType from "../ModelType";
import OnOffValueJawaban from "./OnOffValueJawaban";
import { GrMoreVertical } from "react-icons/gr";

interface OpsiProps {
  id_opsi: string;
  value: string;
  is_active: boolean;
}

interface Cards {
  id_pertanyaan: string;
  pertanyaan: string;
  type: string;
  is_required: boolean;
  note: string;
  is_active: boolean;
  opsi: OpsiProps;
}

function page({ params }: { params: { id_pertanyaan: string } }) {
  const getParamsId = params.id_pertanyaan;
  if ((getParamsId && getParamsId.length === 0) || !getParamsId) {
    return notFound();
  }

  const { setBreadcrumbs, breadcrumbs } = useBreadcrumbContext();
  useEffect(() => {
    setBreadcrumbs([
      ...breadcrumbs,
      {
        name: "Value Jawaban",
        href: `/kuesioner/daftar/daftarpertanyaan/${getParamsId}`,
      },
    ]);
  }, []);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingDragging, setLoadingDragging] = useState(false);

  const [data, setData] = useState<Cards | null>(null);
  const [dataOpsi, setDataOpsi] = useState<OpsiProps[] | []>([]);
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
    const newData: OpsiProps[] =
      data && Array.isArray(data.opsi) ? data.opsi : [];
    const [removed] = newData.splice(source.index, 1);
    newData.splice(destination.index, 0, removed);
    setDataOpsi([...newData]);
    const updatedData = newData.map((item, index) => {
      return { ...item, no_urut: index + 1 };
    });
    // console.log("data : ", data);
    // console.log("updatedData : ", updatedData);
    const timeoutId = setTimeout(() => {
      setLoadingDragging(false);
    }, 1000);

    // Membersihkan timeout jika komponen dilepas
    return () => clearTimeout(timeoutId);
  };

  const columns: ReadonlyArray<Column<OpsiProps>> = [
    {
      Header: "ID",
      accessor: "id_opsi",
    },
    {
      Header: "Value",
      accessor: "value",
    },
    {
      Header: "Status",
      accessor: "is_active",
      Cell: ({ value }) =>
        value === true ? <Text>Aktif</Text> : <Text>Non Aktif</Text>,
    },
  ];

  const getValueJ = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(
        `/kuesioner-tahunan/pertanyaan-opsi/${getParamsId}`,
      );
      const timer = setTimeout(() => {
        setData(response.data.data);
        setDataOpsi(response.data.data.opsi);
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getValueJ();
  }, []);

  const renderActions = (rowData: any) => {
    return (
      <div>
        <HStack>
          <EditValueJawaban formData={rowData} onSubmit={() => getValueJ()} />
          <Popover placement="bottom">
            <PopoverTrigger>
              <Button
                bgColor="teal.300"
                _hover={{
                  bg: "teal.200",
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
            <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
              <PopoverArrow />
              <PopoverBody>
                <Stack>
                  <OnOffValueJawaban
                    onoff={rowData.is_active}
                    dataValue={rowData}
                    onSubmit={() => getValueJ()}
                  />
                  <DeleteValueJawaban
                    dataDelete={rowData}
                    onSubmit={() => getValueJ()}
                  />
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>
      </div>
    );
  };

  return isLoading ? (
    <Loading />
  ) : data ? (
    <Suspense fallback={<Loading />}>
      <Stack spacing={{ base: 4, md: 6 }}>
        <Flex
          flexDirection={{ base: "column-reverse", md: "row" }} // Arah tata letak berdasarkan layar
          justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
          // align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
        >
          <Heading fontSize={"2xl"}>VALUE JAWABAN</Heading>

          <HStack align="start" mb={{ base: 2, md: 0 }}>
            <Button
              leftIcon={<MdArrowBackIosNew />}
              colorScheme="blue"
              variant="outline"
              aria-label="btn-email"
              title={`Kembali ke Halaman Sebelumnya`}
              onClick={() => router.push(`/kuesioner/daftar`)}
              size={"sm"}
            >
              Kembali
            </Button>
            <AddValueJawaban
              idPertanyaan={getParamsId}
              onSubmit={() => getValueJ()}
            />
          </HStack>
        </Flex>
        <Flex
          justifyContent={"space-between"}
          rounded={"lg"}
          alignItems={"center"}
          h="full"
          p={{ base: 2, md: 4 }}
        >
          <HStack align={"start"} spacing={3}>
            <Stack spacing={[2, 1]} direction="column" w="full">
              <Stack direction={["column", "row"]} spacing={[0, 3]}>
                <HStack align={"start"}>
                  <Box w="180px">
                    <Text as="b" fontSize={["md", "lg"]}>
                      PERTANYAAN
                    </Text>
                  </Box>
                  <Text as="b">:</Text>
                </HStack>

                <Box w="full">
                  <Text fontSize={["md", "lg"]}>{data.pertanyaan}</Text>
                </Box>
              </Stack>
              <Stack direction={["column", "row"]} spacing={[0, 3]}>
                <HStack align={"start"}>
                  <Box w="180px">
                    <Text fontSize={["md", "lg"]} fontWeight={"bold"}>
                      MODEL PERTANYAAN
                    </Text>
                  </Box>
                  <Text as="b">:</Text>
                </HStack>

                <Box w="full">
                  <Text fontSize={["md", "lg"]} fontWeight={"bold"}>
                    {ModelType(data.type)}
                  </Text>
                </Box>
              </Stack>
              <Stack direction={["column", "row"]} spacing={[0, 3]}>
                <HStack align={"start"}>
                  <Box w="180px">
                    <Text fontSize={["md", "lg"]} fontWeight={"bold"}>
                      WAJIB ISI
                    </Text>
                  </Box>
                  <Text as="b">:</Text>
                </HStack>

                <Box w="full">
                  <Text fontSize={["md", "lg"]}>
                    {data.is_required === true ? "Ya" : "Tidak"}
                  </Text>
                </Box>
              </Stack>
              <Stack direction={["column", "row"]} spacing={[0, 3]}>
                <HStack align={"start"}>
                  <Box w="180px">
                    <Text fontSize={["md", "lg"]} fontWeight={"bold"}>
                      STATUS PERTANYAAN
                    </Text>
                  </Box>
                  <Text as="b">:</Text>
                </HStack>

                <Box w="full">
                  <Text fontSize={["md", "lg"]}>
                    {data.is_active === true ? "Aktif" : "Nonaktif"}
                  </Text>
                </Box>
              </Stack>

              <Stack direction={["column", "row"]} spacing={[0, 3]}>
                <HStack align={"start"}>
                  <Box w="180px">
                    <Text fontSize={["md", "lg"]} fontWeight={"bold"}>
                      CATATAN PERTANYAAN
                    </Text>
                  </Box>
                  <Text as="b">:</Text>
                </HStack>

                <Box w="full">
                  <Text fontSize={["md", "lg"]}>{data.note}</Text>
                </Box>
              </Stack>
              <Stack direction={["column", "row"]} spacing={[0, 3]}>
                <HStack align={"start"}>
                  <Box w="180px">
                    <Text fontSize={["md", "lg"]} fontWeight={"bold"}>
                      DAFTAR VALUE JAWABAN
                    </Text>
                  </Box>
                  <Text as="b">:</Text>
                </HStack>
              </Stack>
            </Stack>
          </HStack>
        </Flex>

        {dataOpsi.length > 0 ? (
          <DndTable
            columns={columns}
            data={dataOpsi}
            droppableId={"ValueJawabanTable"}
            onDragEnd={(result) => handleDragEnd(result)}
            hiddenColumns={["id_opsi"]}
            isLoading={loadingDragging}
            disabledDrag={true}
          >
            {(rowData: any) => renderActions(rowData)}
          </DndTable>
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
              Daftar Value Jawaban Kosong
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
  ) : (
    <NotFound
      statusCode={404}
      msg={"Not Found"}
      statusDesc="Halaman tidak ditemukan. Periksa kembali URL Halaman yang anda kunjungi atau kembali ke halaman daftar pertanyaan kuesioner."
      backToHome="/kuesioner/daftar"
    />
  );
}

export default page;
