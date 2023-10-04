import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Button,
  Spinner,
  VStack,
  SlideFade,
  Flex,
  Stack,
  HStack,
  Center,
  Box,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FullScreenModal: React.FC<ModalProps> = ({isOpen, onClose}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = () => {
    // Simulasi pemanggilan API dengan timeout
    setIsLoading(true);
    setTimeout(() => {
      const results = ["Hasil 1", "Hasil 2", "Hasil 3"]; // Ganti dengan data hasil pencarian sesungguhnya
      setSearchResults(results);
      setIsLoading(false);
      setIsSearchOpen(false);
    }, 1000); // Contoh waktu tunda 2 detik
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setSearchResults([]);
      }}
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent>
        {/* <ModalCloseButton /> */}
        {/* <ModalHeader>
          
        </ModalHeader> */}
        <ModalBody p="3">
          <HStack
            alignItems={"center"}
            justify="center" // Horizontal tengah
            transition="0.5s" // Efek transisi
            width="full"
            // boxSize={"full"}
          >
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Masukkan kata kunci pencarian"
              size="lg"
              // mb={isLoading ? 4 : 0}
            />
            <Button
              onClick={handleSearch}
              bg={"red.400"}
              _hover={{ bg: "red.500" }}
              size="lg"
              color="white"
            >
              <SearchIcon />
            </Button>
          </HStack>
          {isLoading ? (
            <Center>
              <Spinner className="spinner" size="md" color="blue.500" m="3" />
            </Center>
          ) : (
            <Stack
            //   mt={searchResults && searchResults.length > 0 ? "3" : "0"}
              w="full"
              direction={"column"}
            >
              {searchResults ? (
                searchResults.map((result, index) => (
                  <SlideFade in={searchResults.length > 0} offsetY="20px">
                    <Box
                      rounded="md"
                      key={index}
                      _hover={{
                        bg: "red.400",
                        "& .textResult": {
                          color: "#ffff",
                        },
                        "& .textH": {
                          color: "grey.100",
                        },
                      }}
                      p="3"
                      boxShadow={"md"}
                      mt="3"
                      cursor="pointer"
                      bg="gray.50"
                    >
                      <Text
                        fontSize="12px"
                        color="gray.500"
                        className="textH"
                      >
                        PORTOFOLIO
                      </Text>
                      <Text
                        fontSize="18px"
                        color="gray.800"
                        className="textResult"
                      >
                        {result}
                      </Text>
                    </Box>
                  </SlideFade>
                ))
              ) : (
                <Center>
                  <p>Hasil pencarian tidak ditemukan</p>
                </Center>
              )}
            </Stack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FullScreenModal;
