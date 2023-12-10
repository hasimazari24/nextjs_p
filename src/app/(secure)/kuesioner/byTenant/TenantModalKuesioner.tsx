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
} from "@chakra-ui/react";
import FormKuesioner from "../kelola/[id_kuesioner]/components/FormKuesioner";
import { axiosCustom } from "@/app/api/axios";
import { ViewIcon } from "@chakra-ui/icons";
import Loading from "../loading";

interface KuesionerProps {
  id: string;
  title: string;
  description: string;
  grup_pertanyaan: GrupProps;
}

interface GrupProps {
  id: string;
  title: string;
  pertanyaan: PertanyaanProps;
}

interface PertanyaanProps {
  id: string;
  pertanyaan: string;
  type: string;
  is_required: boolean;
  note: string;
  opsi: OpsiProps;
}

interface OpsiProps {
  id: string;
  value: string;
}

const TenantModalKuesioner = ({
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
    kuesionerTenant: KuesionerProps | null;
  } = {
    kuesionerTenant: null,
  };
  const [state, setState] = useState(InitalState);

  useEffect(() => {
    const getAll = async () => {
      setIsLoading(true);
      try {
        const response = await axiosCustom.get(
          `/kuesioner/${idKuesioner}/tahunan/`,
        );
        setState({
          kuesionerTenant: response.data.data,
        });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setState({
          kuesionerTenant: null,
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
          <ModalHeader>PENGISIAN KUESIONER TAHUNAN</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <Loading />
            ) : (
              state.kuesionerTenant && (
                <Stack
                  spacing={3}
                  w="full"
                  px={{ base: 0, md: "100px", lg: "150px", xl: "200px" }}
                >
                  <Stack w="full" justifyContent={"center"} alignItems="center">
                    <Heading
                      textAlign="center"
                      fontSize={"2xl"}
                      maxW={{ base: "full", md: "540px", lg: "720px" }}
                      whiteSpace={"normal"}
                    >
                      {state.kuesionerTenant.title}
                    </Heading>
                  </Stack>
                  {state.kuesionerTenant.description && (
                    <Text
                      textAlign="justify"
                      dangerouslySetInnerHTML={{
                        __html: state.kuesionerTenant.description,
                      }}
                    />
                  )}
                  {Array.isArray(state.kuesionerTenant.grup_pertanyaan) &&
                  state.kuesionerTenant.grup_pertanyaan.length > 0 ? (
                    <FormKuesioner
                      isSubmitted={true}
                      onSubmit={() => {
                        onSubmit();
                        onClose();
                      }}
                      idKuesioner={idKuesioner}
                      dataKuesioner={state.kuesionerTenant.grup_pertanyaan}
                    />
                  ) : (
                    <Stack
                      justifyContent={"center"}
                      spacing={0}
                      alignItems={"center"}
                    >
                      <Image
                        src="/img/kuesioner-notfound.png"
                        h={{ base: "200px", sm: "250px", md: "350px" }}
                        w="auto"
                      />
                      <Text
                        as="b"
                        fontWeight={"bold"}
                        fontSize={{ base: "16px", md: "17px" }}
                        textAlign={"center"}
                      >
                        Kuesioner belum dibuat atau masih kosong.
                      </Text>
                    </Stack>
                  )}
                </Stack>
              )
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TenantModalKuesioner;
