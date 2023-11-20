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
  Stack,
  HStack,
  VStack,
  useRadio,
  UseRadioProps,
  useRadioGroup,
  Radio,
  RadioGroup,
  Grid,
  Textarea,
  useDisclosure,
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
import { MdArrowBackIosNew, MdTask } from "react-icons/md";
import { BsBox2HeartFill } from "react-icons/bs";
import dynamic from "next/dynamic";
// import "@/app/components/template/date-picker.css";

// Use next/dynamic to import Viewer with ssr: false
const PDFDynamic = dynamic(
  () => import("@/app/components/template/PDFViewer"),
  { ssr: false },
);

interface editProps {
  rowData: any;
  onSubmit: () => void;
  idSesi: string;
}

interface Review {
  id?: string;
  nilai: string;
  comment: string;
}

const ReviewTenant: React.FC<editProps> = ({ onSubmit, rowData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const [reviewAssign, setReviewAssign] = useState<{
    isLoading: boolean;
    dataReview: any | null;
  }>({
    isLoading: true,
    dataReview: null,
  });

  const getReview = async () => {
    // setIsLoading(true);

    try {
      await axiosCustom
        .get(`/assigment/${rowData?.id}/grade/${rowData?.assigment_grade_id}`)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setReviewAssign({
              isLoading: false,
              dataReview: response.data.data,
            });
          }
        });
    } catch (error: any) {
      // console.error(error);
      if (error?.response) {
        handleShowMessage(
          `Terjadi Kesalahan: ${error.response.data.message}`,
          true,
        );
      } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
      setReviewAssign({
        isLoading: false,
        dataReview: null,
      });
    }
  };

  useEffect(() => {
    if (rowData?.assigment_grade_id) getReview();
  }, [rowData?.assigment_grade_id]);

  return (
    <div>
      <Button
        bgColor="blue.500"
        _hover={{
          bg: "blue.400",
        }}
        title="Edit Data"
        color="white"
        onClick={() => onOpen()}
        key="reviewTugas"
        size="sm"
        fontWeight={"thin"}
      >
        <MdTask fontSize="16px" />
        &nbsp; Review Tugas
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
        size="full"
      >
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Lampiran File Tugas</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <Stack py={8} spacing={{ base: 4, md: 6 }} h={"full"}>
              <Grid
                templateColumns={{
                  base: "1fr",
                  md: "1fr 1fr",
                }}
                // alignItems={"center"}
                // justifyItems={"center"}
                gap={{ base: 8, sm: 6, lg: 8 }}
              >
                <Box
                  w="full"
                  p={3}
                  bgColor={"gray.200"}
                  height="full"
                  minH={"200px"}
                  // maxH={"430px"}
                >
                  {reviewAssign.dataReview &&
                    reviewAssign.dataReview.submitted_file_view_url && (
                      // <iframe
                      //   src={dataReview.answer_file_view_url}
                      //   width="auto"
                      //   height="500px"
                      // ></iframe>
                      <PDFDynamic
                        // fileUrl={dataReview.answer_file_view_url}
                        fileUrl={
                          reviewAssign.dataReview.submitted_file_view_url
                        }
                      />
                    )}
                </Box>
                <Stack
                  w="full"
                  h="full"
                  spacing={{ base: 4, md: 6 }}
                  direction="column"
                  flexWrap={"wrap"}
                >
                  <Box>
                    <Text fontWeight={"bold"} fontSize={["17px", "xl", "2xl"]}>
                      {rowData?.title}
                    </Text>
                    <Text fontWeight={"thin"} fontSize={["md", "lg"]}>
                      Mengumpulkan pada : {rowData?.assigment_answer_date},{" "}
                      {rowData?.assigment_answer_time}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight={"bold"} fontSize={["17px", "xl", "2xl"]}>
                      Tanggal Dinilai :
                    </Text>
                    <Text fontWeight={"thin"} fontSize={["md", "lg"]}>
                      {reviewAssign.dataReview?.review_date || "Belum dinilai"}{" "}
                      {reviewAssign.dataReview?.review_time || null}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight={"bold"} fontSize={["17px", "xl", "2xl"]}>
                      Nilai :
                    </Text>
                    <Text fontWeight={"thin"} fontSize={["md", "lg"]}>
                      {reviewAssign.dataReview?.review_grade || "Belum dinilai"}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight={"bold"} fontSize={["17px", "xl", "2xl"]}>
                      Komentar Mentor :
                    </Text>
                    <Text fontWeight={"thin"} fontSize={["md", "lg"]}>
                      {reviewAssign.dataReview?.review_feedback ||
                        "Belum dinilai"}
                    </Text>
                  </Box>
                </Stack>
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

export default ReviewTenant;
