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
import ModelType from "../../../daftar/ModelType";

interface GrupResult {
  id: string;
  title: string;
  pertanyaan_count: number;
  pertanyaan_aktif_count: number;
  pertanyaan_nonaktif_count: number;
  created_at : string;
}

function FindGroup({
  onResult,
  idKuesioner,
}: {
  onResult: (idGroup: string) => void;
  idKuesioner:string
}) {
  const [stateResult, setStateResult] = useState<GrupResult[] | []>([]);
  // let result:MentorResult[] = [];
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const {
    isOpen: isOpenResult,
    onOpen: onOpenResult,
    onClose: onCloseResult,
  } = useDisclosure();
  const [query, setQuery] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<GrupResult | null>(
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
          `/kuesioner-tahunan/${idKuesioner}/cari-grup/${query}`,
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
            Pilih Grup&nbsp;
            <Text as={"span"} color={"red"}>
              *
            </Text>
          </FormLabel>
        </Box>
        <Box flex={["1", "80%"]}>
          {selectedItem ? (
            <SlideFade in={selectedItem !== undefined}>
              <HStack p="2" bgColor={"grey.100"}>
                <CardGroup result={selectedItem || null} />
                <Button size="sm" color="gray.500" onClick={handleCancel}>
                  {"Batal"}
                </Button>
              </HStack>
            </SlideFade>
          ) : (
            <>
              <HStack spacing={4} pb="3">
                <Input
                  placeholder="Cari grup pertanyaan ..."
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
                              <CardGroup
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
                          Grup Pertanyaan Tidak ditemukan. Coba kata kunci lainnya
                          atau buat grup baru{" "}
                          <Link href={`/kuesioner/grup`} target={"_blank"}>
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

const CardGroup = ({
  result,
  no_urut,
}: {
  result: GrupResult | null;
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
            <Text as="b">Judul</Text>
          </Box>
          <Box w="full">
            <Text>{result?.title}</Text>
          </Box>
        </Stack>
        <Stack direction={["column", "row"]} spacing={[0, 3]}>
          <Box w="120px">
            <Text as="b">Pertanyaan</Text>
          </Box>
          <Box w="full">
            <Text>Total : {result?.pertanyaan_count}</Text>
            <Text>Aktif : {result?.pertanyaan_aktif_count}</Text>
            <Text>Nonaktif : {result?.pertanyaan_nonaktif_count}</Text>
          </Box>
        </Stack>
        <Stack direction={["column", "row"]} spacing={[0, 3]}>
          <Box w="120px">
            <Text as="b" whiteSpace={"nowrap"}>
              Dibuat
            </Text>
          </Box>
          <Box w="full">
            <Text>{result?.created_at}</Text>
          </Box>
        </Stack>
      </Stack>
    </HStack>
  );
};

export default FindGroup;
