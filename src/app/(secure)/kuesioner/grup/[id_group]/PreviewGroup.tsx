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
import FormKuesioner from "../../kelola/[id_kuesioner]/components/FormKuesioner";
import { axiosCustom } from "@/app/api/axios";
import { ViewIcon } from "@chakra-ui/icons";
import Loading from "../../loading";

const PreviewGroup = ({ idGroup }: { idGroup: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const InitalState: {
    dataReview: any | null;
  } = {
    dataReview: null,
  };
  const [state, setState] = useState(InitalState);

  useEffect(() => {
    const getAll = async () => {
      setIsLoading(true);
      try {
        const response = await axiosCustom.get(
          `/grup-pertanyaan/${idGroup}/review/`,
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

  // console.log(state.dataReview);

  return (
    <>
      <Button
        bgColor={"teal.100"}
        _hover={{ bgColor: "teal.200" }}
        key="preview"
        size="sm"
        onClick={onOpen}
        title={"Preview Grup Pertanyaan"}
      >
        <ViewIcon />
        &nbsp; Preview
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>PREVIEW GRUP PERTANYAAN</ModalHeader>
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
                  <FormKuesioner
                    dataKuesioner={[state.dataReview]}
                    isSubmitted={false}
                  />
                </Stack>
              )
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PreviewGroup;
