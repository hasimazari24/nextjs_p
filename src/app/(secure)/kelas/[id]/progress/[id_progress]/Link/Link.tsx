import React, { useState, useEffect } from "react";
import {
  DownloadIcon,
  AddIcon,
  EditIcon,
  DeleteIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Icon,
  HStack,
  Stack,
  Heading,
  VStack,
  Text,
  Skeleton,
  Divider,
} from "@chakra-ui/react";
import { MdArrowBackIosNew, MdDone, MdDoneAll, MdTask } from "react-icons/md/";
import { axiosCustom } from "@/app/api/axios";
import Link from "next/link";
import UpdateLink from "./updateLink";
import DeleteLink from "./deleteLink";
import AddLink from "./addLink";
import ChangeProgressTenant from "../ChangeProgressTenant";
import { IoLinkSharp } from "react-icons/io5";

interface LinkTenantI {
  id: string;
  title: string;
  description: string;
  url: string;
  progress: string | null;
}
interface LinkMentorI {
  id: string;
  title: string;
  description: string;
  url: string;
}

export function LinkTenant({ idSesi }: { idSesi: string }) {
  const [linkTenant, setLinkTenant] = useState<LinkTenantI[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // if (need_updated === true)
    getLinkTenant();
  }, []);

  const getLinkTenant = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(
        `/course-item/${idSesi}/link-tenant`,
      );
      const timer = setTimeout(() => {
        // setIdTenant(id);
        setLinkTenant(response.data.data); // Set isLoading to false to stop the spinner
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setIsLoading(false);
    }
  };

  return (
    <Box display={linkTenant.length > 0 || isLoading ? "block" : "none"}>
      <Skeleton
        isLoaded={!isLoading}
        display={!isLoading && linkTenant.length < 1 ? "none" : "flex"}
        minH={!isLoading ? "0px" : "120px"}
      >
        {linkTenant.length > 0 && (
          <Stack spacing={4} w="full" direction={"column"}>
            <Box display="flex" alignItems="center">
              <HStack>
                {/* <FaRegFileAlt fontSize="18px" fontWeight={"bold"} /> */}
                <Icon
                  as={ExternalLinkIcon}
                  fontSize={["17px", "19px"]}
                  fontWeight={"bold"}
                />
                <Heading
                  fontWeight={"bold"}
                  fontSize={["17px", "xl", "2xl"]}
                  mr="2"
                >
                  LINK
                </Heading>
              </HStack>
              <Divider borderColor="gray.400" />
            </Box>
            {linkTenant.map((data, index) => (
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
                      onSubmit={() => getLinkTenant()}
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
                  <Link href={data.url} target="_blank">
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
                          Link - {data.title}
                        </Text>
                      </HStack>
                    </Box>
                  </Link>
                </VStack>
                <Divider mt={4} borderColor="gray.400" />
              </Box>
            ))}
          </Stack>
        )}
      </Skeleton>
    </Box>
  );
}

export function LinkMentor({
  idSesi,
  isOpenModalAdd,
  closeModalAdd,
  classEnd,
}: {
  idSesi: string;
  isOpenModalAdd: boolean;
  closeModalAdd: () => void;
  classEnd: boolean;
}) {
  const [linkMentor, setLinkMentor] = useState<LinkMentorI[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // if (need_updated === true)
    getLinkMentor();
  }, []);
  const getLinkMentor = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(`/course-item/${idSesi}/link`);
      const timer = setTimeout(() => {
        // setIdTenant(id);
        setLinkMentor(response.data.data); // Set isLoading to false to stop the spinner
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setIsLoading(false);
    }
  };
  return (
    <Box display={linkMentor.length > 0 || isLoading ? "block" : "none"}>
      <Skeleton
        isLoaded={!isLoading}
        display={!isLoading && linkMentor.length < 1 ? "none" : "flex"}
        minH={!isLoading ? "0px" : "120px"}
      >
        {linkMentor.length > 0 && (
          <Stack spacing={4} w="full" direction={"column"}>
            <Box display="flex" alignItems="center">
              <HStack>
                {/* <FaRegFileAlt fontSize="18px" fontWeight={"bold"} /> */}
                <Icon
                  as={ExternalLinkIcon}
                  fontSize={["17px", "19px"]}
                  fontWeight={"bold"}
                />
                <Heading
                  fontWeight={"bold"}
                  fontSize={["17px", "xl", "2xl"]}
                  mr="2"
                >
                  LINK
                </Heading>
              </HStack>
              <Divider borderColor="gray.400" />
            </Box>
            {linkMentor.map((data, index) => (
              <Box key={data.id}>
                <VStack spacing={3} align="flex-start" key={data.id}>
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
                        <UpdateLink
                          onSubmit={() => getLinkMentor()}
                          dataEdit={data}
                        />
                        <DeleteLink
                          dataDelete={data}
                          onSubmit={() => getLinkMentor()}
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
                  <Link href={data.url} target="_blank">
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
                          Link - {data.title}
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
      <AddLink
        isOpen={isOpenModalAdd}
        onClose={() => closeModalAdd()}
        onSubmit={() => getLinkMentor()}
        idSesi={idSesi}
      />
    </Box>
  );
}
