"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Text,
  Input,
  Stack,
  HStack,
  Button,
  FormControl,
  FormLabel,
  Spinner,
  Center,
  Box,
  FormErrorMessage,
  Flex,
  Container,
  Image,
  VStack,
  SimpleGrid,
  Avatar,
  Divider,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";
import { TbWorldWww } from "react-icons/tb";
import {
  AiOutlineFacebook,
  AiOutlineLinkedin,
  AiOutlineCamera,
} from "react-icons/ai";
import Link from "next/link";
import {
  EditIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import ModalSocial from "../../components/modal/modal-social";

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

interface userLinks {
  id: string;
  title: string;
  url: string;
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
  const [dataLinks, setDataLinks] = useState<Array<userLinks>>([]);
  const [isModalSocial, setIsModalSocial] = useState(false);

  const getTampil = async () => {
    try {
      const response = await axiosCustom.get("/user/myprofile");
      const timer = setTimeout(() => {
        setDataTampil(response.data.data);
        setDataLinks(response.data.data.user_link);
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
          true,
        );
      } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
      setIsLoadingEdit(false);
    }
  };

   const [isHovered, setIsHovered] = useState(false);

   const handleMouseEnter = () => {
     setIsHovered(true);
   };

   const handleMouseLeave = () => {
     setIsHovered(false);
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
          <Container maxW={"7xl"} pl="0" pr="0">
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              spacing={{ base: 8, md: 10 }}
            >
              <VStack>
                <Text fontSize="lg" fontWeight="bold" mb="3">
                  EDIT PROFILE
                </Text>
                <Flex
                  justify={"center"}
                  //   mt={{ base: "-50px", sm: "-100", lg: "-100" }}
                >
                  {/* <Avatar
                    h={{ base: "100px", sm: "200px", lg: "200px" }}
                    w="100%"
                    src={
                      "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                    css={{
                      border: "5px solid white",
                    }}
                  /> */}

                  <Box
                    position="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    mb="3"
                    cursor={"pointer"}
                  >
                    <Image
                      src={
                        "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                      }
                      h={{ base: "100px", sm: "200px", lg: "200px" }}
                      w="100%"
                      borderRadius="full"
                    />

                    <Stack
                      position="absolute"
                      bottom="0"
                      right="0"
                      padding="2"
                      spacing="2"
                      direction="column"
                      background="rgba(0, 0, 0, 0.7)"
                      opacity={isHovered ? 1 : 0} // Mengatur opacity berdasarkan isHovered
                      transition="opacity 0.2s ease-in-out" // Efek transisi
                      h={{ base: "100px", sm: "200px", lg: "200px" }}
                      w="100%"
                      justifyContent={"center"}
                      align={"center"}
                      borderRadius="full"
                    >
                      <HStack spacing="1">
                        <IconButton
                          aria-label="Edit"
                          title="Ubah"
                          icon={<AiOutlineCamera size="20px" />}
                          colorScheme="teal"
                        />
                        <IconButton
                          aria-label="Delete"
                          title="Hapus"
                          icon={<DeleteIcon />}
                          colorScheme="red"
                        />
                      </HStack>
                    </Stack>
                  </Box>
                </Flex>
                <Box w="full">
                  <form onSubmit={handleProfile(onSubmitProfile)}>
                    <FormControl isInvalid={!!errProfile.fullname} mb="3">
                      <Flex flexDirection={["column", "row"]}>
                        <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                          <FormLabel minW="110px">Nama Lengkap</FormLabel>
                        </Box>
                        <Box flex={["1", "75%"]}>
                          <Input
                            type="text"
                            {...fields.fullname}
                            defaultValue={dataTampil?.fullname}
                            // className={`form-control ${errors.name ? "is-invalid"}`}
                          />
                          <FormErrorMessage>
                            {errProfile.fullname && errProfile.fullname.message}
                          </FormErrorMessage>
                        </Box>
                      </Flex>
                    </FormControl>

                    <FormControl isInvalid={!!errProfile.username} mb="3">
                      <Flex flexDirection={["column", "row"]}>
                        <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                          <FormLabel minW="110px">Username</FormLabel>
                        </Box>
                        <Box flex={["1", "75%"]}>
                          <Input
                            type="text"
                            {...fields.username}
                            defaultValue={dataTampil?.username}
                            // className={`form-control ${errors.name ? "is-invalid"}`}
                          />
                          <FormErrorMessage>
                            {errProfile.username && errProfile.username.message}
                          </FormErrorMessage>
                        </Box>
                      </Flex>
                    </FormControl>

                    <FormControl isInvalid={!!errProfile.email} mb="3">
                      <Flex flexDirection={["column", "row"]}>
                        <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                          <FormLabel minW="110px">E-Mail</FormLabel>
                        </Box>
                        <Box flex={["1", "75%"]}>
                          <Input
                            type="text"
                            {...fields.email}
                            defaultValue={dataTampil?.email}
                            // className={`form-control ${errors.name ? "is-invalid"}`}
                          />
                          <FormErrorMessage>
                            {errProfile.email && errProfile.email.message}
                          </FormErrorMessage>
                        </Box>
                      </Flex>
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
              </VStack>

              <Box>
                <VStack>
                  <Text fontSize="lg" fontWeight="bold" mb="3">
                    EDIT PASSWORD
                  </Text>
                  <Box w="full">
                    <form onSubmit={handlePwd(onSubmitPassword)}>
                      <FormControl isInvalid={!!errPwd.password_old} mb="3">
                        <Flex flexDirection={["column", "row"]}>
                          <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                            <FormLabel minW="110px">Password Lama</FormLabel>
                          </Box>
                          <Box flex={["1", "75%"]}>
                            <Input
                              type="text"
                              {...fields_pwd.password_old}
                              defaultValue={dataTampil?.password_old}
                              // className={`form-control ${errors.name ? "is-invalid"}`}
                            />
                            <FormErrorMessage>
                              {errPwd.password_old &&
                                errPwd.password_old.message}
                            </FormErrorMessage>
                          </Box>
                        </Flex>
                      </FormControl>

                      <FormControl isInvalid={!!errPwd.password} mb="4">
                        <Flex flexDirection={["column", "row"]}>
                          <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                            <FormLabel minW="110px">Password Baru</FormLabel>
                          </Box>
                          <Box flex={["1", "75%"]}>
                            <Input
                              type="text"
                              {...fields_pwd.password}
                              defaultValue={dataTampil?.password}
                              // className={`form-control ${errors.name ? "is-invalid"}`}
                            />
                            <FormErrorMessage>
                              {errPwd.password && errPwd.password.message}
                            </FormErrorMessage>
                          </Box>
                        </Flex>
                      </FormControl>

                      <FormControl
                        isInvalid={!!errPwd.password_confirmation}
                        mb="4"
                      >
                        <Flex flexDirection={["column", "row"]}>
                          <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                            <FormLabel minW="110px">Konfirmasi</FormLabel>
                          </Box>
                          <Box flex={["1", "75%"]}>
                            <Input
                              type="text"
                              {...fields_pwd.password_confirmation}
                              defaultValue={dataTampil?.password_confirmation}
                              // className={`form-control ${errors.name ? "is-invalid"}`}
                            />
                            <FormErrorMessage>
                              {errPwd.password_confirmation &&
                                errPwd.password_confirmation.message}
                            </FormErrorMessage>
                          </Box>
                        </Flex>
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

                  <Divider mt="3" mb="3" />

                  <Text fontSize="lg" fontWeight="bold" mb="3">
                    EDIT SOCIAL LINKS
                  </Text>
                </VStack>
                <Stack direction={["column", "row"]} mb="3">
                  {dataLinks.length !== 0 ? (
                    dataLinks.map((link) => {
                      if (link.title === "Website") {
                        return (
                          <Link href={link.url} target="_blank">
                            <HStack alignItems={"center"} pr="3">
                              <IconButton
                                colorScheme="blue"
                                aria-label="web"
                                title="Website"
                                icon={<TbWorldWww size="xs" />}
                              />
                            </HStack>
                          </Link>
                        );
                      } else if (link.title === "Facebook") {
                        return (
                          <Link href={link.url} target="_blank">
                            <HStack alignItems={"center"} pr="3">
                              <IconButton
                                colorScheme="facebook"
                                aria-label="web"
                                icon={<AiOutlineFacebook size="xs" />}
                              />
                            </HStack>
                          </Link>
                        );
                      } else if (link.title === "LinkedIn") {
                        return (
                          <Link href={link.url} target="_blank">
                            <Link href="impuls.id">
                              <HStack alignItems={"center"} pr="3">
                                <IconButton
                                  colorScheme="linkedin"
                                  aria-label="web"
                                  icon={<AiOutlineLinkedin size="xs" />}
                                />
                              </HStack>
                            </Link>
                          </Link>
                        );
                      }
                    })
                  ) : (
                    <Text as="i" mb="3">
                      Belum ada social links. Tambahkan melalui Edit Social
                      Links di bawah ini.
                    </Text>
                  )}
                </Stack>
                <Flex justify="flex-end">
                  <Button
                    bgColor="blue.400"
                    _hover={{
                      bg: "blue.500",
                    }}
                    color="white"
                    onClick={() => setIsModalSocial(true)}
                    key="editSocial"
                  >
                    <EditIcon /> &nbsp; Edit Social Links
                  </Button>
                </Flex>
              </Box>
            </SimpleGrid>
          </Container>
        </>
      )}
      <ModalNotif
        isOpen={isModalNotif}
        onClose={() => setModalNotif(false)}
        message={message}
        isError={isError}
      />
      <ModalSocial
        isOpen={isModalSocial}
        onClose={() => setIsModalSocial(false)}
        onSubmit={() => {
          getTampil();
        }}
        formData={dataLinks}
        idUser={dataTampil?.id}
        onDelete={() => getTampil()}
      />
    </div>
  );
};

export default MyProfile;
