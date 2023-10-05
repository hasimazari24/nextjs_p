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
  Avatar,
  Image,
  HStack,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CheckIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import { AiOutlineCamera } from "react-icons/ai";
import ModalNotif from "../../components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // data: any; // Data yang akan ditampilkan dalam modal
  onSubmit: () => void;
  // values?: FormValues;
  // title: string;
  isEdit?: boolean; // Tambahkan prop isEdit untuk menentukan apakah ini mode edit
  formData?: any; // Jika mode edit, kirim data yang akan diedit
}

interface FormValues {
  image?: string;
  id?: string;
  username: string;
  password?: string;
  email: string;
  role: string;
  fullname: string;
}

const ModalEdit: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isEdit,
  formData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const fields = {
    username: register("username", { required: "Username harus diisi!" }),
    fullname: register("fullname", {
      required: "Nama Lengkap harus diisi!",
    }),
    role: register("role", { required: "Hak akses harus dipilih!" }),
    email: register("email", {
      required: "E-mail harus diisi",
      pattern: {
        value:
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "E-mail tidak valid",
      },
    }),
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isModalNotif, setModalNotif] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [avatar, setAvatar] = useState<File>();
  const [previewAvatar, setPreviewAvatar] = useState<string>(
    "/img/avatar-default.jpg",
  );
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
    const UPLOAD_FILE_TYPE = file.type;
    // ambil size dari file
    const UPLOAD_FILE_SIZE = file.size;
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
    // jika dalam kondisi tambah user, arakhkan ke delete asset
    if (!isEdit && isOpen) {
      axiosCustom.delete(`/assets/${idImageAvatar}/delete`);
      setIdImageAvatar(null);
    } else {
      setIdImageAvatar(`delete=${idImageAvatarOld}`);
    }
    setPreviewAvatar("/img/avatar-default.jpg");
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
  }, [avatar]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleShowMessage = (msg: string, err: boolean) => {
    setMessage(msg);
    setIsError(err);
    setModalNotif(true);
  };

  const handleFormSubmit: SubmitHandler<any> = async (data) => {
    // console.log(isEdit);
    setIsLoading(true);
    // refactoring data untuk mendukung upload avatar
    const dataBaru: FormValues = {
      username: `${data.username}`,
      email: `${data.email}`,
      role: `${data.role}`,
      fullname: `${data.fullname}`,
    };
    // append password ketika tambah user
    if (!isEdit) dataBaru.password = `${data.password}`;
    // append jika idimgava not null
    if (idImageAvatar) dataBaru.image = idImageAvatar;
    // append id jika isEdit
    if (isEdit) dataBaru.id = data.id;
    // logic submit form
    try {
      // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
      if (isEdit) {
        // Mode edit, kirim data melalui PUT request
        await axiosCustom
          .patch(`/user/${dataBaru.id}`, dataBaru)
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
        await axiosCustom.post("/user", dataBaru).then((response) => {
          // console.log(response);
          if (response.status === 201) {
            handleShowMessage("Data berhasil disimpan.", false);
          }
        });
      }

      onSubmit(); // Panggil fungsi penyimpanan data (misalnya, untuk memperbarui tampilan tabel)
      onClose(); // Tutup modal
      reset(); // Reset formulir
      setPreviewAvatar("/img/avatar-default.jpg"); // reset preview
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

  // kondisi ketika edit data, tambah event ketika onClose setIsModalEditOpen null
  if (isOpen && isEdit && formData) {
    if (formData?.image_id !== null) {
      if (idImageAvatarOld !== formData.image_id) {
        setIdImageAvatarOld(formData.image_id);
        setPreviewAvatar(formData.image_url);
        setBtnDeleteAvatar(true);
      }
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
          setPreviewAvatar("/img/avatar-default.jpg"); // reset preview
          setIdImageAvatarOld(null); // kosongkan idimageold
          setIdImageAvatar(null); // kosongkan idimage
          setBtnDeleteAvatar(false); // hilangkan btndelete image
        }}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <ModalHeader>{isEdit ? "Edit Data" : "Tambah Data"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="data-form">
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

                {/* <>{setIdImageAvatarOld(formData?.image)}</> */}

                <FormControl isInvalid={!!errors.fullname} mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                      <FormLabel>Nama Lengkap</FormLabel>
                    </Box>
                    <Box flex={["1", "75%"]}>
                      <Input
                        type="text"
                        {...fields.fullname}
                        defaultValue={formData?.fullname}
                        // className={`form-control ${errors.name ? "is-invalid"}`}
                      />
                      <FormErrorMessage>
                        {errors.fullname && errors.fullname.message}
                      </FormErrorMessage>
                    </Box>
                  </Flex>
                </FormControl>

                <FormControl isInvalid={!!errors.username} mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                      <FormLabel>Username</FormLabel>
                    </Box>
                    <Box flex={["1", "75%"]}>
                      <Input
                        {...fields.username}
                        defaultValue={formData?.username}
                      />
                      <FormErrorMessage>
                        {errors.username && errors.username.message}
                      </FormErrorMessage>
                    </Box>
                  </Flex>
                </FormControl>

                {!isEdit ? (
                  <FormControl isInvalid={!!errors.password} mb="3">
                    <Flex flexDirection={["column", "row"]}>
                      <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                        <FormLabel>Password</FormLabel>
                      </Box>
                      <Box flex={["1", "75%"]}>
                        <Input
                          {...register("password", {
                            required: "Password harus diisi!",
                            minLength: {
                              value: 4,
                              message: "Password minimal 4 karakter",
                            },
                          })}
                        />

                        <FormErrorMessage>
                          {errors.password && errors.password.message}
                        </FormErrorMessage>
                      </Box>
                    </Flex>
                  </FormControl>
                ) : (
                  ""
                )}

                <FormControl isInvalid={!!errors.email} mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                      <FormLabel>E-Mail</FormLabel>
                    </Box>
                    <Box flex={["1", "75%"]}>
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

                <FormControl isInvalid={!!errors.role} mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                      <FormLabel>Hak Akses</FormLabel>
                    </Box>
                    <Box flex={["1", "75%"]}>
                      <Select defaultValue={formData?.role} {...fields.role}>
                        <option value="Super Admin">Super Admin</option>
                        <option value="Manajemen">Manajemen</option>
                        <option value="Mentor">Mentor</option>
                        <option value="Tenant">Tenant</option>
                      </Select>
                      <FormErrorMessage>
                        {errors.role && errors.role.message}
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
                  >
                    <Image
                      src={previewAvatar}
                      h={{ base: "100px", sm: "200px", lg: "200px" }}
                      w="100%"
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
                  setPreviewAvatar("/img/avatar-default.jpg"); // reset preview
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

export default ModalEdit;
