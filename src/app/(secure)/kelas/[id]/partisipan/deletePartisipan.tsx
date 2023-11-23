"use client";
import React, { useState } from "react";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";
import ConfirmationModal from "@/app/components/modal/modal-confirm";
import { Button, Box } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

interface deleteProps {
  onSubmit: () => void;
  idKelas:string;
  dataDelete?: any;
}

const DeletePartisipan: React.FC<deleteProps> = ({ dataDelete, idKelas, onSubmit }) => {
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

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const deleteData = async () => {
    if (dataDelete) {
      // Lakukan penghapusan data berdasarkan dataToDeleteId
      try {
        setIsLoadingDelete(true);
        // Panggil API menggunakan Axios dengan async/await
        const response = await axiosCustom.delete(
          `/course/${idKelas}/tenant/${dataDelete?.id}/delete-tenant/`,
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
    <div>
      <Button
        title="Hapus Data"
        // p={5}
        colorScheme="red"
        shadow="xl"
        onClick={() => setIsDeleteModalOpen(true)}
        key="hapusData"
        size={"sm"}
        w={{ base: "auto", md: "full", xl: "auto" }}
      >
        <DeleteIcon />
        <Box display={{ base: "none", md: "flex", xl: "none" }}>
          &nbsp;Hapus
        </Box>
      </Button>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={deleteData}
        dataConfirm={`Yakin ingin hapus Partisipan : ${dataDelete?.name} ?`}
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
    </div>
  );
};

export default DeletePartisipan;
