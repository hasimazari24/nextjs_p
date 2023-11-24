"use client";
import React, { useState, useEffect } from "react";
import { DownloadIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Stack,
  Image,
  VStack,
  Text,
  Skeleton,
  Divider,
  Heading,
  AbsoluteCenter,
  Icon,
} from "@chakra-ui/react";
import { MdDone } from "react-icons/md/";
import { axiosCustom } from "@/app/api/axios";
import Link from "next/link";
import AddFile from "./addFile";
import UpdateFile from "./updateFile";
import DeleteFile from "./deleteFile";
import ChangeProgressTenant from "../ChangeProgressTenant";
import { FaRegFileAlt } from "react-icons/fa";

interface FileMentor {
  id: string;
  title: string;
  description: string;
  id_asset: string;
  url_asset: string;
}

interface FileTenant {
  id: string;
  title: string;
  description: string;
  id_asset: string;
  url_asset: string;
  progress: string | null;
}

export const FileByTenant = ({ idSesi }: { idSesi: string }) => {
  const [fileTenant, setFileTenant] = useState<FileTenant[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // if (need_updated === true)
    getFileTenant();
  }, []);
  const getFileTenant = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(
        `/course-item/${idSesi}/file-tenant`,
      );
      const timer = setTimeout(() => {
        // setIdTenant(id);
        setFileTenant(response.data.data); // Set isLoading to false to stop the spinner
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setIsLoading(false);
    }
  };
  return (
    <Box display={fileTenant.length > 0 || isLoading ? "block" : "none"}>
      <Skeleton
        isLoaded={!isLoading}
        display={!isLoading && fileTenant.length < 1 ? "none" : "flex"}
        minH={!isLoading ? "0px" : "120px"}
      >
        {fileTenant && (
          <Stack spacing={4} w="full">
            <Box display="flex" alignItems="center">
              <HStack>
                {/* <FaRegFileAlt fontSize="18px" fontWeight={"bold"} /> */}
                <Icon
                  as={FaRegFileAlt}
                  fontSize={["17px", "19px"]}
                  fontWeight={"bold"}
                />
                <Heading
                  fontWeight={"bold"}
                  fontSize={["17px", "xl", "2xl"]}
                  mr="2"
                >
                  FILE
                </Heading>
              </HStack>
              <Divider borderColor="gray.400" />
            </Box>
            {fileTenant.map((data, index) => (
              <Box key={data.id}>
                <VStack spacing={3} align="flex-start">
                  <HStack
                    //   justify="space-between"
                    flexWrap={"wrap"}
                    alignItems={"center"}
                  >
                    <Text fontWeight={"bold"} fontSize={["md", "lg"]}>
                      {index + 1}.&nbsp;{data.title}
                    </Text>
                    <ChangeProgressTenant
                      idSesi={idSesi}
                      idItem={data.id}
                      progress={data.progress}
                      onSubmit={() => getFileTenant()}
                    />
                  </HStack>
                  {data.description && (
                    <Box
                      p={{ base: 3, md: 6 }}
                      rounded={["md", "lg"]}
                      borderWidth={"4px"}
                      borderColor={"blue.500"}
                      w="full"
                    >
                      <Text
                        textAlign="justify"
                        dangerouslySetInnerHTML={{ __html: data.description }}
                      />
                    </Box>
                  )}
                  <Link href={data.url_asset} target="_blank">
                    <Box
                      bgColor="blue.500"
                      _hover={{
                        bg: "blue.400",
                      }}
                      title="Kunjungi Link"
                      color="white"
                      // onClick={() => setModalOpen(true)}
                      key="visitLink"
                      w="auto"
                      px={2}
                      py={1}
                      rounded={"md"}
                      cursor="pointer"
                    >
                      <HStack>
                        <ExternalLinkIcon fontSize="sm" />
                        <Text
                          fontSize="sm"
                          fontWeight={"thin"}
                          textOverflow="ellipsis"
                          whiteSpace={"nowrap"}
                          maxW={"150px"}
                          overflow="hidden"
                        >
                          Download - {data.title}
                        </Text>
                      </HStack>
                    </Box>
                  </Link>
                </VStack>
                {/* <Divider mt={4} borderColor="gray.400" /> */}
              </Box>
            ))}
          </Stack>
        )}
      </Skeleton>
    </Box>
  );
};

