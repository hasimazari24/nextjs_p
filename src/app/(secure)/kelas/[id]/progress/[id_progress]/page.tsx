"use client";
import React, { useState, useEffect, Suspense } from "react";
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
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Flex,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { MdArrowBackIosNew, MdTask } from "react-icons/md/";
import { FileByTenant, FileByMentor } from "./File/File";
import { LinkTenant, LinkMentor } from "./Link/Link";
import { TugasMentor, TugasTenant } from "./Tugas/Tugas";
import { BsSendPlusFill } from "react-icons/bs";
import AddTugas from "./Tugas/addTugas";
import AddFile from "./File/addFile";
import AddLink from "./Link/addLink";
import { useRouter, notFound } from "next/navigation";
import { useAuth } from "@/app/components/utils/AuthContext";
import Loading from "../../../loading";
import { axiosCustom } from "@/app/api/axios";
import CommentSection from "./Comment/commentSection";

// { params }: { params: { slug: string } }
const page = ({ params }: { params: { id_progress: string } }) => {
  const getParamsId = params.id_progress;
  if ((getParamsId && getParamsId.length === 0) || !getParamsId) {
    return notFound();
  }
  const router = useRouter();

  const { user } = useAuth();
  let getUser: any = null; // Inisialisasikan getUser di sini

  if (user !== null && user !== 401) {
    getUser = user; // Setel nilai getUser jika user ada
  }

  const [dataDetailSesi, setDataDetailSesi] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    isOpen: isOpenAddLink,
    onOpen: onOpenAddLink,
    onClose: onCloseAddLink,
  } = useDisclosure();
  const {
    isOpen: isOpenAddFile,
    onOpen: onOpenAddFile,
    onClose: onCloseAddFile,
  } = useDisclosure();
  const {
    isOpen: isOpenAddTugas,
    onOpen: onOpenAddTugas,
    onClose: onCloseAddTugas,
  } = useDisclosure();

  useEffect(() => {
    // if (need_updated === true)
    getDetailSesi();
  }, []);
  const getDetailSesi = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(`/course-item/${getParamsId}/`);
      const timer = setTimeout(() => {
        // setIdTenant(id);
        setDataDetailSesi(response.data.data); // Set isLoading to false to stop the spinner
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Loading />
  ) : dataDetailSesi ? (
    <>
      <Suspense fallback={<Loading />}>
        <Stack spacing={{ base: 6, md: 8 }}>
          <Flex
            flexDirection={{ base: "column-reverse", md: "row" }} // Arah tata letak berdasarkan layar
            justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
            // align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
          >
            <VStack spacing={0} align="flex-start">
              <Text as="b" fontWeight={"bold"} fontSize={["17px", "xl", "2xl"]}>
                {dataDetailSesi.title}
              </Text>
              <Text fontWeight={"thin"}>Publish : 25 Okt 2023</Text>
              <Text fontWeight={"bold"} fontSize={["md", "lg"]}>
                {dataDetailSesi.mentor_name}
              </Text>
            </VStack>
            <HStack spacing={2} align="start">
              <Button
                leftIcon={<MdArrowBackIosNew />}
                colorScheme="blue"
                variant="outline"
                aria-label="btn-email"
                title={`Kembali ke ${dataDetailSesi.course_name}`}
                onClick={() =>
                  router.push(`/kelas/${dataDetailSesi.course_id}`)
                }
                size={"sm"}
                mb={6}
              >
                Kembali
              </Button>
              {getUser?.role !== "Tenant" &&
                dataDetailSesi.course_ends !== true && (
                  <Popover placement="bottom" isLazy>
                    <PopoverTrigger>
                      <Button colorScheme="green" key="tambahData" size="sm">
                        <AddIcon />
                        &nbsp;Tambah
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      w="fit-content"
                      _focus={{ boxShadow: "none" }}
                    >
                      <PopoverArrow />
                      <PopoverBody>
                        <Stack>
                          <Button
                            variant="ghost"
                            key="tambahFile"
                            size="sm"
                            w="134px"
                            alignItems={"center"}
                            onClick={() => onOpenAddFile()}
                            justifyContent="start"
                            fontWeight="normal"
                          >
                            <AddIcon />
                            &nbsp; File
                          </Button>
                          <Button
                            variant="ghost"
                            key="tambahLink"
                            size="sm"
                            onClick={() => onOpenAddLink()}
                            fontWeight="normal"
                            justifyContent={"start"}
                            alignItems={"center"}
                            w="134px"
                          >
                            <AddIcon />
                            &nbsp; Link
                          </Button>
                          <Button
                            variant="ghost"
                            key="tambahTugas"
                            size="sm"
                            w="134px"
                            alignItems={"center"}
                            onClick={() => onOpenAddTugas()}
                            justifyContent="start"
                            fontWeight="normal"
                          >
                            <AddIcon />
                            &nbsp; Tugas
                          </Button>
                        </Stack>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                )}
            </HStack>
          </Flex>

          {dataDetailSesi.description && (
            <Box
              p={{ base: 3, md: 6 }}
              rounded={["md", "lg"]}
              borderWidth={"4px"}
              borderColor={"blue.500"}
              w="full"
            >
              <Text textAlign="justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                corporis, ipsum quod facilis laboriosam in quas natus voluptas.
                Atque magnam nobis facere officia molestiae quibusdam vitae
                eaque illum repellendus sit, cumque distinctio architecto modi
                provident ipsa! Inventore ad maiores impedit distinctio a, iure
                soluta, beatae facere consequatur dolorum odio libero?
              </Text>
            </Box>
          )}

          {getUser?.role === "Tenant" ? (
            <>
              <FileByTenant idSesi={getParamsId} />
              <LinkTenant idSesi={getParamsId} />
              <TugasTenant
                idSesi={getParamsId}
                classEnd={dataDetailSesi.course_ends}
              />
            </>
          ) : (
            <>
              <FileByMentor
                idSesi={getParamsId}
                isAddFile={isOpenAddFile}
                closeAddFile={() => onCloseAddFile()}
                classEnd={dataDetailSesi.course_ends}
              />
              <LinkMentor
                idSesi={getParamsId}
                isOpenModalAdd={isOpenAddLink}
                closeModalAdd={() => onCloseAddLink()}
                classEnd={dataDetailSesi.course_ends}
              />
              <TugasMentor
                idSesi={getParamsId}
                isTugasAdd={isOpenAddTugas}
                closeAddTugas={() => onCloseAddTugas()}
                classEnd={dataDetailSesi.course_ends}
              />
            </>
          )}
          <CommentSection idSesi={getParamsId} />
        </Stack>
      </Suspense>
    </>
  ) : (
    <></>
  );
};

export default page;
