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
  SimpleGrid,
  PinInputDescendantsProvider,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import {
  useForm,
  SubmitHandler,
  useController,
  Controller,
} from "react-hook-form";
import { AddIcon, CalendarIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";
import initRichTextProps from "@/app/type/inital-rich-text";
import { Editor } from "@tinymce/tinymce-react";
import * as ClassInfo from "@/app/type/class-type.d";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "@/app/components/template/date-picker.css";

interface editProps {
  isOpen: boolean;
  onClose: () => void;
  idSesi: string;
  onSubmit: () => void;
}

const AddFile: React.FC<editProps> = ({
  isOpen,
  onClose,
  onSubmit,
  idSesi,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<{ id: string; title: string; description: string }>();

  const fields = {
    title: register("title", {
      required: "Judul harus diisi!",
      maxLength: {
        value: 255,
        message: "Maksimal 255 karakter.",
      },
    }),
  };

  const {
    field: {
      onChange: onChangeDescription,
      ref: refDescription,
      ...fieldDescription
    },
    // fieldState: { invalid: isDescriptionInvalid, error: descriptionError },
  } = useController({
    control,
    name: "description",
    // rules: { required: "Deskripsi Sesi harus diisi!" },
  });

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
  const [addFile, setAddFile] = useState<File>();
  const [idFile, setIdFile] = useState<string | null>(null);
  const inputFile = useRef<HTMLInputElement | null>(null);
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      axiosCustom.delete(`/assets/${idFile}/delete`);
      setIdFile(null);
      return;
    }

    if (file.size > 6000000) {
      // 6MB
      handleShowMessage("Maaf. File Terlalu Besar! Maksimal Upload 6 MB", true);
      return;
    }

    if (file.type !== "application/pdf") {
      handleShowMessage(
        "Maaf format file tidak didukung. hanya File PDF yang Dibolehkan.",
        true,
      );
      return;
    }
    handleUpload(file);
  };

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("asset", file);
    try {
      const upload = await axiosCustom.post("/assets/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIdFile(upload.data.data.id);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      if (error?.response) {
        handleShowMessage(
          `Terjadi Kesalahan: ${error.response.data.message}`,
          true,
        );
      } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
    }
  };

  // console.log(idFile);

  const handleFormSubmit: SubmitHandler<any> = async (data) => {
    // console.log(data);
    if (!idFile) {
      return handleShowMessage("Maaf. Silahkan upload file dengan benar", true);
    }

    const dataBaru = {
      title: data.title,
      description: data.description,
      id_asset: idFile,
    };

    try {
      setIsLoading(true);
      // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
      await axiosCustom
        .post(`/course-item/${idSesi}/add-file`, dataBaru)
        .then((response) => {
          // console.log(response);
          if (response.status === 201) {
            handleShowMessage("Data berhasil disimpan.", false);
            setIsLoading(false);
          }
        });
      //   onSubmit(); // Panggil fungsi penyimpanan data (misalnya, untuk memperbarui tampilan tabel)
      onClose(); // Tutup modal
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
    reset(); // Reset formulir
    reset({ description: "" });
    clearErrors("description");
    setIsLoading(false);
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          resetAll();
          onClose();
        }}
        size="4xl"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <ModalHeader>Tambah File</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="data-form">
                <FormControl isInvalid={!!errors.title} mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box minWidth={["100%", "110px"]} marginRight={["0", "2"]}>
                      <FormLabel>
                        Judul&nbsp;
                        <Text as={"span"} color={"red"}>
                          *
                        </Text>
                      </FormLabel>
                    </Box>
                    <Box w="full">
                      <Input
                        type="text"
                        {...fields.title}
                        // className={`form-control ${errors.name ? "is-invalid"}`}
                      />
                      <FormErrorMessage>
                        {errors.title && errors.title.message}
                      </FormErrorMessage>
                    </Box>
                  </Flex>
                </FormControl>
                <FormControl isInvalid={!!errors.description} mb="3">
                  <FormLabel>Deskripsi File</FormLabel>
                  <Editor
                    {...fieldDescription}
                    apiKey={process.env.API_TINYMCE}
                    initialValue=""
                    init={{
                      ...initRichTextProps,
                      toolbar_mode: "sliding",
                      height: 180,
                    }}
                    onEditorChange={onChangeDescription}
                  />
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box minWidth={["100%", "110px"]} marginRight={["0", "2"]}>
                      <FormLabel>
                        Upload File&nbsp;
                        <Text as={"span"} color={"red"}>
                          *
                        </Text>
                      </FormLabel>
                    </Box>
                    <Box w="full">
                      <Input
                        type="file"
                        // ref={inputFile}
                        onChange={onFileChange}
                      />
                      <FormErrorMessage>
                        {/* {errors.title && errors.title.message} */}
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
    </div>
  );
};

export default AddFile;
