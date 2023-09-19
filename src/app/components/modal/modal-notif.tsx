import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Center,
  Progress,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  isError: boolean;
}

const ModalNotif: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  message,
  isError,
}) => {
  //   const [timer, setTimer] = useState<number | 0>(0);
  const timerRef = useRef<number | null>(null);
  const autoCloseDuration = 5000;
  const [progressValue, setProgressValue] = useState(100);

  // Efek samping untuk mengatur timer ketika modal terbuka
  useEffect(() => {
    if (isOpen) {
      let intervalId: NodeJS.Timeout;

      // Setelah durasi yang ditentukan, tutup modal
      timerRef.current = window.setTimeout(() => {
        onClose();
        setProgressValue(100); //balikin value jadi 100 ketika close
      }, autoCloseDuration);

      // Mengurangi nilai progressValue setiap 100 milidetik
      intervalId = setInterval(() => {
        setProgressValue((prevValue) => {
          if (prevValue === 0) {
            clearInterval(intervalId);
            return 0;
          }
          return prevValue - 100 / (autoCloseDuration / 100);
        });
      }, 100);

      // Bersihkan timer jika komponen unmount atau modal ditutup sebelum waktu habis
      return () => {
        if (timerRef.current) {
          window.clearTimeout(timerRef.current);
          setProgressValue(100);
        }
        clearInterval(intervalId);
      };
    }
  }, [isOpen, onClose]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isError ? (
              <>
                <Center>
                  <WarningIcon w={12} h={12} color="red.500" />
                </Center>
                <Text fontWeight="bold" fontSize="4xl" align="center">
                  GAGAL
                </Text>
              </>
            ) : (
              <>
                <Center>
                  <CheckCircleIcon w={12} h={12} color="green.500" />
                </Center>
                <Text fontWeight="bold" fontSize="4xl" align="center">
                  BERHASIL
                </Text>
              </>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center mb="3">{message}</Center>
            <Progress colorScheme="green" size="md" value={progressValue} />
          </ModalBody>
          <ModalFooter>
            <Flex justify="center">
              <Button colorScheme="blue" onClick={onClose}>
                Tutup Sekarang
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalNotif;
