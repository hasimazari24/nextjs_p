"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Text,
  Input,
  InputGroup,
  Button,
  FormControl,
  FormLabel,
  Spinner,
  Center,
  Box,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";

type profile = {
  id?: string;
  fullname?: string;
  username?: string;
  email?: string;
  image?: string;
};

interface pwd {
  password?: string;
  password_old?: string;
  password_confirmation?: string;
}

const MyProfile: React.FC = () => {
  const {
    reset: resetProfile,
    handleSubmit: handleProfile,
    register: registerProfile,
    formState: { errors: errProfile },
  } = useForm<profile>();

  const {
    reset: resetPwd,
    handleSubmit: handlePwd,
    register: registerPwd,
    formState: { errors: errPwd },
  } = useForm<pwd>();

  const fields = {
    fullname: registerProfile("fullname", {
      required: "Nama Lengkap harus diisi",
    }),
    username: registerProfile("username", { required: "Username harus diisi" }),
    email: registerProfile("email", {
      required: "E-mail harus diisi",
      pattern: {
        value:
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "E-mail tidak valid",
      },
    }),
  };

  const fields_pwd = {
    password: registerPwd("password", {
      required: "Isikan Password baru!",
      minLength: {
        value: 6,
        message: "Password minimal 6 karakter",
      },
    }),
    password_old: registerPwd("password_old", {
      required: "Isikan Password Lama!",
      minLength: {
        value: 6,
        message: "Password minimal 6 karakter",
      },
    }),
    password_confirmation: registerPwd("password_confirmation", {
      required: "Isikan Konfirmasi Password baru!",
      minLength: {
        value: 6,
        message: "Password minimal 6 karakter",
      },
    }),
  };

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [isModalNotif, setModalNotif] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleShowMessage = (msg: string, err: boolean) => {
    setMessage(msg);
    setIsError(err);
    setModalNotif(true);
  };

  const [dataTampil, setDataTampil] = useState<any | null>([]);
  const getTampil = async () => {
    try {
      const response = await axiosCustom.get("/user/myprofile");
      const timer = setTimeout(() => {
        setDataTampil(response.data.data);
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Gagal memuat data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Panggil fungsi fetchData untuk memuat data
    getTampil();
    // Clear the timeout when the component is unmounted
  }, []);

  const onSubmitProfile: SubmitHandler<profile> = async (data) => {
    setIsLoadingEdit(true);
    try {
      await axiosCustom.put("/user/myprofile/update", data).then((response) => {
        // setData(response.data.data);
        if (response.status === 200) {
          const timer = setTimeout(() => {
            setIsLoadingEdit(false);
          }, 1000);
          handleShowMessage("Data berhasil diubah.", false);
          return () => clearTimeout(timer);
        }
      });
      await getTampil();
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      if (error?.response) {
        handleShowMessage(
          `Terjadi Kesalahan: ${error.response.data.message}`,
          true,
        );
      } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
      setIsLoadingEdit(false);
    }
  };

  const onSubmitPassword: SubmitHandler<pwd> = async (data) => {
    setIsLoadingEdit(true);
    try {
      await axiosCustom.put("/user/update-password", data).then((response) => {
        // setData(response.data.data);
        console.log(response);
        if (response.status === 200) {
          const timer = setTimeout(() => {
            setIsLoadingEdit(false);
            resetPwd();
          }, 1000);
          handleShowMessage("Data berhasil diubah.", false);
          return () => clearTimeout(timer);
        }
      });
      
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      console.log(error);
      if (error?.response) {
        handleShowMessage(
          `Terjadi Kesalahan: ${error.response.data.message}`,
          true
        );
      } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
      setIsLoadingEdit(false);
    }
  };

  return (
    // <VStack spacing={8} p={4}>
    <div>
      {isLoading ? (
        <Center h="100%" m="10">
          <Spinner className="spinner" size="xl" color="blue.500" />
        </Center>
      ) : (
        <>
          <Text fontSize="lg" fontWeight="bold" mb="5">
            EDIT PROFILE
          </Text>
          <Box maxW="630">
            <form onSubmit={handleProfile(onSubmitProfile)}>
              <FormControl isInvalid={!!errProfile.fullname} mb="4">
                <InputGroup>
                  <FormLabel minW="120px">Nama Lengkap</FormLabel>
                  <Input
                    type="text"
                    {...fields.fullname}
                    defaultValue={dataTampil?.fullname}
                    // className={`form-control ${errors.name ? "is-invalid"}`}
                  />
                </InputGroup>

                <FormErrorMessage pl="130px" pb="2">
                  {errProfile.fullname && errProfile.fullname.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errProfile.username} mb="4">
                <InputGroup>
                  <FormLabel minW="120px">Username</FormLabel>
                  <Input
                    type="text"
                    {...fields.username}
                    defaultValue={dataTampil?.username}
                    // className={`form-control ${errors.name ? "is-invalid"}`}
                  />
                </InputGroup>

                <FormErrorMessage pl="130px" pb="2">
                  {errProfile.username && errProfile.username.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errProfile.email} mb="4">
                <InputGroup>
                  <FormLabel minW="120px">E-Mail</FormLabel>
                  <Input
                    type="text"
                    {...fields.email}
                    defaultValue={dataTampil?.email}
                    // className={`form-control ${errors.name ? "is-invalid"}`}
                  />
                </InputGroup>

                <FormErrorMessage pl="130px" pb="2">
                  {errProfile.email && errProfile.email.message}
                </FormErrorMessage>
              </FormControl>
              <Flex justify="flex-end">
                <Button
                  leftIcon={<CheckIcon />}
                  colorScheme="teal"
                  type="submit"
                  isLoading={isLoadingEdit}
                  size="md"
                >
                  Simpan Profile
                </Button>
              </Flex>
            </form>
          </Box>

          <Text fontSize="lg" fontWeight="bold" mb="5" mt="3">
            EDIT PASSWORD
          </Text>
          <Box maxW="630">
            <form onSubmit={handlePwd(onSubmitPassword)}>
              <FormControl isInvalid={!!errPwd.password_old} mb="4">
                <InputGroup>
                  <FormLabel minW="120px">Password Lama</FormLabel>
                  <Input
                    type="text"
                    {...fields_pwd.password_old}
                    defaultValue={dataTampil?.password_old}
                    // className={`form-control ${errors.name ? "is-invalid"}`}
                  />
                </InputGroup>

                <FormErrorMessage pl="130px" pb="2">
                  {errPwd.password_old && errPwd.password_old.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errPwd.password} mb="4">
                <InputGroup>
                  <FormLabel minW="120px">Password Baru</FormLabel>
                  <Input
                    type="text"
                    {...fields_pwd.password}
                    defaultValue={dataTampil?.password}
                    // className={`form-control ${errors.name ? "is-invalid"}`}
                  />
                </InputGroup>

                <FormErrorMessage pl="130px" pb="2">
                  {errPwd.password && errPwd.password.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errPwd.password_confirmation} mb="4">
                <InputGroup>
                  <FormLabel minW="120px">Konfirmasi</FormLabel>
                  <Input
                    type="text"
                    {...fields_pwd.password_confirmation}
                    defaultValue={dataTampil?.password_confirmation}
                    // className={`form-control ${errors.name ? "is-invalid"}`}
                  />
                </InputGroup>

                <FormErrorMessage pl="130px" pb="2">
                  {errPwd.password_confirmation &&
                    errPwd.password_confirmation.message}
                </FormErrorMessage>
              </FormControl>
              <Flex justify="flex-end">
                <Button
                  leftIcon={<CheckIcon />}
                  colorScheme="green"
                  type="submit"
                  isLoading={isLoading}
                  size="md"
                >
                  Simpan Password
                </Button>
              </Flex>
            </form>
          </Box>
        </>
      )}
      <ModalNotif
        isOpen={isModalNotif}
        onClose={() => setModalNotif(false)}
        message={message}
        isError={isError}
      />
    </div>
  );
};

export default MyProfile;
