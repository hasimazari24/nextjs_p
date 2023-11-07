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
  Flex,
  Box,
  Text,
  IconButton,
  Center,
  AvatarBadge,
  Avatar,
  Textarea,
  Hide,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  AddIcon,
  CheckIcon,
  CloseIcon,
  EditIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";
import { FaUser } from "react-icons/fa";

type AwardItem = {
  id?: string;
  name: string;
  description: string;
};

interface editProps {
  onSubmit?: () => void;
  rowData: any;
}

const EditClass: React.FC<editProps> = ({ onSubmit, rowData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AwardItem>();

  const fields = {
    name: register("name", {
      required: "Nama kelas harus diisi!",
      maxLength: {
        value: 255,
        message: "Maksimal 255 karakter.",
      },
    }),
    description: register("description", {
      required: "Deskripsi kelas harus diisi!",
      maxLength: {
        value: 255,
        message: "Maksimal 255 karakter.",
      },
    }),
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
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

  const handleFormSubmit: SubmitHandler<any> = async (data) => {
    setIsLoading(true);
    // console.log(dataBaru);
    if (data.id) {
      try {
        // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
        await axiosCustom.post(`/tenant/add-award`, data).then((response) => {
          // console.log(response);
          if (response.status === 201) {
            handleShowMessage("Data berhasil diubah.", false);
          }
        });

        //   onSubmit(); // Panggil fungsi penyimpanan data (misalnya, untuk memperbarui tampilan tabel)
        // onClose(); // Tutup modal
        resetAll();
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
    }
  };

  const resetAll = () => {
    setModalOpen(false);
    reset(); // Reset formulir
    setIsLoading(false);
  };

  return (
    <div>
      <Box key="editData" onClick={() => setModalOpen(true)}>
        <EditIcon boxSize={{ base: "20px", sm: "17px", lg: "20px" }} />
        &nbsp; Edit Kelas
      </Box>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          resetAll();
        }}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <ModalHeader>Tambah Kelas</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="data-form">
                <Hide>
                  <FormControl>
                    <Input
                      type="text"
                      {...register("id")}
                      defaultValue={rowData?.id}
                    />
                  </FormControl>
                </Hide>
                <FormControl isInvalid={!!errors.name} mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                      <FormLabel>
                        Nama Kelas&nbsp;
                        <Text as={"span"} color={"red"}>
                          *
                        </Text>
                      </FormLabel>
                    </Box>
                    <Box flex={["1", "75%"]}>
                      <Input
                        type="text"
                        {...fields.name}
                        defaultValue={rowData?.name}
                        // className={`form-control ${errors.name ? "is-invalid"}`}
                      />
                      <FormErrorMessage>
                        {errors.name && errors.name.message}
                      </FormErrorMessage>
                    </Box>
                  </Flex>
                </FormControl>
                <FormControl isInvalid={!!errors.description} mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                      <FormLabel>
                        Deskripsi Kelas&nbsp;
                        <Text as={"span"} color={"red"}>
                          *
                        </Text>
                      </FormLabel>
                    </Box>
                    <Box flex={["1", "75%"]}>
                      <Textarea
                        {...fields.description}
                        defaultValue={rowData?.description}
                      />
                      <FormErrorMessage>
                        {errors.description && errors.description.message}
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
                boxShadow="md"
                onClick={() => {
                  resetAll();
                }}
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
        // onSubmit={() => onSubmit()}
      />
    </div>
  );
};

export default EditClass;
