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
  Stack,
  Checkbox,
  Divider
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import ModelType from "../../daftar/ModelType";

interface PertanyaanResult {
  id: string;
  pertanyaan: string;
  type: string;
  is_required: boolean;
  note: string | null;
  is_active: boolean;
  opsi: string | null;
}

function FindPertanyaan({
  onResult,
}: {
  onResult: (idPertanyaan: string) => void;
}) {
  const [stateResult, setStateResult] = useState<PertanyaanResult[] | []>([]);
  // let result:MentorResult[] = [];
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const {
    isOpen: isOpenResult,
    onOpen: onOpenResult,
    onClose: onCloseResult,
  } = useDisclosure();
  const [query, setQuery] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<PertanyaanResult | null>(
    null,
  );

  const { register } = useForm<{ title_grup: string }>();

  const fields = {
    title_grup: register("title_grup", {
      required: "Masukkan Kata Kunci Pencarian!",
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
          `/grup-pertanyaan/cari-pertanyaan/${query}`,
        );
        // setStateSearch({resultMentor: response.data.data });
        // console.log(response.data.data);
        setStateResult(response.data.data);
        setQuery("");
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
    reset();
  };

  const reset = () => {
    setQuery("");
    setIsError(undefined);
    setStateResult([]);
  };

  const [isError, setIsError] = useState<boolean | undefined>(undefined);
  // console.log(query);
  // console.log(isError);
  const prevQuery = useRef("");

  useEffect(() => {
    if (prevQuery.current !== query) {
      if (query === "" || query.trim() === "") {
        setIsError(true);
      } else {
        setIsError(false);
      }
    }
  }, [query]);

  return (
    // <div>
    <FormControl isInvalid={isError}>
      <Flex flexDirection={["column", "row"]}>
        <Box flex={["1", "20%"]}>
          <FormLabel>
            Pilih Pertanyaan&nbsp;
            <Text as={"span"} color={"red"}>
              *
            </Text>
          </FormLabel>
        </Box>
        <Box flex={["1", "80%"]}>
          {selectedItem ? (
            <SlideFade in={selectedItem !== undefined}>
              <HStack p="2" bgColor={"grey.100"}>
                <CardPertanyaan result={selectedItem || null} />
                <Button size="sm" color="gray.500" onClick={handleCancel}>
                  {"Batal"}
                </Button>
              </HStack>
            </SlideFade>
          ) : (
            <>
              <HStack spacing={4} pb="3">
                <Input
                  placeholder="Cari pertanyaan ..."
                  defaultValue={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    // if (query !== "" || query.trim() !== "") {
                    //   setIsError(false);
                    // } else setIsError(true);
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
                      <UnorderedList
                        listStyleType="none"
                        pl={0}
                        mt={0}
                        mb="2"
                        ml="-0.5"
                        maxH={"250px"}
                        overflowY={"auto"}
                        css={{
                          // For Chrome
                          "&::-webkit-scrollbar": {
                            width: "4px",
                          },
                          "&::-webkit-scrollbar-track": {
                            background: "#E2E8F0",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            background: "#A0AEC0",
                            borderRadius: "4px",
                          },
                          // For Firefox
                          scrollbarColor: "#A0AEC0",
                          scrollbarWidth: "thin",
                        }}
                        pr="1"
                        spacing={2}
                      >
                        {stateResult.map((result, index) => (
                          <ListItem
                            key={result.id}
                            cursor="pointer"
                            onClick={() => handleSelect(result)}
                            p="2"
                            _hover={{
                              bg: "grey.100",
                            }}
                            borderBottom={"1px"}
                            borderBottomColor={"gray.400"}
                          >
                            <SlideFade in={stateResult.length > 0} key={index}>
                              <CardPertanyaan
                                result={result}
                                no_urut={index + 1}
                              />
                              
                            </SlideFade>
                          </ListItem>
                        ))}
                      </UnorderedList>
                    ) : (
                      <Box w="full" backgroundColor={"gray.100"} p={2}>
                        <Text textAlign={"center"} fontSize="15px">
                          Pertanyaan Tidak ditemukan. Coba kata kunci lainnya
                          atau buat pertanyaan baru{" "}
                          <Link href={`/kuesioner/daftar`} target={"_blank"}>
                            <span style={{ fontWeight: "bold" }}>Disini</span>
                          </Link>
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

const CardPertanyaan = ({
  result,
  no_urut,
}: {
  result: PertanyaanResult | null;
  no_urut?: number;
}) => {
  // console.log(result);
  return (
    <HStack w="full" align="start">
      {no_urut && (
        <Box
          p={2}
          rounded={"md"}
          bgColor={"teal.300"}
          // boxSize={"30px"}
          color={"white"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text w="25px" as={"b"} textAlign={"center"} whiteSpace={"nowrap"}>
            {no_urut}
          </Text>
        </Box>
      )}
      <Stack spacing={[2, 1]} direction="column">
        <Stack direction={["column", "row"]} spacing={[0, 3]}>
          <Box w="120px">
            <Text as="b">Pertanyaan</Text>
          </Box>
          <Box w="full">
            <Text>{result?.pertanyaan}</Text>
          </Box>
        </Stack>
        <Stack direction={["column", "row"]} spacing={[0, 3]}>
          <Box w="120px">
            <Text as="b">Model</Text>
          </Box>
          <Box w="full">
            <Text>{ModelType(result?.type || "")}</Text>
          </Box>
        </Stack>
        <Stack direction={["column", "row"]} spacing={[0, 3]}>
          <Box w="120px">
            <Text as="b">Wajib Isi</Text>
          </Box>
          <Box w="full">
            {result?.is_required ? (
              <Checkbox defaultChecked isDisabled size="lg" />
            ) : (
              "-"
            )}
          </Box>
        </Stack>
        <Stack direction={["column", "row"]} spacing={[0, 3]}>
          <Box w="120px">
            <Text as="b" whiteSpace={"nowrap"}>
              Opsi Pilihan
            </Text>
          </Box>
          <Box w="full">
            <Text>{result?.opsi || "-"}</Text>
          </Box>
        </Stack>
      </Stack>
    </HStack>
  );
};

export default FindPertanyaan;
