import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
// import FormKuesioner from "./FormKuesioner";
import { axiosCustom } from "@/app/api/axios";
import { ViewIcon } from "@chakra-ui/icons";
import Loading from "../../loading";
import FormNilaiMentor from "@/app/(secure)/kuesioner/byTenant/FormNilaiMentor";

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

const PreviewPertanyaan = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const InitalState: {
    dataReview: PertanyaanProps | null;
  } = {
    dataReview: null,
  };
  const [state, setState] = useState(InitalState);

  useEffect(() => {
    const getAll = async () => {
      setIsLoading(true);
      try {
        const response = await axiosCustom.get(`/tenant-nilai-mentor/review`);
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
        onClick={onOpen}
      >
        <ViewIcon />
        &nbsp; Preview
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>PREVIEW PERTANYAAN</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <Loading />
            ) : state.dataReview ? (
              <Stack
                spacing={3}
                w="full"
                px={{ base: 0, md: "100px", lg: "150px", xl: "200px" }}
              >
                <FormNilaiMentor
                  dataPertanyaan={
                    Array.isArray(state.dataReview)
                      ? state.dataReview
                      : []
                  }
                  isSubmitted={false}
                />
              </Stack>
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
                  Daftar Pertanyaan Kosong
                </Text>
                <Text
                  fontSize={{ base: "15.5px", md: "16.5px" }}
                  textAlign={"center"}
                >
                  Silahkan buat terlebih dahulu.
                </Text>
              </Stack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PreviewPertanyaan;
