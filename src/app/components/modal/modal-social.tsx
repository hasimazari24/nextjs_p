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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import ModalNotif from "./modal-notif";
import ConfirmationModal from "./modal-confirm";
import { axiosCustom } from "@/app/api/axios";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedin, FaGlobe } from "react-icons/fa";
 import { BsCheck, BsPlus, BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { linkSync } from "fs";

interface Formdata {
  id: string;
  title: string;
  url: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // data: any; // Data yang akan ditampilkan dalam modal
  onSubmit: () => void;
  formData?: any; // Jika mode edit, kirim data yang akan diedit
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

const ModalSocial: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
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

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGetData, setIsLoadingGetData] = useState(false);
  const [isModalNotif, setModalNotif] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleShowMessage = (msg: string, err: boolean) => {
    setMessage(msg);
    setIsError(err);
    setModalNotif(true);
  };
  //'Website','LinkedIn','Instagram','Facebook','Twitter','YouTube'
  // let akunFb, akunIg string
    let akunFb: Formdata[] = [],
    akunIg: Formdata[] = [],
    akunTw: Formdata[] = [],
    akunYt: Formdata[] = [],
    akunLd: Formdata[] = [];
  // if (dataEdited && dataEdited !== undefined) {
  //   akunWeb = dataEdited?.find((links) => links.title === "Website");
  //   akunFb = dataEdited?.find((links) => links.title === "Facebook");
  //   akunIg = dataEdited?.find((links) => links.title === "Instagram");
  //   akunTw = formData?.find((links) => links.title === "Twitter");
  //   akunYt = formData?.find((links) => links.title === "YouTube");
  //   akunLd = formData?.find((links) => links.title === "LinkedIn");
  // }
  // let akunTw = formData?.find((links) => links.title === "Twitter");
  // let akunYt = formData?.find((links) => links.title === "YouTube");
  // let akunLd = formData?.find((links) => links.title === "LinkedIn");

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
        // if (data.id) {
        //   // Mode edit, kirim data melalui PUT request
        //   await axiosCustom
        //     .put(`/tenant/${idTenant}/update-link/${data.id}`, data)
        //     .then((response) => {
        //       // setData(response.data.data);

        //       if (response.status === 200) {
        //         handleShowMessage("Data berhasil diubah.", false);
        //       }
        //     });
        // } else {
        //   // Mode tambah, kirim data melalui POST request
        //   await axiosCustom
        //     .post(`/tenant/${idTenant}/add-link`, data)
        //     .then((response) => {
        //       // console.log(response);
        //       if (response.status === 201) {
        //         handleShowMessage("Data berhasil disimpan.", false);
        //       }
        //     });
        // }

        onSubmit(); // Panggil fungsi penyimpanan data (misalnya, untuk memperbarui tampilan tabel)
        // onClose(); // Tutup modal
        // resetAll();
        setIsLoading(false);
        getUpdatedSocial();
        setFalse();
        setDataEdited([]);
        // Setelah data disimpan, atur pesan berhasil ke dalam state
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
        // onClose(); // Tutup modal
        // resetAll();
        setIsLoading(false);
        getUpdatedSocial();
        setFalse();
        // Setelah data disimpan, atur pesan berhasil ke dalam state
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
  const [dataDeleteId, setDataDeleteId] = useState<string | null>(null);
  const [textConfirm, setTextConfirm] = useState(" ");
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const handleDelete = (item: any) => {
    setDataDeleteId(item.id);
    setTextConfirm(`Yakin ingin hapus akun social link ${item.title} ?`);
    setIsModalDeleteOpen(true);
  };

  // const resetByOne = (title:string) => {
  //   switch (title) {
  //     case "Website":
  //       akunWeb = null;resetWebsite();
  //       break;
  //     // case "Instagram":
  //     //   akunIg = null;resetInstagram();
  //     //   break;
  //   }
  // }

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const deleteData = async () => {
    if (idTenant && dataDeleteId) {
      try {
        setIsLoadingDelete(true);
        const response = await axiosCustom.delete(
          `tenant/${idTenant}/delete-link/${dataDeleteId}`,
        );

        // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
        const timer = setTimeout(() => {
          // console.log(response);
          if (response.status === 200) {
            setIsLoadingDelete(false);
            setIsModalDeleteOpen(false);
            handleShowMessage("Data berhasil dihapus.", false);
            setDataDeleteId(null);
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
    } else if (idUser && dataDeleteId) {
      try {
        setIsLoadingDelete(true);
        const response = await axiosCustom.delete(
          `/user/${idUser}/delete-link/${dataDeleteId}`,
        );

        // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
        const timer = setTimeout(() => {
          // console.log(response);
          if (response.status === 200) {
            setIsLoadingDelete(false);
            setIsModalDeleteOpen(false);
            getUpdatedSocial();
            handleShowMessage("Data berhasil dihapus.", false);
            setDataDeleteId(null);
            onDelete();
            resetAll();
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

  const [akunWeb, setAkunWeb] = useState<Array<Formdata>>([]);

  const getUpdatedSocial = async () => {
    // resetAll();
    if (idTenant) {
      try {
        const response = await axiosCustom.get(`/tenant/${idTenant}/get-link`);
        if (response.status === 200) {
          setAkunWeb(response.data?.data.find(
            (links: any) => links.title === "Website",
          ));
          // akunWeb = response.data?.data.find(
          //   (links: any) => links.title === "Website",
          // );
          akunFb = response.data?.data.find(
            (links: any) => links.title === "Facebook",
          );
          akunIg = response.data?.data.find(
            (links: any) => links.title === "Instagram",
          );
          akunTw = response.data?.data.find(
            (links: any) => links.title === "Twitter",
          );
          akunYt = response.data?.data.find(
            (links: any) => links.title === "YouTube",
          );
          akunLd = response.data?.data.find(
            (links: any) => links.title === "LinkedIn",
          );
          setIsLoadingGetData(false);
        }
        // setDataEdited([]);
        console.log(response);
        console.log(akunWeb);
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
          // akunWeb = response.data?.data.find(
          //   (links: any) => links.title === "Website",
          // );
          // akunFb = response.data?.data.find(
          //   (links: any) => links.title === "Facebook",
          // );
          // akunIg = response.data?.data.find(
          //   (links: any) => links.title === "Instagram",
          // );
          // akunTw = response.data?.data.find(
          //   (links: any) => links.title === "Twitter",
          // );
          // akunYt = response.data?.data.find(
          //   (links: any) => links.title === "YouTube",
          // );
          // akunLd = response.data?.data.find(
          //   (links: any) => links.title === "LinkedIn",
          // );
          setIsLoadingGetData(false);
        }
        console.log(akunFb);
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

  const [dataEdited, setDataEdited] = useState<any | null>([]);
  const getEdited = () => {
    if (dataEdited && dataEdited.length !== 0 && dataEdited !== null) {
      dataEdited.forEach((data:Formdata) => {
        switch (data.title) {
          case "Website":
            akunWeb.push(data);
            // setAkunWeb(data);
            console.log("kok masuk sih");
            console.log(akunWeb);
            break;
          case "Facebook":
            akunFb.push(data);
            console.log("kok masuk FB");
            console.log(akunFb[0]);
            break;
          case "Instagram":
            akunIg.push(data);
            break;
          case "Twitter":
            akunTw.push(data);
            break;
          case "YouTube":
            akunYt.push(data);
            break;
          case "LinkedIn":
            akunLd.push(data);
            break;
        }
      });
    }
  }

  useEffect(() => {
    // const [dataEdited, setDataEdited] = useState(formData ? formData : []);
    
    getEdited();
    setDataEdited(formData); 
    
  }, [formData, getEdited()]);

  console.log(akunWeb[0]?.url);
  // console.log(akunFb[0]);
  console.log(dataEdited);
  

  const resetAll = () => {
    setDataDeleteId(null);
    resetWebsite();
    resetInstagram();
    resetFacebook();
    resetTwitter();
    resetYouTube();
    resetLinkedIn();
    setDataEdited([]);
    setAkunWeb([]);
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
              <Center h="100%" m="10">
                <Spinner className="spinner" size="xl" color="blue.500" />
              </Center>
            ) : (
              <>
                <HStack spacing={3} pb="3" alignItems={"center"}>
                  <form onSubmit={handleWebsite(handleSave)}>
                    <FormControl isInvalid={!!errWebsite.url}>
                      <HStack spacing={3} alignItems={"center"}>
                        <IconButton
                          color="blue.500"
                          aria-label="website"
                          icon={<FaGlobe size="xs" />}
                        />
                        {/* <Hide> */}
                          {/* masukkan scr otomatis nilai id, id_tenant, title */}
                          <Input
                            {...registWebsite("id")}
                            defaultValue={akunWeb[0] ? akunWeb[0].id : ""}
                          />
                          <Input
                            {...registWebsite("title")}
                            defaultValue="Website"
                          />
                        {/* </Hide> */}
                        <fieldset disabled={!isEditingWebsite}>
                          <Input
                            placeholder="URL Social Website"
                            onFocus={() => !isEditingWebsite}
                            defaultValue={akunWeb[0] ? akunWeb[0].url : ""}
                            {...registWebsite("url", {
                              required: "URL Website harus diisi!",
                            })}
                          />
                        </fieldset>

                        {/* jika ada datany maka berikan tampilan edit dan delete */}
                        {akunWeb[0]?.url ? (
                          <div>
                            {/* periksa dulu apakah tombol edit dipenyet, jika yaa maka yg tampil tombol tambah */}
                            {isEditingWebsite ? (
                              <IconButton
                                colorScheme="orange"
                                aria-label="Simpan"
                                icon={<BsCheck size="sm" />}
                                size="sm"
                                type="submit"
                                title="Simpan"
                                disabled={isLoading}
                              />
                            ) : (
                              // jika tidak, maka baru tampilkan edit dan delete
                              <HStack>
                                <IconButton
                                  colorScheme="blue"
                                  aria-label="Edit"
                                  icon={<BsFillPencilFill />}
                                  size="sm"
                                  title="Edit"
                                  onClick={() =>
                                    // begitu tmbl edit dipenyet maka buat status menjalankan edit shg btn diganti btn Simpan (diatas)
                                    setIsEditingWebsite(!isEditingWebsite)
                                  }
                                />
                                <IconButton
                                  colorScheme="red"
                                  aria-label="Hapus"
                                  icon={<BsFillTrashFill />}
                                  size="sm"
                                  title="Hapus"
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
                                disabled={isLoading}
                              />
                            )}
                          </>
                        )}
                      </HStack>

                      <FormErrorMessage>
                        {errWebsite.url && errWebsite.url.message}
                      </FormErrorMessage>
                    </FormControl>
                  </form>

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
                    />
                  ) : null}
                </HStack>

                <HStack spacing={3} pb="3" alignItems={"center"}>
                  <form onSubmit={handleFacebook(handleSave)}>
                    <FormControl isInvalid={!!errFacebook.url}>
                      <HStack spacing={3} alignItems={"center"}>
                        <IconButton
                          color="blue.700"
                          aria-label="website"
                          icon={<FaFacebook size="xs" />}
                        />
                        <Hide>
                          {/* masukkan scr otomatis nilai id, id_tenant, title */}
                          <Input
                            {...registFacebook("id")}
                            defaultValue={akunFb[0] ? akunFb[0].id : ""}
                          />
                          <Input
                            {...registFacebook("title")}
                            defaultValue="Facebook"
                          />
                        </Hide>
                        <fieldset disabled={!isEditingFacebook}>
                          <Input
                            placeholder="URL Social Facebook"
                            onFocus={() => !isEditingFacebook}
                            defaultValue={akunFb[0] ? akunFb[0].url : ""}
                            {...registFacebook("url", {
                              required: "URL Facebook harus diisi!",
                            })}
                          />
                        </fieldset>

                        {/* jika ada datany maka berikan tampilan edit dan delete */}
                        {akunFb[0]?.url ? (
                          <div>
                            {/* periksa dulu apakah tombol edit dipenyet, jika yaa maka yg tampil tombol tambah */}
                            {isEditingFacebook ? (
                              // begitu tambah dipenyek, maka muncul btn simpan
                              <IconButton
                                colorScheme="orange"
                                aria-label="Simpan"
                                icon={<BsCheck size="sm" />}
                                size="sm"
                                type="submit"
                                title="Simpan"
                                disabled={isLoading}
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
                                disabled={isLoading}
                              />
                            )}
                          </>
                        )}
                      </HStack>

                      <FormErrorMessage>
                        {errFacebook.url && errFacebook.url.message}
                      </FormErrorMessage>
                    </FormControl>
                  </form>

                  {!akunFb[0]?.url && !isEditingFacebook ? (
                    <IconButton
                      colorScheme="green"
                      aria-label="Tambah"
                      icon={<BsPlus size="sm" />}
                      size="sm"
                      title="Tambah"
                      onClick={() => {
                        // begitu tambah dipenyek, maka muncul btn simpan
                        setIsEditingFacebook(true);
                      }}
                    />
                  ) : null}
                </HStack>
              </>
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
