"use client";
import React, { useState } from "react";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";
import ConfirmationModal from "@/app/components/modal/modal-confirm";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineCloseSquare, AiOutlineCheckSquare } from "react-icons/ai";

interface deleteProps {
  onSubmit: () => void;
  dataValue: any;
  onoff: boolean;
}

const OnOffValueJawaban = ({ dataValue, onSubmit, onoff }: deleteProps) => {
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

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const onoffValue = async () => {
    if (dataValue.id_opsi) {
      // Lakukan penghapusan data berdasarkan dataToDeleteId
      try {
        setIsLoadingDelete(true);
        // Panggil API menggunakan Axios dengan async/await
        const response = await axiosCustom.put(
          `/tenant-nilai-mentor/pertanyaan-opsi/${dataValue.id_opsi}/set-active`,
          {
            is_active: onoff === false ? true : false,
          },
        );

        // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
        const timer = setTimeout(() => {
          // console.log(response);
          if (response.status === 200) {
            setIsLoadingDelete(false);
            handleShowMessage(
              onoff === true
                ? "Value Jawaban Berhasil Dinonaktifkan."
                : "Value Jawaban Berhasil Diaktifkan kembali",
              false,
            );
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
      {onoff === true ? (
        <Button
          title="Nonaktifkan Jawaban"
          bgColor={"orange.500"}
          _hover={{ bgColor: "orange.600" }}
          color="white"
          onClick={() => onOpen()}
          key="onoff"
          size="sm"
          w="165px"
          justifyContent={"start"}
        >
          <AiOutlineCloseSquare fontSize="17px" />
          &nbsp; Nonaktifkan
        </Button>
      ) : (
        <Button
          title="Aktifkan Jawaban"
          colorScheme="pink"
          onClick={() => onOpen()}
          key="activeClass"
          size="sm"
          w="165px"
          justifyContent={"start"}
        >
          <AiOutlineCheckSquare fontSize="17px" />
          &nbsp; Aktifkan
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {onoff === true ? (
            <>
              <ModalHeader>Konfirmasi Nonaktifkan jawaban</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  Yakin Ingin menonaktifkan jawaban : {dataValue.value}{" "}
                  ?
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  bgColor={"orange.500"}
                  _hover={{ bgColor: "orange.600" }}
                  color="white"
                  mr={3}
                  onClick={() => onoffValue()}
                  isLoading={isLoadingDelete}
                >
                  Ya
                </Button>
                <Button onClick={onClose}>Tidak</Button>
              </ModalFooter>
            </>
          ) : (
            <>
              <ModalHeader>Konfirmasi Aktifkan Pertanyaan</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  Yakin Ingin aktifkan pertanyaan : {dataValue.value} ?
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="pink"
                  mr={3}
                  onClick={() => onoffValue()}
                  isLoading={isLoadingDelete}
                >
                  Ya
                </Button>
                <Button onClick={onClose}>Tidak</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

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

export default OnOffValueJawaban;
