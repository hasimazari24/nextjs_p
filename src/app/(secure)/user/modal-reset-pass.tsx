import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  FormControl,FormLabel, Input, Flex,
  FormErrorMessage, Button, Hide
} from "@chakra-ui/react";
import ModalNotif from "../../components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

interface dataReset {
  username: string;
  email: string;
  password: string;
}

interface ModalWithTableProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  tableData: any; // Data untuk tabel
}

const ModalReset: React.FC<ModalWithTableProps> = ({
  isOpen,
  onClose,
  onSubmit,
  tableData,
}) => {
  const {
    register,
    handleSubmit,
    reset, setFocus,
    formState: { errors },
  } = useForm<dataReset>();

  const fields = {
    password: register("password", {
      required: "Isikan Password baru!",
      minLength: {
        value: 4,
        message: "Password minimal 4 karakter",
      },
    }),
  };

  setFocus("password");

  const [isLoading, setIsLoading] = useState(false);
  const [isModalNotif, setModalNotif] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleShowMessage = (msg: string, err: boolean) => {
    setMessage(msg);
    setIsError(err);
    setModalNotif(true);
  };

  const handleFormSubmit: SubmitHandler<any> = async (data) => {
    setIsLoading(true);
    console.log(data);
    try {
      await axiosCustom
        .post(`/user/reset-password`, data)
        .then((response) => {
          // setData(response.data.data);

          if (response.status === 200) {
            handleShowMessage("Password berhasil direset.", false);
          }
        });
      
      onSubmit();
      onClose(); // Tutup modal
      reset(); // Reset formulir
      setIsLoading(false);
      // Setelah data disimpan, atur pesan berhasil ke dalam state
    } catch (error: any) {
      console.error(error);
      if (error?.response) {
        handleShowMessage(
          `Terjadi Kesalahan: ${error.response.data.message}`,
          true,
        );
      } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFocus("password");
  }, [setFocus]);

  // console.log(tableData);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
        }}
        size="md"
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <ModalHeader>Reset Password</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Hide>
                <Input
                  type="text"
                  className="id"
                  disabled
                  defaultValue={tableData?.id}
                />
              </Hide>
              <FormControl mb="3">
                <Flex flexDirection={["column", "row"]}>
                  <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                    <FormLabel>Username</FormLabel>
                  </Box>
                  <Box flex={["1", "75%"]}>
                    <fieldset disabled>
                      <Input
                        type="text"
                        {...register("username")}
                        defaultValue={tableData?.username}
                      />
                    </fieldset>
                  </Box>
                </Flex>
              </FormControl>
              <FormControl mb="3">
                <Flex flexDirection={["column", "row"]}>
                  <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                    <FormLabel>E-mail</FormLabel>
                  </Box>
                  <Box flex={["1", "75%"]}>
                    <fieldset disabled>
                      <Input
                        type="text"
                        {...register("email")}
                        defaultValue={tableData?.email}
                      />
                    </fieldset>
                  </Box>
                </Flex>
              </FormControl>
              <FormControl isInvalid={!!errors.password} mb="3">
                <Flex flexDirection={["column", "row"]}>
                  <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                    <FormLabel>Password</FormLabel>
                  </Box>
                  <Box flex={["1", "75%"]}>
                    <Input type="text" {...fields.password} />
                    <FormErrorMessage>
                      {errors.password && errors.password.message}
                    </FormErrorMessage>
                  </Box>
                </Flex>
              </FormControl>
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
                Reset
              </Button>
              <Button
                leftIcon={<CloseIcon />}
                colorScheme="red"
                onClick={() => {
                  onClose();
                  reset();
                  setIsLoading(false);
                }}
                size="sm"
              >
                Tutup
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <ModalNotif
        isOpen={isModalNotif}
        onClose={() => setModalNotif(false)}
        message={message}
        isError={isError}
      />
    </>
  );
};

export default ModalReset;
