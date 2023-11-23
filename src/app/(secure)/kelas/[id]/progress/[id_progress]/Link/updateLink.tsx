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
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import {
  useForm,
  SubmitHandler,
  useController,
  Controller,
} from "react-hook-form";
import {
  AddIcon,
  CalendarIcon,
  CheckIcon,
  CloseIcon,
  EditIcon,
} from "@chakra-ui/icons";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";
import initRichTextProps from "@/app/type/inital-rich-text";
import { Editor } from "@tinymce/tinymce-react";
import * as ClassInfo from "@/app/type/class-type.d";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "@/app/components/template/date-picker.css";

interface editProps {
  onSubmit: () => void;
  dataEdit: any;
}

const UpdateLink: React.FC<editProps> = ({ onSubmit, dataEdit }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<ClassInfo.TmbLink>();

  const fields = {
    title: register("title", {
      required: "Judul harus diisi!",
      maxLength: {
        value: 255,
        message: "Maksimal 255 karakter.",
      },
    }),
    url: register("url", {
      required: "Masukkan URL Link!",
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

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFormSubmit: SubmitHandler<any> = async (data) => {
    // console.log(data);
    setIsLoading(true);

    try {
      // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
      await axiosCustom
        .patch(`/update-course-item-link/${dataEdit.id}`, data)
        .then((response) => {
          // console.log(response);
          if (response.status === 200) {
            handleShowMessage("Data berhasil diubah.", false);
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
      <Button
        bgColor="blue.100"
        _hover={{
          bg: "blue.200",
        }}
        title="Edit Data"
        color="gray.700"
        onClick={() => onOpen()}
        key="editData"
        size="sm"
      >
        <EditIcon />
        &nbsp; Edit
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          resetAll();
          onClose();
        }}
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <ModalHeader>Edit Link</ModalHeader>
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
                        defaultValue={dataEdit.title}
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
                  <FormLabel>Deskripsi Tugas</FormLabel>
                  <Editor
                    {...fieldDescription}
                    apiKey={process.env.API_TINYMCE}
                    initialValue={dataEdit.description}
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
                <FormControl mb="3" isInvalid={!!errors.url}>
                  <Flex flexDirection={["column", "row"]}>
                    <Box minWidth={["100%", "110px"]} marginRight={["0", "2"]}>
                      <FormLabel>
                        Tambah Link&nbsp;
                        <Text as={"span"} color={"red"}>
                          *
                        </Text>
                      </FormLabel>
                    </Box>
                    <Box w="full">
                      <Input
                        type="text"
                        {...fields.url}
                        defaultValue={dataEdit.url}
                      />
                      <FormErrorMessage>
                        {errors.url && errors.url.message}
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

export default UpdateLink;
