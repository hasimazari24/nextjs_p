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
  HStack,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Hide,
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
import { BsFiletypePdf } from "react-icons/bs";
// import "@/app/components/template/date-picker.css";

interface editProps {
  onSubmit: () => void;
  rowData: any;
}

const UpdateFile: React.FC<editProps> = ({ onSubmit, rowData }) => {
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
  const [addFile, setAddFile] = useState<File>();
  const [idFile, setIdFile] = useState<string | null>(null);
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [changeFile, setChangeFile] = useState(false);
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

  //   console.log(idFile);

  const handleFormSubmit: SubmitHandler<any> = async (data) => {
    const dataBaru: {
      title: string;
      description: string;
      id_asset?: string | null;
    } = {
      title: data.title,
      description: data.description,
    };

    if (idFile) dataBaru.id_asset = idFile;

    try {
      setIsLoading(true);
      // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
      await axiosCustom
        .patch(`/update-course-item-file/${data.id}`, dataBaru)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            handleShowMessage("Data berhasil diubah.", false);
            setIsLoading(false);
          }
        });

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
    setModalOpen(false);
    clearErrors("description");
    setIsLoading(false);
    setChangeFile(false);
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
        onClick={() => setModalOpen(true)}
        key="editData"
        size="sm"
      >
        <EditIcon />
        &nbsp; Edit
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          resetAll();
        }}
        size="4xl"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <ModalHeader>Edit File</ModalHeader>
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
                        defaultValue={rowData?.title}
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
                    initialValue={rowData?.description}
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
                      {rowData?.id_asset &&
                        (changeFile !== true ? (
                          <HStack spacing={2}>
                            <BsFiletypePdf fontSize="20px" />
                            <Link
                              href={rowData?.url_asset}
                              target="_blank"
                              color="blue.500"
                              _hover={{ color: "blue.400" }}
                            >
                              <Text
                                textOverflow="ellipsis"
                                whiteSpace={"nowrap"}
                                // noOfLines={1}
                                maxW={{
                                  base: "100px",
                                  md: "150px",
                                  lg: "250px",
                                }}
                                overflow="hidden"
                                // as="u"
                              >
                                {rowData.title}
                              </Text>
                            </Link>
                            <Button
                              colorScheme="gray"
                              key="gantiFile"
                              size="sm"
                              alignItems={"center"}
                              justifyContent="start"
                              fontWeight="normal"
                              onClick={() => setChangeFile(true)}
                            >
                              Ganti
                            </Button>
                          </HStack>
                        ) : (
                          <HStack spacing={2}>
                            <Input
                              type="file"
                              // ref={inputFile}
                              onChange={onFileChange}
                            />
                            <Button
                              colorScheme="gray"
                              key="gantiFile"
                              size="sm"
                              isDisabled={isLoading}
                              alignItems={"center"}
                              justifyContent="start"
                              fontWeight="normal"
                              onClick={() => setChangeFile(false)}
                            >
                              Batal
                            </Button>
                          </HStack>
                        ))}

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

export default UpdateFile;
