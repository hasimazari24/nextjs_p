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
  Hide,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon, SmallCloseIcon } from "@chakra-ui/icons";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";
import { useRouter } from "next/navigation";

type AwardItem = {
  id: string;
  name: string;
  rank: string;
  image_id: string;
  image_url: string;
}

interface editProps {
  // isOpen: boolean;
  // onClose: () => void; 
  onSubmit: () => void;
  rowData?: any;
  idTenant?: string;
}

const EditAwards:React.FC<editProps> = ({rowData, idTenant, onSubmit }) => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<AwardItem>();

    const fields = {
      name: register("name", { required: "Nama penghargaan harus diisi!" }),
      rank: register("rank", {
        required: "Ranking award harus diisi berupa juara berapa!",
      }),
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

  const router = useRouter();
  
  const [avatar, setAvatar] = useState<File>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState<string>("");
  const [idImageAvatar, setIdImageAvatar] = useState<string | null>(null);
  const [idImageAvatarOld, setIdImageAvatarOld] = useState<string | null>(null);
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
      setIdImageAvatar(`delete=${idImageAvatarOld}`);
      setDataEdited([]);
      setPreviewAvatar("");
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

  const [dataEdited, setDataEdited] = useState(rowData ? rowData : []);

  const initialAvatar = () => {
    if (isEditModalOpen && dataEdited && dataEdited.length !== 0) {
      console.log(previewAvatar);
      if (dataEdited?.image_id !== null) {
        if (idImageAvatarOld !== dataEdited.image_id) {
          setIdImageAvatarOld(dataEdited?.image_id);
          setPreviewAvatar(dataEdited?.image_url);
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
    setDataEdited(rowData);
    initialAvatar();
    // console.log(dataEdited);
    // kondisi ketika edit data, tambah event ketika onClose setIsModalEditOpen null
  }, [avatar, rowData, initialAvatar()]);

  const handleFormSubmit: SubmitHandler<any> = async (data) => {
    setIsLoading(true);

    try {
      // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
      if (data.id) {
        // Mode edit, kirim data melalui PUT request
        const dataBaru:{name:string, rank:string, image?:string} = {
          name: `${data.name}`,
          rank: `${data.rank}`,
        };
        if (idImageAvatar) {
          dataBaru.image = idImageAvatar;
        }
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
      onSubmit(); // Panggil fungsi penyimpanan data (misalnya, untuk memperbarui tampilan tabel)
      setIsEditModalOpen(false); // Tutup modal
      resetAll();// Reset formulir
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
    setModalOpen(false);
    reset(); // Reset formulir
    setIsLoading(false);
    setPreviewAvatar(""); // reset preview
    setIdImageAvatarOld(null); // kosongkan idimage
    setIdImageAvatar(null); // kosongkan idimage
    setDataEdited([]);
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
          setIsEditModalOpen(false);
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
                      <FormLabel>logo Penghargaan</FormLabel>
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
                    <Box flex={["1", "70%"]}>
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
                    <Box flex={["1", "30%"]} marginRight={["0", "2"]}>
                      <FormLabel>Nama Penghargaan</FormLabel>
                    </Box>
                    <Box flex={["1", "70%"]}>
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
                    <Box flex={["1", "30%"]} marginRight={["0", "2"]}>
                      <FormLabel>Ranking</FormLabel>
                    </Box>
                    <Box flex={["1", "70%"]}>
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
                colorScheme="red"
                onClick={() => {
                  resetAll();
                  setIsEditModalOpen(false);
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
}

export default EditAwards;
