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
  Box,
  Center,
  Avatar,
  AvatarBadge,
  RadioGroup,
  Radio,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { CheckIcon, CloseIcon, SmallCloseIcon } from "@chakra-ui/icons";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isEdit?:boolean,
  formData?: any; // Jika mode edit, kirim data yang akan diedit
  idTenant?: string | null;
}

interface FormValues {
  id: string;
  fullname: string;
  position: string;
  is_public: string;
}

const ModalTeamNonLogin = ({
  isOpen,
  onClose,
  onSubmit,
  isEdit = false,
  formData,
  idTenant,
}: ModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const fields = {
    position: register("position", { required: "Posisi harus diisi!" }),
    fullname: register("fullname", { required: "Nama Lengkap harus diisi!" }),
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isModalNotifTeam, setIsModalNotifTeam] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleShowMessage = (msg: string, err: boolean) => {
    setIsModalNotifTeam(true);
    setMessage(msg);
    setIsError(err);
  };

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
      setPreviewAvatar(URL.createObjectURL(file));
      setIsLoading(true);
    }
  };

  // fungsi ketika button delete avatar click
  const onButtonDeleteAvatar = () => {
    try {
      // jika dalam kondisi tambah user, arakhkan ke delete asset
      if (!isEdit && isOpen) {
        axiosCustom.delete(`/assets/${idImageAvatar}/delete`);
        setIdImageAvatar(null);
      } else {
        // console.log("hapus ini kah?");
        setIdImageAvatar(`delete=${idImageAvatarOld}`);
      }
      setPreviewAvatar(undefined);
      setIdImageAvatarOld(null);
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

  const initialAvatar = (linkTemporary: undefined | string = undefined) => {
    if (isOpen && isEdit && formData && formData.length !== 0) {
      if (formData?.image_id !== null) {
        if (idImageAvatarOld !== formData.image_id) {
          if (linkTemporary !== undefined) {
            setIdImageAvatarOld(null);
            setPreviewAvatar(linkTemporary);
          }
          setIdImageAvatarOld(formData?.image_id);
          setPreviewAvatar(formData?.image_url);
          setBtnDeleteAvatar(true);
        }
      }
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
    console.log("isModalNotifTeam changed:", isModalNotifTeam);
    // kondisi ketika edit data, tambah event ketika onClose setIsModalEditOpen null
  }, [avatar, isOpen]);

  const handleFormSubmit: SubmitHandler<any> = async (data) => {
    setIsLoading(true);
    const simpan: {
      fullname: string;
      position: string;
      is_public: boolean;
      image?: string;
    } = {
      // id: data.id,
      fullname: data.fullname,
      position: data.position,
      is_public: data.is_public === "ya_public" ? true : false,
    };
    // append jika idimgava not null
    if (idImageAvatar) {
      simpan.image = idImageAvatar;
    }
    // append id jika isEdit
    try {
      // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
      if (isEdit) {
        // Mode edit, kirim data melalui PUT request
        await axiosCustom
          .patch(
            `/tenant/${idTenant}/update-user-tenant-cant-login/${data.id}`,
            simpan,
          )
          .then((response) => {
            // setData(response.data.data);

            if (response.status === 200) {
              handleShowMessage("Data berhasil diubah.", false);
              onSubmit();
            }
          });
        // .catch((error) => {
        //   console.error("Error fetching data:", error);
        // });
      } else {
        // Mode tambah, kirim data melalui POST request
        await axiosCustom
          .post(`/tenant/${idTenant}/add-user-tenant-cant-login`, simpan)
          .then((response) => {
            // console.log(response);
            if (response.status === 201) {
              onSubmit();
              handleShowMessage("Data berhasil disimpan.", false);
            }
          });
      }
      resetAll();
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

  console.log(isModalNotifTeam);

  const resetAll = () => {
    onClose(); // Tutup modal
    reset(); // Reset formulir
    setPreviewAvatar(undefined); // reset preview
    setIdImageAvatarOld(null); // kosongkan idimage
    setIdImageAvatar(null); // kosongkan idimage
    setBtnDeleteAvatar(false); // hilangkan btndelete image
    setIsLoading(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          resetAll();
        }}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <ModalHeader>
              {isEdit
                ? `Ubah Data Anggota : ${formData?.fullname}`
                : "Tambah Data Anggota"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="data-form">
                <Hide>
                  <FormControl isInvalid={!!errors.id} mb="3">
                    <Input
                      type="text"
                      {...register("id")}
                      defaultValue={formData?.id}
                    />
                    <FormErrorMessage>
                      {errors.id && errors.id.message}
                    </FormErrorMessage>
                  </FormControl>
                </Hide>
                <FormControl mb="3">
                  <Flex
                    flexDirection={["column", "row"]}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                      <FormLabel>Avatar Profil</FormLabel>
                      <Center>
                        {previewAvatar ? (
                          <Avatar size="xl" src={previewAvatar}>
                            <AvatarBadge
                              as={IconButton}
                              size="sm"
                              rounded="full"
                              top="-10px"
                              colorScheme="red"
                              aria-label="remove Image"
                              icon={<SmallCloseIcon />}
                              onClick={onButtonDeleteAvatar}
                              isDisabled={isLoading}
                            />
                          </Avatar>
                        ) : (
                          <Avatar size="xl" />
                        )}
                      </Center>
                    </Box>
                    <Box flex={["1", "75%"]}>
                      <Input
                        ref={inputFile}
                        style={{ display: "none" }}
                        type="file"
                        onChange={(e) => onAvatarChange(e.target.files)}
                      />
                      <Button
                        fontWeight={"12"}
                        w="full"
                        onClick={() => onButtonEditAvatar()}
                        isDisabled={isLoading}
                      >
                        Ubah Avatar Profil
                      </Button>
                    </Box>
                  </Flex>
                </FormControl>
                <FormControl isInvalid={!!errors.fullname} mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                      <FormLabel>Nama Lengkap</FormLabel>
                    </Box>
                    <Box flex={["1", "75%"]}>
                      <Input
                        {...fields.fullname}
                        defaultValue={formData?.fullname}
                      />
                      <FormErrorMessage>
                        {errors.fullname && errors.fullname.message}
                      </FormErrorMessage>
                    </Box>
                  </Flex>
                </FormControl>

                <FormControl isInvalid={!!errors.position} mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
                      <FormLabel>Posisi</FormLabel>
                    </Box>
                    <Box flex={["1", "75%"]}>
                      <Input
                        {...fields.position}
                        defaultValue={formData?.position}
                      />
                      <FormErrorMessage>
                        {errors.position && errors.position.message}
                      </FormErrorMessage>
                    </Box>
                  </Flex>
                </FormControl>

                <FormControl as="fieldset" mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "50%"]} marginRight={["0", "2"]}>
                      <FormLabel>Tampilkan ke halaman public?</FormLabel>
                    </Box>
                    <Box flex={["1", "50%"]}>
                      <RadioGroup
                        defaultValue={
                          formData
                            ? formData.is_public === true
                              ? "ya_public"
                              : "tidak_public"
                            : "ya_public"
                        }
                      >
                        <Radio
                          value="ya_public"
                          pr="4"
                          {...register("is_public")}
                        >
                          Ya
                        </Radio>
                        <Radio value="tidak_public" {...register("is_public")}>
                          Tidak
                        </Radio>
                      </RadioGroup>
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
                Simpan Perubahan
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
      <div id="notif2">
        <ModalNotif
          isOpen={isModalNotifTeam}
          onClose={() => setIsModalNotifTeam(false)}
          message={message}
          isError={isError}
        />
      </div>
    </>
  );
};

export default ModalTeamNonLogin;
