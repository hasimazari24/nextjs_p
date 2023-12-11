"use client";
import React, { useState } from "react";
import { HiFolderOpen } from "react-icons/hi";
import {
  HStack,
  Icon,
  Stack,
  Text,
  Center,
  Radio,
  RadioGroup,
  FormControl,
  FormErrorMessage,
  Button,
  Hide,
  Input,
  Textarea,
  Checkbox,
  CheckboxGroup,
  Box,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InfoIcon } from "@chakra-ui/icons";
import ModalNotif from "@/app/components/modal/modal-notif";
import { RiSendPlaneFill } from "react-icons/ri";
import { axiosCustom } from "@/app/api/axios";

interface PertanyaanProps {
  id: string;
  pertanyaan: string;
  type: string; // Add other types if needed
  is_required: boolean;
  note: string;
  opsi: OpsiProps;
  text_submit?: string;
  opsi_submit?: string | string[] | null;
}

interface OpsiProps {
  id: string;
  value: string;
}

interface SubmitAnswer {
  id_pertanyaan: string;
  opsi_submit: OpsiProps[];
  text_submit: string;
}

interface FormData {
  data: SubmitAnswer[];
}

function FormNilaiMentor({
  dataPertanyaan,
  isSubmitted,
  onSubmit,
  idKuesioner,
  isShowResult,
}: {
  dataPertanyaan: PertanyaanProps[] | [];
  isSubmitted?: boolean;
  onSubmit?: () => void;
  idKuesioner?: string;
  isShowResult?: boolean;
}) {
  const {
    // control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isDone, setIsDone] = useState(false);
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

  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    // console.log(data);
    try {
      setIsLoading(true);
      // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
      await axiosCustom
        .post(`/kuesioner/${idKuesioner}/nilai-mentor`, data)
        .then((response) => {
          // console.log(response);
          if (response.status === 201) {
            handleShowMessage("Kuesioner berhasil dikirim.", false);
            setIsLoading(false);
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
      setIsLoading(false);
    }
  };

  return (
    <Stack w="full">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {dataPertanyaan.map((que, index) => (
          <Stack
            w="full"
            spacing={3}
            p={{ base: 2, md: 4 }}
            rounded={["md", "lg"]}
            borderWidth={"4px"}
            borderColor={"purple.500"}
            key={que.id}
            mb={4}
          >
            <Hide>
              <Input
                {...register(`data.${index}.id_pertanyaan`)}
                defaultValue={que.id}
              />
            </Hide>
            <HStack w="full" align="start" spacing={2}>
              <Box
                // p={1}
                rounded={"md"}
                bgColor={"purple.500"}
                // boxSize={"30px"}
                color={"white"}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  w="25px"
                  as={"b"}
                  textAlign={"center"}
                  whiteSpace={"nowrap"}
                  mt="0.5"
                >
                  {index + 1}
                </Text>
              </Box>
              <Stack spacing={4} key={que.id} mt="0.5" w="full">
                {que.type === "radio" && (
                  <FormControl
                    mb={2}
                    isInvalid={Boolean(errors.data?.[index]?.opsi_submit?.[0])}
                  >
                    <Text
                      fontWeight={"bold"}
                      fontSize={["15px", "16px"]}
                      mb={1}
                    >
                      {que.pertanyaan}{" "}
                      {que.is_required && (
                        <span style={{ color: "red" }}>*</span>
                      )}
                    </Text>
                    <Hide>
                      <Input
                        type="text"
                        {...register(`data.${index}.id_pertanyaan`)}
                        defaultValue={que.id}
                      />
                    </Hide>
                    <RadioGroup
                      defaultValue={
                        que.opsi_submit ? que.opsi_submit.toString() : ""
                      }
                    >
                      <Stack spacing={2}>
                        {Array.isArray(que.opsi) &&
                          que.opsi.length > 0 &&
                          que.opsi.map((val) => (
                            <Radio
                              key={val.id}
                              value={val.id}
                              {...register(`data.${index}.opsi_submit.0`, {
                                required: que.is_required
                                  ? "Pertanyaan ini wajib dipilih."
                                  : false,
                              })}
                              isReadOnly={isShowResult}
                            >
                              {val.value}
                            </Radio>
                          ))}
                      </Stack>
                    </RadioGroup>
                    <FormErrorMessage>
                      {errors.data?.[index]?.opsi_submit?.[0]?.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
                {que.type === "short_text" && (
                  <FormControl
                    mb={2}
                    isInvalid={Boolean(errors.data?.[index]?.text_submit)}
                  >
                    <Text
                      mb={1}
                      fontWeight={"bold"}
                      fontSize={["15px", "16px"]}
                    >
                      {que.pertanyaan}{" "}
                      {que.is_required && (
                        <span style={{ color: "red" }}>*</span>
                      )}
                    </Text>
                    <Hide>
                      <Input
                        type="text"
                        {...register(`data.${index}.id_pertanyaan`)}
                        defaultValue={que.id}
                      />
                    </Hide>
                    <Input
                      type="text"
                      {...register(`data.${index}.text_submit`, {
                        required: que.is_required
                          ? "Pertanyaan ini wajib diisi."
                          : false,
                        maxLength: {
                          value: 255,
                          message: "Maksimal 255 karakter.",
                        },
                      })}
                      isReadOnly={isShowResult}
                      defaultValue={que?.text_submit}
                    />
                    <FormErrorMessage>
                      {errors.data?.[index]?.text_submit?.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
                {que.type === "long_text" && (
                  <FormControl
                    mb={2}
                    isInvalid={Boolean(errors.data?.[index]?.text_submit)}
                  >
                    <Text
                      mb={1}
                      fontWeight={"bold"}
                      fontSize={["15px", "16px"]}
                    >
                      {que.pertanyaan}{" "}
                      {que.is_required && (
                        <span style={{ color: "red" }}>*</span>
                      )}
                    </Text>
                    <Hide>
                      <Input
                        type="text"
                        {...register(`data.${index}.id_pertanyaan`)}
                        defaultValue={que.id}
                      />
                    </Hide>
                    <Textarea
                      {...register(`data.${index}.text_submit`, {
                        required: que.is_required
                          ? "Pertanyaan ini wajib diisi."
                          : false,
                      })}
                      defaultValue={que?.text_submit}
                      isReadOnly={isShowResult}
                    />
                    <FormErrorMessage>
                      {errors.data?.[index]?.text_submit?.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
                {que.type === "checkbox" && (
                  <FormControl
                    mb={2}
                    isInvalid={Boolean(errors.data?.[index]?.opsi_submit)}
                  >
                    <Text
                      mb={1}
                      fontWeight={"bold"}
                      fontSize={["15px", "16px"]}
                    >
                      {que.pertanyaan}{" "}
                      {que.is_required && (
                        <span style={{ color: "red" }}>*</span>
                      )}
                    </Text>
                    <Hide>
                      <Input
                        type="text"
                        {...register(`data.${index}.id_pertanyaan`)}
                        defaultValue={que.id}
                      />
                    </Hide>
                    <CheckboxGroup
                      defaultValue={
                        Array.isArray(que.opsi_submit) ? que.opsi_submit : []
                      }
                    >
                      <Stack spacing={2}>
                        {Array.isArray(que.opsi) &&
                          que.opsi.length > 0 &&
                          que.opsi.map((val) => (
                            <Checkbox
                              key={val.id}
                              value={val.id}
                              {...register(`data.${index}.opsi_submit`, {
                                required: que.is_required
                                  ? "Pertanyaan ini wajib dipilih."
                                  : false,
                              })}
                              isReadOnly={isShowResult}
                            >
                              {val.value}
                            </Checkbox>
                          ))}
                      </Stack>
                    </CheckboxGroup>

                    <FormErrorMessage>
                      {errors.data?.[index]?.opsi_submit?.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Stack>
            </HStack>
          </Stack>
        ))}
        {isSubmitted && (
          <Stack alignItems={"center"} w="full" spacing={3} pb={5} pt={3}>
            <Checkbox
              onChange={(e) => setIsDone(e.target.checked)}
              alignItems={"start"}
              borderColor={"blue.400"}
              alignContent={"justify"}
            >
              <Text mt={-1} textAlign={"justify"}>
                Saya dengan ini menyatakan bahwa saya telah menilai mentor
                tersebut dengan cermat dan obyektif selama periode mentoring
                dalam inkubator bisnis Solo Technopark.
              </Text>
            </Checkbox>
            <HStack
              color="gray.600"
              alignItems={"start"}
              justifyContent={"center"}
            >
              <InfoIcon />
              <Text fontSize={"15px"} mt={"-3px"}>
                Kuesioner ini hanya bisa diisi satu kali, pastikan Anda sudah
                mengisinya dengan benar
              </Text>
            </HStack>
            <Button
              colorScheme="blue"
              type="submit"
              size={"md"}
              w="170px"
              justifyContent={"start"}
              isDisabled={!isDone}
              isLoading={isLoading}
            >
              <RiSendPlaneFill fontSize={"18px"} />
              &nbsp; Kirim Jawaban
            </Button>
          </Stack>
        )}
      </form>

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
        onSubmit={() => (onSubmit ? onSubmit() : null)}
      />
    </Stack>
  );
}

export default FormNilaiMentor;
