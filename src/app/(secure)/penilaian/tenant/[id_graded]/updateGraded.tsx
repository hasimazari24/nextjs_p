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
  Radio,
  RadioGroup,
  Stack,
  Hide,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  CheckIcon,
  CloseIcon,
  EditIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";

type GradedItem = {
  id: string;
  aspek_penilaian?: string;
  grade: string;
  feedback: string;
};

interface editProps {
  rowData: any;
  onSubmit: () => void;
  roleAccess: string;
}

const UpdateGraded: React.FC<editProps> = ({
  onSubmit,
  rowData,
  roleAccess,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GradedItem>();

  const fields = {
    aspek_penilaian: register("aspek_penilaian", {
      required: "Aspek penilaian harus diisi!",
      maxLength: {
        value: 255,
        message: "Maksimal 255 karakter.",
      },
    }),
    feedback: register("feedback", {
      required: "Komentar harus diisi!",
    }),
    // description: register("description", {
    //   required: "Deskripsi sesi harus diisi!",
    //   maxLength: {
    //     value: 255,
    //     message: "Maksimal 255 karakter.",
    //   },
    // }),
  };

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

  const handleFormSubmit: SubmitHandler<any> = async (data) => {
    // console.log(dataBaru);
    if (data.id) {
      try {
        setIsLoading(true);
        // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
        await axiosCustom
          .patch(`/update-general-grades-tenant/${data.id}`, data)
          .then((response) => {
            // console.log(response);
            if (response.status === 200) {
              handleShowMessage("Data berhasil diubah.", false);
              setIsLoading(false);
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
    }
  };

  const resetAll = () => {
    setModalOpen(false);
    reset(); // Reset formulir
    setIsLoading(false);
  };

  return (
    <div>
      <Button
        bgColor="blue.100"
        _hover={{
          bg: "blue.200",
        }}
        title={roleAccess === "Mentor" ? "Edit Nilai" : "Lihat Penilaian"}
        color="gray.700"
        onClick={() => {
          setModalOpen(true);
        }}
        key="editData"
        size="sm"
      >
        {roleAccess === "Mentor" ? <EditIcon /> : <ViewIcon />}
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
            <ModalHeader>
              {roleAccess === "Mentor" ? "Edit Nilai" : "Lihat Penilaian"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="data-form">
                <FormControl>
                  <Hide>
                    <Input
                      type="text"
                      defaultValue={rowData?.id}
                      {...register("id")}
                    />
                  </Hide>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.aspek_penilaian}
                  mb="3"
                  isReadOnly={roleAccess === "Mentor" ? false : true}
                >
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                      <FormLabel>
                        Aspek Nilai&nbsp;
                        <Text as={"span"} color={"red"}>
                          *
                        </Text>
                      </FormLabel>
                    </Box>
                    <Box flex={["1", "75%"]}>
                      <Input
                        type="text"
                        {...fields.aspek_penilaian}
                        defaultValue={rowData?.aspek_penilaian}
                      />
                      <FormErrorMessage>
                        {errors.aspek_penilaian &&
                          errors.aspek_penilaian.message}
                      </FormErrorMessage>
                    </Box>
                  </Flex>
                </FormControl>
                <FormControl
                  mb="3"
                  isReadOnly={roleAccess === "Mentor" ? false : true}
                >
                  <Flex
                    flexDirection={["column", "row"]}
                    alignItems={["flex-start", "center"]}
                  >
                    <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                      <FormLabel>
                        Nilai&nbsp;
                        <Text as={"span"} color={"red"}>
                          *
                        </Text>
                      </FormLabel>
                    </Box>
                    <Box flex={["1", "75%"]}>
                      <RadioGroup
                        defaultValue={rowData?.grade ? rowData.grade : "A"}
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
                    </Box>
                  </Flex>
                </FormControl>
                <FormControl
                  isInvalid={!!errors.feedback}
                  mb="3"
                  isReadOnly={roleAccess === "Mentor" ? false : true}
                >
                  <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                    <FormLabel>
                      Komentar&nbsp;
                      <Text as={"span"} color={"red"}>
                        *
                      </Text>
                    </FormLabel>
                  </Box>
                  <Box flex={["1", "75%"]}>
                    <Textarea
                      w="full"
                      minH={"200px"}
                      maxH={{ base: "200px", md: "430px" }}
                      h="full"
                      defaultValue={rowData?.feedback}
                      {...fields.feedback}
                    />
                    <FormErrorMessage>
                      {errors.feedback && errors.feedback.message}
                    </FormErrorMessage>
                  </Box>
                </FormControl>
              </div>
            </ModalBody>
            <ModalFooter>
              {roleAccess === "Mentor" && (
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

export default UpdateGraded;
