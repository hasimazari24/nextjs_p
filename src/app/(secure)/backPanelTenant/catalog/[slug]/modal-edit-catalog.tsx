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
  Textarea,
  IconButton,
  Stack,
  HStack,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";
import { AiOutlineCamera } from "react-icons/ai";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // data: any; // Data yang akan ditampilkan dalam modal
  onSubmit: () => void;
  // values?: FormValues;
  // title: string;
  isEdit?: boolean; // Tambahkan prop isEdit untuk menentukan apakah ini mode edit
  formData?: any; // Jika mode edit, kirim data yang akan diedit
  idTenant?: string;
}

interface FormValues {
  id: string;
  title: string;
  description: string;
  image?: string;
  url?: string;
}

const ModalEditCatalog: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isEdit,
  formData,
  idTenant,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const fields = {
    title: register("title", { required: "Judul harus diisi!" }),
    description: register("description", {
      required: "Deskripsi harus diisi!",
    }),
    url: register("url"),
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

  const handleFormSubmit: SubmitHandler<any> = async (data) => {
    setIsLoading(true);
    const dataBaru: {
      title: string;
      description: string;
      image?: string;
      url?: string;
    } = {
      title: `${data.title}`,
      description: `${data.description}`,
    };
    // append jika idimgava not null
    if (idImageAvatar) dataBaru.image = idImageAvatar;
    // append jika ada url, aku gatau ya yn enek coro sing luwih simple sko iki
    if (data?.url) dataBaru.url = data.url;
    try {
      // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
      if (isEdit) {
        // Mode edit, kirim data melalui PUT request
        // console.log(data); axiosCustom.put("/")
        await axiosCustom
          .patch(`/tenant/${idTenant}/update-catalog/${data.id}`, dataBaru)
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
        await axiosCustom
          .post(`/tenant/${idTenant}/add-catalog`, {
            title: data.title,
            description: data.description,
          })
          .then((response) => {
            // console.log(response);
            if (response.status === 201) {
              handleShowMessage("Data berhasil disimpan.", false);
            }
          });
      }

      onSubmit(); // Panggil fungsi penyimpanan data (misalnya, untuk memperbarui tampilan tabel)
      onClose(); // Tutup modal
      reset(); // Reset formulir
      setPreviewAvatar(undefined); // reset preview
      setIdImageAvatarOld(null); // kosongkan idimage
      setIdImageAvatar(null); // kosongkan idimage
      setBtnDeleteAvatar(false); // hilangkan btndelete image
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
  const [btnDeleteAvatar, setBtnDeleteAvatar] = useState<boolean>(false);
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
        } finally {
          setIsLoading(false);
        }
      }
    }
    uploadAvatar();
    initialAvatar(undefined);
  }, [avatar, isOpen]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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
  // buat type untuk batasi input biar tidak ugal-ugalan di jalan
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
      const linkTemporary: string = URL.createObjectURL(file);
      if (isOpen && isEdit && formData) initialAvatar(linkTemporary);
      setPreviewAvatar(linkTemporary);
      setIsLoading(true);
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
          setBtnDeleteAvatar(false); // hilangkan btndelete
        }}
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <ModalHeader>{isEdit ? "Edit Data" : "Tambah Data"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="data-form">
                <Stack direction={["column", "row"]} spacing={[0, 8]}>
                  <Box>
                    <FormControl isInvalid={!!errors.image} mb="3">
                      <Input
                        ref={inputFile}
                        style={{ display: "none" }}
                        type="file"
                        onChange={(e) => onAvatarChange(e.target.files)}
                      />
                      <Box textAlign={"center"}>Gambar Catalog</Box>
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
                              previewAvatar || "/img/tenant-logo-default.png"
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
                    <Hide>
                      <FormControl isInvalid={!!errors.id} mb="3">
                        <Input
                          type="text"
                          {...register("id")}
                          defaultValue={formData?.id}
                          // className={`form-control ${errors.name ? "is-invalid"}`}
                        />
                        <FormErrorMessage>
                          {errors.id && errors.id.message}
                        </FormErrorMessage>
                      </FormControl>
                    </Hide>

                    <FormControl isInvalid={!!errors.title} mb="3">
                      <Flex flexDirection={["column", "row"]}>
                        <Box flex={["1", "20%"]} marginRight={["0", "2"]}>
                          <FormLabel>
                            Judul&nbsp;
                            <Text as={"span"} color={"red"}>
                              *
                            </Text>
                          </FormLabel>
                        </Box>
                        <Box flex={["1", "80%"]}>
                          <Input
                            type="text"
                            {...fields.title}
                            defaultValue={formData?.title}
                            // className={`form-control ${errors.name ? "is-invalid"}`}
                          />
                          <FormErrorMessage>
                            {errors.title && errors.title.message}
                          </FormErrorMessage>
                        </Box>
                      </Flex>
                    </FormControl>

                    <FormControl isInvalid={!!errors.description} mb="3">
                      <Flex flexDirection={["column", "row"]}>
                        <Box flex={["1", "20%"]} marginRight={["0", "2"]}>
                          <FormLabel>
                            Deskripsi&nbsp;
                            <Text as={"span"} color={"red"}>
                              *
                            </Text>
                          </FormLabel>
                        </Box>
                        <Box flex={["1", "80%"]}>
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

                    <FormControl isInvalid={!!errors.url} mb="3">
                      <Flex flexDirection={["column", "row"]}>
                        <Box flex={["1", "20%"]} marginRight={["0", "2"]}>
                          <FormLabel>URL</FormLabel>
                        </Box>
                        <Box flex={["1", "80%"]}>
                          <Input
                            type="text"
                            {...fields.url}
                            defaultValue={formData?.url}
                            // className={`form-control ${errors.name ? "is-invalid"}`}
                          />
                          <FormErrorMessage>
                            {errors.url && errors.url.message}
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
                {isEdit ? "Simpan Perubahan" : "Tambah"}
              </Button>
              <Button
                leftIcon={<CloseIcon />}
                colorScheme="red"
                onClick={() => {
                  onClose();
                  reset();
                  setIsLoading(false);
                  setPreviewAvatar(undefined); // reset preview
                  setIdImageAvatarOld(null); // kosongkan idimage
                  setIdImageAvatar(null); // kosongkan idimage
                  setBtnDeleteAvatar(false); // hilangkan btndelete image
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

export default ModalEditCatalog;