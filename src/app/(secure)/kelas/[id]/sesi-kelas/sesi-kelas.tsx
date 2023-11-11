"use client";
import React, { useState } from "react";
import {
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import AddSesi from "./addSesi";
import { BiDoorOpen } from "react-icons/bi";
import EditSesi from "./editSesi";
import { axiosCustom } from "@/app/api/axios";
import Loading from "../../loading";

interface Item {
  id: string;
  title: string;
  description: string;
  created_at: string;
  assigment_count: number;
  file_count: number;
  link_count: number;
}

interface Sesi {
  id: string;
  course_ends: boolean;
  name: string;
  description: string;
  created_at: string;
  item_count: number;
  item: Item;
}

function SesiKelas({
  sesi,
  idKelas,
  roleAccess,
}: {
  sesi?: Sesi | null;
  idKelas: string;
  roleAccess: string;
}) {
  const [dataSesi, setDataSesi] = useState<Sesi | null>(sesi ? sesi : null);
  const [isLoading, setIsLoading] = useState(false);

  const getUpdatedSesi = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(`/course/${idKelas}/item`);
      const timer = setTimeout(() => {
        // setIdTenant(id);
        setDataSesi(response.data.data); // Set isLoading to false to stop the spinner
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Stack spacing={{ base: 6, md: 8 }}>
      <Flex
        flexDirection={{ base: "column", sm: "row" }} // Arah tata letak berdasarkan layar
        justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
        // align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
      >
        <VStack spacing={0} align="flex-start" mr={2}>
          <Text fontWeight={"bold"} fontSize={["lg", "xl"]}>
            Sesi Kelas
          </Text>
          <Text fontWeight="medium">
            Total :{" "}
            <span style={{ color: "green" }}>{dataSesi?.item_count} Sesi</span>
          </Text>
        </VStack>
        <HStack spacing={2} align="start">
          {/* jika butuh btn kembali, ada disinii */}

          <AddSesi idKelas={idKelas} onSubmit={() => getUpdatedSesi()} />
        </HStack>
      </Flex>

      {/* konten disinii (daftar participant) */}
      {dataSesi && Array.isArray(dataSesi?.item) && dataSesi.item.length > 0 ? (
        dataSesi.item.map((d) => (
          <Stack
            p={{ base: 3, md: 6 }}
            rounded={["md", "lg"]}
            borderWidth={"4px"}
            borderColor={"blue.500"}
            w="full"
            spacing={3}
            key={d.id}
          >
            <HStack
              cursor={"pointer"}
              // direction={{ base: "row", sm: "column", lg: "row" }}
              //   onClick={onOpen}
              align={"start"}
              spacing={3}
            >
              <Image
                w={{ base: "50px", md: "80px" }}
                borderRadius={"full"}
                // w="120px"
                objectFit={"cover"}
                src={"/img/class-sesi.png"}
                backgroundColor={"white"}
              />
              <VStack alignItems="flex-start" spacing={0} ml="2">
                <Text fontWeight={"bold"} fontSize={{ base: "md", md: "lg" }}>
                  {d.title}
                </Text>
                <Text color="gray.600">{d.created_at}</Text>
              </VStack>
            </HStack>
            <Text
              textAlign="justify"
              dangerouslySetInnerHTML={{
                __html: d.description ? d.description : "",
              }}
            />
            <Stack
              flexDirection={"row"}
              flexWrap={"wrap"}
              // alignItems={"center"}
              spacing={2}
              px={{ base: 0, md: 30, lg: 50 }}
              justifyContent={{ base: "flex-start", md: "space-between" }}
            >
              <Text>
                Assigment :{" "}
                <span style={{ fontWeight: "bold" }}>{d.assigment_count}</span>
              </Text>
              <Text>
                File Materi :{" "}
                <span style={{ fontWeight: "bold" }}>{d.file_count}</span>
              </Text>
              <Text>
                Link Materi :{" "}
                <span style={{ fontWeight: "bold" }}>{d.link_count}</span>
              </Text>
              {roleAccess !== "Mentor" && (
                <Text>
                  Progress: <span style={{ fontWeight: "bold" }}>0 / 0</span>
                </Text>
              )}
            </Stack>
            <HStack
              mt={3}
              mb={1}
              justify="flex-end"
              flexWrap={"wrap"}
              alignItems={"center"}
            >
              <EditSesi onSubmit={() => getUpdatedSesi()} rowData={d} />
              <Button
                title="Hapus Data"
                colorScheme="red"
                // onClick={() => setIsDeleteModalOpen(true)}
                key="hapusData"
                size="sm"
              >
                <DeleteIcon /> &nbsp; Hapus
              </Button>
              <Button
                bgColor="gray.500"
                _hover={{
                  bg: "gray.400",
                }}
                color="white"
                size={"sm"}
                alignContent={"center"}
                // onClick={() => router.push(`/kelas/24df32`)}
              >
                <BiDoorOpen size="20px" />
                &nbsp;Kelola Sesi
              </Button>
            </HStack>
          </Stack>
        ))
      ) : (
        <Stack justifyContent={"center"} spacing={0} alignItems={"center"}>
          <Image
            src="/img/classroom.png"
            h={{ base: "150px", sm: "170px", md: "250px" }}
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
            Data Sesi Kosong
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
  );
}

export default SesiKelas;
