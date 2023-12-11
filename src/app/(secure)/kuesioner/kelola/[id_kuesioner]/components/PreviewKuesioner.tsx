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
import FormKuesioner from "./FormKuesioner";
import { axiosCustom } from "@/app/api/axios";
import { ViewIcon } from "@chakra-ui/icons";
import Loading from "../../../loading";

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

const PreviewKuesioner = ({ idKuesioner }: { idKuesioner: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const InitalState: {
    dataReview: KuesionerProps | null;
  } = {
    dataReview: null,
  };
  const [state, setState] = useState(InitalState);

  useEffect(() => {
    const getAll = async () => {
      setIsLoading(true);
      try {
        const response = await axiosCustom.get(
          `/kuesioner-review/${idKuesioner}/tahunan/`,
        );
        setState({
          dataReview: response.data.data,
        });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setState({
          dataReview: null,
        });
        setIsLoading(false);
      }
    };
    if (isOpen === true) getAll();
  }, [isOpen]);
  return (
    <>
      <Button
        bgColor={"teal.100"}
        _hover={{ bgColor: "teal.200" }}
        key="preview"
        size="sm"
        title="Preview Kuesioner"
        onClick={onOpen}
      >
        <ViewIcon />
        &nbsp; Preview
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>PREVIEW KUESIONER</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <Loading />
            ) : (
              state.dataReview && (
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
                      {state.dataReview.title}
                    </Heading>
                  </Stack>
                  {state.dataReview.description && (
                    <Text
                      textAlign="justify"
                      dangerouslySetInnerHTML={{
                        __html: state.dataReview.description,
                      }}
                    />
                  )}
                  {Array.isArray(state.dataReview.grup_pertanyaan) &&
                  state.dataReview.grup_pertanyaan.length > 0 ? (
                    <FormKuesioner
                      dataKuesioner={state.dataReview.grup_pertanyaan}
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
                        // w="auto"
                        // objectFit={"cover"}
                      />
                      <Text
                        as="b"
                        fontWeight={"bold"}
                        fontSize={{ base: "16px", md: "17px" }}
                        textAlign={"center"}
                      >
                        Daftar Grup Kuesioner Kosong
                      </Text>
                      <Text
                        fontSize={{ base: "15.5px", md: "16.5px" }}
                        textAlign={"center"}
                      >
                        Silahkan buat terlebih dahulu.
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

export default PreviewKuesioner;
