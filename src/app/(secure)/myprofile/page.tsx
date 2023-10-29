"use client";
import React, { useState, useEffect, useRef } from "react";
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
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";
import { AiOutlineCamera } from "react-icons/ai";
import Link from "next/link";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import ModalSocial from "../../components/modal/modal-social";
import { profile } from "console";
import dynamic from "next/dynamic";

type profile = {
  id?: string;
  fullname?: string;
  username?: string;
  email?: string;
  image?: string;
};

interface pwd {
  password?: string;
  old_password?: string;
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

  const [avatar, setAvatar] = useState<File>();
  const [previewAvatar, setPreviewAvatar] = useState<string>();
  const [idImageAvatar, setIdImageAvatar] = useState<string | null>(null);
  const [idImageAvatarOld, setIdImageAvatarOld] = useState<string | null>(null);
  const [btnDeleteAvatar, setBtnDeleteAvatar] = useState<Boolean>(false);
  const inputFile = useRef<HTMLInputElement>(null);
  // jika button edit avatar klik, brarti input file juga diklik
  const onButtonEditAvatar = () => {
    inputFile.current?.click();
  };
  // fungsi ketika input file avatar change
  const onAvatarChange = (e: any) => {
    // prepare supported file type
    const SUPPORT_FILE_TYPE = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ];
    // prepare max file size
    const MAX_FILE_SIZE = 800000; //800KB
    // ambil input nya
    const file = e?.[0];
    // ambil type dari file
    const UPLOAD_FILE_TYPE = file?.type;
    // ambil size dari file
    const UPLOAD_FILE_SIZE = file?.size;
    if (!SUPPORT_FILE_TYPE.includes(UPLOAD_FILE_TYPE)) {
      handleShowMessage("Maaf. Format File Tidak Dibolehkan.", true);
      file.value = null;
    } else if (UPLOAD_FILE_SIZE > MAX_FILE_SIZE) {
      handleShowMessage(
        "Maaf. File Terlalu Besar! Maksimal Upload 800 KB",
        true,
      );
      file.value = null;
    } else {
      setAvatar(file);
      setPreviewAvatar(URL.createObjectURL(file));
      setIsLoadingEdit(true);
    }
  };

  // fungsi ketika button delete avatar click
  const onButtonDeleteAvatar = () => {
    setPreviewAvatar("/img/avatar-default.jpg");
    setIdImageAvatar(`delete=${idImageAvatarOld}`);
    setIdImageAvatarOld(null);
    setBtnDeleteAvatar(false);
  };

  // logic update avatar disini
  useEffect(() => {
    async function uploadAvatar() {
      if (avatar !== undefined && avatar !== null) {
        try {
          const data = new FormData();
          data.append("asset", avatar as File);
          const upload = await axiosCustom.post("/assets/upload", data, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          setIdImageAvatar(upload.data.data.id);
        } catch (error: any) {
          // tampilken error
          if (error?.response) {
            handleShowMessage(
              `Terjadi Kesalahan: ${error.response.data.message}`,
              true,
            );
          } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
        } finally {
          setIsLoadingEdit(false);
        }
      }
    }
    uploadAvatar();
  }, [avatar]);

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
    old_password: registerPwd("old_password", {
      required: "Isikan Password Lama!",
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
        if (response.data.data.image_id !== null) {
          setIdImageAvatarOld(response.data.data.image_id);
          setBtnDeleteAvatar(true);
        } else setBtnDeleteAvatar(false);
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
    // refactoring data untuk mendukung update avatar
    const dataBaru: profile = {
      fullname: `${data.fullname}`,
      username: `${data.username}`,
      email: `${data.email}`,
    };
    // append jika idImageAvatar not null
    if (idImageAvatar) dataBaru.image = idImageAvatar;
    setIsLoadingEdit(true);
    try {
      await axiosCustom
        .patch("/user/myprofile/update", dataBaru)
        .then((response) => {
          // setData(response.data.data);
          if (response.status === 200) {
            const timer = setTimeout(() => {
              setIsLoadingEdit(false);
            }, 1000);
            handleShowMessage(response.data.message, false);
            // jika data yg dikirim ada image
            if (dataBaru.image) {
              // cek dulu dek jika bisa dipecah jadi dua maka kosongkan idimgold
              if (dataBaru.image.split("=").length === 2)
                setIdImageAvatarOld(null);
              // kosongkan img avatar
              setIdImageAvatar(null);
              // tampilkan btn delete
              setBtnDeleteAvatar(true);
            }
            return () => clearTimeout(timer);
          }
        });
      await getTampil();
    } catch (error: any) {
      // console.error("Gagal memuat data:", error);
      if (error?.response) {
        handleShowMessage(
          `Terjadi Kesalahan: ${error.response.data.message}`,
          true,
        );
      } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
    } finally {
      setIsLoadingEdit(false);
    }
  };

  const onSubmitPassword: SubmitHandler<pwd> = async (data) => {
    setIsLoadingEdit(true);
    try {
      await axiosCustom
        .patch("/user/update-password", data)
        .then((response) => {
          // setData(response.data.data);
          // console.log(response);
          if (response.status === 200) {
            const timer = setTimeout(() => {
              setIsLoadingEdit(false);
              resetPwd();
            }, 1000);
            handleShowMessage(response.data.message, false);
            return () => clearTimeout(timer);
          }
        });
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      // console.log(error);
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
                  <Box
                    position="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    mb="3"
                    cursor={"pointer"}
                  >
                    {/* tambahan untuk update avatar */}
                    {previewAvatar ? (
                      <Image
                        src={previewAvatar}
                        h={{ base: "100px", sm: "200px", lg: "200px" }}
                        w={{ base: "100px", sm: "200px", lg: "200px" }}
                        borderRadius="full"
                        alt="Preview Avatar"
                        fit={"cover"}
                      />
                    ) : (
                      <Image
                        src={dataTampil?.image_url}
                        h={{ base: "100px", sm: "200px", lg: "200px" }}
                        w={{ base: "100px", sm: "200px", lg: "200px" }}
                        borderRadius="full"
                        alt="Avatar"
                      />
                    )}
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
                          onClick={onButtonEditAvatar}
                          aria-label="Edit"
                          title="Ubah"
                          icon={<AiOutlineCamera size="20px" />}
                          colorScheme="teal"
                        />
                        {btnDeleteAvatar && (
                          <IconButton
                            onClick={onButtonDeleteAvatar}
                            aria-label="Delete"
                            title="Hapus"
                            icon={<DeleteIcon />}
                            colorScheme="red"
                          />
                        )}
                      </HStack>
                    </Stack>
                  </Box>
                </Flex>
                <Box w="full">
                  <form onSubmit={handleProfile(onSubmitProfile)}>
                    <FormControl isInvalid={!!errProfile.fullname} mb="3">
                      <Flex flexDirection={["column", "row"]}>
                        <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                          <FormLabel minW="110px">
                            Nama Lengkap&nbsp;
                            <Text as={"span"} color={"red"}>
                              *
                            </Text>
                          </FormLabel>
                        </Box>
                        <Box flex={["1", "75%"]}>
                          <Input
                            type="text"
                            {...fields.fullname}
                            defaultValue={dataTampil?.fullname}
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
                          <FormLabel minW="110px">
                            Username&nbsp;
                            <Text as={"span"} color={"red"}>
                              *
                            </Text>
                          </FormLabel>
                        </Box>
                        <Box flex={["1", "75%"]}>
                          <Input
                            type="text"
                            {...fields.username}
                            defaultValue={dataTampil?.username}
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
                          <FormLabel minW="110px">
                            E-Mail&nbsp;
                            <Text as={"span"} color={"red"}>
                              *
                            </Text>
                          </FormLabel>
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
                    <Input
                      ref={inputFile}
                      style={{ display: "none" }}
                      type="file"
                      onChange={(e) => onAvatarChange(e.target.files)}
                    />
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
                      <FormControl isInvalid={!!errPwd.old_password} mb="3">
                        <Flex flexDirection={["column", "row"]}>
                          <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                            <FormLabel minW="110px">
                              Password Lama&nbsp;
                              <Text as={"span"} color={"red"}>
                                *
                              </Text>
                            </FormLabel>
                          </Box>
                          <Box flex={["1", "75%"]}>
                            <Input
                              type="password"
                              {...fields_pwd.old_password}
                            />
                            <FormErrorMessage>
                              {errPwd.old_password &&
                                errPwd.old_password.message}
                            </FormErrorMessage>
                          </Box>
                        </Flex>
                      </FormControl>

                      <FormControl isInvalid={!!errPwd.password} mb="4">
                        <Flex flexDirection={["column", "row"]}>
                          <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                            <FormLabel minW="110px">
                              Password Baru&nbsp;
                              <Text as={"span"} color={"red"}>
                                *
                              </Text>
                            </FormLabel>
                          </Box>
                          <Box flex={["1", "75%"]}>
                            <Input type="password" {...fields_pwd.password} />
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
                            <FormLabel minW="110px">
                              Konfirmasi&nbsp;
                              <Text as={"span"} color={"red"}>
                                *
                              </Text>
                            </FormLabel>
                          </Box>
                          <Box flex={["1", "75%"]}>
                            <Input
                              type="password"
                              {...fields_pwd.password_confirmation}
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
                          isLoading={isLoadingEdit}
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
                          <Link href={link.url} key={link.id} target="_blank">
                            <HStack alignItems={"center"} pr="3">
                              <IconButton
                                color="blue.300"
                                aria-label="web"
                                size="sm"
                                icon={<FaGlobe size="sm" />}
                                title={link.url}
                                _hover={{
                                  color: "blue.500", // Ganti dengan warna saat hover
                                }}
                                backgroundColor="rgba(0, 0, 0, 0)"
                              />
                            </HStack>
                          </Link>
                        );
                      } else if (link.title === "Facebook") {
                        return (
                          <Link href={link.url} key={link.id} target="_blank">
                            <HStack alignItems={"center"} pr="3">
                              <IconButton
                                color="blue.600"
                                aria-label="web"
                                icon={<FaFacebook size="sm" />}
                                size="sm"
                                title={link.url}
                                _hover={{
                                  color: "blue.900",
                                }}
                                backgroundColor="rgba(0, 0, 0, 0)"
                              />
                            </HStack>
                          </Link>
                        );
                      } else if (link.title === "Instagram") {
                        return (
                          <Link href={link.url} key={link.id} target="_blank">
                            <HStack alignItems={"center"} pr="3">
                              <IconButton
                                color="pink.500"
                                aria-label="web"
                                icon={<FaInstagram size="sm" />}
                                size="sm"
                                title={link.url}
                                _hover={{
                                  color: "pink.700",
                                }}
                                backgroundColor="rgba(0, 0, 0, 0)"
                              />
                            </HStack>
                          </Link>
                        );
                      } else if (link.title === "Twitter") {
                        return (
                          <Link href={link.url} key={link.id} target="_blank">
                            <HStack alignItems={"center"} pr="3">
                              <IconButton
                                color="blue.400"
                                aria-label="web"
                                icon={<FaTwitter size="sm" />}
                                size="sm"
                                title={link.url}
                                _hover={{
                                  color: "blue.700",
                                }}
                                backgroundColor="rgba(0, 0, 0, 0)"
                              />
                            </HStack>
                          </Link>
                        );
                      } else if (link.title === "YouTube") {
                        return (
                          <Link href={link.url} key={link.id} target="_blank">
                            <HStack alignItems={"center"} pr="3">
                              <IconButton
                                color="red.500"
                                aria-label="web"
                                icon={<FaYoutube size="sm" />}
                                size="sm"
                                title={link.url}
                                _hover={{
                                  color: "red.700",
                                }}
                                backgroundColor="rgba(0, 0, 0, 0)"
                              />
                            </HStack>
                          </Link>
                        );
                      } else if (link.title === "LinkedIn") {
                        return (
                          <Link href={link.url} key={link.id} target="_blank">
                            <Link href="impuls.id">
                              <HStack alignItems={"center"} pr="3">
                                <IconButton
                                  color="blue.500"
                                  aria-label="web"
                                  icon={<FaLinkedin size="sm" />}
                                  size="sm"
                                  title={link.url}
                                  _hover={{
                                    color: "blue.800",
                                  }}
                                  backgroundColor="rgba(0, 0, 0, 0)"
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
        // formData={dataLinks}
        idUser={dataTampil?.id}
        onDelete={() => getTampil()}
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(MyProfile), {
  ssr: false,
  // suspense: true,
  loading: () => <p>Memuat halaman ...</p>,
});
