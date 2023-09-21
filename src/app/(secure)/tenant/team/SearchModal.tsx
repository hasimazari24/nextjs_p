import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  VStack,
  Text,
  ListItem,
  UnorderedList,
  HStack,
  Avatar,
  Flex,
  Center,
  Spinner,
  Box,
  Stack,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Hide,
  RadioGroup,Radio,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  searchResults: any[];
  isLoading: boolean;
  isLoadSave: boolean;
  onSubmit: (selectedItem: any) => void;
  ifResultNothing: string | null;
}

interface FormValues {
  id: string;
  position: string;
  is_admin: boolean;
}

interface Query {
  cari : string;
}

const SearchModal = ({
  isOpen,
  onClose,
  onSearch,
  searchResults,
  isLoading,
  isLoadSave,
  onSubmit,
  ifResultNothing,
}: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleSearch = () => {
    console.log("masuk gk nih?");
    onSearch(query);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const fields = {
    position: register("position", { required: "Posisi harus diisi!" }),
  };

  const handleSelect = (item: any) => {
    setSelectedItem(item);
  };

  const handleCancel = () => {
    setSelectedItem(null);
  };

  const [load, setLoad] = useState(false);
  const handleFormSubmit: SubmitHandler<any> = (data: any) => {
    setLoad(true);
    const sendData = {
      id : data.id,
      is_admin : selectedOption,
      position : data.position,
  };
    onSubmit(sendData);
    reset();
    setSelectedItem(null);
    setQuery("");
    onClose();
    setLoad(false);
  };

  const [selectedOption, setSelectedOption] = useState<Boolean>(false);
  const handleIsAdmin = (value: string) => {
    setSelectedOption(value === "ya");
  };

  const [isError, setIsError] = useState<boolean | undefined>(undefined);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setSelectedItem(null);
        setQuery("");
        reset();
        setIsError(undefined);
      }}
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tambahkan Anggota</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {selectedItem ? (
            <Stack>
              <HStack>
                <Text>
                  Tambahkan <b>{selectedItem.fullname}</b> sebagai anggota tim
                </Text>
              </HStack>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Hide>
                  <FormControl isInvalid={!!errors.id} mb="3">
                    <Input
                      type="text"
                      {...register("id")}
                      defaultValue={selectedItem.id}
                      // className={`form-control ${errors.name ? "is-invalid"}`}
                    />
                    <FormErrorMessage>
                      {errors.id && errors.id.message}
                    </FormErrorMessage>
                  </FormControl>
                </Hide>

                <FormControl isInvalid={!!errors.position} mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "20%"]} marginRight={["0", "2"]}>
                      <FormLabel>Posisi</FormLabel>
                    </Box>
                    <Box flex={["1", "80%"]}>
                      <Input {...fields.position} />
                      <FormErrorMessage>
                        {errors.position && errors.position.message}
                      </FormErrorMessage>
                    </Box>
                  </Flex>
                </FormControl>

                <FormControl as="fieldset" mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "46%"]} marginRight={["0", "2"]}>
                      <FormLabel>Atur sebagai admin tenant?</FormLabel>
                    </Box>
                    <Box flex={["1", "54%"]}>
                      <RadioGroup defaultValue="tidak" onChange={handleIsAdmin}>
                        <Radio value="ya" pr="4">
                          Ya
                        </Radio>
                        <Radio value="tidak">Tidak</Radio>
                      </RadioGroup>
                    </Box>
                  </Flex>
                </FormControl>

                <HStack pt="2">
                  <Button colorScheme="green" type="submit" isLoading={load}>
                    Simpan
                  </Button>
                  <Button colorScheme="red" onClick={handleCancel}>
                    Batal
                  </Button>
                </HStack>
              </form>
            </Stack>
          ) : (
            <>
              <FormControl isInvalid={isError}>
                <HStack spacing={4} pb="3">
                  <Input
                    placeholder="Cari username atau full name ..."
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      if (query !== "" || query.trim() !== "")
                        setIsError(false);
                    }}
                  />
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      if (query === "" || query.trim() === "") {
                        setIsError(true);
                      } else {
                        setIsError(false);
                        handleSearch();
                      }
                    }}
                  >
                    Cari
                  </Button>
                </HStack>
                <FormErrorMessage>
                  Masukkan kata kunci pencarian!
                </FormErrorMessage>
              </FormControl>

              {isLoading ? (
                <Center>
                  <Spinner
                    className="spinner"
                    size="md"
                    color="blue.500"
                    m="3"
                  />
                </Center>
              ) : (
                <div>
                  {ifResultNothing ? (
                    <Box>
                      <Text textAlign={"center"} fontSize="15px">
                        Tidak ditemukan
                      </Text>
                    </Box>
                  ) : (
                    <UnorderedList listStyleType="none" pb="2" ml="-0.5">
                      {searchResults.length > 0 &&
                        searchResults.map((result) => (
                          <ListItem
                            key={result.id}
                            cursor="pointer"
                            onClick={() => handleSelect(result)}
                            p="2"
                            _hover={{
                              bg: "grey.100",
                            }}
                          >
                            <HStack ml="2">
                              <Avatar
                                size={"sm"}
                                src={
                                  "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                                }
                              ></Avatar>
                              <VStack
                                alignItems="flex-start"
                                spacing="1px"
                                ml="2"
                              >
                                <Text fontSize="15px">{result.fullname}</Text>
                                <Text fontSize="12px">{result.username}</Text>
                              </VStack>
                            </HStack>
                          </ListItem>
                        ))}
                    </UnorderedList>
                  )}
                </div>
              )}
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
