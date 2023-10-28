"use client";
import React, { useState } from "react";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";
import ConfirmationModal from "@/app/components/modal/modal-confirm";
import { Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

interface deleteProps {
  onSubmit: () => void;
  dataDelete?: any;
  idTenant?: string;
}

const DeleteGallery = ({ dataDelete, idTenant, onSubmit }: deleteProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalNotif, setModalNotif] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleShowMessage = (msg: string, err: boolean) => {
    setMessage(msg);
    setIsError(err);
    setModalNotif(true);
  };

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const deleteData = async () => {
    if (dataDelete && idTenant) {
      // Lakukan penghapusan data berdasarkan dataToDeleteId
      try {
        setIsLoadingDelete(true);
        // Panggil API menggunakan Axios dengan async/await
        const response = await axiosCustom.delete(
          `/tenant/${idTenant}/delete-gallery/${dataDelete?.id}`,
        );

        // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
        const timer = setTimeout(() => {
          // console.log(response);
          if (response.status === 200) {
            setIsLoadingDelete(false);
            handleShowMessage("Data berhasil dihapus.", false);
            setIsDeleteModalOpen(false);
            onSubmit();
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

  return (
    <div>
      <Button
        title="Hapus Data"
        colorScheme="red"
        onClick={() => setIsDeleteModalOpen(true)}
        key="hapusData"
        size="sm"
      >
        <DeleteIcon />
      </Button>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={deleteData}
        dataConfirm={`Yakin ingin hapus data event dengan judul : ${dataDelete?.title} ?`}
        isLoading={isLoadingDelete}
      />

      <ModalNotif
        isOpen={isModalNotif}
        onClose={() => setModalNotif(false)}
        message={message}
        isError={isError}
      />
    </div>
  );
};

export default DeleteGallery;
