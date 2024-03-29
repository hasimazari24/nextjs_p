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
  dataKuesioner: any;
  onoff: boolean;
}

const OnOffKuesioner = ({ dataKuesioner, onSubmit, onoff }: deleteProps) => {
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
  const onOffKuesioner = async () => {
    if (dataKuesioner.id) {
      // Lakukan penghapusan data berdasarkan dataToDeleteId
      try {
        setIsLoadingDelete(true);
        // Panggil API menggunakan Axios dengan async/await
        const response = await axiosCustom.put(
          `/kuesioner-tahunan/${dataKuesioner.id}/set-active`,
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
                ? "Kuesioner telah Nonaktif."
                : "Kuesioner Berhasil Diaktifkan kembali",
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
      {
        onoff === true ? (
          <Button
            title="Nonaktifkan Kuesioner"
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
        ) : null
        // (
        //   <Button
        //     title="Aktifkan Kuesioner"
        //     colorScheme="pink"
        //     onClick={() => onOpen()}
        //     key="activeClass"
        //     size="sm"
        //     w="165px"
        //     justifyContent={"start"}
        //   >
        //     <AiOutlineCheckSquare fontSize="17px" />
        //     &nbsp; Aktifkan
        //   </Button>
        // )
      }

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {
            onoff === true && (
              <>
                <ModalHeader>Konfirmasi Nonaktifkan Kuesioner</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>
                    Jika dinonaktifkan, kuesioer tidak akan bisa diaktifkan
                    lagi. Namun, masih bisa diakses sebagai arsip. Yakin ingin
                    menonaktifkan Kuesioner : {dataKuesioner.title} ?
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button
                    bgColor={"orange.500"}
                    _hover={{ bgColor: "orange.600" }}
                    color="white"
                    mr={3}
                    onClick={() => onOffKuesioner()}
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
            //     <ModalHeader>Konfirmasi Aktifkan Kuesioner</ModalHeader>
            //     <ModalCloseButton />
            //     <ModalBody>
            //       <Text>
            //         Yakin Ingin aktifkan Kuesioner : {dataKuesioner.title}{" "}
            //         ?
            //       </Text>
            //     </ModalBody>
            //     <ModalFooter>
            //       <Button
            //         colorScheme="pink"
            //         mr={3}
            //         onClick={() => onOffKuesioner()}
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

export default OnOffKuesioner;
