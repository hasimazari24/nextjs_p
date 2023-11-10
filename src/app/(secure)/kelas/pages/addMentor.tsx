"use client";
import { axiosCustom } from "@/app/api/axios";
import {
  FormControl,
  HStack,
  Input,
  Button,
  FormErrorMessage,
  Center,
  Spinner,
  UnorderedList,
  ListItem,
  Avatar,
  VStack,
  Flex,
  FormLabel,
  Box,
  Text,
  useDisclosure,
  Hide,
  SlideFade,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Mentor } from "@/app/type/class-type.d";

function AddMentor({
  onResult,
  editedSelect,
}: {
  onResult: (idMentor: string) => void;
  editedSelect?: Mentor;
}) {
  // const initialState: { isLoading?: boolean; resultMentor?: MentorResult[] } = {
  //   isLoading: true,
  //   resultMentor: [],
  // };

  const [stateResult, setStateResult] = useState<Mentor[] | []>([]);
  // let result:MentorResult[] = [];
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const {
    isOpen: isOpenResult,
    onOpen: onOpenResult,
    onClose: onCloseResult,
  } = useDisclosure();
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<Mentor | null>(null);
  const [selectEdited, setSelectEdited] = useState<Mentor | null>(
    editedSelect || null,
  );

  const {
    register: registMentorSearch,
    handleSubmit: handleMentorSubmit,
    reset: resetMentorSearch,
    formState: { errors: errMentorSearch },
  } = useForm<{ mentor: string }>();

  const fields = {
    mentor: registMentorSearch("mentor", {
      required: "Masukkan Kata Kunci Pencarian Mentor!",
    }),
  };

  const handleSearch = async () => {
    // Menyimpan querry pencarian ke dalam param
    // setParamSearch(data.searchQuery);
    // Validasi input kosong
    if (query && query === "") {
      return;
    } else {
      // console.log(data);
      // setStateSearch({ isLoading: true });
      try {
        setIsLoadingSearch(true);
        const response = await axiosCustom.get(
          `/user/search-user-mentor/${query}`,
        );
        // setStateSearch({resultMentor: response.data.data });
        // console.log(response.data.data);
        setStateResult(response.data.data);
      } catch (error) {
        // console.error("Error fetching data from Api", error);
        // setIsLoading(false);
        // setIsSearchOpen(true);
        // setStateSearchResults([]);
      }
      setIsLoadingSearch(false);
    }
    // cek isi
  };

  const handleSelect = (item: any) => {
    setSelectedItem(item);
    onCloseResult();
    onResult(item?.id);
  };

  const handleCancel = () => {
    setSelectedItem(null);
    setSelectEdited(null);
    reset();
  };

  const reset = () => {
    setQuery("");
    setIsError(undefined);
    setStateResult([]);
  };

  const [isError, setIsError] = useState<boolean | undefined>(undefined);

  // console.log(result);

  // const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter") {
  //     if (query === "" || query.trim() === "") {
  //       setIsError(true);
  //     } else {
  //       setIsError(false);
  //       handleSearch();
  //       onOpenResult();
  //     }
  //   }
  // };

  return (
    // <div>
    <FormControl isInvalid={isError}>
      <Flex flexDirection={["column", "row"]}>
        <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
          <FormLabel>
            Pilih Mentor&nbsp;
            <Text as={"span"} color={"red"}>
              *
            </Text>
          </FormLabel>
        </Box>
        <Box flex={["1", "75%"]}>
          {selectedItem || selectEdited ? (
            <SlideFade
              in={selectedItem !== undefined || selectEdited !== undefined}
            >
              <HStack p="2" bgColor={"grey.100"}>
                <CardMentor result={selectedItem || selectEdited || null} />
                <Button size="sm" color="gray.500" onClick={handleCancel}>
                  {selectEdited ? "Ganti" : "Batal"}
                </Button>
              </HStack>
            </SlideFade>
          ) : (
            <>
              <HStack spacing={4} pb="3">
                <Input
                  placeholder="Cari username atau full name Mentor ..."
                  onChange={(e) => {
                    setQuery(e.target.value);
                    if (query !== "" || query.trim() !== "") setIsError(false);
                  }}
                  // onKeyDown={handleEnterPress}
                />
                <Button
                  bgColor="gray.500"
                  _hover={{
                    bg: "gray.400",
                  }}
                  color="white"
                  onClick={() => {
                    if (query === "" || query.trim() === "") {
                      setIsError(true);
                    } else {
                      setIsError(false);
                      handleSearch();
                      onOpenResult();
                    }
                  }}
                >
                  Cari
                </Button>
              </HStack>
              <FormErrorMessage mb={2}>
                Masukkan kata kunci pencarian!
              </FormErrorMessage>
              {isOpenResult ? (
                isLoadingSearch ? (
                  <Center>
                    <Spinner
                      className="spinner"
                      size="md"
                      color="blue.500"
                      p={2}
                    />
                  </Center>
                ) : (
                  <div>
                    {stateResult && stateResult.length > 0 ? (
                      <UnorderedList listStyleType="none" pb="2" ml="-0.5">
                        {stateResult.map((result, index) => (
                          <ListItem
                            key={result.id}
                            cursor="pointer"
                            onClick={() => handleSelect(result)}
                            p="2"
                            _hover={{
                              bg: "grey.100",
                            }}
                          >
                            <SlideFade in={stateResult.length > 0} key={index}>
                              <CardMentor result={result} />
                            </SlideFade>
                          </ListItem>
                        ))}
                      </UnorderedList>
                    ) : (
                      <Box w="full" backgroundColor={"gray.100"} p={2}>
                        <Text textAlign={"center"} fontSize="15px">
                          Mentor Tidak ditemukan
                        </Text>
                      </Box>
                    )}
                  </div>
                )
              ) : null}
            </>
          )}
        </Box>
      </Flex>
    </FormControl>
  );
}

const CardMentor = ({ result }: { result: Mentor | null }) => {
  console.log(result);
  return (
    <>
      <HStack ml="2" w="full">
        <Avatar
          size={"sm"}
          src={result?.image_url || "/img/avatar-default.jpg"}
        ></Avatar>
        <VStack alignItems="flex-start" spacing="1px" ml="2">
          <Text fontSize="15px">{result?.fullname}</Text>
          <Text fontSize="12px">{result?.role}</Text>
        </VStack>
      </HStack>
    </>
  );
};

export default AddMentor;
