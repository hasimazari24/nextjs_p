"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Box,
  Text,
  Stack,
  HStack,
  VStack,
  Radio,
  RadioGroup,
  Grid,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import {
  useForm,
  SubmitHandler,
  useController,
  Controller,
  UseFormRegister,
} from "react-hook-form";
import { AddIcon, CalendarIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";
import initRichTextProps from "@/app/type/inital-rich-text";
import { Editor } from "@tinymce/tinymce-react";
import * as ClassInfo from "@/app/type/class-type.d";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdArrowBackIosNew, MdOutlineScheduleSend } from "react-icons/md";
import { FaBuildingUser } from "react-icons/fa6";
// import "@/app/components/template/date-picker.css";

interface editProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  dataReview: any | null;
  namaTugas: string | null;
  roleAccess: string;
}

interface Review {
  grade: string;
  feedback: string;
}

const ReviewMentor: React.FC<editProps> = ({
  isOpen,
  onClose,
  onSubmit,
  dataReview,
  namaTugas,
  roleAccess,
}) => {
  const { register, handleSubmit, reset } = useForm<Review>();

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
  // const [reviewAssign, setReviewAssign] = useState({
  //   isLoading: true,
  //   dataReview: null,
  // });

  const handleFormSubmit: SubmitHandler<any> = async (data) => {
    // console.log(data);
    // jika ada grade maka update, else maka insert

    if (!dataReview?.answer_id) {
      return handleShowMessage(
        "Maaf, tidak dapat menilai karena Tenant belum mengirimkan jawaban tugas atau Ingatkan Tenant terlebih dahulu.",
        true,
      );
    }

    try {
      setIsLoading(true);
      if (dataReview?.graded_answer_id) {
        await axiosCustom
          .put(
            `/assigment-answer-update-grading/${dataReview?.graded_answer_id}`,
            data,
          )
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              handleShowMessage("Penilain berhasil diperbaharui.", false);
              setIsLoading(false);
            }
          });
        //   onSubmit(); // Panggil fungsi penyimpanan data (misalnya, untuk memperbarui tampilan tabel)
        onClose(); // Tutup modal
        resetAll();
      } else {
        await axiosCustom
          .post(`/assigment-answer/${dataReview?.answer_id}/add-grading`, data)
          .then((response) => {
            console.log(response);
            if (response.status === 201) {
              handleShowMessage("Penilaian berhasil disimpan.", false);
              setIsLoading(false);
            }
          });
        //   onSubmit(); // Panggil fungsi penyimpanan data (misalnya, untuk memperbarui tampilan tabel)
        onClose(); // Tutup modal
        resetAll();
      }
      // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit

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
  };

  // console.log(dataReview);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          resetAll();
          onClose();
        }}
        size="full"
      >
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Penilaian Tugas</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={{ base: 4, md: 6 }} h={"full"} p={3}>
              <VStack spacing={0} align="flex-start">
                <Text fontWeight={"bold"} fontSize={["17px", "xl", "2xl"]}>
                  Penilaian Tugas : {namaTugas}
                </Text>
                <Stack
                  spacing={{ base: 1, md: 6 }}
                  direction={{ base: "column", md: "row" }}
                >
                  <HStack alignItems={"center"}>
                    <FaBuildingUser fontSize={"20px"} />
                    <Text fontSize={["15px", "lg", "xl"]}>
                      {dataReview?.tenant_name}
                    </Text>
                  </HStack>
                  <HStack alignItems={"center"}>
                    <MdOutlineScheduleSend fontSize={"22px"} />
                    <Text fontWeight={"thin"} fontSize={["md", "lg"]}>
                      {dataReview?.submitted_date || "Belum dikirim"}
                    </Text>
                  </HStack>
                </Stack>
              </VStack>
              <Grid
                templateColumns={{
                  base: "1fr",
                  md: "1fr 1fr",
                }}
                alignItems={"center"}
                justifyItems={"center"}
                gap={{ base: 8, sm: 6, lg: 8 }}
              >
                <Box
                  w="full"
                  px={3}
                  bgColor={"gray.200"}
                  height="full"
                  minH={"200px"}
                  // maxH={"430px"}
                >
                  {dataReview && dataReview.answer_file_view_url && (
                    <iframe
                      src={dataReview.answer_file_view_url}
                      width="auto"
                      height="500px"
                    ></iframe>
                  )}
                </Box>
                <Box w="full" h="full" display="flex" flexDirection="column">
                  <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    // style={{ height: "100%" }}
                  >
                    <Stack spacing={{ base: 4, md: 6 }}>
                      <FormControl
                        isReadOnly={roleAccess === "Mentor" ? false : true}
                      >
                        <FormLabel>Nilai</FormLabel>
                        <RadioGroup
                          defaultValue={
                            dataReview?.graded_answer_grade
                              ? dataReview?.graded_answer_grade
                              : "A"
                          }
                          // defaultValue={"A"}
                        >
                          <Stack
                            spacing={{ base: 6, md: 8 }}
                            direction="row"
                            fontWeight={"bold"}
                          >
                            <Radio
                              value="A"
                              {...register("grade")}
                              size={{ base: "md", lg: "lg" }}
                              colorScheme="green"
                            >
                              A
                            </Radio>
                            <Radio
                              value="B"
                              {...register("grade")}
                              size={{ base: "md", lg: "lg" }}
                              colorScheme="green"
                            >
                              B
                            </Radio>
                            <Radio
                              value="C"
                              {...register("grade")}
                              size={{ base: "md", lg: "lg" }}
                              colorScheme="green"
                            >
                              C
                            </Radio>
                            <Radio
                              value="D"
                              {...register("grade")}
                              size={{ base: "md", lg: "lg" }}
                              colorScheme="green"
                            >
                              D
                            </Radio>
                            <Radio
                              value="E"
                              {...register("grade")}
                              size={{ base: "md", lg: "lg" }}
                              colorScheme="green"
                            >
                              E
                            </Radio>
                          </Stack>
                        </RadioGroup>
                      </FormControl>
                      <FormControl
                        isReadOnly={roleAccess === "Mentor" ? false : true}
                      >
                        <FormLabel>Komentar</FormLabel>
                        <Textarea
                          w="full"
                          minH={"200px"}
                          maxH={{ base: "200px", md: "430px" }}
                          h="full"
                          defaultValue={dataReview?.graded_answer_feedback}
                          {...register("feedback")}
                        />
                      </FormControl>
                      {roleAccess === "Mentor" && (
                        <HStack align={"end"}>
                          <Button
                            leftIcon={<CheckIcon />}
                            colorScheme="blue"
                            type="submit"
                            isLoading={isLoading}
                            size="md"
                            w="full"
                          >
                            {"Simpan"}
                          </Button>
                        </HStack>
                      )}
                    </Stack>
                  </form>
                </Box>
              </Grid>
            </Stack>
          </ModalBody>
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

export default ReviewMentor;
