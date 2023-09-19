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
  Textarea,
  Select,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import ModalNotif from "@/app/components/modal-notif";
import { axiosCustom } from "@/app/api/axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // data: any; // Data yang akan ditampilkan dalam modal
  onSubmit: () => void;
  // values?: FormValues;
  // title: string;
  isEdit?: boolean; // Tambahkan prop isEdit untuk menentukan apakah ini mode edit
  formData?: any; // Jika mode edit, kirim data yang akan diedit
  idTenant?: string | null;
}

interface FormValues {
  id: string;
  title: string;
  description: string;
}

const ModalEditCatalog: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isEdit,
  formData,
  idTenant,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const fields = {
    title: register("title", { required: "Judul harus diisi!" }),
    description: register("description", {
      required: "Deskripsi harus diisi!",
    }),
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isModalNotif, setModalNotif] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleShowMessage = (msg: string, err: boolean) => {
    setMessage(msg);
    setIsError(err);
    setModalNotif(true);
  };

  const handleFormSubmit: SubmitHandler<any> = async (data) => {
    setIsLoading(true);
    
    try {
      // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
      if (isEdit) {
        // Mode edit, kirim data melalui PUT request
        // console.log(data); axiosCustom.put("/")
        await axiosCustom
          .put(`/tenant-catalog/${data.id}`, data)
          .then((response) => {
            // setData(response.data.data);

            if (response.status === 200) {
              handleShowMessage("Data berhasil diubah.", false);
            }
          });
        // .catch((error) => {
        //   console.error("Error fetching data:", error);
        // });
      } else {
        // Mode tambah, kirim data melalui POST request
        const getIdTenant: any = idTenant;
        await axiosCustom
          .post(`/tenant-catalog/${getIdTenant}`, {
            title: data.title,
            description: data.description,
          })
          .then((response) => {
            // console.log(response);
            if (response.status === 201) {
              handleShowMessage("Data berhasil disimpan.", false);
            }
          });
      }

      onSubmit(); // Panggil fungsi penyimpanan data (misalnya, untuk memperbarui tampilan tabel)
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
            <ModalHeader>{isEdit ? "Edit Data" : "Tambah Data"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="data-form">
                <Hide>
                  <FormControl isInvalid={!!errors.id} mb="3">
                    <Input
                      type="text"
                      {...register("id")}
                      defaultValue={formData?.id}
                      // className={`form-control ${errors.name ? "is-invalid"}`}
                    />
                    <FormErrorMessage>
                      {errors.id && errors.id.message}
                    </FormErrorMessage>
                  </FormControl>
                </Hide>

                <FormControl isInvalid={!!errors.title} mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "20%"]} marginRight={["0", "2"]}>
                      <FormLabel>Judul</FormLabel>
                    </Box>
                    <Box flex={["1", "80%"]}>
                      <Input
                        type="text"
                        {...fields.title}
                        defaultValue={formData?.title}
                        // className={`form-control ${errors.name ? "is-invalid"}`}
                      />
                      <FormErrorMessage>
                        {errors.title && errors.title.message}
                      </FormErrorMessage>
                    </Box>
                  </Flex>
                </FormControl>

                <FormControl isInvalid={!!errors.description} mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "20%"]} marginRight={["0", "2"]}>
                      <FormLabel>Deskripsi</FormLabel>
                    </Box>
                    <Box flex={["1", "80%"]}>
                      <Textarea
                        {...fields.description}
                        defaultValue={formData?.description}
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
                {isEdit ? "Simpan Perubahan" : "Tambah"}
              </Button>
              <Button
                leftIcon={<CloseIcon />}
                colorScheme="red"
                onClick={() => {
                  onClose();
                  reset();
                  setIsLoading(false);
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
        isOpen={isModalNotif}
        onClose={() => setModalNotif(false)}
        message={message}
        isError={isError}
      />
    </>
  );
};

export default ModalEditCatalog;
