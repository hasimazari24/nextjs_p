"use client";
import React, { useEffect, useState } from "react";
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
  VStack,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Flex,
  SimpleGrid,
  Skeleton,
  Divider,
  useDisclosure,
  Icon,
  Heading,
} from "@chakra-ui/react";
import { MdArrowBackIosNew, MdTask } from "react-icons/md/";
import ReviewMentor from "../review/[id_tugas]/reviewMentor";
import { axiosCustom } from "@/app/api/axios";
import AddTugas from "./addTugas";
import UpdateTugas from "./updateTugas";
import DeleteTugas from "./deleteTugas";
import ReviewTenant from "../review/[id_tugas]/reviewTenant";
import ChangeProgressTenant from "../ChangeProgressTenant";
import { usePathname, useRouter } from "next/navigation";
import { GrDocumentUpload } from "react-icons/gr";
import UploadTenant from "./uploadTenant";
import { GoTasklist } from "react-icons/go";

interface MentorTugas {
  id: string;
  title: string;
  description: string | null;
  open_date: string;
  open_date_format: string;
  open_time_format: string;
  close_date: string;
  close_date_format: string;
  close_time_format: string;
}
interface TenantTugas {
  id: string;
  title: string;
  description: string | null;
  open_date: string;
  open_date_format: string;
  open_time_format: string;
  close_date: string;
  close_date_format: string;
  close_time_format: string;
  assigment_closed: boolean;
  answer_id: string;
  submitted_date: string;
  submitted_time: string;
  answer_file_view_url: string;
  answer_file_download_url: string;
  graded_answer_id: string | null;
  progress: string | null;
}

