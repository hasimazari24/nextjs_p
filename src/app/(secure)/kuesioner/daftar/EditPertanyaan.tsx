"use client";
import React, { useState } from "react";
import {
  Text,
  Button,
  Stack,
  Flex,
  useDisclosure,
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Checkbox,
  Textarea,
} from "@chakra-ui/react";

import { EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useForm, SubmitHandler } from "react-hook-form";
import ModalNotif from "@/app/components/modal/modal-notif";

function EditPertanyaan({ formdata, type }: { formdata: any; type: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<{ question: string; checklist: boolean; note: string }>();

  const resetAll = () => {
    reset();
    onClose();
  };

  const fields = {
    question: register("question", {
      required: "Pertanyaan harus diisi!",
      maxLength: {
        value: 255,
        message: "Maksimal 255 karakter.",
      },
    }),
  };

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
    console.log(data);
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
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          resetAll();
        }}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <ModalHeader>Edit Pertanyaan {type}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="data-form">
                <FormControl mb="3" isInvalid={!!errors.question}>
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "20%"]} marginRight={["0", "2"]}>
                      <FormLabel>
                        Pertanyaan&nbsp;
                        <Text as={"span"} color={"red"}>
                          *
                        </Text>
                      </FormLabel>
                    </Box>
                    <Box flex={["1", "80%"]}>
                      <Textarea
                        {...fields.question}
                        // className={`form-control ${errors.name ? "is-invalid"}`}
                      />
                      <FormErrorMessage>
                        {errors.question && errors.question.message}
                      </FormErrorMessage>
                    </Box>
                  </Flex>
                </FormControl>
                <FormControl mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "20%"]} marginRight={["0", "2"]}>
                      <FormLabel>Wajib Isi</FormLabel>
                    </Box>
                    <Box flex={["1", "80%"]}>
                      <Checkbox
                        size="md"
                        colorScheme="blue"
                        {...register("checklist")}
                        onChange={(e) =>
                          setValue("checklist", e.target.checked)
                        }
                        defaultChecked
                      >
                        {/* <Checkbox {...register('checkboxValue')} onChange={(e) => setValue('checkboxValue', e.target.checked)}></Checkbox> */}
                        (Checklist jika jawaban wajib diisi Responden)
                      </Checkbox>
                    </Box>
                    <FormErrorMessage>
                      {/* {errors.description && errors.description.message} */}
                    </FormErrorMessage>
                  </Flex>
                </FormControl>
                <FormControl mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "20%"]} marginRight={["0", "2"]}>
                      <FormLabel>Catatan</FormLabel>
                    </Box>
                    <Box flex={["1", "80%"]}>
                      <Input
                        type="text"
                        {...register("note")}
                        // className={`form-control ${errors.name ? "is-invalid"}`}
                      />
                      <FormErrorMessage>
                        {/* {errors.name && errors.name.message} */}
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
        // onSubmit={() => onSubmit()}
      />
    </div>
  );
}

export default EditPertanyaan;