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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // data: any; // Data yang akan ditampilkan dalam modal
  onSubmit: () => void;
  formData?: { id: string; title: string; url: string }[]; // Jika mode edit, kirim data yang akan diedit
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

  const{
    register: registTwitter,
    handleSubmit: handleTwitter,
    formState: {errors: errTwitter},
    reset: resetTwitter,
  } = useForm<FormValues>();

  const{
    register: registYouTube,
    handleSubmit: handleYouTube,
    formState: {errors: errYouTube},
    reset: resetYouTube,
  } = useForm<FormValues>();

  const{
    register: registLinkedIn,
    handleSubmit: handleLinkedIn,
    formState: {errors: errLinkedIn},
    reset: resetLinkedIn,
  } = useForm<FormValues>();

  const [isLoading, setIsLoading] = useState(false);
  const [isModalNotif, setModalNotif] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleShowMessage = (msg: string, err: boolean) => {
    setMessage(msg);
    setIsError(err);
    setModalNotif(true);
  };
  //'Website','LinkedIn','Instagram','Facebook','Twitter','YouTube'
  const akunWeb = formData?.find((links) => links.title === "Website");
  const akunFb = formData?.find((links) => links.title === "Facebook");
  const akunIg = formData?.find((links) => links.title === "Instagram");
  const akunTw = formData?.find((links) => links.title === "Twitter");
  const akunYt = formData?.find((links) => links.title === "YouTube");
  const akunLd = formData?.find((links) => links.title === "LinkedIn");
  

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
        // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
        if (data.id) {
          // Mode edit, kirim data melalui PUT request
          // console.log(data); axiosCustom.put("/")
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

        onSubmit(); // Panggil fungsi penyimpanan data (misalnya, untuk memperbarui tampilan tabel)
        onClose(); // Tutup modal
        resetAll();
        setIsLoading(false);
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
          // console.log(data); axiosCustom.put("/")
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
        onClose(); // Tutup modal
        resetAll();
        setIsLoading(false);
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
            handleShowMessage("Data berhasil dihapus.", false);
            setDataDeleteId(null);
            onDelete();
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

  const resetAll = () => {
    setIsEditingWebsite(false);
    setIsEditingInstagram(false);
    setIsEditingFacebook(false);
    setIsEditingTwitter(false);
    setIsEditingYouTube(false);
    setIsEditingLinkedIn(false);
    setDataDeleteId(null);
    resetWebsite();
    resetInstagram();
    resetFacebook();
    resetTwitter();
    resetYouTube();
    resetLinkedIn();
  };

  useEffect(() => {
    // getBeranda();
  }, [formData, akunWeb]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          resetAll();
        }}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{"Social Links Setting"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                      <Hide>
                        {/* masukkan scr otomatis nilai id, id_tenant, title */}
                        <Input
                          {...registWebsite("id")}
                          defaultValue={akunWeb ? akunWeb.id : ""}
                        />
                        <Input
                          {...registWebsite("title")}
                          defaultValue="Website"
                        />
                      </Hide>
                      <fieldset disabled={!isEditingWebsite}>
                        <Input
                          placeholder="URL Social Website"
                          onFocus={() => !isEditingWebsite}
                          defaultValue={akunWeb ? akunWeb.url : ""}
                          {...registWebsite("url", {
                            required: "URL Website harus diisi!",
                          })}
                        />
                      </fieldset>

                      {/* jika ada datany maka berikan tampilan edit dan delete */}
                      {akunWeb?.url ? (
                        <div>
                          {/* periksa dulu apakah tombol edit dipenyet, jika yaa maka yg tampil tombol tambah */}
                          {isEditingWebsite ? (
                            <IconButton
                              colorScheme="orange"
                              aria-label="Simpan"
                              icon={<BsCheck size="sm"/>}
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
                                icon={<BsFillPencilFill/>}
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
                                icon={<BsFillTrashFill/>}
                                size="sm"
                                title="Hapus"
                                onClick={() => handleDelete(akunWeb)}
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

                {!akunWeb?.url && !isEditingWebsite ? (
                  <IconButton
                    colorScheme="green"
                    aria-label="Tambah"
                    icon={<BsPlus size="sm"/>}
                    size="sm"
                    title="Tambah"
                    onClick={() => {
                      // begitu tambah dipenyek, maka muncul btn simpan
                      setIsEditingWebsite(true);
                    }} />
      
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
                          defaultValue={akunFb ? akunFb.id : ""}
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
                          defaultValue={akunFb ? akunFb.url : ""}
                          {...registFacebook("url", {
                            required: "URL Facebook harus diisi!",
                          })}
                        />
                      </fieldset>

                      {/* jika ada datany maka berikan tampilan edit dan delete */}
                      {akunFb?.url ? (
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
                                icon={<BsFillTrashFill/>}
                                size="sm"
                                onClick={() => handleDelete(akunFb)}
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

                {!akunFb?.url && !isEditingFacebook ? (
                  <IconButton
                    colorScheme="green"
                    aria-label="Tambah"
                    icon={<BsPlus size="sm"/>}
                    size="sm"
                    title="Tambah"
                    onClick={() => {
                      // begitu tambah dipenyek, maka muncul btn simpan
                      setIsEditingFacebook(true);
                    }}
                  />
                ) : null}
              </HStack>
              <HStack spacing={3} pb="3" alignItems={"center"}>
                <form onSubmit={handleInstagram(handleSave)}>
                  <FormControl isInvalid={!!errInstagram.url}>
                    <HStack spacing={3} alignItems={"center"}>
                      <IconButton
                        color="pink.500"
                        aria-label="website"
                        icon={<FaInstagram size="xs" />}
                      />
                      <Hide>
                        {/* masukkan scr otomatis nilai id, id_tenant, title */}
                        <Input
                          {...registInstagram("id")}
                          defaultValue={akunIg ? akunIg.id : ""}
                        />
                        <Input
                          {...registInstagram("title")}
                          defaultValue="Instagram"
                        />
                      </Hide>
                      <fieldset disabled={!isEditingInstagram}>
                        <Input
                          placeholder="URL Social Instagram"
                          onFocus={() => !isEditingInstagram}
                          defaultValue={akunIg ? akunIg.url : ""}
                          {...registInstagram("url", {
                            required: "URL Instagram harus diisi!",
                          })}
                        />
                      </fieldset>
                      {/* jika ada datany maka berikan tampilan edit dan delete */}
                      {akunIg?.url ? (
                        <div>
                          {/* periksa dulu apakah tombol edit dipenyet, jika yaa maka yg tampil tombol tambah */}
                          {isEditingInstagram ? (
                            <IconButton
                              colorScheme="orange"
                              aria-label="Simpan"
                              icon={<BsCheck size="sm"/>}
                              size="sm"
                              type="submit"
                              title="Simpan"
                              disabled={!isLoading}
                            />
                          ) : (
                            // jika tidak, maka baru tampilkan edit dan delete
                            <HStack>
                              <IconButton
                                colorScheme="blue"
                                aria-label="Edit"
                                title="Edit"
                                icon={<BsFillPencilFill/>}
                                size="sm"
                                onClick={() =>
                                  // begitu tmbl edit dipenyet maka buat status menjalankan edit shg btn diganti btn Simpan (diatas)
                                  setIsEditingInstagram(!isEditingInstagram)
                                }
                              />
                              <IconButton
                                colorScheme="red"
                                aria-label="Hapus"
                                title="Hapus"
                                icon={<BsFillTrashFill/>}
                                size="sm"
                                onClick={() => handleDelete(akunIg)}
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
                              icon={<BsCheck size="sm"/>}
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
                      {errInstagram.url && errInstagram.url.message}
                    </FormErrorMessage>
                  </FormControl>
                </form>

                {!akunIg?.url && !isEditingInstagram ? (
                  <IconButton
                    colorScheme="green"
                    aria-label="Tambah"
                    icon={<BsPlus size="sm" />}
                    size="sm"
                    title="Tambah"
                    onClick={() => {
                      // begitu tambah dipenyek, maka muncul btn simpan
                      setIsEditingInstagram(true);
                    }}/>
                ) : null}
              </HStack>

              <HStack spacing={3} pb="3" alignItems={"center"}>
                <form onSubmit={handleTwitter(handleSave)}>
                  <FormControl isInvalid={!!errTwitter.url}>
                    <HStack spacing={3} alignItems={"center"}>
                      <IconButton
                        color="blue.400"
                        aria-label="website"
                        icon={<FaTwitter size="xs" />}
                      />
                      <Hide>
                        {/* masukkan scr otomatis nilai id, id_tenant, title */}
                        <Input
                          {...registTwitter("id")}
                          defaultValue={akunTw ? akunTw.id : ""}
                        />
                        <Input
                          {...registTwitter("title")}
                          defaultValue="Twitter"
                        />
                      </Hide>
                      <fieldset disabled={!isEditingTwitter}>
                        <Input
                          placeholder="URL Social Twitter"
                          onFocus={() => !isEditingTwitter}
                          defaultValue={akunTw ? akunTw.url : ""}
                          {...registTwitter("url", {
                            required: "URL Twitter harus diisi!",
                          })}
                        />
                      </fieldset>

                      {/* jika ada datany maka berikan tampilan edit dan delete */}
                      {akunTw?.url ? (
                        <div>
                          {/* periksa dulu apakah tombol edit dipenyet, jika yaa maka yg tampil tombol tambah */}
                          {isEditingTwitter ? (
                            <IconButton
                              colorScheme="orange"
                              aria-label="Simpan"
                              icon={<BsCheck size="sm"/>}
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
                                icon={<BsFillPencilFill/>}
                                size="sm"
                                onClick={() =>
                                  // begitu tmbl edit dipenyet maka buat status menjalankan edit shg btn diganti btn Simpan (diatas)
                                  setIsEditingTwitter(!isEditingTwitter)
                                }
                              />

                              <IconButton
                                colorScheme="red"
                                aria-label="Hapus"
                                title="Hapus"
                                icon={<BsFillTrashFill/>}
                                size="sm"
                                onClick={() => handleDelete(akunTw)}
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
                              disabled={isLoading}
                            />
                          )}
                        </>
                      )}
                    </HStack>

                    <FormErrorMessage>
                      {errTwitter.url && errTwitter.url.message}
                    </FormErrorMessage>
                  </FormControl>
                </form>

                {!akunTw?.url && !isEditingTwitter ? (
                  <IconButton
                  colorScheme="green"
                  aria-label="Tambah"
                  icon={<BsPlus size="sm"/>}
                  title="Tambah"
                  size="sm"
                    onClick={() => {
                      // begitu tambah dipenyek, maka muncul btn simpan
                      setIsEditingTwitter(true);
                    }}/>
                ) : null}
              </HStack>

              <HStack spacing={3} pb="3" alignItems={"center"}>
                <form onSubmit={handleYouTube(handleSave)}>
                  <FormControl isInvalid={!!errYouTube.url}>
                    <HStack spacing={3} alignItems={"center"}>
                      <IconButton
                        color="red.500"
                        aria-label="website"
                        icon={<FaYoutube size="xs" />}
                      />
                      <Hide>
                        {/* masukkan scr otomatis nilai id, id_tenant, title */}
                        <Input
                          {...registYouTube("id")}
                          defaultValue={akunYt ? akunYt.id : ""}
                        />
                        <Input
                          {...registYouTube("title")}
                          defaultValue="YouTube"
                        />
                      </Hide>
                      <fieldset disabled={!isEditingYouTube}>
                        <Input
                          placeholder="URL Social YouTube"
                          onFocus={() => !isEditingYouTube}
                          defaultValue={akunYt ? akunYt.url : ""}
                          {...registYouTube("url", {
                            required: "URL YouTube harus diisi!",
                          })}
                        />
                      </fieldset>

                      {/* jika ada datany maka berikan tampilan edit dan delete */}
                      {akunYt?.url ? (
                        <div>
                          {/* periksa dulu apakah tombol edit dipenyet, jika yaa maka yg tampil tombol tambah */}
                          {isEditingYouTube ? (
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
                                icon={<BsFillPencilFill/>}
                                size="sm"
                                onClick={() =>
                                  // begitu tmbl edit dipenyet maka buat status menjalankan edit shg btn diganti btn Simpan (diatas)
                                  setIsEditingYouTube (!isEditingYouTube)
                                }
                              />

                              <IconButton
                                colorScheme="red"
                                aria-label="Hapus"
                                title="Hapus"
                                icon={<BsFillTrashFill/>}
                                size="sm"
                                onClick={() => handleDelete(akunYt)}
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
                              icon={<BsCheck size="sm"/>}
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
                      {errYouTube.url && errYouTube.url.message}
                    </FormErrorMessage>
                  </FormControl>
                </form>

                {!akunYt?.url && !isEditingYouTube ? (
                  <IconButton
                    colorScheme="green"
                    aria-label="Tambah"
                    icon={<BsPlus size="sm"/>}
                    size="sm"
                    title="Tambah"
                    onClick={() => {
                      // begitu tambah dipenyek, maka muncul btn simpan
                      setIsEditingYouTube(true);
                    }}/>
                ) : null}
              </HStack>

              <HStack spacing={3} pb="3" alignItems={"center"}>
                <form onSubmit={handleLinkedIn(handleSave)}>
                  <FormControl isInvalid={!!errLinkedIn.url}>
                    <HStack spacing={3} alignItems={"center"}>
                      <IconButton
                        aria-label="website"
                        color="blue.500"
                        icon={<FaLinkedin size="xs" />}
                      />
                      <Hide>
                        {/* masukkan scr otomatis nilai id, id_tenant, title */}
                        <Input
                          {...registLinkedIn("id")}
                          defaultValue={akunLd ? akunLd.id : ""}
                        />
                        <Input
                          {...registLinkedIn("title")}
                          defaultValue="LinkedIn"
                        />
                      </Hide>
                      <fieldset disabled={!isEditingLinkedIn}>
                        <Input
                          placeholder="URL Social LinkedIn"
                          onFocus={() => !isEditingLinkedIn}
                          defaultValue={akunLd ? akunLd.url : ""}
                          {...registLinkedIn("url", {
                            required: "URL I harus diisi!",
                          })}
                        />
                      </fieldset>

                      {/* jika ada datany maka berikan tampilan edit dan delete */}
                      {akunLd?.url ? (
                        <div>
                          {/* periksa dulu apakah tombol edit dipenyet, jika yaa maka yg tampil tombol tambah */}
                          {isEditingLinkedIn ? (
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
                                icon={<BsFillPencilFill/>}
                                size="sm"
                                onClick={() =>
                                  // begitu tmbl edit dipenyet maka buat status menjalankan edit shg btn diganti btn Simpan (diatas)
                                  setIsEditingLinkedIn(!isEditingLinkedIn)
                                }
                              />
                              <IconButton
                                colorScheme="red"
                                aria-label="Hapus"
                                title="Hapus"
                                icon={<BsFillTrashFill/>}
                                size="sm"
                                onClick={() => handleDelete(akunLd)}
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
                              disabled={isLoading}
                           />
                          )}
                        </>
                      )}
                    </HStack>

                    <FormErrorMessage>
                      {errLinkedIn.url && errLinkedIn.url.message}
                    </FormErrorMessage>
                  </FormControl>
                </form>

                {!akunLd?.url && !isEditingLinkedIn ? (
                  <IconButton
                    colorScheme="green"
                    aria-label="Tambah"
                    icon={<BsPlus size="sm" />}
                    size="sm"
                    title="Tambah"
                    onClick={() => {
                      // begitu tambah dipenyek, maka muncul btn simpan
                      setIsEditingLinkedIn(true);
                    }}
                  />
                ) : null}
              </HStack>
            </>
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
