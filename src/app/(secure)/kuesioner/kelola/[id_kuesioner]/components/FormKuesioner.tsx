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

interface GrupProps {
  id: string;
  title: string;
  pertanyaan: PertanyaanProps[];
}

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
  data: {
    id_grup: string;
    pertanyaan: SubmitAnswer[];
  }[];
}

function FormKuesioner({
  dataKuesioner,
  isSubmitted,
  isShowResult,
  onSubmit,
  idKuesioner,
}: {
  dataKuesioner: GrupProps[] | [];
  isSubmitted?: boolean;
  onSubmit?: () => void;
  idKuesioner?: string;
  isShowResult?: boolean;
}) {
  const {
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
        .post(`/kuesioner/${idKuesioner}/tahunan`, data)
        .then((response) => {
          // console.log(response);
          if (response.status === 201) {
            handleShowMessage("Kuesioner berhasil dikirim.", false);
            setIsLoading(false);
          }
        });

      // handleShowMessage("Data berhasil disimpan.", false);

      //   onSubmit(); // Panggil fungsi penyimpanan data (misalnya, untuk memperbarui tampilan tabel)
      // onClose(); // Tutup modal
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

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {dataKuesioner.map((que, index) => (
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
                {...register(`data.${index}.id_grup`)}
                defaultValue={que.id}
              />
            </Hide>
            <Center bgColor={"purple.600"} p={3} w="full">
              <HStack color={"white"}>
                <Icon
                  as={HiFolderOpen}
                  fontSize={["18px", "20px"]}
                  fontWeight={"bold"}
                />
                <Text
                  fontWeight={"semibold"}
                  fontSize={["md", "lg"]}
                  mr={2}
                  textAlign="center"
                >
                  {que.title}
                </Text>
              </HStack>
            </Center>

            {Array.isArray(que.pertanyaan) && que.pertanyaan.length > 0 ? (
              que.pertanyaan.map((d, pertanyaanIndex) => (
                <HStack w="full" align="start" spacing={2} key={d.id}>
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
                      {pertanyaanIndex + 1}
                    </Text>
                  </Box>
                  <Stack spacing={4} w="full">
                    {d.type === "radio" && (
                      <FormControl
                        mb={2}
                        isInvalid={Boolean(
                          errors.data?.[index]?.pertanyaan?.[pertanyaanIndex]
                            ?.opsi_submit?.[0],
                        )}
                      >
                        <Text
                          fontWeight={"bold"}
                          fontSize={["15px", "16px"]}
                          mb={1}
                        >
                          {d.pertanyaan}{" "}
                          {d.is_required && (
                            <span style={{ color: "red" }}>*</span>
                          )}
                        </Text>
                        <small style={{ fontStyle: "italic" }}>{`(${
                          d.note || null
                        })`}</small>
                        <Hide>
                          <Input
                            type="text"
                            {...register(
                              `data.${index}.pertanyaan.${pertanyaanIndex}.id_pertanyaan`,
                            )}
                            defaultValue={d.id}
                          />
                        </Hide>
                        <RadioGroup
                          defaultValue={
                            d.opsi_submit ? d.opsi_submit.toString() : ""
                          }
                        >
                          <Stack spacing={2}>
                            {Array.isArray(d.opsi) &&
                              d.opsi.length > 0 &&
                              d.opsi.map((val) => (
                                <Radio
                                  key={val.id}
                                  value={val.id}
                                  {...register(
                                    `data.${index}.pertanyaan.${pertanyaanIndex}.opsi_submit.0`,
                                    {
                                      required: d.is_required
                                        ? "Pertanyaan ini wajib dipilih."
                                        : false,
                                    },
                                  )}
                                  isReadOnly={isShowResult}
                                >
                                  {val.value}
                                </Radio>
                              ))}
                          </Stack>
                        </RadioGroup>
                        <FormErrorMessage>
                          {
                            errors.data?.[index]?.pertanyaan?.[pertanyaanIndex]
                              ?.opsi_submit?.[0]?.message
                          }
                        </FormErrorMessage>
                      </FormControl>
                    )}
                    {d.type === "short_text" && (
                      <FormControl
                        mb={2}
                        isInvalid={Boolean(
                          errors.data?.[index]?.pertanyaan?.[pertanyaanIndex]
                            ?.text_submit,
                        )}
                      >
                        <Text
                          mb={1}
                          fontWeight={"bold"}
                          fontSize={["15px", "16px"]}
                        >
                          {d.pertanyaan}{" "}
                          {d.is_required && (
                            <span style={{ color: "red" }}>*</span>
                          )}
                        </Text>
                        <small style={{ fontStyle: "italic" }}>{`(${
                          d.note || null
                        })`}</small>
                        <Hide>
                          <Input
                            type="text"
                            {...register(
                              `data.${index}.pertanyaan.${pertanyaanIndex}.id_pertanyaan`,
                            )}
                            defaultValue={d.id}
                          />
                        </Hide>
                        <Input
                          type="text"
                          {...register(
                            `data.${index}.pertanyaan.${pertanyaanIndex}.text_submit`,
                            {
                              required: d.is_required
                                ? "Pertanyaan ini wajib diisi."
                                : false,
                              maxLength: {
                                value: 255,
                                message: "Maksimal 255 karakter.",
                              },
                            },
                          )}
                          defaultValue={d?.text_submit}
                          isReadOnly={isShowResult}
                        />
                        <FormErrorMessage>
                          {
                            errors.data?.[index]?.pertanyaan?.[pertanyaanIndex]
                              ?.text_submit?.message
                          }
                        </FormErrorMessage>
                      </FormControl>
                    )}
                    {d.type === "long_text" && (
                      <FormControl
                        mb={2}
                        isInvalid={Boolean(
                          errors.data?.[index]?.pertanyaan?.[pertanyaanIndex]
                            ?.text_submit,
                        )}
                      >
                        <Text
                          mb={1}
                          fontWeight={"bold"}
                          fontSize={["15px", "16px"]}
                        >
                          {d.pertanyaan}{" "}
                          {d.is_required && (
                            <span style={{ color: "red" }}>*</span>
                          )}
                        </Text>
                        <small style={{ fontStyle: "italic" }}>{`(${
                          d.note || null
                        })`}</small>
                        <Hide>
                          <Input
                            type="text"
                            {...register(
                              `data.${index}.pertanyaan.${pertanyaanIndex}.id_pertanyaan`,
                            )}
                            defaultValue={d.id}
                          />
                        </Hide>
                        <Textarea
                          {...register(
                            `data.${index}.pertanyaan.${pertanyaanIndex}.text_submit`,
                            {
                              required: d.is_required
                                ? "Pertanyaan ini wajib diisi."
                                : false,
                            },
                          )}
                          defaultValue={d?.text_submit}
                          isReadOnly={isShowResult}
                        />
                        <FormErrorMessage>
                          {
                            errors.data?.[index]?.pertanyaan?.[pertanyaanIndex]
                              ?.text_submit?.message
                          }
                        </FormErrorMessage>
                      </FormControl>
                    )}
                    {d.type === "checkbox" && (
                      <FormControl
                        mb={2}
                        isInvalid={Boolean(
                          errors.data?.[index]?.pertanyaan?.[pertanyaanIndex]
                            ?.opsi_submit,
                        )}
                      >
                        <Text
                          mb={1}
                          fontWeight={"bold"}
                          fontSize={["15px", "16px"]}
                        >
                          {d.pertanyaan}{" "}
                          {d.is_required && (
                            <span style={{ color: "red" }}>*</span>
                          )}
                        </Text>
                        <small style={{ fontStyle: "italic" }}>{`(${
                          d.note || null
                        })`}</small>
                        <Hide>
                          <Input
                            type="text"
                            {...register(
                              `data.${index}.pertanyaan.${pertanyaanIndex}.id_pertanyaan`,
                            )}
                            defaultValue={d.id}
                          />
                        </Hide>
                        <CheckboxGroup
                          defaultValue={
                            Array.isArray(d.opsi_submit) ? d.opsi_submit : []
                          }
                        >
                          <Stack spacing={2}>
                            {Array.isArray(d.opsi) &&
                              d.opsi.length > 0 &&
                              d.opsi.map((val) => (
                                <Checkbox
                                  key={val.id}
                                  value={val.id}
                                  {...register(
                                    `data.${index}.pertanyaan.${pertanyaanIndex}.opsi_submit`,
                                    {
                                      required: d.is_required
                                        ? "Pertanyaan ini wajib dipilih."
                                        : false,
                                    },
                                  )}
                                  isReadOnly={isShowResult}
                                >
                                  {val.value}
                                </Checkbox>
                              ))}
                          </Stack>
                        </CheckboxGroup>

                        <FormErrorMessage>
                          {
                            errors.data?.[index]?.pertanyaan?.[pertanyaanIndex]
                              ?.opsi_submit?.message
                          }
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Stack>
                </HStack>
              ))
            ) : (
              <></>
            )}
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
                Saya dengan ini menyatakan bahwa jawaban yang saya berikan dalam
                kuesioner ini sesuai dengan kondisi aktual dan perkembangan
                bisnis saya selama berpartisipasi dalam inkubator bisnis Solo
                Technopark.
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
    </>
  );
}

export default FormKuesioner;