export function FileByMentor({
  idSesi,
  isAddFile,
  closeAddFile,
  classEnd,
}: {
  idSesi: string;
  isAddFile: boolean;
  closeAddFile: () => void;
  classEnd: boolean;
}) {
  const [fileMentor, setFileMentor] = useState<FileMentor[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // if (need_updated === true)
    getFileMentor();
  }, []);
  const getFileMentor = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(`/course-item/${idSesi}/file`);
      const timer = setTimeout(() => {
        // setIdTenant(id);
        setFileMentor(response.data.data); // Set isLoading to false to stop the spinner
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setIsLoading(false);
    }
  };
  return (
    <Box display={fileMentor.length > 0 || isLoading ? "block" : "none"}>
      <Skeleton
        isLoaded={!isLoading}
        display={!isLoading && fileMentor.length < 1 ? "none" : "flex"}
        minH={!isLoading ? "0px" : "120px"}
      >
        {fileMentor.length > 0 && (
          <Stack spacing={4} w="full">
            <Box display="flex" alignItems="center">
              <HStack>
                {/* <FaRegFileAlt fontSize="18px" fontWeight={"bold"} /> */}
                <Icon
                  as={FaRegFileAlt}
                  fontSize={["17px", "19px"]}
                  fontWeight={"bold"}
                />
                <Heading
                  fontWeight={"bold"}
                  fontSize={["17px", "xl", "2xl"]}
                  mr="2"
                >
                  FILE
                </Heading>
              </HStack>
              <Divider borderColor="gray.400" />
            </Box>
            {fileMentor.map((data, index) => (
              <Box key={data.id}>
                <VStack spacing={3} align="flex-start">
                  <HStack
                    //   justify="space-between"
                    flexWrap={"wrap"}
                    alignItems={"center"}
                  >
                    <Text fontWeight={"bold"} fontSize={["md", "lg"]}>
                      {index + 1}.&nbsp;{data.title}
                    </Text>
                    {classEnd !== true && (
                      <>
                        <UpdateFile
                          rowData={data}
                          onSubmit={() => getFileMentor()}
                        />
                        <DeleteFile
                          dataDelete={data}
                          onSubmit={() => getFileMentor()}
                        />
                      </>
                    )}
                  </HStack>
                  {data.description && (
                    <Box
                      p={{ base: 3, md: 6 }}
                      rounded={["md", "lg"]}
                      borderWidth={"4px"}
                      borderColor={"blue.500"}
                      w="full"
                    >
                      <Text
                        textAlign="justify"
                        dangerouslySetInnerHTML={{ __html: data.description }}
                      />
                    </Box>
                  )}

                  <Link href={data.url_asset} target="_blank">
                    <Box
                      bgColor="blue.500"
                      _hover={{
                        bg: "blue.400",
                      }}
                      title="Download File"
                      color="white"
                      // onClick={() => setModalOpen(true)}
                      key="downloadFile"
                      w="auto"
                      px={2}
                      py={1}
                      rounded={"md"}
                      cursor="pointer"
                    >
                      <HStack>
                        <DownloadIcon fontSize="sm" />
                        <Text
                          fontSize="sm"
                          fontWeight={"thin"}
                          textOverflow="ellipsis"
                          whiteSpace={"nowrap"}
                          maxW={"150px"}
                          overflow="hidden"
                        >
                          Download - {data.title}
                        </Text>
                      </HStack>
                    </Box>
                  </Link>
                </VStack>
                {/* <Divider mt={4} borderColor="gray.400" /> */}
              </Box>
            ))}
          </Stack>
        )}
      </Skeleton>
      <AddFile
        isOpen={isAddFile}
        onClose={() => closeAddFile()}
        onSubmit={() => getFileMentor()}
        idSesi={idSesi}
      />
    </Box>
  );
}
