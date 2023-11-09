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
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm, SubmitHandler, useController } from "react-hook-form";
import {
  AddIcon,
  CheckIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";
import initRichTextProps from "@/app/type/inital-rich-text";
import { Editor } from "@tinymce/tinymce-react";
import AddMentor from "./addMentor";

type AwardItem = {
  id?: string;
  name: string;
  description: string;
};

interface editProps {
  onSubmit: () => void;
}

const AddClass: React.FC<editProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
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
    // description: register("description", {
    //   required: "Deskripsi kelas harus diisi!",
    //   maxLength: {
    //     value: 255,
    //     message: "Maksimal 255 karakter.",
    //   },
    // }),
  };
  const {
    field: { onChange, ref, ...field },
  } = useController({
    control,
    name: "description",
    rules: { required: "Deskripsi Kelas harus diisi!" },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [idMentor, setIdMentor] = useState<string | null>(null);
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
    // console.log(data);
    if (!idMentor) return handleShowMessage("Maaf Mentor harus dipilih!", true);
    const dataBaru = {
      name: `${data.name}`,
      description: `${data.description}`,
      id_mentor: idMentor,
    };
    // console.log(dataBaru);
    setIsLoading(true);
    
    try {
      // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
      await axiosCustom.post(`/course/add-course`, dataBaru).then((response) => {
        // console.log(response);
        if (response.status === 201) {
          handleShowMessage("Data berhasil disimpan.", false);
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
  };

  const resetAll = () => {
    setModalOpen(false);
    reset(); // Reset formulir
    setIdMentor(null);
    setIsLoading(false);
  };

  return (
    <div>
      <Button
        colorScheme="green"
        key="tambahData"
        size="sm"
        onClick={() => setModalOpen(true)}
      >
        <AddIcon />
        &nbsp;Tambah Kelas
      </Button>

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
                        // className={`form-control ${errors.name ? "is-invalid"}`}
                      />
                      <FormErrorMessage>
                        {errors.name && errors.name.message}
                      </FormErrorMessage>
                    </Box>
                  </Flex>
                </FormControl>
                <FormControl isInvalid={!!errors.description} mb="3">
                  <FormLabel>
                    Deskripsi Kelas&nbsp;
                    <Text as={"span"} color={"red"}>
                      *
                    </Text>
                  </FormLabel>
                  <Editor
                    {...field}
                    apiKey={process.env.API_TINYMCE}
                    initialValue=""
                    init={{
                      ...initRichTextProps,
                      toolbar_mode: "sliding",
                      height: 200,
                    }}
                    onEditorChange={onChange}
                  />
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>
                <AddMentor onResult={(id) => setIdMentor(id)} />
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
                {"Tambah"}
              </Button>
              <Button
                leftIcon={<CloseIcon />}
                color={"red.400"}
                bgColor="red.50"
                _hover={{
                  bg: "red.50",
                }}
                onClick={() => {
                  resetAll();
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
    </div>
  );
};

export default AddClass;
