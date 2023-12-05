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
  VStack,
  Text,
  Icon,
  Box,
} from "@chakra-ui/react";
import Loading from "../../loading";
import { MdArrowBackIosNew } from "react-icons/md/";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import { FindDefaultRoute } from "@/app/components/utils/FindDefaultRoute";
import { useRouter } from "next/navigation";
import { HiFolderOpen } from "react-icons/hi";
import { ViewIcon } from "@chakra-ui/icons";
interface Cards {
  id: string;
  title: string;
}

function page({ params }: { params: { id_group: string } }) {
  const { setBreadcrumbs } = useBreadcrumbContext();
  const getForCrumbs: any = FindDefaultRoute();
  //   useEffect(() => {
  //     if (getForCrumbs) setBreadcrumbs(getForCrumbs);
  //   }, []);
  const router = useRouter();

  const [data, setData] = useState<Cards[] | []>([]);
  const handleDragEnd = async (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

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

  useEffect(() => {
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
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Stack spacing={{ base: 4, md: 6 }}>
        <Flex
          flexDirection={{ base: "column-reverse", md: "row" }} // Arah tata letak berdasarkan layar
          justify="space-between"
        >
          <Heading fontSize={"2xl"} mb={2}>
            DAFTAR GRUP PERTANYAAN
          </Heading>
          <HStack align="start" mb={2}>
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
        <Flex
          flexDirection={{ base: "column", md: "row" }} // Arah tata letak berdasarkan layar
          justify="space-between"
        >
          <HStack color={"blue.500"}>
            {/* <FaRegFileAlt fontSize="18px" fontWeight={"bold"} /> */}
            <Icon
              as={HiFolderOpen}
              fontSize={["18px", "20px"]}
              fontWeight={"bold"}
            />
            <Text fontWeight={"semibold"} fontSize={["md", "lg"]} mr={2}>
              JUDUL GROUP
            </Text>
          </HStack>
          <HStack>
            <Button
              colorScheme="green"
              key="preview"
              size="sm"
              //   onClick={() => onOpen()}
            >
              <ViewIcon />
              &nbsp;Tambah Pertanyaan
            </Button>
            <Button
              colorScheme="yellow"
              key="preview"
              size="sm"
              //   onClick={() => onOpen()}
            >
              <ViewIcon />
              &nbsp;Preview
            </Button>
          </HStack>
        </Flex>

        <Box
          p={{ base: 3, md: 6 }}
          rounded={["md", "lg"]}
          borderWidth={"4px"}
          borderColor={"blue.500"}
          w="full"
        >
          <Stack justifyContent={"center"} alignItems={"center"} spacing={3}>
            <Text fontWeight={"bold"} fontSize={["md", "lg"]}>
              DAFTAR PERTANYAAN :
            </Text>
            <DndTable
              columns={columns}
              data={data}
              droppableId={"123"}
              onDragEnd={(result) => handleDragEnd(result)}
            />
          </Stack>
        </Box>
      </Stack>
    </Suspense>
  );
}

export default page;