export function TugasTenant({
  idSesi,
  classEnd,
}: {
  idSesi: string;
  classEnd: boolean;
}) {
  const [tugasTenant, setTugasTenant] = useState<TenantTugas[] | []>([]);
  const [selectReview, setIsSelectReview] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // if (need_updated === true)
    getTugasTenant();
  }, []);
  const getTugasTenant = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(
        `/course-item/${idSesi}/assigment-tenant`,
      );
      const timer = setTimeout(() => {
        // setIdTenant(id);
        setTugasTenant(response.data.data); // Set isLoading to false to stop the spinner
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setIsLoading(false);
    }
  };

  return (
    <Box display={tugasTenant.length > 0 || isLoading ? "block" : "none"}>
      <Skeleton
        isLoaded={!isLoading}
        display={!isLoading && tugasTenant.length < 1 ? "none" : "flex"}
        minH={!isLoading ? "0px" : "120px"}
      >
        {tugasTenant.length > 0 && (
          <Stack spacing={4} w="full" direction={"column"}>
            <Box display="flex" alignItems="center">
              <HStack>
                {/* <FaRegFileAlt fontSize="18px" fontWeight={"bold"} /> */}
                <Icon
                  as={GoTasklist}
                  fontSize={["21px", "23px"]}
                  fontWeight={"bold"}
                />
                <Heading
                  fontWeight={"bold"}
                  fontSize={["17px", "xl", "2xl"]}
                  mr="2"
                >
                  TUGAS
                </Heading>
              </HStack>
              <Divider borderColor="gray.400" />
            </Box>
            {tugasTenant.map((data, index) => (
              <Box key={data.id}>
                <VStack spacing={3} align="flex-start">
                  <HStack
                    //   justify="space-between"
                    flexWrap={"wrap"}
                    alignItems={"center"}
                  >
                    <Text fontWeight={"bold"} fontSize={["md", "lg"]}>
                      {index + 1}.&nbsp;
                      {data.title}
                    </Text>
                    <ChangeProgressTenant
                      idSesi={idSesi}
                      idItem={data.id}
                      progress={data.progress}
                      onSubmit={() => getTugasTenant()}
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

                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2} w="full">
                    <Box p={2} bgColor="yellow.300" w="full">
                      <Text as="b" color={"gray.700"}>
                        Open Date : {data.open_date_format}{" "}
                        {data.open_time_format}
                      </Text>
                    </Box>
                    <Box p={2} bgColor="red.200" w="full">
                      <Text as="b" color={"gray.700"}>
                        Due Date : {data.close_date_format}{" "}
                        {data.close_time_format}
                      </Text>
                    </Box>
                  </SimpleGrid>
                  <HStack spacing={2}>
                    <UploadTenant
                      rowData={data}
                      idSesi={idSesi}
                      onSubmit={() => getTugasTenant()}
                    />
                    {data.graded_answer_id && (
                      <Button
                        bgColor="blue.500"
                        _hover={{
                          bg: "blue.400",
                        }}
                        title="Edit Data"
                        color="white"
                        onClick={() => {
                          setIsSelectReview(data);
                          onOpen();
                        }}
                        key="reviewTugas"
                        size="sm"
                        fontWeight={"thin"}
                      >
                        <MdTask fontSize="16px" />
                        &nbsp; Review Tugas
                      </Button>
                    )}
                  </HStack>
                </VStack>
                {/* <Divider mt={4} borderColor="gray.400" /> */}
              </Box>
            ))}
          </Stack>
        )}
      </Skeleton>

      <ReviewTenant rowData={selectReview} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export function TugasMentor({
  idSesi,
  isTugasAdd,
  closeAddTugas,
  classEnd,
}: {
  idSesi: string;
  isTugasAdd: boolean;
  closeAddTugas: () => void;
  classEnd: boolean;
}) {
  const [isOpenMentor, setIsOpenMentor] = useState(false);
  const [isOpenMjmn, setIsOpenMjmn] = useState(false);
  const [tugasMentor, setTugasMentor] = useState<MentorTugas[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathName = usePathname();

  // console.log(pathName);

  useEffect(() => {
    // if (need_updated === true)
    getTugasMentor();
  }, []);
  const getTugasMentor = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(
        `/course-item/${idSesi}/assigment`,
      );
      const timer = setTimeout(() => {
        // setIdTenant(id);
        setTugasMentor(response.data.data); // Set isLoading to false to stop the spinner
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setIsLoading(false);
    }
  };

  return (
    <Box display={tugasMentor.length > 0 || isLoading ? "block" : "none"}>
      <Skeleton
        isLoaded={!isLoading}
        display={!isLoading && tugasMentor.length < 1 ? "none" : "flex"}
        minH={!isLoading ? "0px" : "120px"}
      >
        {tugasMentor.length > 0 && (
          <Stack spacing={4} w="full" direction={"column"}>
            <Box display="flex" alignItems="center">
              <HStack>
                {/* <FaRegFileAlt fontSize="18px" fontWeight={"bold"} /> */}
                <Icon
                  as={GoTasklist}
                  fontSize={["21px", "23px"]}
                  fontWeight={"bold"}
                />
                <Heading
                  fontWeight={"bold"}
                  fontSize={["17px", "xl", "2xl"]}
                  mr="2"
                >
                  TUGAS
                </Heading>
              </HStack>
              <Divider borderColor="gray.400" />
            </Box>
            {tugasMentor.map((data, index) => (
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
                        <UpdateTugas
                          onSubmit={() => getTugasMentor()}
                          idSesi={idSesi}
                          dataEdit={data}
                        />
                        <DeleteTugas
                          dataDelete={data}
                          onSubmit={() => getTugasMentor()}
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

                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2} w="full">
                    <Box p={2} bgColor="yellow.300" w="full">
                      <Text as="b" color={"gray.700"}>
                        Open Date : {data.open_date_format}{" "}
                        {data.open_time_format}
                      </Text>
                    </Box>
                    <Box p={2} bgColor="red.200" w="full">
                      <Text as="b" color={"gray.700"}>
                        Due Date : {data.close_date_format}{" "}
                        {data.close_time_format}
                      </Text>
                    </Box>
                  </SimpleGrid>
                  <HStack spacing={2}>
                    <Button
                      bgColor="blue.500"
                      _hover={{
                        bg: "blue.400",
                      }}
                      title="Edit Data"
                      color="white"
                      onClick={() =>
                        router.push(`${pathName}/review/${data.id}`)
                      }
                      key="reviewTugas"
                      size="sm"
                      fontWeight={"thin"}
                    >
                      <MdTask fontSize="16px" />
                      &nbsp; Review Tugas
                    </Button>
                  </HStack>
                </VStack>
                {/* <Divider mt={4} borderColor="gray.400" /> */}
              </Box>
            ))}
          </Stack>
        )}
      </Skeleton>

      {/* <ReviewMentor
        isOpen={isOpenMentor}
        onClose={() => setIsOpenMentor(false)}
        idTugas={"uergfhje"}
        onSubmit={() => console.log("jhsdfsd")}
      /> */}

      <AddTugas
        isOpen={isTugasAdd}
        onClose={() => closeAddTugas()}
        onSubmit={() => getTugasMentor()}
        idSesi={idSesi}
      />
    </Box>
  );
}
