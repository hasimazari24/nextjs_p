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
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import apiCall from "../../components/api-call";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import ModalNotif from "../../components/modal-notif";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // data: any; // Data yang akan ditampilkan dalam modal
  onSubmit: () => void;
  // values?: FormValues;
  // title: string;
  isEdit?: boolean; // Tambahkan prop isEdit untuk menentukan apakah ini mode edit
  formData?: any; // Jika mode edit, kirim data yang akan diedit
}

interface FormValues {
  id: string;
  name: string;
  description: string;
  address: string;
  contact: string;
  email: string;
  founder: string;
  level_tenant: string;
  image: string;
}

const ModalEdit: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isEdit = false,
  formData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const fields = {
    name: register("name", { required: "Nama harus diisi!" }),
    description: register("description", {
      required: "Deskripsi harus diisi!",
    }),
    address: register("address", { required: "Alamat harus diisi!" }),
    contact: register("contact", { required: "Kontak harus diisi!" }),
    email: register("email", {
      required: "E-mail harus diisi",
      pattern: {
        value:
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "E-mail tidak valid",
      },
    }),
    founder: register("founder", { required: "Founder harus diisi!" }),
    level_tenant: register("level_tenant", { required: "Pilih salah satu level tenant!" }),
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

  // useEffect(() => {
  //   // Ketika modal dibuka untuk edit, isi data formulir
  //   if (isEdit) {
  //     reset(formData);
  //   }
  // }, [isEdit, formData, reset]);

  const handleFormSubmit: SubmitHandler<any> = async (data) => {
    setIsLoading(true);

    try {
      // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
      if (isEdit) {
        // Mode edit, kirim data melalui PUT request
        // console.log(data);
        const url: string = apiCall.editStartUp + `${data.id}`;
        await axios.put(url, data).then((response) => {
          // setData(response.data.data);
          if (response.status === 200) {
            handleShowMessage("Data berhasil diubah.", false);
          }
          // console.log(response);
        });
        // .catch((error) => {
        //   console.error("Error fetching data:", error);
        // });
      } else {
        // Mode tambah, kirim data melalui POST request
        await axios.post(apiCall.addStartUp, data).then((response) => {
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
          true
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
        size="lg"
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

                <FormControl isInvalid={!!errors.name} mb="3">
                  <FormLabel>Nama</FormLabel>
                  <Input
                    type="text"
                    {...fields.name}
                    defaultValue={formData?.name}
                    // className={`form-control ${errors.name ? "is-invalid"}`}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.description} mb="3">
                  <FormLabel>Deskripsi</FormLabel>
                  <Input
                    type="text"
                    {...fields.description}
                    defaultValue={formData?.description}
                  />
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.address} mb="3">
                  <FormLabel>Alamat</FormLabel>
                  <Input
                    type="text"
                    {...fields.address}
                    defaultValue={formData?.address}
                  />
                  <FormErrorMessage>
                    {errors.address && errors.address.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.contact} mb="3">
                  <FormLabel>Kontak</FormLabel>
                  <Input
                    type="text"
                    {...fields.contact}
                    defaultValue={formData?.contact}
                  />
                  <FormErrorMessage>
                    {errors.contact && errors.contact.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.email} mb="3">
                  <FormLabel>E-Mail</FormLabel>
                  <Input
                    // type="text"
                    {...fields.email}
                    defaultValue={formData?.email}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.founder} mb="3">
                  <FormLabel>Founder</FormLabel>
                  <Input
                    type="text"
                    {...fields.founder}
                    defaultValue={formData?.founder}
                  />
                  <FormErrorMessage>
                    {errors.founder && errors.founder.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.level_tenant} mb="3">
                  <FormLabel>Level Tenant</FormLabel>
                  <Input
                    type="text"
                    {...fields.level_tenant}
                    defaultValue={formData?.level_tenant}
                  />
                  <FormErrorMessage>
                    {errors.level_tenant && errors.level_tenant.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.image} mb="3">
                  <FormLabel>Logo</FormLabel>
                  <Input
                    type="text"
                    {...register("image")}
                    defaultValue={formData?.image}
                  />
                  <FormErrorMessage>
                    {errors.image && errors.image.message}
                  </FormErrorMessage>
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

export default ModalEdit;
