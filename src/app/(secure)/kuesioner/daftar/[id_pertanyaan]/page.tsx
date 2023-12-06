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
} from "@chakra-ui/react";
import Loading from "../../loading";
import { MdArrowBackIosNew } from "react-icons/md/";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import { FindDefaultRoute } from "@/app/components/utils/FindDefaultRoute";
import { notFound, useRouter } from "next/navigation";
import { Column } from "react-table";
import { DropResult } from "react-beautiful-dnd";
import DndTable from "@/app/components/datatable/DndTable";
import EditValueJawaban from "./EditValueJawaban";
import DeleteValueJawaban from "./DeleteValueJawaban";
import AddValueJawaban from "./AddValueJawaban";

interface Cards {
  id: string;
  title: string;
}

function page({ params }: { params: { id_pertanyaan: string } }) {
  const getParamsId = params.id_pertanyaan;
  if ((getParamsId && getParamsId.length === 0) || !getParamsId) {
    return notFound();
  }

  const { setBreadcrumbs } = useBreadcrumbContext();
  const getForCrumbs: any = FindDefaultRoute();
  //   useEffect(() => {
  //     if (getForCrumbs) setBreadcrumbs(getForCrumbs);
  //   }, []);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingDragging, setLoadingDragging] = useState(false);

  const [data, setData] = useState<Cards[] | []>([]);
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
    const newData = Array.from(data);
    const [removed] = newData.splice(source.index, 1);
    newData.splice(destination.index, 0, removed);
    setData([...newData]);
    const updatedData = newData.map((item, index) => {
      return { ...item, no_urut: index + 1 };
    });
    console.log("data : ", data);
    console.log("updatedData : ", updatedData);
    const timeoutId = setTimeout(() => {
      setLoadingDragging(false);
    }, 3000);

    // Membersihkan timeout jika komponen dilepas
    return () => clearTimeout(timeoutId);
  };

  const columns: ReadonlyArray<Column<Cards>> = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Judul",
      accessor: "title",
    },
  ];

  const getValueJ = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      // const response = await axiosCustom.get(`/course/all`);
      const timer = setTimeout(() => {
        setData([
          {
            id: "656aac72bf7b36c645595886",
            title: "Dean Mclaughlin",
          },
          {
            id: "656aac7245358b8608c5f028",
            title: "Brock Compton",
          },
          {
            id: "656aac72ac9ae63994e686bd",
            title: "Harvey Rodriguez",
          },
          {
            id: "656aac7234c589aef01bf4a3",
            title: "Connie Hill",
          },
          {
            id: "656aac722a9a5778cf140483",
            title: "Jarvis Maldonado",
          },
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
    getValueJ();
  }, []);

  const renderActions = (rowData: any) => {
    return (
      <div>
        <HStack>
          <EditValueJawaban formData={rowData} onSubmit={() => getValueJ()} />
          <DeleteValueJawaban
            dataDelete={rowData}
            onSubmit={() => getValueJ()}
          />
        </HStack>
      </div>
    );
  };

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
          <Heading fontSize={"2xl"} mb={2}>
            VALUE JAWABAN
          </Heading>

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
            <AddValueJawaban onSubmit={() => getValueJ()} />
          </HStack>
        </Flex>
        <VStack spacing={1} align="flex-start" mr={{ base: 0, md: 2 }}>
          <Text fontSize={["md", "lg"]}>
            <span style={{ fontWeight: "bold" }}>PERTANYAAN :</span> Bagaimana
            Perkembangan Bisnis Anda dan dari tahun mana saja anda memperoleh
            Tahun Pendanaan dsfgsdfg fdgdsfgdsv fd
          </Text>
          <Text fontSize={["md", "lg"]}>
            <span style={{ fontWeight: "bold" }}>MODEL PERTANYAAN :</span>{" "}
            Checklist
          </Text>
        </VStack>
        {data && data.length > 0 ? (
          <DndTable
            columns={columns}
            data={data}
            droppableId={"ValueJawabanTable"}
            onDragEnd={(result) => handleDragEnd(result)}
            hiddenColumns={["id"]}
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
  );
}

export default page;
