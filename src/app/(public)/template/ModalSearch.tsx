import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
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
import { useForm, SubmitHandler } from 'react-hook-form';
import axios, { axiosCustom } from "@/app/api/axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  param: string;
}

const FullScreenModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [paramSearch, setParamSearch] = useState<string|null>(null);

  
  
  
  const handleSearch: SubmitHandler<any> = async (data: string) => {
    // Menyimpan querry pencarian ke dalam param
  // setParamSearch(data.searchQuery);
    // Validasi input kosong
    if (data && data.param === "") {
      return;
    } else {
      console.log(data);
      // Simulasi pemanggilan API dengan timeout
      setIsLoading(true);

      setTimeout(async () => {
        try {
          const response = await axiosCustom.post(`/public/search`, data);

          //data api diwadahi result sko response
          const results = response.data.data;
          console.log(response);
          setSearchResults(results);
          setIsLoading(false);
          setIsSearchOpen(true); //set ke True saat pencarian dimulai//
        } catch (error) {
          console.error("Error fetching data from Api", error);
          setIsLoading(false);
          setIsSearchOpen(false);
        }
      }, 1000); // Contoh waktu tunda 1 detik
    }
    // cek isi
    
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setSearchResults([]);
        reset(); // Menggunakan reset untuk mengosongkan input
        setIsSearchOpen(false); //set ke False saat modal ditutup
      }}
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody p="3">
          <form onSubmit={handleSubmit(handleSearch)}>
            <HStack
              alignItems={"center"}
              justify="center"
              transition="0.5s"
              width="full"
            >
              <Input
                {...register("param")}
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Masukkan kata kunci pencarian"
                size="lg"
              />
              <Button
                type="submit"
                bg={"red.400"}
                _hover={{ bg: "red.500" }}
                size="lg"
                color="white"
              >
                <SearchIcon />
              </Button>
            </HStack>
            {errors.param && <p>{errors.param.message}</p>}
            <Button type="submit" style={{ display: "none" }}></Button>
          </form>
          {isLoading ? (
            <Center>
              <Spinner className="spinner" size="md" color="blue.500" m="3" />
            </Center>
          ) : (
            <Stack w="full" direction={"column"}>
              {searchResults && searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <SlideFade in={searchResults.length > 0} offsetY="20px" key={index}>
                    <Box
                      rounded="md"
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
                      <Text fontSize="12px" color="gray.500" className="textH">
                        PORTOFOLIO
                      </Text>
                      <Text fontSize="18px" color="gray.800" className="textResult">
                        {result?.name}
                      </Text>
                    </Box>
                  </SlideFade>
                ))
              ) : (
                //text disembunyikan saat tab baru dibuka dan dikukut
                isSearchOpen && (
                <Center p="3">
                  <p>Hasil pencarian tidak ditemukan</p>
                </Center>
                )
              )}
            </Stack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FullScreenModal;
