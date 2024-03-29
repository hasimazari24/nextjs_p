"use client";
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
import { CheckCircleIcon, CloseIcon, WarningIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  isError: boolean;
  onSubmit?:()=>void;
}

const ModalNotif: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  message,
  isError,
  onSubmit,
}) => {
  //   const [timer, setTimer] = useState<number | 0>(0);
  const timerRef = useRef<number | null>(null);
  const autoCloseDuration = 5000;
  const [progressValue, setProgressValue] = useState(100);

  // Efek samping untuk mengatur timer ketika modal terbuka
  useEffect(() => {
    if (isOpen && !isError) {
      let intervalId: NodeJS.Timeout;

      // Setelah durasi yang ditentukan, tutup modal
      timerRef.current = window.setTimeout(() => {
        onClose();
        // router.refresh();
        if (onSubmit) onSubmit();
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
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          if (isError === false && onSubmit) {
            onSubmit();
          }
        }}
        size="lg"
        closeOnOverlayClick={false}
      >
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
          <ModalBody width={"full"}>
            <Center mb="3">
              <Box pr="2" pl="2">
                <Text fontSize={"auto"} textAlign={"center"}>
                  {message}
                </Text>
              </Box>
            </Center>
            {!isError && (
              <Progress colorScheme="green" size="md" value={progressValue} />
            )}
          </ModalBody>
          <ModalFooter>
            <Flex justify="center">
              <Button
                leftIcon={<CloseIcon />}
                color={"red.400"}
                bgColor="red.50"
                _hover={{
                  bg: "red.50",
                }}
                onClick={() => {
                  onClose();
                  if (isError === false && onSubmit) {
                    onSubmit();
                  }
                }}
              >
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
