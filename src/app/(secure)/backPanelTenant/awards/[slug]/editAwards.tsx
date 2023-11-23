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
  Text,
  Avatar,
  Hide,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";
import { useRouter } from "next/navigation";

type AwardItem = {
  id: string;
  name: string;
  rank: string;
  image_id: string;
  image_url: string;
};

interface editProps {
  // isOpen: boolean;
  // onClose: () => void;
  onSubmit: () => void;
  rowData?: any;
  idTenant?: string;
}

const EditAwards: React.FC<editProps> = ({ rowData, idTenant, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AwardItem>();

  const fields = {
    name: register("name", {
      required: "Nama penghargaan harus diisi!",
      maxLength: {
        value: 255,
        message: "Maksimal 255 karakter.",
      },
    }),
    rank: register("rank", {
      required: "Ranking award harus diisi berupa juara berapa!",
      maxLength: {
        value: 255,
        message: "Maksimal 255 karakter.",
      },
    }),
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

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState<string | undefined>(
    undefined,
  );
  const [idImageAvatar, setIdImageAvatar] = useState<string | null>(null);
  const [idImageAvatarOld, setIdImageAvatarOld] = useState<string | null>(null);
  const inputFile = useRef<HTMLInputElement>(null);
  // jika button edit avatar klik, brarti input file juga diklik
  const onButtonEditAvatar = () => {
    inputFile.current?.click();
  };
  // fungsi ketika input file avatar change
  const onAvatarChange = (e: any) => {
    // ambil input nya
    const file = e?.[0];
    if (!file) return;
    // prepare supported file type
    const SUPPORT_FILE_TYPE = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ];
    // prepare max file size
    const MAX_FILE_SIZE = 800000; //800KB
    // ambil type dari file
    const UPLOAD_FILE_TYPE = file?.type;
    // ambil size dari file
    const UPLOAD_FILE_SIZE = file?.size;
    if (!SUPPORT_FILE_TYPE.includes(UPLOAD_FILE_TYPE)) {
      handleShowMessage("Maaf. Format File Tidak Dibolehkan.", true);
      return;
    } else if (UPLOAD_FILE_SIZE > MAX_FILE_SIZE) {
      handleShowMessage(
        "Maaf. File Terlalu Besar! Maksimal Upload 800 KB",
        true,
      );
      return;
    } else {
      setPreviewAvatar(URL.createObjectURL(file));
      const linkTemporary: string = URL.createObjectURL(file);
      if (isEditModalOpen && rowData) initialAvatar(linkTemporary);
      setPreviewAvatar(linkTemporary);
      uploadAvatar(file);
    }
  };

  // fungsi ketika button delete avatar click
  const onButtonDeleteAvatar = () => {
    try {
      setIdImageAvatar(`delete=${idImageAvatarOld}`);
      setPreviewAvatar(undefined);
      setIdImageAvatarOld(null);
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

  type linkTemporary = undefined | string;

  const initialAvatar = (linkTemporary: linkTemporary = undefined) => {
    if (isEditModalOpen && rowData && rowData.length !== 0) {
      if (rowData?.image_id !== null) {
        if (idImageAvatarOld !== rowData.image_id) {
          if (linkTemporary !== undefined) {
            setIdImageAvatarOld(null);
            setPreviewAvatar(linkTemporary);
          }
          setIdImageAvatarOld(rowData?.image_id);
          setPreviewAvatar(rowData?.image_url);
        }
      }
    }
  };

  async function uploadAvatar(file: File) {
    try {
      setIsLoading(true);
      const data = new FormData();
      data.append("asset", file as File);
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
      setIsLoading(false);
    }
  }

  // logic update avatar disini
  useEffect(() => {
    if (isEditModalOpen === true) initialAvatar(undefined);
    // kondisi ketika edit data, tambah event ketika onClose setIsModalEditOpen null
  }, [isEditModalOpen]);

  const handleFormSubmit: SubmitHandler<any> = async (data) => {
    setIsLoading(true);

    try {
      // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
      if (data.id) {
        // Mode edit, kirim data melalui PUT request
        const dataBaru: { name: string; rank: string; image?: string } = {
          name: `${data.name}`,
          rank: `${data.rank}`,
        };
        if (idImageAvatar) {
          dataBaru.image = idImageAvatar;
        }
        // console.log(dataBaru);
        await axiosCustom
          .put(`/tenant/${idTenant}/update-award/${data.id}`, dataBaru)
          .then((response) => {
            // setData(response.data.data);

            if (response.status === 200) {
              // router.refresh();
              handleShowMessage("Data berhasil diubah.", false);
            }
          });
      }
      setIsEditModalOpen(false); // Tutup modal
      resetAll(); // Reset formulir
      setIsLoading(false);

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
    setIsEditModalOpen(false);
    reset(); // Reset formulir
    setIsLoading(false);
    setPreviewAvatar(undefined); // reset preview
    setIdImageAvatarOld(null); // kosongkan idimage
    setIdImageAvatar(null); // kosongkan idimage
  };

  return (
    <div>
      <Button
        bgColor="blue.100"
        _hover={{
          bg: "blue.200",
        }}
        title="Edit Data"
        onClick={() => setIsEditModalOpen(true)}
        key="editData"
        size="sm"
      >
        <EditIcon />
      </Button>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          resetAll();
        }}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <ModalHeader>Edit Data</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="data-form">
                <FormControl mb="3">
                  <Flex
                    flexDirection={["column", "row"]}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Box flex={["1", "30%"]} marginRight={["0", "2"]}>
                      <FormLabel>Logo Penghargaan</FormLabel>
                      <Center>
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
                            display={previewAvatar ? "block" : "none"}
                          />
                        </Avatar>
                      </Center>
                    </Box>
                    <Box flex={["1", "20%"]} textAlign={"center"}>
                      <Text as="i" color={"teal.300"}>
                        <Text as="b">Note:</Text> Ukuran 200x200 px
                      </Text>
                    </Box>
                    <Box flex={["1", "45%"]}>
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
                        Ubah Logo
                      </Button>
                    </Box>
                  </Flex>
                </FormControl>
                <Hide>
                  <FormControl>
                    <Input
                      type="text"
                      {...register("id")}
                      defaultValue={rowData?.id}
                    />
                  </FormControl>
                </Hide>
                <FormControl isInvalid={!!errors.name} mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "35%"]} marginRight={["0", "2"]}>
                      <FormLabel>
                        Nama Penghargaan&nbsp;
                        <Text as={"span"} color={"red"}>
                          *
                        </Text>
                      </FormLabel>
                    </Box>
                    <Box flex={["1", "65%"]}>
                      <Input
                        type="text"
                        {...fields.name}
                        defaultValue={rowData?.name}
                        // className={`form-control ${errors.name ? "is-invalid"}`}
                      />
                      <FormErrorMessage>
                        {errors.name && errors.name.message}
                      </FormErrorMessage>
                    </Box>
                  </Flex>
                </FormControl>
                <FormControl isInvalid={!!errors.name} mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "35%"]} marginRight={["0", "2"]}>
                      <FormLabel>
                        Ranking&nbsp;
                        <Text as={"span"} color={"red"}>
                          *
                        </Text>
                      </FormLabel>
                    </Box>
                    <Box flex={["1", "65%"]}>
                      <Input
                        type="text"
                        {...fields.rank}
                        defaultValue={rowData?.rank}
                        // className={`form-control ${errors.name ? "is-invalid"}`}
                      />
                      <FormErrorMessage>
                        {errors.rank && errors.rank.message}
                      </FormErrorMessage>
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
                {"Simpan Perubahan"}
              </Button>
              <Button
                leftIcon={<CloseIcon />}
                color={"red.400"}
                bgColor="red.50"
                _hover={{
                  bg: "red.50",
                }}
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
        onSubmit={() => onSubmit()}
      />
    </div>
  );
};

export default EditAwards;
