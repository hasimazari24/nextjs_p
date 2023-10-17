// components/AlertBar.tsx
"use client";
import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  HStack,
  AlertDescription,
  Progress
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";

interface AlertBarProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  status: "success" | "info" | "warning" | "error";
}

const AlertBar: React.FC<AlertBarProps> = ({
  isOpen,
  onClose,
  message,
  status,
}) => {
  if (!isOpen) {
    return null;
  }

  const timerRef = useRef<number | null>(null);
  const autoCloseDuration = 8000;
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
    <Box
      position="fixed"
      top="1rem"
      right="1rem"
      zIndex="9999"
      borderRadius="md"
      boxShadow="md"
    >
      <Alert status={status} variant="subtle">
        <AlertIcon />
        <Box>
          {/* <AlertTitle>Success!</AlertTitle> */}
          <AlertDescription>{message}</AlertDescription>
        </Box>
        <CloseButton
          alignSelf="flex-start"
          position="relative"
          right={-1}
          top={-1}
          onClick={onClose}
        />
      </Alert>
      {status !== "error" ? (
        <Progress
          // background={"transparent"}
          colorScheme="green"
          size="xs"
          value={progressValue}
        />
      ) : (
        <Progress
          // bgColor={"transparent"}
          colorScheme="red"
          value={progressValue}
          size="xs"
        />
      )}
    </Box>
  );
};

export default AlertBar;
