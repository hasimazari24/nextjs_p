"use client";
import React, { useState } from "react";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";
import ConfirmationModal from "@/app/components/modal/modal-confirm";
import { Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useParams } from "next/navigation";

interface deleteProps {
  onSubmit: () => void;
  dataDelete: any;
}

const DeleteResponden = ({
  dataDelete,
  onSubmit,
}: deleteProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [stateNotif, setStateNotif] = useState({
    msg: "",
    isError: false,
    isNotifShow: false,
  });
  const handleShowMessage = (msg: string, err: boolean) => {
    setStateNotif({
      msg: msg,
      isError: err,
      isNotifShow: true,
    });
  };

  const params = useParams();
  const idKuesioner = params.id_kuesioner;

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const deleteData = async () => {
    if (dataDelete.id) {
      // Lakukan penghapusan data berdasarkan dataToDeleteId
      try {
        setIsLoadingDelete(true);
        // Panggil API menggunakan Axios dengan async/await
        const response = await axiosCustom.delete(
          `/kuesioner-tahunan/${idKuesioner}/delete-responden/${dataDelete?.id}`,
        );

        // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
        const timer = setTimeout(() => {
          // console.log(response);
          if (response.status === 200) {
            setIsLoadingDelete(false);
            handleShowMessage("Data berhasil dihapus.", false);
            setIsDeleteModalOpen(false);
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
    <>
      <Button
        title="Hapus Data"
        colorScheme="red"
        onClick={() => setIsDeleteModalOpen(true)}
        key="hapusData"
        size="sm"
        w="full"
      >
        <DeleteIcon /> &nbsp; Hapus
      </Button>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={deleteData}
        dataConfirm={`Yakin ingin hapus responden : ${dataDelete?.name} ?`}
        isLoading={isLoadingDelete}
      />

      <ModalNotif
        isOpen={stateNotif.isNotifShow}
        onClose={() =>
          setStateNotif({
            msg: "",
            isError: false,
            isNotifShow: false,
          })
        }
        message={stateNotif.msg}
        isError={stateNotif.isError}
        onSubmit={() => onSubmit()}
      />
    </>
  );
};

export default DeleteResponden;
