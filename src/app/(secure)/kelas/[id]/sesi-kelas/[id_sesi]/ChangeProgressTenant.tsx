import { axiosCustom } from "@/app/api/axios";
import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdDoneAll, MdDone } from "react-icons/md";

interface ChangeProg {
  idSesi: string;
  idItem:string;
  progress: string | null;
  isTugas?:boolean;
  onSubmit: () => void;
}

function ChangeProgressTenant({
  idSesi,
  idItem,
  progress,
  onSubmit,
  isTugas,
}: ChangeProg) {
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);
  const [isLoadingProgressDelete, setIsLoadingProgressDelete] = useState(false);
  const updateProgress = async (id_item: string) => {
    try {
      setIsLoadingProgress(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.post(
        `/course-item/${idSesi}/add-tenant-progress`,
        { id_item: id_item },
      );
      if (response.status === 201) {
        setIsLoadingProgress(false);
        onSubmit();
      }
    } catch (error: any) {
      console.error("Gagal Mengubah Status Selesai :", error);
      setIsLoadingProgress(false);
    }
  };
  const deleteProgress = async (idProgress: string | null) => {
    try {
      setIsLoadingProgressDelete(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.delete(
        `/course-item/${idSesi}/delete-tenant-progress/${idProgress}`,
      );
      if (response.status === 200) {
        setIsLoadingProgressDelete(false);
        onSubmit();
      }
    } catch (error: any) {
      console.error("Gagal Mengubah Status Selesai :", error);
      setIsLoadingProgressDelete(false);
    }
  };
  return progress ? (
    <Button
      bgColor="green.400"
      _hover={{
        bg: "green.300",
      }}
      color="white"
      onClick={() => deleteProgress(progress)}
      key="doneProgressdone"
      size="sm"
      isLoading={isLoadingProgressDelete}
      boxShadow={"md"}
      isDisabled={isTugas ? true : false}
    >
      <MdDoneAll />
      &nbsp; Terselesaikan
    </Button>
  ) : (
    <Button
      bgColor="green.50"
      _hover={{
        bg: "green.100",
      }}
      title={
        isTugas
          ? "Otomatis terselesaikan jika sudah upload jawaban"
          : "Atur Terselesaikan"
      }
      color="gray.700"
      onClick={() => updateProgress(idItem)}
      key="doneProgress"
      size="sm"
      isLoading={isLoadingProgress}
      boxShadow={"md"}
      isDisabled={isTugas ? true : false}
    >
      <MdDone />
      &nbsp; {isTugas ? "Belum Selesai" : "Atur Selesai"}
    </Button>
  );
}

export default ChangeProgressTenant;
