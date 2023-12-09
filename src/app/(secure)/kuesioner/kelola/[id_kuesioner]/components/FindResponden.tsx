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
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

interface TenantResult {
  id: string;
  name: string;
  level_tenant: string;
  image_id: string;
  image_url: string;
}

function FindResponden({
  onResult,
  idKuesioner,
}: {
  onResult: (idTenant: string) => void;
  idKuesioner: string;
}) {
  const [stateResult, setStateResult] = useState<TenantResult[] | []>([]);
  // let result:MentorResult[] = [];
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const {
    isOpen: isOpenResult,
    onOpen: onOpenResult,
    onClose: onCloseResult,
  } = useDisclosure();
  const [query, setQuery] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<TenantResult | null>(null);

  const { register } = useForm<{ tenant: string }>();

  const fields = {
    tenant: register("tenant", {
      required: "Masukkan Kata Kunci Pencarian Responden!",
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
          `/kuesioner-tahunan/${idKuesioner}/cari-responden/${query}`,
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
        <Box flex={["1", "25%"]} marginRight={["0", "2"]}>
          <FormLabel>
            Pilih Responden&nbsp;
            <Text as={"span"} color={"red"}>
              *
            </Text>
          </FormLabel>
        </Box>
        <Box flex={["1", "75%"]}>
          {selectedItem ? (
            <SlideFade in={selectedItem !== undefined}>
              <HStack p="2" bgColor={"grey.100"}>
                <CardTenant result={selectedItem || null} />
                <Button size="sm" color="gray.500" onClick={handleCancel}>
                  {"Batal"}
                </Button>
              </HStack>
            </SlideFade>
          ) : (
            <>
              <HStack spacing={4} pb="3">
                <Input
                  placeholder="Cari nama Tenant ..."
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
                          >
                            <SlideFade in={stateResult.length > 0} key={index}>
                              <CardTenant result={result} />
                            </SlideFade>
                          </ListItem>
                        ))}
                      </UnorderedList>
                    ) : (
                      <Box w="full" backgroundColor={"gray.100"} p={2}>
                        <Text textAlign={"center"} fontSize="15px">
                          Tenant Tidak ditemukan. Mungkin sudah ditambahkan atau
                          coba kata kunci lainnya.
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

const CardTenant = ({ result }: { result: TenantResult | null }) => {
  // console.log(result);
  return (
    <>
      <HStack ml="2" w="full">
        <Avatar
          size={"sm"}
          src={result?.image_url || "/img/tenant-logo-default.png"}
        ></Avatar>
        <VStack alignItems="flex-start" spacing="1px" ml="2">
          <Text fontSize="15px">{result?.name}</Text>
          <Text fontSize="12px">
            Level Tenant :{" "}
            <span style={{ color: "red.500" }}>{result?.level_tenant}</span>
          </Text>
        </VStack>
      </HStack>
    </>
  );
};

export default FindResponden;
