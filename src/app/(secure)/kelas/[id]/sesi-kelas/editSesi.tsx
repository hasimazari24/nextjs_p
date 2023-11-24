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
  Hide,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler, useController } from "react-hook-form";
import { EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";
import initRichTextProps from "@/app/type/inital-rich-text";
import { Editor } from "@tinymce/tinymce-react";

type SesiItem = {
  id: string;
  title: string;
  description: string;
};

interface editProps {
  onSubmit: () => void;
  rowData: SesiItem;
}

const EditSesi: React.FC<editProps> = ({ onSubmit, rowData }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm<SesiItem>();

  const fields = {
    // id:register("id"),
    title: register("title", {
      required: "Judul sesi harus diisi!",
      maxLength: {
        value: 255,
        message: "Maksimal 255 karakter.",
      },
    }),
    // description: register("description", {
    //   required: "Deskripsi sesi harus diisi!",
    //   maxLength: {
    //     value: 255,
    //     message: "Maksimal 255 karakter.",
    //   },
    // }),
  };

  const {
    field: { onChange, ref, value, ...field },
  } = useController({
    control,
    name: "description",
    defaultValue: rowData?.description,
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

  const handleFormSubmit: SubmitHandler<any> = async (data) => {
    // console.log(dataBaru);
    setIsLoading(true);

    try {
      // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
      await axiosCustom
        .patch(`/update-course-item/${rowData.id}`, data)
        .then((response) => {
          // console.log(response);
          if (response.status === 200) {
            handleShowMessage("Data berhasil diubah.", false);
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
    setIsLoading(false);
    reset({ description: "" });
  };

  useEffect(() => {
    if (isModalOpen === true) {
      clearErrors("description");
      setValue("description", rowData?.description);
      // reset({ description: "" });
    }
  }, [isModalOpen]);

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
        &nbsp; Edit Sesi
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
            <ModalHeader>Edit Sesi</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="data-form">
                {/* <FormControl>
                  <Hide>
                    <Input {...fields.id} defaultValue={rowData.id} />
                  </Hide>
                </FormControl> */}
                <FormControl isInvalid={!!errors.title} mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                      <FormLabel>
                        Nama Sesi&nbsp;
                        <Text as={"span"} color={"red"}>
                          *
                        </Text>
                      </FormLabel>
                    </Box>
                    <Box flex={["1", "75%"]}>
                      <Input
                        type="text"
                        {...fields.title}
                        defaultValue={rowData.title}
                        // classtitle={`form-control ${errors.title ? "is-invalid"}`}
                      />
                      <FormErrorMessage>
                        {errors.title && errors.title.message}
                      </FormErrorMessage>
                    </Box>
                  </Flex>
                </FormControl>
                <FormControl isInvalid={!!errors.description} mb="3">
                  <FormLabel>Deskripsi Sesi</FormLabel>
                  <Editor
                    {...field}
                    apiKey={process.env.API_TINYMCE}
                    initialValue={rowData.description}
                    value={value}
                    init={{
                      ...initRichTextProps,
                      toolbar_mode: "sliding",
                      height: 180,
                    }}
                    onEditorChange={onChange}
                  />
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
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

export default EditSesi;
