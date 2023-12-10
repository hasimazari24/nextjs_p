import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Heading,
  Stack,
  Box,
  Image,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import FormKuesioner from "../kelola/[id_kuesioner]/components/FormKuesioner";
import { axiosCustom } from "@/app/api/axios";
import { ViewIcon } from "@chakra-ui/icons";
import Loading from "../loading";
import FormNilaiMentor from "./FormNilaiMentor";
import ProfileMentor from "../../kelas/pages/profileMentor";

const TenantNilaiMentor = ({
  idKuesioner,
  isOpen,
  onClose,
  onSubmit,
}: {
  idKuesioner: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const InitalState: {
    tenantNilaiMentor: any | null;
  } = {
    tenantNilaiMentor: null,
  };
  const [state, setState] = useState(InitalState);

  useEffect(() => {
    const getAll = async () => {
      setIsLoading(true);
      try {
        const response = await axiosCustom.get(
          `/kuesioner/${idKuesioner}/nilai-mentor`,
        );
        setState({
          tenantNilaiMentor: response.data.data,
        });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setState({
          tenantNilaiMentor: null,
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
          <ModalHeader mt={{ base: 5, md: 0 }}>
            PENILAIAN MENTOR OLEH TENANT
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <Loading />
            ) : (
              //   state.tenantNilaiMentor && (
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
                      IDENTITAS MENTOR :
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
                          {state.tenantNilaiMentor?.course?.name}
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
                            mentor={state.tenantNilaiMentor?.mentor}
                          />
                        </Center>
                      </Box>
                      <Box
                        textAlign={"center"}
                        borderLeft={{ md: "3px solid" }}
                        borderColor={"purple.500"}
                      >
                        <Text fontSize={["md", "lg"]}>Kelas Diakhiri</Text>
                        <Text fontSize={["lg", "xl"]} as="b">
                          25 Oktober 2023
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </Stack>
                </Box>
                <FormNilaiMentor
                  dataPertanyaan={
                    Array.isArray(state.tenantNilaiMentor?.pertanyaan)
                      ? state.tenantNilaiMentor?.pertanyaan
                      : []
                  }
                  isSubmitted={true}
                  onSubmit={() => {
                    onSubmit();
                    onClose();
                  }}
                  idKuesioner={idKuesioner}
                />
              </Stack>
              //   )
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TenantNilaiMentor;
