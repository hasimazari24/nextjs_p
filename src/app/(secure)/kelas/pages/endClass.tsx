"use client";
import React, { useState } from "react";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";
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
import { AiOutlineCloseSquare } from "react-icons/ai";

interface deleteProps {
  onSubmit: () => void;
  dataClass: any;
  endClass: boolean;
}

const EndClass = ({ dataClass, onSubmit, endClass }: deleteProps) => {
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
  const endActiveClass = async () => {
    if (dataClass.id) {
      // Lakukan penghapusan data berdasarkan dataToDeleteId
      try {
        setIsLoadingDelete(true);
        // Panggil API menggunakan Axios dengan async/await
        const response = await axiosCustom.put(
          `/course/${dataClass.id}/update-course-ends`,
          {
            course_ends: endClass === false ? true : false,
          },
        );

        // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
        const timer = setTimeout(() => {
          // console.log(response);
          if (response.status === 200) {
            setIsLoadingDelete(false);
            handleShowMessage(
              endClass === false
                ? "Kelas berhasil diakhiri."
                : "Kelas Berhasil Diaktifkan",
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
      {endClass === false ? (
        <Button
          title="Akhiri Kelas"
          colorScheme="yellow"
          onClick={() => onOpen()}
          key="endClass"
          size="sm"
          w="184px"
        >
          <AiOutlineCloseSquare fontSize="17px" />
          &nbsp; Akhiri Kelas
        </Button>
      ) : // <Button
      //   title="Aktifkan Kelas"
      //   colorScheme="pink"
      //   onClick={() => onOpen()}
      //   key="activeClass"
      //   size="sm"
      //   w="184px"
      // >
      //   <AiOutlineCheckSquare fontSize="17px" />
      //   &nbsp; Aktifkan Kelas
      // </Button>
      null}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {endClass === false && (
            <>
              <ModalHeader>Konfirmasi Akhiri Kelas</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  Jika diakhiri kelas ini tidak akan bisa diaktifkan kembali.
                  Namun, masih bisa diakses sebagai arsip. Yakin Ingin Akhiri
                  Kelas {dataClass.name} ?
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="yellow"
                  mr={3}
                  onClick={() => endActiveClass()}
                  isLoading={isLoadingDelete}
                >
                  Ya
                </Button>
                <Button onClick={onClose}>Tidak</Button>
              </ModalFooter>
            </>
          ) 
          // : (
          //   <>
          //     <ModalHeader>Konfirmasi Aktifkan Kelas</ModalHeader>
          //     <ModalCloseButton />
          //     <ModalBody>
          //       <Text>Yakin Ingin Aktifkan Kelas {dataClass.name} ?</Text>
          //     </ModalBody>
          //     <ModalFooter>
          //       <Button
          //         colorScheme="pink"
          //         mr={3}
          //         onClick={() => endActiveClass()}
          //         isLoading={isLoadingDelete}
          //       >
          //         Ya
          //       </Button>
          //       <Button onClick={onClose}>Tidak</Button>
          //     </ModalFooter>
          //   </>
          // )
          }
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

export default EndClass;
