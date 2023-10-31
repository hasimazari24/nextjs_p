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
  IconButton,
  Center,
  AvatarBadge,
  Avatar,
  Text,
  Textarea,
  Image,
  Stack,
  HStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  AddIcon,
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";
import { FaUser } from "react-icons/fa";
import { AiOutlineCamera } from "react-icons/ai";
import { LiaImageSolid } from "react-icons/lia";

type GalleryItem = {
  id: string;
  image_id: string;
  image_url: string;
  title: string;
  description: string;
  event_date: string;
};

interface editProps {
  onSubmit: () => void;
  idTenant?: string;
}

const AddGallery = ({ idTenant, onSubmit }: editProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GalleryItem>();

  const fields = {
    title: register("title", {
      required: "Judul Events harus diisi!",
      maxLength: {
        value: 255,
        message: "Maksimal 255 karakter.",
      },
    }),
    description: register("description", {
      required: "Deskripsi Event harus diisi!",
    }),
    event_date: register("event_date"),
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalNotif, setModalNotif] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleShowMessage = (msg: string, err: boolean) => {
    setMessage(msg);
    setIsError(err);
    setModalNotif(true);
  };

  const [isHovered, setIsHovered] = useState(false);
  const [avatar, setAvatar] = useState<File>();
  const [previewAvatar, setPreviewAvatar] = useState<string | undefined>(
    undefined,
  );
  const [idImageAvatar, setIdImageAvatar] = useState<string | null>(null);
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
      setIsLoading(true);
    }
  };

  // fungsi ketika button delete avatar click
  const onButtonDeleteAvatar = () => {
    try {
      // jika dalam kondisi tambah user, arakhkan ke delete asset
      axiosCustom.delete(`/assets/${idImageAvatar}/delete`);
      setIdImageAvatar(null);
      setPreviewAvatar(undefined);
      setBtnDeleteAvatar(false);
    } catch (error: any) {
      // tampilken error
      if (error?.response) {
        handleShowMessage(
          `Terjadi Kesalahan: ${error.response.data.message}`,
          true,
        );
      } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
    }
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
          if (isModalOpen) setBtnDeleteAvatar(true);
        } catch (error: any) {
          // tampilken error
          if (error?.response) {
            handleShowMessage(
              `Terjadi Kesalahan: ${error.response.data.message}`,
              true,
            );
          } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
        } finally {
          setIsLoading(false);
        }
      }
    }
    uploadAvatar();
  }, [avatar]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleFormSubmit: SubmitHandler<any> = async (data) => {
    if (!idImageAvatar)
      return handleShowMessage(
        `Terjadi Kesalahan: Gambar Event wajib di-isi ya.`,
        true,
      );
    setIsLoading(true);
    const dataBaru: {
      title: string;
      description: string;
      event_date: string;
      image?: string;
    } = {
      title: `${data.title}`,
      description: `${data.description}`,
      event_date: `${data.event_date}`,
      image: idImageAvatar,
    };
    // console.log(dataBaru);
    try {
      // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
      const getIdTenant: any = idTenant;
      await axiosCustom
        .post(`/tenant/${getIdTenant}/add-gallery`, dataBaru)
        .then((response) => {
          // console.log(response);
          if (response.status === 201) {
            handleShowMessage("Data berhasil disimpan.", false);
          }
        });

      onSubmit(); // Panggil fungsi penyimpanan data (misalnya, untuk memperbarui tampilan tabel)
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
    setPreviewAvatar(undefined); // reset preview
    setIdImageAvatar(null); // kosongkan idimage
    setBtnDeleteAvatar(false);
  };

  return (
    <div>
      <Button
        colorScheme="green"
        key="tambahData"
        size="sm"
        onClick={() => setModalOpen(true)}
      >
        <AddIcon />
        &nbsp;Tambah Baru
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          resetAll();
        }}
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <ModalHeader>Tambah Data</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="data-form">
                <Stack direction={["column", "row"]} spacing={[0, 8]}>
                  <Box>
                    <FormControl isInvalid={!!errors.image_id} mb="3" mt={3}>
                      <Input
                        ref={inputFile}
                        style={{ display: "none" }}
                        type="file"
                        onChange={(e) => onAvatarChange(e.target.files)}
                      />
                      <Box mt={3} textAlign={"center"}>
                        Gambar Event&nbsp;
                        <Text as={"span"} color={"red"}>
                          *
                        </Text>
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
                          borderColor="gray.300"
                          borderWidth={"2px"}
                          rounded={"md"}
                        >
                          <Image
                            src={
                              previewAvatar
                                ? previewAvatar
                                : "/img/tenant-logo-default.png"
                            }
                            w={{ base: "200px", sm: "300px", lg: "300px" }}
                            h={"auto"}
                            minH="100px"
                            fit="cover"
                            alt="Preview Gambar Events"
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
                            // h={previewBanner ? "100%" : "200px"}
                            h="100%"
                            minH="100px"
                            w={"100%"}
                            justifyContent={"center"}
                            align={"center"}
                            rounded={"md"}
                          >
                            <HStack spacing="1">
                              {!isLoading && (
                                <IconButton
                                  onClick={onButtonEditAvatar}
                                  aria-label="Edit"
                                  title="Ubah"
                                  icon={<AiOutlineCamera size="20px" />}
                                  colorScheme="teal"
                                />
                              )}
                              {!isLoading && btnDeleteAvatar && (
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
                    </FormControl>
                  </Box>
                  <Box w="full">
                    <FormControl isInvalid={!!errors.title} mb="3" mt={3}>
                      <Flex flexDirection={["column", "row"]}>
                        <Box flex={["1", "30%"]} marginRight={["0", "2"]}>
                          <FormLabel>
                            Judul Event&nbsp;
                            <Text as={"span"} color={"red"}>
                              *
                            </Text>
                          </FormLabel>
                        </Box>
                        <Box flex={["1", "70%"]}>
                          <Input
                            type="text"
                            {...fields.title}
                            // className={`form-control ${errors.title ? "is-invalid"}`}
                          />
                          <FormErrorMessage>
                            {errors.title && errors.title.message}
                          </FormErrorMessage>
                        </Box>
                      </Flex>
                    </FormControl>
                    <FormControl isInvalid={!!errors.event_date} mb="3">
                      <Flex flexDirection={["column", "row"]}>
                        <Box flex={["1", "30%"]} marginRight={["0", "2"]}>
                          <FormLabel>Tanggal Event</FormLabel>
                        </Box>
                        <Box flex={["1", "70%"]}>
                          <Input
                            type="date"
                            {...fields.event_date}
                            defaultValue={new Date()
                              .toISOString()
                              .substring(0, 10)}
                          />
                          <FormErrorMessage>
                            {errors.event_date && errors.event_date.message}
                          </FormErrorMessage>
                        </Box>
                      </Flex>
                    </FormControl>
                    <FormControl isInvalid={!!errors.description} mb="3">
                      <Flex flexDirection={["column", "row"]}>
                        <Box flex={["1", "30%"]} marginRight={["0", "2"]}>
                          <FormLabel>
                            Deskripsi Event&nbsp;
                            <Text as={"span"} color={"red"}>
                              *
                            </Text>
                          </FormLabel>
                        </Box>
                        <Box flex={["1", "70%"]}>
                          <Textarea
                            {...fields.description}
                            // className={`form-control ${errors.name ? "is-invalid"}`}
                          />
                          <FormErrorMessage>
                            {errors.description && errors.description.message}
                          </FormErrorMessage>
                        </Box>
                      </Flex>
                    </FormControl>
                  </Box>
                </Stack>
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
                {"Tambah"}
              </Button>
              <Button
                leftIcon={<CloseIcon />}
                colorScheme="red"
                onClick={() => {
                  resetAll();
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
    </div>
  );
};

export default AddGallery;
