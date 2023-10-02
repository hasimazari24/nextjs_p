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
import { AiOutlineFacebook, AiOutlineLinkedin } from "react-icons/ai";

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
    register: registInstagram,
    handleSubmit: handleInstagram,
    formState: { errors: errInstagram },
    reset: resetInstagram,
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
  const akunIg = formData?.find((links) => links.title === "Instagram");

  const [isEditingInstagram, setIsEditingInstagram] = useState<boolean>(false);
  const [isEditingWebsite, setIsEditingWebsite] = useState<boolean>(false);

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
    } else if (idTenant) {
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
    setIsEditingInstagram(false);
    setIsEditingWebsite(false);
    setDataDeleteId(null);
    resetInstagram();
    resetWebsite();
  };

  // console.log(formData);

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
          <ModalHeader>{"Edit Data Social Links"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <>
              <HStack spacing={3} pb="3" alignItems={"center"}>
                <form onSubmit={handleWebsite(handleSave)}>
                  <FormControl isInvalid={!!errWebsite.url}>
                    <HStack spacing={3} alignItems={"center"}>
                      <IconButton
                        colorScheme="facebook"
                        aria-label="facebook"
                        icon={<AiOutlineFacebook size="xs" />}
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
                            <Button
                              colorScheme="orange"
                              type="submit"
                              isLoading={isLoading}
                            >
                              Simpan
                            </Button>
                          ) : (
                            // jika tidak, maka baru tampilkan edit dan delete
                            <HStack>
                              <Button
                                colorScheme="blue"
                                onClick={() =>
                                  // begitu tmbl edit dipenyet maka buat status menjalankan edit shg btn diganti btn Simpan (diatas)
                                  setIsEditingWebsite(!isEditingWebsite)
                                }
                              >
                                Edit
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={() => handleDelete(akunWeb)}
                              >
                                Hapus
                              </Button>
                            </HStack>
                          )}
                        </div>
                      ) : (
                        // jika tidak ada data/ belum punya, maka berikan btn tambah
                        <>
                          {isEditingWebsite && (
                            <Button
                              colorScheme="orange"
                              type="submit"
                              isLoading={isLoading}
                            >
                              Simpan
                            </Button>
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
                  <Button
                    colorScheme="green"
                    onClick={() => {
                      // begitu tambah dipenyek, maka muncul btn simpan
                      setIsEditingWebsite(true);
                    }}
                  >
                    Tambah
                  </Button>
                ) : null}
              </HStack>

              <HStack spacing={3} pb="3" alignItems={"center"}>
                <form onSubmit={handleInstagram(handleSave)}>
                  <FormControl isInvalid={!!errInstagram.url}>
                    <HStack spacing={3} alignItems={"center"}>
                      <IconButton
                        colorScheme="facebook"
                        aria-label="facebook"
                        icon={<AiOutlineFacebook size="xs" />}
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
                      <Input
                        placeholder="URL Social Instagram"
                        disabled={!isEditingInstagram}
                        defaultValue={akunIg ? akunIg.url : ""}
                        onFocus={() => !isEditingInstagram}
                        {...registInstagram("url", {
                          required: "URL Instagram harus diisi!",
                        })}
                      />
                      {/* jika ada datany maka berikan tampilan edit dan delete */}
                      {akunIg?.url ? (
                        <div>
                          {/* periksa dulu apakah tombol edit dipenyet, jika yaa maka yg tampil tombol tambah */}
                          {isEditingInstagram ? (
                            <Button
                              colorScheme="orange"
                              type="submit"
                              key="updateLinks"
                              isLoading={isLoading}
                            >
                              Simpan
                            </Button>
                          ) : (
                            // jika tidak, maka baru tampilkan edit dan delete
                            <HStack>
                              <Button
                                colorScheme="blue"
                                onClick={() =>
                                  // begitu tmbl edit dipenyet maka buat status menjalankan edit shg btn diganti btn Simpan (diatas)
                                  setIsEditingInstagram(!isEditingInstagram)
                                }
                              >
                                Edit
                              </Button>
                              <Button colorScheme="red">Hapus</Button>
                            </HStack>
                          )}
                        </div>
                      ) : (
                        // jika tidak ada data/ belum punya, maka berikan btn tambah
                        <>
                          {isEditingInstagram && (
                            <Button
                              colorScheme="orange"
                              type="submit"
                              key="insertLinks"
                              isLoading={isLoading}
                            >
                              Simpan
                            </Button>
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
                  <Button
                    colorScheme="green"
                    onClick={() => {
                      // begitu tambah dipenyek, maka muncul btn simpan
                      setIsEditingInstagram(true);
                    }}
                  >
                    Tambah
                  </Button>
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
