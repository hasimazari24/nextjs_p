// components/AlertBar.tsx

import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  HStack,
  AlertDescription,
} from "@chakra-ui/react";

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

  return (
    <Box position="fixed" top="1rem" right="1rem" zIndex="9999">
      <Alert status={status} variant="subtle" borderRadius="md" boxShadow="md">
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
    </Box>
  );
};

export default AlertBar;
