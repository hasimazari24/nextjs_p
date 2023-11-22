// components/Modal.tsx
"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Hide,
  Flex,
  Text,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";

interface ModalProps {
  onSubmit: () => void;
  rowData:any;
}

interface FormValues {
  id: string;
  valuasi: string;
}

const EditValuasi: React.FC<ModalProps> = ({ onSubmit, rowData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const fields = {
    valuasi: register("valuasi", {
      required: "Valuasi harus diisi!",
      maxLength: {
        value: 255,
        message: "Maksimal 255 karakter.",
      },
    }),
  };

  const [isLoading, setIsLoading] = useState(false);
  const [stateNotif, setStateNotif] = useState({
    msg: "",
    isError: false,
    isNotifShow: false,
  });
  const handleShowMessage = (msg: string, err: boolean) => {
    setStateNotif({
      msg: msg,
      isError: err,
      isNotifShow: true,
    });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFormSubmit: SubmitHandler<any> = async (data) => {
    setIsLoading(true);

    try {
      await axiosCustom
        .put(`/valuasi/${data.id}`, { valuasi: data.valuasi })
        .then((response) => {
          // setData(response.data.data);

          if (response.status === 200) {
            handleShowMessage("Data berhasil diubah.", false);
          }
        });
      onClose(); // Tutup modal
      reset(); // Reset formulir
      setIsLoading(false);
      // Setelah data disimpan, atur pesan berhasil ke dalam state
    } catch (error: any) {
      // console.error(error);
      if (error?.response) {
        handleShowMessage(
          `Terjadi Kesalahan: ${error.response.data.message}`,
          true,
        );
      } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        bgColor="blue.100"
        _hover={{
          bg: "blue.200",
        }}
        title="Edit Data"
        color="gray.700"
        onClick={onOpen}
        key="editData"
        size="sm"
      >
        <EditIcon />
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
        }}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <ModalHeader>{"Tambah Data"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="data-form">
                <FormControl>
                  <Hide>
                    <Input
                      type="text"
                      {...register("id")}
                      defaultValue={rowData?.id}
                    />
                  </Hide>
                </FormControl>

                <FormControl isInvalid={!!errors.valuasi} mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "20%"]} marginRight={["0", "2"]}>
                      <FormLabel>
                        Valuasi&nbsp;
                        <Text as={"span"} color={"red"}>
                          *
                        </Text>
                      </FormLabel>
                    </Box>
                    <Box flex={["1", "80%"]}>
                      <Input
                        type="text"
                        {...fields.valuasi}
                        defaultValue={rowData?.valuasi}
                      />
                      <FormErrorMessage>
                        {errors.valuasi && errors.valuasi.message}
                      </FormErrorMessage>
                    </Box>
                  </Flex>
                </FormControl>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                leftIcon={<CheckIcon />}
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={isLoading}
                size="sm"
              >
                {"Simpan Perubahan"}
              </Button>
              <Button
                leftIcon={<CloseIcon />}
                color={"red.400"}
                bgColor="red.50"
                _hover={{
                  bg: "red.50",
                }}
                onClick={() => {
                  reset();
                  onClose();
                }}
                boxShadow="md"
                size="sm"
              >
                Tutup
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <ModalNotif
        isOpen={stateNotif.isNotifShow}
        onClose={() =>
          setStateNotif({
            msg: "",
            isError: false,
            isNotifShow: false,
          })
        }
        message={stateNotif.msg}
        isError={stateNotif.isError}
        onSubmit={() => onSubmit()}
      />
    </>
  );
};

export default EditValuasi;
