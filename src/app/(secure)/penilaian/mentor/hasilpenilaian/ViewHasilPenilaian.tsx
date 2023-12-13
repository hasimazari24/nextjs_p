import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Stack,
  Box,
  Image,
  SimpleGrid,
  Center,
  HStack,
} from "@chakra-ui/react";
import { axiosCustom } from "@/app/api/axios";
import Loading from "../loading";
import FormNilaiMentor from "@/app/(secure)/kuesioner/byTenant/FormNilaiMentor";
import ProfileMentor from "@/app/(secure)/kelas/pages/profileMentor";
import { MdOutlineScheduleSend } from "react-icons/md";
import { FaBuildingUser } from "react-icons/fa6";

const ViewHasilPenilaian = ({
  idKuesioner,
  idTenant,
  tenantName,
  isOpen,
  onClose,
}: {
  idKuesioner: string;
  idTenant: string;
  tenantName: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const InitalState: {
    viewHasilPenilaian: any | null;
  } = {
    viewHasilPenilaian: null,
  };
  const [state, setState] = useState(InitalState);

  useEffect(() => {
    const getAll = async () => {
      setIsLoading(true);
      try {
        const response = await axiosCustom.get(
          `/tenant-nilai-mentor/review/${idKuesioner}/tenant/${idTenant}`,
        );
        setState({
          viewHasilPenilaian: response.data.data,
        });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setState({
          viewHasilPenilaian: null,
        });
        setIsLoading(false);
      }
    };
    if (isOpen === true) getAll();
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mt={{ base: 5, md: 0 }} textAlign={"center"}>
            HASIL NILAI MENTOR OLEH TENANT
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <Loading />
            ) : state.viewHasilPenilaian ? (
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                spacing={3}
                w="full"
                px={{ base: 0, md: "50px", lg: "100px", xl: "150px" }}
              >
                <Box
                  p={{ base: 3, md: 6 }}
                  rounded={["md", "lg"]}
                  borderWidth={"4px"}
                  borderColor={"purple.500"}
                  bgColor={"purple.50"}
                  w="full"
                  boxShadow={"xl"}
                  mb="6"
                >
                  <Stack spacing={3} w="full">
                    <Text
                      fontWeight={"bold"}
                      fontSize={["lg", "xl"]}
                      textAlign={"center"}
                      w="full"
                      bgColor={"purple.500"}
                      color={"white"}
                      py={2}
                    >
                      DATA PENILAIAN :
                    </Text>
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={2}>
                      <Box
                        alignItems={"center"}
                        textAlign={"center"}
                        borderRight={{ md: "3px solid" }}
                        borderBottom={{ base: "2px solid", md: "none" }}
                        borderColor={"purple.500"}
                        pb={2}
                        pr={{ base: 0, md: 3 }}
                      >
                        <Text fontSize={["md", "lg"]}>Kelas Mentoring</Text>
                        <Text fontSize={["lg", "xl"]} as="b">
                          {state.viewHasilPenilaian.course?.name}
                        </Text>
                      </Box>
                      <Box
                        textAlign={"center"}
                        borderBottom={{ base: "2px solid", md: "none" }}
                        borderColor={"purple.500"}
                        pb={2}
                      >
                        <Text fontSize={["md", "lg"]}>Mentor</Text>
                        <Center>
                          <ProfileMentor
                            mentor={state.viewHasilPenilaian.mentor}
                          />
                        </Center>
                      </Box>
                      <Box
                        textAlign={"center"}
                        borderLeft={{ md: "3px solid" }}
                        borderColor={"purple.500"}
                      >
                        <Center flexDirection={"column"}>
                          <Text fontSize={["md", "lg"]}>Dinilai Oleh :</Text>
                          <Stack
                            spacing={1}
                            justifyContent={"center"}
                            alignItems={"center"}
                          >
                            <HStack alignItems={"center"}>
                              <Box>
                                <FaBuildingUser fontSize={"20px"} />
                              </Box>
                              <Text fontSize={["lg", "xl"]} as="b">
                                {tenantName}
                              </Text>
                            </HStack>
                            <HStack alignItems={"center"}>
                              <Box>
                                <MdOutlineScheduleSend fontSize={"22px"} />
                              </Box>
                              <Text fontSize={"md"}>
                                {state.viewHasilPenilaian.submitted_date}
                              </Text>
                            </HStack>
                          </Stack>
                        </Center>
                      </Box>
                    </SimpleGrid>
                  </Stack>
                </Box>
                <FormNilaiMentor
                  dataPertanyaan={
                    Array.isArray(state.viewHasilPenilaian?.pertanyaan)
                      ? state.viewHasilPenilaian?.pertanyaan
                      : []
                  }
                  isSubmitted={false}
                  isShowResult={true}
                  idKuesioner={idKuesioner}
                />
              </Stack>
            ) : (
              <Stack
                justifyContent={"center"}
                spacing={0}
                alignItems={"center"}
              >
                <Image
                  src="/img/grades-notfound.png"
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
                  Hasil Penilaian Mentor masih kosong.
                </Text>
                <Text
                  fontSize={{ base: "15.5px", md: "16.5px" }}
                  textAlign={"center"}
                >
                  Mungkin belum dinilai oleh tenant, silahkan coba Ingatkan
                  Tenant melalui halaman hasil penilaian mentor
                </Text>
              </Stack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewHasilPenilaian;
