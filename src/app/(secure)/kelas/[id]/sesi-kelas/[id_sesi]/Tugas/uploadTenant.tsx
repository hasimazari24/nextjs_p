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
  Link,
  SimpleGrid,
  PinInputDescendantsProvider,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  HStack,
  Center,
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
  CheckCircleIcon,
  CheckIcon,
  CloseIcon,
  InfoIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";
import initRichTextProps from "@/app/type/inital-rich-text";
import { Editor } from "@tinymce/tinymce-react";
import * as ClassInfo from "@/app/type/class-type.d";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaFileUpload } from "react-icons/fa";
import { BsFiletypePdf } from "react-icons/bs";

interface uploadProps {
  rowData: any | null;
  idSesi: string;
  onSubmit: () => void;
}

function UploadTenant({ rowData, idSesi, onSubmit }: uploadProps) {
  const { register, handleSubmit, reset } = useForm<any>();
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
  const [idFile, setIdFile] = useState<string | null>(null);
  const [changeFile, setChangeFile] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      id_assigment: rowData?.id,
      id_asset: idFile,
    };

    try {
      setIsLoading(true);
      //   assigment_answer_id !== null artinya sudah mengumpulkan tugas jadi diedit
      if (rowData?.answer_id) {
        await axiosCustom
          .put(`/course-item/${idSesi}/update-submit-assigment`, dataBaru)
          .then((response) => {
            // console.log(response);
            if (response.status === 200) {
              handleShowMessage("Upload jawaban berhasil diubah.", false);
              setIsLoading(false);
            }
          });
        resetAll();
      } else {
        await axiosCustom
          .post(`/course-item/${idSesi}/submit-assigment`, dataBaru)
          .then((response) => {
            // console.log(response);
            if (response.status === 201) {
              handleShowMessage(
                "Upload jawaban berhasil. Silahkan lihat Review Tugas.",
                false,
              );
              setIsLoading(false);
            }
          });
        resetAll();
      }

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
    setIsLoading(false);
    onClose();
  };
  return (
    <div>
      <Button
        bgColor="cyan.500"
        _hover={{
          bg: "cyan.400",
        }}
        title="Upload Jawaban"
        color="white"
        onClick={() => onOpen()}
        key="uploadJwban"
        size="sm"
        fontWeight={"thin"}
      >
        <FaFileUpload />
        &nbsp; Upload Tugas
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          resetAll();
        }}
        size="2xl"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <ModalHeader>Upload Jawaban : {rowData?.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Jika sudah closed dan belum upload jwban maka tdk bsa upload */}
              {rowData?.assigment_closed === true &&
              rowData?.answer_id === null ? (
                <>
                  <Center mb="3">
                    <WarningIcon w={12} h={12} color="green.500" />
                  </Center>
                  <Text fontWeight="bold" fontSize="4xl" align="center" mb="6">
                    Anda Tidak Bisa Upload Karena Terlambat
                  </Text>
                </>
              ) : rowData?.graded_answer_id ? (
                // jika sudah upload dan sudah dinilai
                <>
                  <Center mb="3">
                    <CheckCircleIcon w={12} h={12} color="green.500" />
                  </Center>
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    align="center"
                    mb="6"
                  >
                    Jawaban Anda sudah dinilai. Silahkan lihat Review Tugas
                  </Text>
                </>
              ) : rowData?.assigment_closed === true &&
                rowData?.answer_id &&
                rowData?.graded_answer_id === null ? (
                // jika sudah close dan sudah submit dan blum dinilai mentor
                <>
                  <Center mb="3">
                    <InfoIcon w={12} h={12} color="cyan.500" />
                  </Center>
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    align="center"
                    mb="6"
                  >
                    Tugas sudah ditutup, Anda sudah Upload Jawaban dan sedang
                    dinilai Mentor. Silahkan lihat Review Tugas
                  </Text>
                </>
              ) : (
                <div className="data-form">
                  <FormControl mb="6">
                    <Flex flexDirection={["column", "row"]}>
                      <Box
                        minWidth={["100%", "130px"]}
                        marginRight={["0", "2"]}
                      >
                        <FormLabel>
                          Upload File Pdf&nbsp;
                          <Text as={"span"} color={"red"}>
                            *
                          </Text>
                        </FormLabel>
                      </Box>
                      <Box w="full">
                        {rowData?.answer_id ? (
                          changeFile !== true ? (
                            <HStack spacing={2}>
                              <BsFiletypePdf fontSize="20px" />
                              <Link
                                href={rowData?.answer_file_download_url}
                                target="_blank"
                                color="blue.500"
                                _hover={{ color: "blue.400" }}
                              >
                                <Text
                                  textOverflow="ellipsis"
                                  whiteSpace={"nowrap"}
                                  // noOfLines={1}
                                  maxW={{
                                    base: "200px",
                                    md: "250px",
                                    lg: "350px",
                                  }}
                                  overflow="hidden"
                                  // as="u"
                                >
                                  Jawaban untuk : {rowData.title}
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
                          )
                        ) : (
                          <Input
                            type="file"
                            // ref={inputFile}
                            onChange={onFileChange}
                          />
                        )}

                        <FormErrorMessage>
                          {/* {errors.title && errors.title.message} */}
                        </FormErrorMessage>
                      </Box>
                    </Flex>
                  </FormControl>

                  <HStack justifyContent={"flex-end"} mb="4">
                    {!rowData?.answer_id || changeFile === true && (
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
                    )}

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
                  </HStack>
                </div>
              )}
            </ModalBody>
            {/* <ModalFooter>
              
            </ModalFooter> */}
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
}

export default UploadTenant;
