// components/AlertBar.tsx
"use client";
import {
  Box,
  Alert,
  AlertIcon,
  CloseButton,
  AlertDescription,
  useDisclosure,
  Fade,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface AlertBarProps {
  message: string;
  status: "success" | "info" | "warning" | "error";
}

const AlertBar = ({ message, status }: AlertBarProps) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  return (
    isOpen && (
      <Fade in={isOpen}>
        <Box
          borderRadius="md"
          boxShadow="md"
          w="full"
        >
          <Alert status={status} variant="subtle">
            <AlertIcon />
            <Box>
              <AlertDescription>
                <Text w="full">
                  {message}
                </Text>
              </AlertDescription>
            </Box>
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={onToggle}
            />
          </Alert>
          {/* {message} */}
        </Box>
      </Fade>
    )
  );
};

export default AlertBar;
