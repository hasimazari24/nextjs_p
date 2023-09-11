"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  VStack,
  Text,
  Input,
  InputGroup,
  InputAddon,
  InputLeftAddon,
  Button,
  FormControl,
  FormLabel,
  Spinner,
  Center,
  Box,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import apiCall from "../../components/api-call";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import ModalNotif from "../../components/modal-notif";

type FormValues = {
  fullname?: string;
  username?: string;
  email?: string;
  password?: string;
  password_old?: string;
  password_confirmation?: string;
};

const MyProfile: React.FC = () => {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const fields = {
    fullname: register("fullname", { required: "Nama Lengkap harus diisi" }),
    username: register("username", { required: "Username harus diisi" }),
    email: register("email", {
      required: "E-mail harus diisi",
      pattern: {
        value : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message : "E-mail tidak valid",
      },
    }),
  };

  const fields_pwd = {
    password: register("password", {
      required: "Isikan Password baru!",
      minLength: {
        value: 6,
        message: "Password minimal 6 karakter",
      },
    }),
    password_old: register("password_old", {
      required: "Isikan Password Lama!",
      minLength: {
        value: 6,
        message: "Password minimal 6 karakter",
      },
    }),
    password_confirmation: register("password_confirmation", {
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
      const response = await axios.get(apiCall.getProfileById);
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

  const onSubmitProfile: SubmitHandler<FormValues> = async (data) => {
    setIsLoadingEdit(true);
    try {
      await axios.put(apiCall.getProfileById, data).then((response) => {
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
          true
        );
      } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
      setIsLoadingEdit(false);
    }
  };

  const onSubmitPassword: SubmitHandler<FormValues> = async (data) => {
    setIsLoadingEdit(true);
    try {
      await axios
        .put(apiCall.getProfileById + "/password", data)
        .then((response) => {
          // setData(response.data.data);
          console.log(response);
          if (response.status === 200) {
            const timer = setTimeout(() => {
              setIsLoadingEdit(false);
              reset();
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
            <form onSubmit={handleSubmit(onSubmitProfile)}>
              <FormControl isInvalid={!!errors.fullname} mb="4">
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
                  {errors.fullname && errors.fullname.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.username} mb="4">
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
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.email} mb="4">
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
                  {errors.email && errors.email.message}
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
            <form onSubmit={handleSubmit(onSubmitPassword)}>
              <FormControl isInvalid={!!errors.password_old} mb="4">
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
                  {errors.password_old && errors.password_old.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password} mb="4">
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
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password_confirmation} mb="4">
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
                  {errors.password_confirmation &&
                    errors.password_confirmation.message}
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
