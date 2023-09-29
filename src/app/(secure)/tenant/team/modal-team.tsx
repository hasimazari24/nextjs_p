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
  RadioGroup,Radio, Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  formData?: {
    id: string;
    fullname: string;
    position: string;
    is_admin: boolean;
    is_public: boolean;
  }; // Jika mode edit, kirim data yang akan diedit
  idTenant?: string | null;
}

interface FormValues {
  id: string;
  fullname:string;
  position: string;
  is_admin: string;
  is_public:string;
}

const ModalTeam: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  idTenant,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const fields = {
    position: register("position", { required: "Posisi harus diisi!" }),
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

   const [selectedOption, setSelectedOption] = useState<boolean | undefined>(
     undefined,
   );
   const handleIsAdmin = (value: string) => {
     setSelectedOption(value === "ya_admin");
   };

   //pastikan nilai di dalam() sesuai default valuenya radioSelected
   const [selectedIsPublic, setSelecteIsPublic] = useState<boolean | undefined>(
     undefined,
   );
   const handleIsPublic = (value: string) => {
     setSelecteIsPublic(value === "ya_public");
   };

  const handleFormSubmit: SubmitHandler<any> = async (data) => {
    setIsLoading(true);

    try {
      // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
      // console
      const simpan = {
        id: data.id,
        position: data.position,
        is_admin: data.is_admin === "ya_admin" ? true : false,
        is_public: data.is_admin === "ya_public" ? true : false,
      };
      console.log(simpan);
      // await axiosCustom 
      //   .put(`/tenant/${idTenant}/update-user`, simpan)
      //   .then((response) => {
      //     // setData(response.data.data);

      //     if (response.status === 200) {
      //       handleShowMessage("Data berhasil diubah.", false);
      //     }
      //   });
      // onSubmit(); // Panggil fungsi penyimpanan data (misalnya, untuk memperbarui tampilan tabel)
      // onClose(); // Tutup modal
      // reset(); // Reset formulir
      // setIsLoading(false);
      // Setelah data disimpan, atur pesan berhasil ke dalam state
    } catch (error: any) {
      console.error(error);
      if (error?.response) {
        handleShowMessage(
          `Terjadi Kesalahan: ${error.response.data.message}`,
          true,
        );
      } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
      setIsLoading(false);
    }
  };

  console.log(formData?.is_admin);
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
            <ModalHeader>Ubah Data Anggota : {formData?.fullname}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="data-form">
                <Hide>
                  <FormControl isInvalid={!!errors.id} mb="3">
                    <Input
                      type="text"
                      {...register("id")}
                      defaultValue={formData?.id}
                    />
                    <FormErrorMessage>
                      {errors.id && errors.id.message}
                    </FormErrorMessage>
                  </FormControl>
                </Hide>

                <FormControl isInvalid={!!errors.position} mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "20%"]} marginRight={["0", "2"]}>
                      <FormLabel>Posisi</FormLabel>
                    </Box>
                    <Box flex={["1", "80%"]}>
                      <Input
                        {...fields.position}
                        defaultValue={formData?.position}
                      />
                      <FormErrorMessage>
                        {errors.position && errors.position.message}
                      </FormErrorMessage>
                    </Box>
                  </Flex>
                </FormControl>

                <FormControl as="fieldset" mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "46%"]} marginRight={["0", "2"]}>
                      <FormLabel>Atur sebagai admin tenant?</FormLabel>
                    </Box>
                    <Box flex={["1", "54%"]}>
                      <RadioGroup
                        defaultValue={
                          formData?.is_admin === true
                            ? "ya_admin"
                            : "tidak_admin"
                        }
                      >
                        <Radio
                          value="ya_admin"
                          pr="4"
                          {...register("is_admin")}
                        >
                          Ya
                        </Radio>
                        <Radio value="tidak_admin" {...register("is_admin")}>
                          Tidak
                        </Radio>
                      </RadioGroup>
                    </Box>
                  </Flex>
                </FormControl>

                <FormControl as="fieldset" mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "50%"]} marginRight={["0", "2"]}>
                      <FormLabel>Tampilkan ke halaman public?</FormLabel>
                    </Box>
                    <Box flex={["1", "50%"]}>
                      <RadioGroup
                        defaultValue={
                          formData?.is_public === true
                            ? "ya_public"
                            : "tidak_public"
                        }
                      >
                        <Radio
                          value="ya_public"
                          pr="4"
                          {...register("is_public")}
                        >
                          Ya
                        </Radio>
                        <Radio value="tidak_public" {...register("is_public")}>
                          Tidak
                        </Radio>
                      </RadioGroup>
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
                Simpan Perubahan
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

export default ModalTeam;
