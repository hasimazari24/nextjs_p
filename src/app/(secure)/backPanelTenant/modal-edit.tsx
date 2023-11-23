// components/Modal.tsx
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
  Hide,
  Flex,
  Text,
  Box,
  useDisclosure,
  Textarea,
  Select,
  HStack,
  IconButton,
  Stack,
  Image,
  RadioGroup,
  Radio,
  SimpleGrid,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { CheckIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import { AiOutlineCamera } from "react-icons/ai";
import ModalNotif from "../../components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";
import { useAuth } from "@/app/components/utils/AuthContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // data: any; // Data yang akan ditampilkan dalam modal
  onSubmit: () => void;
  // values?: FormValues;
  // title: string;
  isEdit?: boolean; // Tambahkan prop isEdit untuk menentukan apakah ini mode edit
  formData?: any; // Jika mode edit, kirim data yang akan diedit
  dataValuasi: any[];
}

interface FormValues {
  id?: string;
  name: string;
  motto: string;
  description: string;
  address: string;
  contact: string;
  email: string;
  founder: string;
  level_tenant: string;
  image?: string;
  image_banner?: string;
  is_public?: boolean;
  jangkauan?: string;
  valuasi?: string;
}

const ModalEdit: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isEdit = false,
  formData,
  dataValuasi,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();

  const fields = {
    name: register("name", {
      required: "Nama harus diisi!",
      maxLength: {
        value: 255,
        message: "Maksimal 255 karakter.",
      },
    }),
    description: register("description", {
      required: "Deskripsi harus diisi!",
    }),
    motto: register("motto", {
      required: "Motto harus diisi!",
      maxLength: {
        value: 255,
        message: "Maksimal 255 karakter.",
      },
    }),
    address: register("address", {
      required: "Alamat harus diisi!",
      maxLength: {
        value: 255,
        message: "Maksimal 255 karakter.",
      },
    }),
    contact: register("contact", {
      required: "Kontak harus diisi!",
      maxLength: {
        value: 255,
        message: "Maksimal 255 karakter.",
      },
    }),
    email: register("email", {
      required: "E-mail harus diisi",
      pattern: {
        value:
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "E-mail tidak valid",
      },
      maxLength: {
        value: 255,
        message: "Maksimal 255 karakter.",
      },
    }),
    founder: register("founder", {
      required: "Founder harus diisi!",
      maxLength: {
        value: 255,
        message: "Maksimal 255 karakter.",
      },
    }),
    level_tenant: register("level_tenant", {
      required: "Pilih salah satu level tenant!",
    }),
    jangkauan: register("jangkauan"),
    valuasi: register("valuasi"),
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isModalNotif, setModalNotif] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleShowMessage = (msg: string, err: boolean) => {
    setMessage(msg);
    setIsError(err);
    setModalNotif(true);
  };

  const { user } = useAuth();
  const getUser: any = user;

  const handleFormSubmit: SubmitHandler<any> = async (data) => {
    setIsLoading(true);
    // refactoring data untuk mendukung upload avatar
    const dataBaru: FormValues = {
      name: `${data.name}`,
      motto: `${data.motto}`,
      description: `${data.description}`,
      address: `${data.address}`,
      contact: `${data.contact}`,
      email: `${data.email}`,
      founder: `${data.founder}`,
      level_tenant: `${data.level_tenant}`,
      is_public: data.is_public === "true" ? true : false,
      valuasi : data.valuasi === "default" ? null : data.valuasi,
      jangkauan : data.jangkauan === "default" ? null : data.jangkauan,
    };

    // if (data.valuasi !== "default") dataBaru.valuasi = data.valuasi;
    // if (data.jangkauan !== "default") dataBaru.jangkauan = data.jangkauan;
    // append jika idimgava not null
    if (idImageAvatar) dataBaru.image = idImageAvatar;
    // append jika idimgbanner not null
    if (idImageBanner) dataBaru.image_banner = idImageBanner;
    // append id jika isEdit
    if (isEdit) dataBaru.id = data.id;
    // logic submit form
    try {
      // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
      if (isEdit) {
        // Mode edit, kirim data melalui PUT request
        // console.log(data); axiosCustom.put("/")
        await axiosCustom
          .patch(`/tenant/${dataBaru.id}`, dataBaru)
          .then((response) => {
            // setData(response.data.data);
            if (response.status === 200) {
              handleShowMessage("Data berhasil diubah.", false);
            }
          });
        // .catch((error) => {
        //   console.error("Error fetching data:", error);
        // });
      } else {
        // Mode tambah, kirim data melalui POST request
        await axiosCustom.post("/tenant", dataBaru).then((response) => {
          // console.log(response);
          if (response.status === 201) {
            handleShowMessage("Data berhasil disimpan.", false);
          }
        });
      }

      onClose(); // Tutup modal
      reset(); // Reset formulir
      setPreviewAvatar(undefined); // reset preview
      setIdImageAvatarOld(null); // kosongkan idimage
      setIdImageAvatar(null); // kosongkan idimage
      setBtnDeleteAvatar(false); // hilangkan btndelete image
      setPreviewBanner(null); // reset preview
      setIdImageBannerOld(null); // kosongkan idimagebanner
      setIdImageBanner(null); // kosongkan idimagebanner
      setBtnDeleteBanner(false); // hilangkan btndelete image banner
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

  const [isHovered, setIsHovered] = useState(false);
  const [avatar, setAvatar] = useState<File>();
  const [previewAvatar, setPreviewAvatar] = useState<string | undefined>(
    undefined,
  );
  const [idImageAvatar, setIdImageAvatar] = useState<string | null>(null);
  const [idImageAvatarOld, setIdImageAvatarOld] = useState<string | null>(null);
  const [btnDeleteAvatar, setBtnDeleteAvatar] = useState<Boolean>(false);
  const inputFile = useRef<HTMLInputElement>(null);
  // jika button edit avatar klik, brarti input file juga diklik
  const onButtonEditAvatar = () => {
    inputFile.current?.click();
  };

  // fungsi ketika button delete avatar click
  const onButtonDeleteAvatar = () => {
    // jika dalam kondisi tambah user, arakhkan ke delete asset
    if (!isEdit && isOpen) {
      axiosCustom.delete(`/assets/${idImageAvatar}/delete`);
      setIdImageAvatar(null);
    } else {
      setIdImageAvatar(`delete=${idImageAvatarOld}`);
    }
    setPreviewAvatar(undefined);
    setIdImageAvatarOld(null);
    setBtnDeleteAvatar(false);
  };

  type linkTemporary = undefined | string;

  const initialAvatar = (linkTemporary: linkTemporary = undefined) => {
    if (isOpen && isEdit && formData) {
      if (formData?.image_id !== null) {
        if (idImageAvatarOld !== formData.image_id) {
          if (linkTemporary !== undefined) {
            setIdImageAvatarOld(null);
            setPreviewAvatar(linkTemporary);
          }
          setIdImageAvatarOld(formData.image_id);
          setPreviewAvatar(formData.image_url);
          setBtnDeleteAvatar(true);
        }
      }
    }
  };

  async function uploadAvatar(file: File) {
    try {
      const data = new FormData();
      data.append("asset", file as File);
      const upload = await axiosCustom.post("/assets/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIdImageAvatar(upload.data.data.id);
      // jika dalam kondisi tambah user, aktifkan btn delete
      if (!isEdit && isOpen) setBtnDeleteAvatar(true);
    } catch (error: any) {
      // tampilken error
      if (error?.response) {
        handleShowMessage(
          `Terjadi Kesalahan: ${error.response.data.message}`,
          true,
        );
      } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
    }
  }

  useEffect(() => {
    if (isOpen === true && isEdit === true) {
      initialAvatar(undefined);
      initialBanner(undefined);
      setValue("description", formData?.description);
    }
  }, [isOpen, isEdit]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // kondisi ketika edit data, tambah event ketika onClose setIsModalEditOpen null

  const [isHoveredBanner, setIsHoveredBanner] = useState(false);
  const [banner, setBanner] = useState<File>();
  const [previewBanner, setPreviewBanner] = useState<string | null>(null);
  const [idImageBanner, setIdImageBanner] = useState<string | null>(null);
  const [idImageBannerOld, setIdImageBannerOld] = useState<string | null>(null);
  const [btnDeleteBanner, setBtnDeleteBanner] = useState<Boolean>(false);
  const inputBanner = useRef<HTMLInputElement>(null);
  // jika button edit avatar klik, brarti input file juga diklik
  const onButtonEditBanner = () => {
    inputBanner.current?.click();
  };

  // fungsi ketika button delete avatar click
  const onButtonDeleteBanner = () => {
    // jika dalam kondisi tambah user, arakhkan ke delete asset
    if (!isEdit && isOpen) {
      axiosCustom.delete(`/assets/${idImageBanner}/delete`);
      setIdImageBanner(null);
    } else {
      setIdImageBanner(`delete=${idImageBannerOld}`);
    }
    setPreviewBanner(null);
    setIdImageBannerOld(null);
    setBtnDeleteBanner(false);
  };

  const initialBanner = (linkTemporary: linkTemporary = undefined) => {
    // kondisi ketika edit data, tambah event ketika onClose setIsModalEditOpen null
    if (isOpen && isEdit && formData) {
      if (formData?.image_banner_id !== null) {
        if (idImageBannerOld !== formData.image_banner_id) {
          if (linkTemporary !== undefined) {
            setIdImageAvatarOld(null);
            setPreviewAvatar(linkTemporary);
          }
          setIdImageBannerOld(formData.image_banner_id);
          setPreviewBanner(formData.image_banner_url);
          setBtnDeleteBanner(true);
        }
      }
    }
  };

  async function uploadBanner(file: File) {
    setIsLoading(true);
    try {
      const data = new FormData();
      data.append("asset", file as File);
      const upload = await axiosCustom.post("/assets/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIdImageBanner(upload.data.data.id);
      // jika dalam kondisi tambah user, aktifkan btn delete
      if (!isEdit && isOpen) setBtnDeleteBanner(true);
      setIsLoading(false);
    } catch (error: any) {
      // tampilken error
      if (error?.response) {
        handleShowMessage(
          `Terjadi Kesalahan: ${error.response.data.message}`,
          true,
        );
      } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
      setIsLoading(false);
    }
  }

  const handleMouseEnterBanner = () => {
    setIsHoveredBanner(true);
  };

  const handleMouseLeaveBanner = () => {
    setIsHoveredBanner(false);
  };

  // buat type untuk batasi input biar tidak ugal-ugalan di jalan
  type fromFileChangeType = "logo" | "banner";
  // fungsi ketika input file avatar change
  const onFileChange = (e: any, from: fromFileChangeType) => {
    // prepare supported file type
    const SUPPORT_FILE_TYPE = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ];
    // prepare max file size, awasi ada dua kondisi dek
    let MAX_FILE_SIZE = 0; //1MB untuk logo 2MB untuk banner
    from === "logo" ? (MAX_FILE_SIZE = 1000000) : (MAX_FILE_SIZE = 2000000);
    // ambil input nya
    const file = e?.[0];
    // ambil type dari file
    const UPLOAD_FILE_TYPE = file?.type;
    // ambil size dari file
    const UPLOAD_FILE_SIZE = file?.size;
    // jika file type tidak disupport
    if (!SUPPORT_FILE_TYPE.includes(UPLOAD_FILE_TYPE)) {
      handleShowMessage("Maaf. Format File Tidak Dibolehkan.", true);
      file.value = null;
    }
    // jika file size lebih dari yg sudah ditentukan
    else if (UPLOAD_FILE_SIZE > MAX_FILE_SIZE) {
      handleShowMessage(
        "Maaf. File Terlalu Besar! Maksimal Upload 800 KB",
        true,
      );
      file.value = null;
    }
    // lolos tilang pak solipi dek
    else {
      // awasi ada dua kondisi dek
      if (from === "logo") {
        const linkTemporary: string = URL.createObjectURL(file);
        initialAvatar(linkTemporary);
        setPreviewAvatar(URL.createObjectURL(file));
        uploadAvatar(file);
      } else {
        // setBanner(file);
        const linkTemporary: string = URL.createObjectURL(file);
        initialBanner(linkTemporary);
        setPreviewBanner(URL.createObjectURL(file));
        uploadBanner(file);
      }
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
          setPreviewAvatar(undefined); // reset preview
          setIdImageAvatarOld(null); // kosongkan idimage
          setIdImageAvatar(null); // kosongkan idimage
          setBtnDeleteAvatar(false); // hilangkan btndelete image
          setPreviewBanner(null); // reset preview
          setIdImageBannerOld(null); // kosongkan idimagebanner
          setIdImageBanner(null); // kosongkan idimagebanner
          setBtnDeleteBanner(false); // hilangkan btndelete image banner
        }}
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <ModalHeader>{isEdit ? "Edit Data" : "Tambah Data"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack direction={["column", "row"]} spacing={8}>
                <Box>
                  <Input
                    ref={inputFile}
                    style={{ display: "none" }}
                    type="file"
                    onChange={(e) => onFileChange(e.target.files, "logo")}
                  />
                  <Box mt={3} textAlign={"center"}>
                    Avatar
                  </Box>
                  <Flex
                    justify={"center"}
                    //   mt={{ base: "-50px", sm: "-100", lg: "-100" }}
                  >
                    <Box
                      mt={1}
                      position="relative"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      mb="3"
                      cursor={"pointer"}
                      boxShadow="md"
                      borderRadius="full"
                      borderColor="gray.300"
                      borderWidth={"2px"}
                      // rounded={"md"}
                    >
                      <Image
                        src={previewAvatar || "/img/tenant-logo-default.png"}
                        h={"150px"}
                        w={"150px"}
                        fit="cover"
                        borderRadius="full"
                        alt="Preview Avatar"
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
                        h={"100%"}
                        w="100%"
                        justifyContent={"center"}
                        align={"center"}
                        borderRadius="full"
                      >
                        <HStack spacing="1">
                          {!isLoading && (
                            <IconButton
                              onClick={() => onButtonEditAvatar()}
                              aria-label="Edit"
                              title="Ubah"
                              icon={<AiOutlineCamera size="20px" />}
                              colorScheme="teal"
                            />
                          )}
                          {!isLoading && btnDeleteAvatar && (
                            <IconButton
                              onClick={() => onButtonDeleteAvatar()}
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
                  <Box textAlign={"center"}>
                    <Text as="i" color={"teal.400"}>
                      <Text as="b">Note:</Text> Ukuran 128x128 px
                    </Text>
                  </Box>

                  <Input
                    ref={inputBanner}
                    style={{ display: "none" }}
                    type="file"
                    onChange={(e) => onFileChange(e.target.files, "banner")}
                  />
                  <Box mt={3} textAlign={"center"}>
                    Banner
                  </Box>
                  <Flex
                    justify={"center"}
                    //   mt={{ base: "-50px", sm: "-100", lg: "-100" }}
                  >
                    <Box
                      mt={1}
                      position="relative"
                      onMouseEnter={handleMouseEnterBanner}
                      onMouseLeave={handleMouseLeaveBanner}
                      mb="3"
                      cursor={"pointer"}
                      boxShadow="md"
                      borderColor="gray.300"
                      borderWidth={"2px"}
                      rounded={"md"}
                    >
                      <Image
                        src={previewBanner || "/img/tenant-banner-default.jpg"}
                        w={{ base: "200px", sm: "300px", lg: "300px" }}
                        h={"auto"}
                        minH="110px"
                        fit="cover"
                        alt="Preview Banner"
                      />
                      <Stack
                        position="absolute"
                        bottom="0"
                        right="0"
                        padding="2"
                        spacing="2"
                        direction="column"
                        background="rgba(0, 0, 0, 0.7)"
                        opacity={isHoveredBanner ? 1 : 0} // Mengatur opacity berdasarkan isHovered
                        transition="opacity 0.2s ease-in-out" // Efek transisi
                        // h={previewBanner ? "100%" : "200px"}
                        h="100%"
                        minH="110px"
                        w={"100%"}
                        justifyContent={"center"}
                        align={"center"}
                        rounded={"md"}
                      >
                        <HStack spacing="1">
                          {!isLoading && (
                            <IconButton
                              onClick={onButtonEditBanner}
                              aria-label="Edit"
                              title="Ubah"
                              icon={<AiOutlineCamera size="20px" />}
                              colorScheme="teal"
                            />
                          )}
                          {!isLoading && btnDeleteBanner && (
                            <IconButton
                              onClick={onButtonDeleteBanner}
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
                  <Box textAlign={"center"}>
                    <Text as="i" color={"teal.400"}>
                      <Text as="b">Note:</Text> Ukuran 1440x280 px
                    </Text>
                  </Box>
                </Box>
                <Box w="full">
                  <Hide>
                    <FormControl isInvalid={!!errors.id} mb="3">
                      <Input
                        type="text"
                        {...register("id")}
                        defaultValue={formData?.id}
                        // className={`form-control ${errors.name ? "is-invalid"}`}
                      />
                      {getUser?.role === "Tenant" && (
                        <Input
                          type="text"
                          {...fields.level_tenant}
                          defaultValue={formData?.level_tenant}
                          // className={`form-control ${errors.name ? "is-invalid"}`}
                        />
                      )}
                      <FormErrorMessage>
                        {errors.id && errors.id.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Hide>
                  <FormControl as="fieldset" mb="3">
                    <Flex
                      flexDir={{ base: "column", md: "row" }}
                      // align={{ base: "start", md: "center" }}
                    >
                      <Box
                        minWidth={["100%", "110px"]}
                        marginRight={["0", "2"]}
                      >
                        <FormLabel>
                          Tampilkan ke halaman public ?&nbsp;
                          <Text as={"span"} color={"red"}>
                            *
                          </Text>
                        </FormLabel>
                      </Box>
                      <Box flex={["1", "50%"]}>
                        <RadioGroup
                          defaultValue={
                            formData
                              ? formData.is_public === true
                                ? "true"
                                : "false"
                              : "true"
                          }
                        >
                          <Radio value="true" pr="4" {...register("is_public")}>
                            Ya
                          </Radio>
                          <Radio value="false" {...register("is_public")}>
                            Tidak
                          </Radio>
                        </RadioGroup>
                      </Box>
                    </Flex>
                  </FormControl>
                  <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    spacing={{ base: "0", md: "4" }}
                    w="auto"
                  >
                    <FormControl isInvalid={!!errors.name} mb="3">
                      <Flex
                        flexDir={{ base: "column", md: "row" }}
                        align={{ base: "start", md: "center" }}
                      >
                        <Box
                          minWidth={["100%", "110px"]}
                          marginRight={["0", "2"]}
                        >
                          <FormLabel marginRight="2">
                            Nama&nbsp;
                            <Text as={"span"} color={"red"}>
                              *
                            </Text>
                          </FormLabel>
                        </Box>

                        <Box width="full">
                          <Input
                            type="text"
                            {...fields.name}
                            defaultValue={formData?.name}
                            // className={`form-control ${errors.name ? "is-invalid"}`}
                          />
                          <FormErrorMessage>
                            {errors.name && errors.name.message}
                          </FormErrorMessage>
                        </Box>
                      </Flex>
                    </FormControl>

                    <FormControl isInvalid={!!errors.founder} mb="3">
                      <Flex
                        flexDir={{ base: "column", md: "row" }}
                        align={{ base: "start", md: "center" }}
                      >
                        <Box
                          minWidth={["100%", "80px"]}
                          marginRight={["0", "2"]}
                        >
                          <FormLabel>
                            Founder&nbsp;
                            <Text as={"span"} color={"red"}>
                              *
                            </Text>
                          </FormLabel>
                        </Box>
                        <Box w="full">
                          <Input
                            type="text"
                            {...fields.founder}
                            defaultValue={formData?.founder}
                          />
                          <FormErrorMessage>
                            {errors.founder && errors.founder.message}
                          </FormErrorMessage>
                        </Box>
                      </Flex>
                    </FormControl>
                  </SimpleGrid>
                  <FormControl isInvalid={!!errors.description} mb="3">
                    <Flex
                      flexDir={{ base: "column", md: "row" }}
                      align={{ base: "start", md: "center" }}
                    >
                      <Box
                        minWidth={["100%", "110px"]}
                        marginRight={["0", "2"]}
                      >
                        <FormLabel>
                          Deskripsi&nbsp;
                          <Text as={"span"} color={"red"}>
                            *
                          </Text>
                        </FormLabel>
                      </Box>
                      <Box w="full">
                        <Textarea
                          {...fields.description}
                          defaultValue={formData?.description}
                        />
                        <FormErrorMessage>
                          {errors.description && errors.description.message}
                        </FormErrorMessage>
                      </Box>
                    </Flex>
                  </FormControl>

                  <FormControl isInvalid={!!errors.address} mb="3">
                    <Flex
                      flexDir={{ base: "column", md: "row" }}
                      align={{ base: "start", md: "center" }}
                    >
                      <Box
                        minWidth={["100%", "110px"]}
                        marginRight={["0", "2"]}
                      >
                        <FormLabel>
                          Alamat&nbsp;
                          <Text as={"span"} color={"red"}>
                            *
                          </Text>
                        </FormLabel>
                      </Box>
                      <Box w="full">
                        <Textarea
                          {...fields.address}
                          height="10px"
                          defaultValue={formData?.address}
                        />
                        <FormErrorMessage>
                          {errors.address && errors.address.message}
                        </FormErrorMessage>
                      </Box>
                    </Flex>
                  </FormControl>

                  <FormControl isInvalid={!!errors.motto} mb="3">
                    <Flex
                      flexDir={{ base: "column", md: "row" }}
                      align={{ base: "start", md: "center" }}
                    >
                      <Box
                        minWidth={["100%", "110px"]}
                        marginRight={["0", "2"]}
                      >
                        <FormLabel>
                          Motto&nbsp;
                          <Text as={"span"} color={"red"}>
                            *
                          </Text>
                        </FormLabel>
                      </Box>
                      <Box w="full">
                        <Textarea
                          {...fields.motto}
                          height="10px"
                          defaultValue={formData?.motto}
                        />
                        <FormErrorMessage>
                          {errors.motto && errors.motto.message}
                        </FormErrorMessage>
                      </Box>
                    </Flex>
                  </FormControl>

                  <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    spacing={{ base: "0", md: "4" }}
                    w="auto"
                  >
                    <FormControl isInvalid={!!errors.contact} mb="3">
                      <Flex
                        flexDir={{ base: "column", md: "row" }}
                        align={{ base: "start", md: "center" }}
                      >
                        <Box
                          minWidth={["100%", "110px"]}
                          marginRight={["0", "2"]}
                        >
                          <FormLabel>
                            Kontak&nbsp;
                            <Text as={"span"} color={"red"}>
                              *
                            </Text>
                          </FormLabel>
                        </Box>
                        <Box w="full">
                          <Input
                            type="text"
                            {...fields.contact}
                            defaultValue={formData?.contact}
                          />
                          <FormErrorMessage>
                            {errors.contact && errors.contact.message}
                          </FormErrorMessage>
                        </Box>
                      </Flex>
                    </FormControl>

                    <FormControl isInvalid={!!errors.email} mb="3">
                      <Flex
                        flexDir={{ base: "column", md: "row" }}
                        align={{ base: "start", md: "center" }}
                      >
                        <Box
                          minWidth={["100%", "100px"]}
                          marginRight={["0", "2"]}
                        >
                          <FormLabel>
                            E-Mail&nbsp;
                            <Text as={"span"} color={"red"}>
                              *
                            </Text>
                          </FormLabel>
                        </Box>
                        <Box w="full">
                          <Input
                            // type="text"
                            {...fields.email}
                            defaultValue={formData?.email}
                          />
                          <FormErrorMessage>
                            {errors.email && errors.email.message}
                          </FormErrorMessage>
                        </Box>
                      </Flex>
                    </FormControl>
                  </SimpleGrid>
                  <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    spacing={{ base: "0", md: "4" }}
                    w="auto"
                  >
                    <FormControl isInvalid={!!errors.level_tenant} mb="3">
                      <Flex
                        flexDir={{ base: "column", md: "row" }}
                        align={{ base: "start", md: "center" }}
                      >
                        <Box
                          minWidth={["100%", "110px"]}
                          marginRight={["0", "2"]}
                        >
                          <FormLabel>
                            Level Tenant&nbsp;
                            <Text as={"span"} color={"red"}>
                              *
                            </Text>
                          </FormLabel>
                        </Box>
                        <Box w="full">
                          <Select
                            defaultValue={formData?.level_tenant}
                            {...fields.level_tenant}
                          >
                            <option value="Pra Inkubasi">Pra Inkubasi</option>
                            <option value="Inkubasi">Inkubasi</option>
                            <option value="Inkubasi Lanjutan">
                              Inkubasi Lanjutan
                            </option>
                            <option value="Scale Up">Scale Up</option>
                          </Select>
                          <FormErrorMessage>
                            {errors.level_tenant && errors.level_tenant.message}
                          </FormErrorMessage>
                        </Box>
                      </Flex>
                    </FormControl>
                    <FormControl mb="3">
                      <Flex
                        flexDir={{ base: "column", md: "row" }}
                        align={{ base: "start", md: "center" }}
                      >
                        <Box
                          minWidth={["100%", "100px"]}
                          marginRight={["0", "2"]}
                        >
                          <FormLabel>Jangkauan</FormLabel>
                        </Box>
                        <Box w="full">
                          <Select
                            defaultValue={formData?.jangkauan}
                            {...fields.jangkauan}
                          >
                            <option value="default">
                              Pilih Jangkauan Tenant
                            </option>
                            <option value="Dalam Kota">Dalam Kota</option>
                            <option value="Dalam Provinsi">
                              Dalam Provinsi
                            </option>
                            <option value="Nasional">Nasional</option>
                            <option value="Asia Tenggara">Asia Tenggara</option>
                            <option value="Internasional">Internasional</option>
                          </Select>
                        </Box>
                      </Flex>
                    </FormControl>
                  </SimpleGrid>
                  <FormControl isInvalid={!!errors.level_tenant} mb="3">
                    <Flex
                      flexDir={{ base: "column", md: "row" }}
                      align={{ base: "start", md: "center" }}
                    >
                      <Box
                        minWidth={["100%", "100px"]}
                        marginRight={["0", "2"]}
                      >
                        <FormLabel>
                          Valuasi&nbsp;
                          <Text as={"span"} color={"red"}>
                            *
                          </Text>
                        </FormLabel>
                      </Box>
                      <Box w="full">
                        <Select
                          defaultValue={formData?.valuasi_id}
                          {...fields.valuasi}
                        >
                          <option value="default">Pilih Valuasi Tenant</option>
                          {dataValuasi &&
                            Array.isArray(dataValuasi) &&
                            dataValuasi.map((data: any) => (
                              <option key={data.id} value={data.id}>
                                {data.valuasi}
                              </option>
                            ))}
                        </Select>
                        <FormErrorMessage>
                          {errors.level_tenant && errors.level_tenant.message}
                        </FormErrorMessage>
                      </Box>
                    </Flex>
                  </FormControl>
                </Box>
              </Stack>
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
                {isEdit ? "Simpan Perubahan" : "Tambah"}
              </Button>
              <Button
                leftIcon={<CloseIcon />}
                color={"red.400"}
                bgColor="red.50"
                _hover={{
                  bg: "red.50",
                }}
                onClick={() => {
                  onClose();
                  reset();
                  setIsLoading(false);
                  setPreviewAvatar(undefined); // reset preview
                  setIdImageAvatarOld(null); // kosongkan idimage
                  setIdImageAvatar(null); // kosongkan idimage
                  setBtnDeleteAvatar(false); // hilangkan btndelete image
                  setPreviewBanner(null); // reset preview
                  setIdImageBannerOld(null); // kosongkan idimagebanner
                  setIdImageBanner(null); // kosongkan idimagebanner
                  setBtnDeleteBanner(false); // hilangkan btndelete image banner
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
        onSubmit={() => onSubmit()}
      />
    </>
  );
};

export default ModalEdit;
