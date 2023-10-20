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
  Spinner,
  Center,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import ModalNotif from "./modal-notif";
import ConfirmationModal from "./modal-confirm";
import { axiosCustom } from "@/app/api/axios";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedin, FaGlobe } from "react-icons/fa";
import { BsCheck, BsPlus, BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useAuth } from "@/app/components/utils/AuthContext";
import dynamic from "next/dynamic";
import { UserRoles, permissions } from "@/app/type/role-access-control.d";

interface Formdata {
  id: string;
  title: string;
  url: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  idTenant?: string;
  idUser?: string;
  onDelete: () => void;
}

interface FormValues {
  id: string;
  id_tenant: string;
  title: string;
  url: string;
}

interface UserLog {
  // id: string;
  fullname: string;
  role: UserRoles;
  image_url: string;
}

const ModalSocial: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  idTenant,
  idUser,
  onDelete,
}) => {
  const {
    register: registWebsite,
    handleSubmit: handleWebsite,
    formState: { errors: errWebsite },
    reset: resetWebsite,
  } = useForm<FormValues>();

  const {
    register: registFacebook,
    handleSubmit: handleFacebook,
    formState: { errors: errFacebook },
    reset: resetFacebook,
  } = useForm<FormValues>();

  const {
    register: registInstagram,
    handleSubmit: handleInstagram,
    formState: { errors: errInstagram },
    reset: resetInstagram,
  } = useForm<FormValues>();

  const {
    register: registTwitter,
    handleSubmit: handleTwitter,
    formState: { errors: errTwitter },
    reset: resetTwitter,
  } = useForm<FormValues>();

  const {
    register: registYouTube,
    handleSubmit: handleYouTube,
    formState: { errors: errYouTube },
    reset: resetYouTube,
  } = useForm<FormValues>();

  const {
    register: registLinkedIn,
    handleSubmit: handleLinkedIn,
    formState: { errors: errLinkedIn },
    reset: resetLinkedIn,
  } = useForm<FormValues>();

  const { user } = useAuth();
  let getUser: UserLog | null = null; // Inisialisasikan getUser di sini

  if (user !== null && user !== 401) {
    getUser = user; // Setel nilai getUser jika user ada
  }

  let features: any | null | undefined = null; // Inisialisasikan canAccessBtn
  let allMenu: any | null = null;
  if (getUser !== null) {
    features = permissions[getUser.role]?.features.find(
      (feature) => feature.menu === "backPanelTenant_links",
    );
    allMenu = permissions[getUser.role]?.features.find(
      (feature) => feature.menu === "allmenu",
    );
  }

  const features_access =
    features?.access.includes("all_access") ||
    allMenu?.access.includes("all_access");

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGetData, setIsLoadingGetData] = useState(true);
  const [isModalNotif, setModalNotif] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleShowMessage = (msg: string, err: boolean) => {
    setMessage(msg);
    setIsError(err);
    setModalNotif(true);
  };
  //'Website','LinkedIn','Instagram','Facebook','Twitter','YouTube'
  const [akunFb, setAkunFb] = useState<Array<Formdata>>([]);
  const [akunWeb, setAkunWeb] = useState<Array<Formdata>>([]);
  const [akunIg, setAkunIg] = useState<Array<Formdata>>([]);
  const [akunTw, setAkunTw] = useState<Array<Formdata>>([]);
  const [akunYt, setAkunYt] = useState<Array<Formdata>>([]);
  const [akunLd, setAkunLd] = useState<Array<Formdata>>([]);

  const [isEditingWebsite, setIsEditingWebsite] = useState<boolean>(false);
  const [isEditingFacebook, setIsEditingFacebook] = useState<boolean>(false);
  const [isEditingInstagram, setIsEditingInstagram] = useState<boolean>(false);
  const [isEditingTwitter, setIsEditingTwitter] = useState<boolean>(false);
  const [isEditingYouTube, setIsEditingYouTube] = useState<boolean>(false);
  const [isEditingLinkedIn, setIsEditingLinkedIn] = useState<boolean>(false);

  const handleSave = async (data: any) => {
    setIsLoading(true);
    if (idTenant) {
      try {
          console.log(data);
        // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
        if (data.id) {
          // Mode edit, kirim data melalui PUT request
          await axiosCustom
            .put(`/tenant/${idTenant}/update-link/${data.id}`, data)
            .then((response) => {
              // setData(response.data.data);

              if (response.status === 200) {
                handleShowMessage("Data berhasil diubah.", false);
              }
            });
        } else {
          // Mode tambah, kirim data melalui POST request
          await axiosCustom
            .post(`/tenant/${idTenant}/add-link`, data)
            .then((response) => {
              // console.log(response);
              if (response.status === 201) {
                handleShowMessage("Data berhasil disimpan.", false);
              }
            });
        }
        setIsLoading(false);
        getUpdatedSocial();
        setFalse();
      } catch (error: any) {
        console.error(error);
        if (error?.response) {
          handleShowMessage(
            `Terjadi Kesalahan: ${error.response.data.message} : ${error.response.data.data?.url}`,
            true,
          );
        } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
        setIsLoading(false);
      }
    } else if (idUser) {
      try {
        // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
        if (data.id) {
          // Mode edit, kirim data melalui PUT request
          await axiosCustom
            .put(`/user/${idUser}/update-link/${data.id}`, data)
            .then((response) => {
              // setData(response.data.data);

              if (response.status === 200) {
                handleShowMessage("Data berhasil diubah.", false);
              }
            });
        } else {
          // Mode tambah, kirim data melalui POST request
          await axiosCustom
            .post(`/user/${idUser}/add-link`, data)
            .then((response) => {
              // console.log(response);
              if (response.status === 201) {
                handleShowMessage("Data berhasil disimpan.", false);
              }
            });
        }

        onSubmit(); // Panggil fungsi penyimpanan data (misalnya, untuk memperbarui tampilan tabel)
        setIsLoading(false);
        getUpdatedSocial();
        setFalse();
      } catch (error: any) {
        console.error(error);
        if (error?.response) {
          handleShowMessage(
            `Terjadi Kesalahan: ${error.response.data.message} : ${error.response.data.data?.url}`,
            true,
          );
        } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
        setIsLoading(false);
      }
    }
  };

  //handle hapus
  const [dataDelete, setDataDelete] = useState<any | null>([]);
  const [textConfirm, setTextConfirm] = useState(" ");
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const handleDelete = (item: any) => {
    setDataDelete(item);
    setTextConfirm(`Yakin ingin hapus akun social link ${item.title} ?`);
    setIsModalDeleteOpen(true);
  };

  const resetByOne = (title:string) => {
    switch (title) {
      case "Website":
        resetWebsite();
        break;
      case "Facebook":
        resetFacebook();
        break;
      case "Instagram":
        resetInstagram();
        break;
      case "Twitter":
        resetTwitter();
        break;
      case "YouTube":
        resetYouTube();
        break;
      case "LinkedIn":
        resetLinkedIn();
        break;
    }
  }

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const deleteData = async () => {
    if (idTenant && dataDelete) {
      try {
        setIsLoadingDelete(true);
        const response = await axiosCustom.delete(
          `tenant/${idTenant}/delete-link/${dataDelete.id}`,
        );

        // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
        const timer = setTimeout(() => {
          // console.log(response);
          if (response.status === 200) {
            setIsLoadingDelete(false);
            setIsModalDeleteOpen(false);
            handleShowMessage("Data berhasil dihapus.", false);
            setDataDelete(null);
            getUpdatedSocial();
            setFalse();
            resetByOne(dataDelete.title);
          }
        }, 1000);

        return () => clearTimeout(timer);
      } catch (error: any) {
        if (error?.response) {
          handleShowMessage(
            `Terjadi Kesalahan: ${error.response.data.message}`,
            true,
          );
        } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
        setIsLoadingDelete(false);
      }
    } else if (idUser && dataDelete) {
      try {
        setIsLoadingDelete(true);
        const response = await axiosCustom.delete(
          `/user/${idUser}/delete-link/${dataDelete.id}`,
        );

        // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
        const timer = setTimeout(() => {
          // console.log(response);
          if (response.status === 200) {
            setIsLoadingDelete(false);
            setIsModalDeleteOpen(false);
            getUpdatedSocial();
            handleShowMessage("Data berhasil dihapus.", false);
            setDataDelete(null);
            resetByOne(dataDelete.title);
            onDelete();
            setFalse();
          }
        }, 1000);

        return () => clearTimeout(timer);
      } catch (error: any) {
        if (error?.response) {
          handleShowMessage(
            `Terjadi Kesalahan: ${error.response.data.message}`,
            true,
          );
        } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
        setIsLoadingDelete(false);
      }
    }
  };

  const getUpdatedSocial = async () => {
    if (idTenant) {
      try {
        const response = await axiosCustom.get(`/tenant/${idTenant}/get-link`);
        if (response.status === 200) {
          setAkunWeb([response.data?.data.find(
            (links: any) => links.title === "Website",
          )]);
          setAkunFb([response.data?.data.find(
            (links: any) => links.title === "Facebook",
          )]);
          setAkunIg([response.data?.data.find(
            (links: any) => links.title === "Instagram",
          )]);
          setAkunTw([response.data?.data.find(
            (links: any) => links.title === "Twitter",
          )]);
          setAkunYt([response.data?.data.find(
            (links: any) => links.title === "YouTube",
          )]);
          setAkunLd([response.data?.data.find(
            (links: any) => links.title === "LinkedIn",
          )]);
          setIsLoadingGetData(false);
        }
        // console.log(response);
        // console.log(akunFb);
      } catch (error: any) {
        if (error?.response) {
          handleShowMessage(
            `Terjadi Kesalahan: ${error.response.data.message}`,
            true,
          );
        } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
        setIsLoadingGetData(false);
      }
    } else if (idUser) {
      try {
        const response = await axiosCustom.get(`/user/${idUser}/get-link`);
        if (response.status === 200) {
          setAkunWeb([
            response.data?.data.find((links: any) => links.title === "Website"),
          ]);
          setAkunFb([
            response.data?.data.find(
              (links: any) => links.title === "Facebook",
            ),
          ]);
          setAkunIg([
            response.data?.data.find(
              (links: any) => links.title === "Instagram",
            ),
          ]);
          setAkunTw([
            response.data?.data.find((links: any) => links.title === "Twitter"),
          ]);
          setAkunYt([
            response.data?.data.find((links: any) => links.title === "YouTube"),
          ]);
          setAkunLd([
            response.data?.data.find(
              (links: any) => links.title === "LinkedIn",
            ),
          ]);
          setIsLoadingGetData(false);
        }
        // console.log(akunFb);
      } catch (error: any) {
        if (error?.response) {
          handleShowMessage(
            `Terjadi Kesalahan: ${error.response.data.message}`,
            true,
          );
        } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
        setIsLoadingGetData(false);
      }
    }
  };

  // const [dataEdited, setDataEdited] = useState<any | null>([]);
  // const getEdited = () => {
  //   if (dataEdited && dataEdited.length !== 0 && dataEdited !== null) {
  //     dataEdited.forEach((data:Formdata) => {
  //       switch (data.title) {
  //         case "Website":
  //           akunWeb.push(data);
  //           // setAkunWeb(data);
  //           console.log("kok masuk sih");
  //           console.log(akunWeb);
  //           break;
  //         case "Facebook":
  //           akunFb.push(data);
  //           console.log("kok masuk FB");
  //           console.log(akunFb[0]);
  //           break;
  //         case "Instagram":
  //           akunIg.push(data);
  //           break;
  //         case "Twitter":
  //           akunTw.push(data);
  //           break;
  //         case "YouTube":
  //           akunYt.push(data);
  //           break;
  //         case "LinkedIn":
  //           akunLd.push(data);
  //           break;
  //       }
  //     });
  //   }
  // }

  useEffect(() => {
    // const [dataEdited, setDataEdited] = useState(formData ? formData : []);

    getUpdatedSocial();
    // setDataEdited(formData);
  }, [idTenant, idUser, isOpen]);

  // console.log(akunWeb[0]?.url);
  // console.log(akunFb);
  // console.log(dataEdited);

  const resetAll = () => {
    setDataDelete(null);
    resetWebsite();
    resetInstagram();
    resetFacebook();
    resetTwitter();
    resetYouTube();
    resetLinkedIn();
  };

  const setFalse = () => {
    setIsEditingWebsite(false);
    setIsEditingInstagram(false);
    setIsEditingFacebook(false);
    setIsEditingTwitter(false);
    setIsEditingYouTube(false);
    setIsEditingLinkedIn(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          resetAll();
          setFalse();
        }}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{"Social Links Setting"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoadingGetData ? (
              <Center h="100%" mb="5">
                <Spinner className="spinner" size="xl" color="blue.500" />
              </Center>
            ) : (
              <div className="data-form">
                {/* Social Website */}
                <HStack
                  spacing={3}
                  pb="3"
                  alignItems={"center"}
                  w="full"
                  justifyContent={"space-between"}
                >
                  <Stack w="full">
                    {/* Social Website */}
                    <form onSubmit={handleWebsite(handleSave)}>
                      <HStack spacing={3} alignItems={"center"} w="full">
                        <Hide>
                          <FormControl>
                            <Input
                              {...registWebsite("id")}
                              defaultValue={akunWeb[0] ? akunWeb[0].id : ""}
                            />
                          </FormControl>
                        </Hide>

                        <Hide>
                          <FormControl>
                            <Input
                              {...registWebsite("title")}
                              defaultValue="Website"
                            />
                          </FormControl>
                        </Hide>

                        <FormControl isInvalid={!!errWebsite.url}>
                          <Stack
                            spacing={3}
                            alignItems={"center"}
                            direction="row"
                            w="100%"
                          >
                            <IconButton
                              color="teal.500"
                              aria-label="website"
                              icon={<FaGlobe size="xs" />}
                              bg="transparent"
                            />
                            <fieldset
                              disabled={!isEditingWebsite}
                              style={{ width: "100%" }}
                            >
                              <Input
                                placeholder="URL Social Website"
                                onFocus={() => !isEditingWebsite}
                                defaultValue={akunWeb[0] ? akunWeb[0].url : ""}
                                {...registWebsite("url", {
                                  required: "URL Website harus diisi!",
                                })}
                                minW={"full"}
                              />
                            </fieldset>

                            {/* jika ada datany maka berikan tampilan edit dan delete */}
                            {akunWeb[0]?.url ? (
                              <div>
                                {/* periksa dulu apakah tombol edit dipenyet, jika yaa maka yg tampil tombol simpan buat edit */}
                                {isEditingWebsite ? (
                                  // begitu tambah dipenyek, maka muncul btn simpan
                                  <IconButton
                                    colorScheme="orange"
                                    aria-label="Simpan"
                                    icon={<BsCheck size="sm" />}
                                    size="sm"
                                    type="submit"
                                    title="Simpan"
                                    isDisabled={isLoading}
                                  />
                                ) : (
                                  // jika tidak, maka baru tampilkan edit dan delete
                                  <HStack>
                                    <IconButton
                                      colorScheme="blue"
                                      aria-label="Edit"
                                      title="Edit"
                                      icon={<BsFillPencilFill />}
                                      size="sm"
                                      display={
                                        features_access ? "flex" : "none"
                                      }
                                      onClick={() =>
                                        // begitu tmbl edit dipenyet maka buat status menjalankan edit shg btn diganti btn Simpan (diatas)
                                        setIsEditingFacebook(!isEditingWebsite)
                                      }
                                    />
                                    <IconButton
                                      colorScheme="red"
                                      aria-label="Hapus"
                                      title="Hapus"
                                      icon={<BsFillTrashFill />}
                                      size="sm"
                                      display={
                                        features_access ? "flex" : "none"
                                      }
                                      onClick={() => handleDelete(akunWeb[0])}
                                    />
                                  </HStack>
                                )}
                              </div>
                            ) : (
                              // jika tidak ada data/ belum punya, maka berikan btn tambah
                              <>
                                {isEditingWebsite && (
                                  <IconButton
                                    colorScheme="orange"
                                    aria-label="Simpan"
                                    icon={<BsCheck size="sm" />}
                                    size="sm"
                                    type="submit"
                                    title="Simpan"
                                    isDisabled={isLoading}
                                  />
                                )}
                              </>
                            )}
                          </Stack>

                          <FormErrorMessage>
                            {errWebsite.url && errWebsite.url.message}
                          </FormErrorMessage>
                        </FormControl>
                      </HStack>
                    </form>
                  </Stack>

                  {!akunWeb[0]?.url && !isEditingWebsite ? (
                    <IconButton
                      colorScheme="green"
                      aria-label="Tambah"
                      icon={<BsPlus size="sm" />}
                      size="sm"
                      title="Tambah"
                      onClick={() => {
                        // begitu tambah dipenyek, maka muncul btn simpan
                        setIsEditingWebsite(true);
                      }}
                      display={features_access ? "flex" : "none"}
                      isDisabled={isLoading}
                    />
                  ) : null}
                </HStack>

                {/* Social Facebook */}
                <HStack
                  spacing={3}
                  pb="3"
                  alignItems={"center"}
                  w="full"
                  justifyContent={"space-between"}
                >
                  <Stack w="full">
                    <form onSubmit={handleFacebook(handleSave)}>
                      <HStack spacing={3} alignItems={"center"} w="full">
                        <Hide>
                          <FormControl>
                            <Input
                              {...registFacebook("id")}
                              defaultValue={akunFb[0] ? akunFb[0].id : ""}
                            />
                          </FormControl>
                        </Hide>

                        <Hide>
                          <FormControl>
                            <Input
                              {...registFacebook("title")}
                              defaultValue="Facebook"
                            />
                          </FormControl>
                        </Hide>

                        <FormControl isInvalid={!!errFacebook.url}>
                          <Stack
                            spacing={3}
                            alignItems={"center"}
                            direction="row"
                            w="100%"
                          >
                            <IconButton
                              color="blue.700"
                              aria-label="website"
                              bg="transparent"
                              icon={<FaFacebook size="xs" />}
                            />
                            <fieldset
                              disabled={!isEditingFacebook}
                              style={{ width: "100%" }}
                            >
                              <Input
                                placeholder="URL Social Facebook"
                                onFocus={() => !isEditingFacebook}
                                defaultValue={akunFb[0] ? akunFb[0].url : ""}
                                {...registFacebook("url", {
                                  required: "URL Facebook harus diisi!",
                                })}
                                minW={"full"}
                              />
                            </fieldset>

                            {/* jika ada datany maka berikan tampilan edit dan delete */}
                            {akunFb[0]?.url ? (
                              <div>
                                {/* periksa dulu apakah tombol edit dipenyet, jika yaa maka yg tampil tombol simpan buat edit */}
                                {isEditingFacebook ? (
                                  // begitu tambah dipenyek, maka muncul btn simpan
                                  <IconButton
                                    colorScheme="orange"
                                    aria-label="Simpan"
                                    icon={<BsCheck size="sm" />}
                                    size="sm"
                                    type="submit"
                                    title="Simpan"
                                    isDisabled={isLoading}
                                  />
                                ) : (
                                  // jika tidak, maka baru tampilkan edit dan delete
                                  <HStack>
                                    <IconButton
                                      colorScheme="blue"
                                      aria-label="Edit"
                                      title="Edit"
                                      icon={<BsFillPencilFill />}
                                      size="sm"
                                      display={
                                        features_access ? "flex" : "none"
                                      }
                                      onClick={() =>
                                        // begitu tmbl edit dipenyet maka buat status menjalankan edit shg btn diganti btn Simpan (diatas)
                                        setIsEditingFacebook(!isEditingFacebook)
                                      }
                                    />
                                    <IconButton
                                      colorScheme="red"
                                      aria-label="Hapus"
                                      title="Hapus"
                                      icon={<BsFillTrashFill />}
                                      size="sm"
                                      display={
                                        features_access ? "flex" : "none"
                                      }
                                      onClick={() => handleDelete(akunFb[0])}
                                    />
                                  </HStack>
                                )}
                              </div>
                            ) : (
                              // jika tidak ada data/ belum punya, maka berikan btn tambah
                              <>
                                {isEditingFacebook && (
                                  <IconButton
                                    colorScheme="orange"
                                    aria-label="Simpan"
                                    icon={<BsCheck size="sm" />}
                                    size="sm"
                                    type="submit"
                                    title="Simpan"
                                    isDisabled={isLoading}
                                  />
                                )}
                              </>
                            )}
                          </Stack>

                          <FormErrorMessage>
                            {errFacebook.url && errFacebook.url.message}
                          </FormErrorMessage>
                        </FormControl>
                      </HStack>
                    </form>
                  </Stack>

                  {!akunFb[0]?.url && !isEditingFacebook ? (
                    <IconButton
                      colorScheme="green"
                      aria-label="Tambah"
                      icon={<BsPlus size="sm" />}
                      size="sm"
                      title="Tambah"
                      display={features_access ? "flex" : "none"}
                      onClick={() => {
                        // begitu tambah dipenyek, maka muncul btn simpan
                        setIsEditingFacebook(true);
                      }}
                    />
                  ) : null}
                </HStack>

                {/* Social Instagram */}
                <HStack
                  spacing={3}
                  pb="3"
                  alignItems={"center"}
                  w="full"
                  justifyContent={"space-between"}
                >
                  <Stack w="full">
                    <form onSubmit={handleInstagram(handleSave)}>
                      <HStack spacing={3} alignItems={"center"} w="full">
                        <Hide>
                          <FormControl>
                            <Input
                              {...registInstagram("id")}
                              defaultValue={akunIg[0] ? akunIg[0].id : ""}
                            />
                          </FormControl>
                        </Hide>

                        <Hide>
                          <FormControl>
                            <Input
                              {...registInstagram("title")}
                              defaultValue="Instagram"
                            />
                          </FormControl>
                        </Hide>

                        <FormControl isInvalid={!!errInstagram.url}>
                          <Stack
                            spacing={3}
                            alignItems={"center"}
                            direction="row"
                            w="100%"
                          >
                            <IconButton
                              color="pink.500"
                              aria-label="instagram"
                              bg="transparent"
                              icon={<FaInstagram size="xs" />}
                            />
                            <fieldset
                              disabled={!isEditingInstagram}
                              style={{ width: "100%" }}
                            >
                              <Input
                                placeholder="URL Social Instagram"
                                onFocus={() => !isEditingInstagram}
                                defaultValue={akunIg[0] ? akunIg[0].url : ""}
                                {...registInstagram("url", {
                                  required: "URL Instagram harus diisi!",
                                })}
                                minW={"full"}
                              />
                            </fieldset>

                            {/* jika ada datany maka berikan tampilan edit dan delete */}
                            {akunIg[0]?.url ? (
                              <div>
                                {/* periksa dulu apakah tombol edit dipenyet, jika yaa maka yg tampil tombol simpan buat edit */}
                                {isEditingInstagram ? (
                                  // begitu tambah dipenyek, maka muncul btn simpan
                                  <IconButton
                                    colorScheme="orange"
                                    aria-label="Simpan"
                                    icon={<BsCheck size="sm" />}
                                    size="sm"
                                    type="submit"
                                    title="Simpan"
                                    isDisabled={isLoading}
                                  />
                                ) : (
                                  // jika tidak, maka baru tampilkan edit dan delete
                                  <HStack>
                                    <IconButton
                                      colorScheme="blue"
                                      aria-label="Edit"
                                      title="Edit"
                                      icon={<BsFillPencilFill />}
                                      size="sm"
                                      display={
                                        features_access ? "flex" : "none"
                                      }
                                      onClick={() =>
                                        // begitu tmbl edit dipenyet maka buat status menjalankan edit shg btn diganti btn Simpan (diatas)
                                        setIsEditingInstagram(
                                          !isEditingInstagram,
                                        )
                                      }
                                    />
                                    <IconButton
                                      colorScheme="red"
                                      aria-label="Hapus"
                                      title="Hapus"
                                      icon={<BsFillTrashFill />}
                                      size="sm"
                                      display={
                                        features_access ? "flex" : "none"
                                      }
                                      onClick={() => handleDelete(akunIg[0])}
                                    />
                                  </HStack>
                                )}
                              </div>
                            ) : (
                              // jika tidak ada data/ belum punya, maka berikan btn tambah
                              <>
                                {isEditingInstagram && (
                                  <IconButton
                                    colorScheme="orange"
                                    aria-label="Simpan"
                                    icon={<BsCheck size="sm" />}
                                    size="sm"
                                    type="submit"
                                    title="Simpan"
                                    isDisabled={isLoading}
                                  />
                                )}
                              </>
                            )}
                          </Stack>

                          <FormErrorMessage>
                            {errInstagram.url && errInstagram.url.message}
                          </FormErrorMessage>
                        </FormControl>
                      </HStack>
                    </form>
                  </Stack>

                  {!akunIg[0]?.url && !isEditingInstagram ? (
                    <IconButton
                      colorScheme="green"
                      aria-label="Tambah"
                      icon={<BsPlus size="sm" />}
                      size="sm"
                      title="Tambah"
                      display={features_access ? "flex" : "none"}
                      onClick={() => {
                        // begitu tambah dipenyek, maka muncul btn simpan
                        setIsEditingInstagram(true);
                      }}
                    />
                  ) : null}
                </HStack>

                {/* Social Twitter */}
                <HStack
                  spacing={3}
                  pb="3"
                  alignItems={"center"}
                  w="full"
                  justifyContent={"space-between"}
                >
                  <Stack w="full">
                    <form onSubmit={handleTwitter(handleSave)}>
                      <HStack spacing={3} alignItems={"center"} w="full">
                        <Hide>
                          <FormControl>
                            <Input
                              {...registTwitter("id")}
                              defaultValue={akunTw[0] ? akunTw[0].id : ""}
                            />
                          </FormControl>
                        </Hide>

                        <Hide>
                          <FormControl>
                            <Input
                              {...registTwitter("title")}
                              defaultValue="Twitter"
                            />
                          </FormControl>
                        </Hide>

                        <FormControl isInvalid={!!errTwitter.url}>
                          <Stack
                            spacing={3}
                            alignItems={"center"}
                            direction="row"
                            w="100%"
                          >
                            <IconButton
                              color="blue.300"
                              aria-label="twitter"
                              bg="transparent"
                              icon={<FaTwitter size="xs" />}
                            />
                            <fieldset
                              disabled={!isEditingTwitter}
                              style={{ width: "100%" }}
                            >
                              <Input
                                placeholder="URL Social Twitter"
                                onFocus={() => !isEditingTwitter}
                                defaultValue={akunTw[0] ? akunTw[0].url : ""}
                                {...registTwitter("url", {
                                  required: "URL Twitter harus diisi!",
                                })}
                                minW={"full"}
                              />
                            </fieldset>

                            {/* jika ada datany maka berikan tampilan edit dan delete */}
                            {akunTw[0]?.url ? (
                              <div>
                                {/* periksa dulu apakah tombol edit dipenyet, jika yaa maka yg tampil tombol simpan buat edit */}
                                {isEditingTwitter ? (
                                  // begitu tambah dipenyek, maka muncul btn simpan
                                  <IconButton
                                    colorScheme="orange"
                                    aria-label="Simpan"
                                    icon={<BsCheck size="sm" />}
                                    size="sm"
                                    type="submit"
                                    title="Simpan"
                                    isDisabled={isLoading}
                                  />
                                ) : (
                                  // jika tidak, maka baru tampilkan edit dan delete
                                  <HStack>
                                    <IconButton
                                      colorScheme="blue"
                                      aria-label="Edit"
                                      title="Edit"
                                      icon={<BsFillPencilFill />}
                                      size="sm"
                                      display={
                                        features_access ? "flex" : "none"
                                      }
                                      onClick={() =>
                                        // begitu tmbl edit dipenyet maka buat status menjalankan edit shg btn diganti btn Simpan (diatas)
                                        setIsEditingTwitter(!isEditingTwitter)
                                      }
                                    />
                                    <IconButton
                                      colorScheme="red"
                                      aria-label="Hapus"
                                      title="Hapus"
                                      icon={<BsFillTrashFill />}
                                      size="sm"
                                      display={
                                        features_access ? "flex" : "none"
                                      }
                                      onClick={() => handleDelete(akunTw[0])}
                                    />
                                  </HStack>
                                )}
                              </div>
                            ) : (
                              // jika tidak ada data/ belum punya, maka berikan btn tambah
                              <>
                                {isEditingTwitter && (
                                  <IconButton
                                    colorScheme="orange"
                                    aria-label="Simpan"
                                    icon={<BsCheck size="sm" />}
                                    size="sm"
                                    type="submit"
                                    title="Simpan"
                                    isDisabled={isLoading}
                                  />
                                )}
                              </>
                            )}
                          </Stack>

                          <FormErrorMessage>
                            {errTwitter.url && errTwitter.url.message}
                          </FormErrorMessage>
                        </FormControl>
                      </HStack>
                    </form>
                  </Stack>

                  {!akunTw[0]?.url && !isEditingTwitter ? (
                    <IconButton
                      colorScheme="green"
                      aria-label="Tambah"
                      icon={<BsPlus size="sm" />}
                      size="sm"
                      title="Tambah"
                      display={features_access ? "flex" : "none"}
                      onClick={() => {
                        // begitu tambah dipenyek, maka muncul btn simpan
                        setIsEditingTwitter(true);
                      }}
                    />
                  ) : null}
                </HStack>

                {/* Social YouTube */}
                <HStack
                  spacing={3}
                  pb="3"
                  alignItems={"center"}
                  w="full"
                  justifyContent={"space-between"}
                >
                  <Stack w="full">
                    <form onSubmit={handleYouTube(handleSave)}>
                      <HStack spacing={3} alignItems={"center"} w="full">
                        <Hide>
                          <FormControl>
                            <Input
                              {...registYouTube("id")}
                              defaultValue={akunYt[0] ? akunYt[0].id : ""}
                            />
                          </FormControl>
                        </Hide>

                        <Hide>
                          <FormControl>
                            <Input
                              {...registYouTube("title")}
                              defaultValue="YouTube"
                            />
                          </FormControl>
                        </Hide>

                        <FormControl isInvalid={!!errYouTube.url}>
                          <Stack
                            spacing={3}
                            alignItems={"center"}
                            direction="row"
                            w="100%"
                          >
                            <IconButton
                              color="red.500"
                              aria-label="youtube"
                              bg="transparent"
                              icon={<FaYoutube size="xs" />}
                            />
                            <fieldset
                              disabled={!isEditingYouTube}
                              style={{ width: "100%" }}
                            >
                              <Input
                                placeholder="URL Social YouTube"
                                onFocus={() => !isEditingYouTube}
                                defaultValue={akunYt[0] ? akunYt[0].url : ""}
                                {...registYouTube("url", {
                                  required: "URL YouTube harus diisi!",
                                })}
                                minW={"full"}
                              />
                            </fieldset>

                            {/* jika ada datany maka berikan tampilan edit dan delete */}
                            {akunYt[0]?.url ? (
                              <div>
                                {/* periksa dulu apakah tombol edit dipenyet, jika yaa maka yg tampil tombol simpan buat edit */}
                                {isEditingYouTube ? (
                                  // begitu tambah dipenyek, maka muncul btn simpan
                                  <IconButton
                                    colorScheme="orange"
                                    aria-label="Simpan"
                                    icon={<BsCheck size="sm" />}
                                    size="sm"
                                    type="submit"
                                    title="Simpan"
                                    isDisabled={isLoading}
                                  />
                                ) : (
                                  // jika tidak, maka baru tampilkan edit dan delete
                                  <HStack>
                                    <IconButton
                                      colorScheme="blue"
                                      aria-label="Edit"
                                      title="Edit"
                                      icon={<BsFillPencilFill />}
                                      size="sm"
                                      display={
                                        features_access ? "flex" : "none"
                                      }
                                      onClick={() =>
                                        // begitu tmbl edit dipenyet maka buat status menjalankan edit shg btn diganti btn Simpan (diatas)
                                        setIsEditingYouTube(!isEditingYouTube)
                                      }
                                    />
                                    <IconButton
                                      colorScheme="red"
                                      aria-label="Hapus"
                                      title="Hapus"
                                      icon={<BsFillTrashFill />}
                                      size="sm"
                                      display={
                                        features_access ? "flex" : "none"
                                      }
                                      onClick={() => handleDelete(akunYt[0])}
                                    />
                                  </HStack>
                                )}
                              </div>
                            ) : (
                              // jika tidak ada data/ belum punya, maka berikan btn tambah
                              <>
                                {isEditingYouTube && (
                                  <IconButton
                                    colorScheme="orange"
                                    aria-label="Simpan"
                                    icon={<BsCheck size="sm" />}
                                    size="sm"
                                    type="submit"
                                    title="Simpan"
                                    isDisabled={isLoading}
                                  />
                                )}
                              </>
                            )}
                          </Stack>

                          <FormErrorMessage>
                            {errYouTube.url && errYouTube.url.message}
                          </FormErrorMessage>
                        </FormControl>
                      </HStack>
                    </form>
                  </Stack>

                  {!akunYt[0]?.url && !isEditingYouTube ? (
                    <IconButton
                      colorScheme="green"
                      aria-label="Tambah"
                      icon={<BsPlus size="sm" />}
                      size="sm"
                      title="Tambah"
                      display={features_access ? "flex" : "none"}
                      onClick={() => {
                        // begitu tambah dipenyek, maka muncul btn simpan
                        setIsEditingYouTube(true);
                      }}
                    />
                  ) : null}
                </HStack>

                {/* Social LinkedIn */}
                <HStack
                  spacing={3}
                  pb="3"
                  alignItems={"center"}
                  w="full"
                  justifyContent={"space-between"}
                >
                  <Stack w="full">
                    <form onSubmit={handleLinkedIn(handleSave)}>
                      <HStack spacing={3} alignItems={"center"} w="full">
                        <Hide>
                          <FormControl>
                            <Input
                              {...registLinkedIn("id")}
                              defaultValue={akunLd[0] ? akunLd[0].id : ""}
                            />
                          </FormControl>
                        </Hide>

                        <Hide>
                          <FormControl>
                            <Input
                              {...registLinkedIn("title")}
                              defaultValue="LinkedIn"
                            />
                          </FormControl>
                        </Hide>

                        <FormControl isInvalid={!!errLinkedIn.url}>
                          <Stack
                            spacing={3}
                            alignItems={"center"}
                            direction="row"
                            w="100%"
                          >
                            <IconButton
                              color="blue.500"
                              aria-label="LinkedIn"
                              bg="transparent"
                              icon={<FaLinkedin size="xs" />}
                            />
                            <fieldset
                              disabled={!isEditingLinkedIn}
                              style={{ width: "100%" }}
                            >
                              <Input
                                placeholder="URL Social LinkedIn"
                                onFocus={() => !isEditingLinkedIn}
                                defaultValue={akunLd[0] ? akunLd[0].url : ""}
                                {...registLinkedIn("url", {
                                  required: "URL LinkedIn harus diisi!",
                                })}
                                minW={"full"}
                              />
                            </fieldset>

                            {/* jika ada datany maka berikan tampilan edit dan delete */}
                            {akunLd[0]?.url ? (
                              <div>
                                {/* periksa dulu apakah tombol edit dipenyet, jika yaa maka yg tampil tombol simpan buat edit */}
                                {isEditingLinkedIn ? (
                                  // begitu tambah dipenyek, maka muncul btn simpan
                                  <IconButton
                                    colorScheme="orange"
                                    aria-label="Simpan"
                                    icon={<BsCheck size="sm" />}
                                    size="sm"
                                    type="submit"
                                    title="Simpan"
                                    isDisabled={isLoading}
                                  />
                                ) : (
                                  // jika tidak, maka baru tampilkan edit dan delete
                                  <HStack>
                                    <IconButton
                                      colorScheme="blue"
                                      aria-label="Edit"
                                      title="Edit"
                                      icon={<BsFillPencilFill />}
                                      size="sm"
                                      display={
                                        features_access ? "flex" : "none"
                                      }
                                      onClick={() =>
                                        // begitu tmbl edit dipenyet maka buat status menjalankan edit shg btn diganti btn Simpan (diatas)
                                        setIsEditingLinkedIn(!isEditingLinkedIn)
                                      }
                                    />
                                    <IconButton
                                      colorScheme="red"
                                      aria-label="Hapus"
                                      title="Hapus"
                                      icon={<BsFillTrashFill />}
                                      size="sm"
                                      display={
                                        features_access ? "flex" : "none"
                                      }
                                      onClick={() => handleDelete(akunLd[0])}
                                    />
                                  </HStack>
                                )}
                              </div>
                            ) : (
                              // jika tidak ada data/ belum punya, maka berikan btn tambah
                              <>
                                {isEditingLinkedIn && (
                                  <IconButton
                                    colorScheme="orange"
                                    aria-label="Simpan"
                                    icon={<BsCheck size="sm" />}
                                    size="sm"
                                    type="submit"
                                    title="Simpan"
                                    isDisabled={isLoading}
                                  />
                                )}
                              </>
                            )}
                          </Stack>

                          <FormErrorMessage>
                            {errLinkedIn.url && errLinkedIn.url.message}
                          </FormErrorMessage>
                        </FormControl>
                      </HStack>
                    </form>
                  </Stack>

                  {!akunLd[0]?.url && !isEditingLinkedIn ? (
                    <IconButton
                      colorScheme="green"
                      aria-label="Tambah"
                      icon={<BsPlus size="sm" />}
                      size="sm"
                      title="Tambah"
                      display={features_access ? "flex" : "none"}
                      onClick={() => {
                        // begitu tambah dipenyek, maka muncul btn simpan
                        setIsEditingLinkedIn(true);
                      }}
                    />
                  ) : null}
                </HStack>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      <ModalNotif
        isOpen={isModalNotif}
        onClose={() => setModalNotif(false)}
        message={message}
        isError={isError}
      />

      {/* Modal hapus data */}
      <ConfirmationModal
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        onConfirm={deleteData}
        dataConfirm={textConfirm}
        isLoading={isLoadingDelete}
      />
    </>
  );
};

export default ModalSocial;
