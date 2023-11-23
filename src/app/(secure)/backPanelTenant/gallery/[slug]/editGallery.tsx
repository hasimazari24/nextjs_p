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
  Text,
  Image,
  Stack,
  HStack,
  Avatar,
  Hide,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import {
  useForm,
  SubmitHandler,
  useController,
  Controller,
} from "react-hook-form";
import {
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";
import { AiOutlineCamera } from "react-icons/ai";
import initRichTextProps from "@/app/type/inital-rich-text";
import { Editor } from "@tinymce/tinymce-react";

type GalleryItem = {
  id: string;
  image_id: string;
  image_url: string;
  title: string;
  description: string;
  event_date: string;
};

interface editProps {
  // isOpen: boolean;
  // onClose: () => void;
  onSubmit: () => void;
  rowData?: any;
  idTenant?: string;
}

const EditGallery = ({ rowData, idTenant, onSubmit }: editProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    clearErrors,
    setValue,
  } = useForm<GalleryItem>();

  const fields = {
    title: register("title", {
      required: "Judul Events harus diisi!",
      maxLength: {
        value: 255,
        message: "Maksimal 255 karakter.",
      },
    }),
    // description: register("description", {
    //   required: "Deskripsi Event harus diisi!",
    // }),
    event_date: register("event_date"),
  };

  //ini diperlukan utk mengatur tinyMCE
  const {
    field: { onChange, ref, value, ...field },
  } = useController({
    control,
    name: "description",
    rules: { required: "Deskripsi Event harus diisi!" },
    defaultValue: rowData?.description,
  });

  // let descriptionContent = watch("description");

  const [isLoading, setIsLoading] = useState(false);
  const [isModalNotif, setModalNotif] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleShowMessage = (msg: string, err: boolean) => {
    setMessage(msg);
    setIsError(err);
    setModalNotif(true);
  };

  const [isHovered, setIsHovered] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
      // setAvatar(file);
      const linkTemporary: string = URL.createObjectURL(file);
      initialAvatar(linkTemporary);
      setPreviewAvatar(URL.createObjectURL(file));
      uploadAvatar(file);
    }
  };

  // fungsi ketika button delete avatar click
  // const onButtonDeleteAvatar = () => {
  //   try {
  //     axiosCustom.delete(`/assets/${idImageAvatar}/delete`);
  //     setIdImageAvatar(null);
  //     setPreviewAvatar(null);
  //     setIdImageAvatarOld(null);
  //     setBtnDeleteAvatar(false);
  //   } catch (error: any) {
  //     // tampilken error
  //     if (error?.response) {
  //       handleShowMessage(
  //         `Terjadi Kesalahan: ${error.response.data.message}`,
  //         true,
  //       );
  //     } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
  //   }
  // };
  type linkTemporary = undefined | string;
  // const [dataEdited, setDataEdited] = useState(rowData ? rowData : []);
  const initialAvatar = (linkTemporary: linkTemporary = undefined) => {
    if (isEditModalOpen && rowData && rowData.length !== 0) {
      if (rowData?.image_id !== null) {
        if (idImageAvatarOld !== rowData.image_id) {
          if (linkTemporary !== undefined) {
            setIdImageAvatarOld(null);
            setPreviewAvatar(linkTemporary);
          }
          setIdImageAvatarOld(rowData.image_id);
          setPreviewAvatar(rowData.image_url);
          setBtnDeleteAvatar(true);
        }
      }
    }
  };

  async function uploadAvatar(file: File) {
    setIsLoading(true);
    try {
      const data = new FormData();
      data.append("asset", file as File);
      const upload = await axiosCustom.post("/assets/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIdImageAvatar(upload.data.data.id);
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

  // logic update avatar disini
  // useEffect(() => {
  //   if(isEditModalOpen === true) initialAvatar(undefined);
  //   // setDataEdited(rowData);
  //   // console.log(dataEdited);
  //   // kondisi ketika edit data, tambah event ketika onClose setIsModalEditOpen null
  // }, [isEditModalOpen]);

  useEffect(() => {
    if (isEditModalOpen === true) {
      setValue("description", rowData?.description);
      initialAvatar(undefined);
    }
  }, [isEditModalOpen]);

  const handleFormSubmit: SubmitHandler<any> = async (data) => {
    setIsLoading(true);

    try {
      // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
      if (data.id) {
        // Mode edit, kirim data melalui PUT request
        const dataBaru: {
          title: string;
          description: string;
          event_date: string;
          image?: string;
        } = {
          title: `${data.title}`,
          description: `${data.description}`,
          event_date: `${data.event_date}`,
        };
        if (idImageAvatar) {
          dataBaru.image = idImageAvatar;
        }
        await axiosCustom
          .put(`/tenant/${idTenant}/update-gallery/${data.id}`, dataBaru)
          .then((response) => {
            // setData(response.data.data);

            if (response.status === 200) {
              // router.refresh();
              handleShowMessage("Data berhasil diubah.", false);
              setIsEditModalOpen(false); // Tutup modal
              resetAll(); // Reset formulir
              setIsLoading(false);
            }
          });
      }

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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const resetAll = () => {
    reset(); // Reset formulir
    reset({ description: "" });
    setIsLoading(false);
    setPreviewAvatar(null); // reset preview
    setIdImageAvatarOld(null); // kosongkan idimage
    setIdImageAvatar(null); // kosongkan idimage
    // setDataEdited([]);
  };

  const handleModal = () => {
    clearErrors("description");
    setIsEditModalOpen(true);
  };

  // console.log(rowData);

  return (
    <div>
      <Button
        bgColor="blue.100"
        _hover={{
          bg: "blue.200",
        }}
        title="Edit Data"
        onClick={() => handleModal()}
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
                            </HStack>
                          </Stack>
                        </Box>
                      </Flex>
                      <FormErrorMessage>
                        <Text
                          whiteSpace={{
                            base: "nowrap",
                            md: "normal",
                            lg: "normal",
                          }}
                        >
                          {errors.image_id && errors.image_id.message}
                        </Text>
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box w="full">
                    <Hide>
                      <FormControl isInvalid={!!errors.id} mb="3">
                        <Input
                          type="text"
                          {...register("id")}
                          defaultValue={rowData?.id}
                          // className={`form-control ${errors.name ? "is-invalid"}`}
                        />
                        <FormErrorMessage>
                          {errors.id && errors.id.message}
                        </FormErrorMessage>
                      </FormControl>
                    </Hide>
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
                            defaultValue={rowData?.title}
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
                            defaultValue={rowData?.event_date}
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
                          {/* <Textarea
                            {...fields.description}
                            defaultValue={rowData?.description}
                            // className={`form-control ${errors.name ? "is-invalid"}`}
                          /> */}
                          <Editor
                            {...field}
                            apiKey={process.env.API_TINYMCE}
                            initialValue={rowData?.description}
                            // textareaName={name}
                            value={value}
                            init={{
                              ...initRichTextProps,
                              toolbar_mode: "sliding",
                              height: 250,
                            }}
                            onEditorChange={onChange}
                          />
                          {/* <Controller
                            name="description"
                            control={control}
                            rules={{
                              required: "sjhdfgjhsdbfsdb",
                            }}
                            defaultValue={rowData?.description}
                            render={({
                              field: { onChange, ref, ...field },
                            }) => (
                              <Editor
                                // ref={ref}
                                {...field}
                                apiKey="4spy3n17ow5pmzr63z6ijcocaticpe0vurmdxweowxamj1g4"
                                // initialValue={value}
                                // value={descriptionContent}
                                init={{
                                  ...initRichTextProps,
                                  toolbar_mode: "sliding",
                                  height: 300,
                                }}
                                onEditorChange={onChange}
                              />
                            )}
                          /> */}
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
        onSubmit={()=>onSubmit()}
      />
    </div>
  );
};

export default EditGallery;
