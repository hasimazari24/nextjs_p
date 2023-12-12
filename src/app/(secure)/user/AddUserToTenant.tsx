"use client";
import { axiosCustom } from "@/app/api/axios";
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
  RadioGroup,
  Radio,
  useDisclosure,
  SlideFade,
  ModalFooter,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import ModalNotif from "@/app/components/modal/modal-notif";

interface AddUserToTenantProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  dataUser: any;
}

interface TenantResult {
  id: string;
  name: string;
  level_tenant: string;
  image_id: string;
  image_url: string;
}

interface FormValues {
  id: string;
  position: string;
  is_admin: boolean;
  is_public: boolean;
}

const AddUserToTenant = ({
  isOpen,
  onClose,
  onSubmit,
  dataUser,
}: AddUserToTenantProps) => {
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

  const handleSearch = async () => {
    // Menyimpan querry pencarian ke dalam param
    // setParamSearch(data.searchQuery);
    // Validasi input kosong
    if (query && query === "") {
      return;
    } else {
      try {
        setIsLoadingSearch(true);
        const response = await axiosCustom.get(`/tenant/search/${query}`);
        setStateResult(response.data.data);
        setQuery("");
      } catch (error) {}
      setIsLoadingSearch(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const fields = {
    position: register("position", {
      required: "Posisi harus diisi!",
      maxLength: {
        value: 255,
        message: "Maksimal 255 karakter.",
      },
    }),
  };

  const [stateNotif, setStateNotif] = useState({
    msg: "",
    isError: false,
    isNotifShow: false,
  });
  const handleShowMessage = (msg: string, err: boolean) => {
    setStateNotif({
      msg: msg,
      isError: err,
      isNotifShow: true,
    });
  };

  const handleSelect = (item: any) => {
    setSelectedItem(item);
    onCloseResult();
  };

  const handleCancel = () => {
    setSelectedItem(null);
  };

  const resetAll = () => {
    reset();
    setQuery("");
    setStateResult([]);
    setLoad(false);
    setIsLoadingSearch(false);
    setIsError(undefined);
    onCloseResult();
    onClose();
  };

  const [load, setLoad] = useState(false);
  const handleFormSubmit: SubmitHandler<any> = async (data: any) => {
    if (!selectedItem?.id)
      return handleShowMessage("Maaf Tenant harus dipilih!", true);
    const dataBaru: FormValues = {
      id: data.id,
      position: data.position,
      is_admin: data.is_admin === "ya_admin" ? true : false,
      is_public: data.is_admin === "ya_public" ? true : false,
    };

    try {
      setLoad(true);
      await axiosCustom
        .post(`/tenant/${selectedItem?.id}/add-user/`, dataBaru)
        .then((response) => {
          // console.log(response);
          if (response.status === 201) {
            handleShowMessage("User berhasil ditambahkan.", false);
          }
        });

      //   onSubmit(); // Panggil fungsi penyimpanan data (misalnya, untuk memperbarui tampilan tabel)
      // onClose(); // Tutup modal
      resetAll();
      // Setelah data disimpan, atur pesan berhasil ke dalam state
    } catch (error: any) {
      // console.error(error);
      if (error?.response) {
        handleShowMessage(
          `Terjadi Kesalahan: ${error.response.data.message}`,
          true,
        );
      } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
      setLoad(false);
    }
  };

  const [isError, setIsError] = useState<boolean | undefined>(undefined);

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
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          resetAll();
        }}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambahkan User ke Team Tenant</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <ModalBody>
              <Stack>
                <HStack pb="3">
                  <Text>
                    Tambahkan <b>{dataUser?.fullname}</b> sebagai anggota tim
                    login tenant
                  </Text>
                </HStack>
                <Hide>
                  <FormControl isInvalid={!!errors.id} mb="3">
                    <Input
                      type="text"
                      {...register("id")}
                      defaultValue={dataUser?.id}
                      // className={`form-control ${errors.name ? "is-invalid"}`}
                    />
                  </FormControl>
                </Hide>

                <FormControl isInvalid={!!errors.position} mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "30%"]} marginRight={["0", "2"]}>
                      <FormLabel>
                        Posisi&nbsp;
                        <Text as={"span"} color={"red"}>
                          *
                        </Text>
                      </FormLabel>
                    </Box>
                    <Box flex={["1", "70%"]}>
                      <Input {...fields.position} />
                      <FormErrorMessage>
                        {errors.position && errors.position.message}
                      </FormErrorMessage>
                    </Box>
                  </Flex>
                </FormControl>

                <FormControl as="fieldset" mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <FormLabel>
                      Atur sebagai admin tenant?&nbsp;
                      <Text as={"span"} color={"red"}>
                        *
                      </Text>
                    </FormLabel>
                    <RadioGroup defaultValue="ya_admin" name="isAdmin">
                      <Radio {...register("is_admin")} value="ya_admin" pr="4">
                        Ya
                      </Radio>
                      <Radio {...register("is_admin")} value="tidak_admin">
                        Tidak
                      </Radio>
                    </RadioGroup>
                  </Flex>
                </FormControl>

                <FormControl as="fieldset" mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <FormLabel>
                      Tampilkan ke halaman public?&nbsp;
                      <Text as={"span"} color={"red"}>
                        *
                      </Text>
                    </FormLabel>
                    <RadioGroup defaultValue="tidak_public">
                      <Radio
                        {...register("is_public")}
                        value="ya_public"
                        pr="4"
                      >
                        Ya
                      </Radio>
                      <Radio {...register("is_public")} value="tidak_public">
                        Tidak
                      </Radio>
                    </RadioGroup>
                  </Flex>
                </FormControl>

                <FormControl isInvalid={isError}>
                  <Flex flexDirection={["column", "row"]}>
                    <Box flex={["1", "30%"]} marginRight={["0", "2"]}>
                      <FormLabel>
                        Pilih Tenant&nbsp;
                        <Text as={"span"} color={"red"}>
                          *
                        </Text>
                      </FormLabel>
                    </Box>
                    <Box flex={["1", "70%"]}>
                      {selectedItem ? (
                        <SlideFade in={selectedItem !== undefined}>
                          <HStack p="2" bgColor={"grey.100"}>
                            <CardTenant result={selectedItem || null} />
                            <Button
                              size="sm"
                              color="gray.500"
                              onClick={handleCancel}
                            >
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
                                        <SlideFade
                                          in={stateResult.length > 0}
                                          key={index}
                                        >
                                          <CardTenant result={result} />
                                        </SlideFade>
                                      </ListItem>
                                    ))}
                                  </UnorderedList>
                                ) : (
                                  <Box
                                    w="full"
                                    backgroundColor={"gray.100"}
                                    p={2}
                                  >
                                    <Text textAlign={"center"} fontSize="15px">
                                      Tenant Tidak ditemukan. Mungkin sudah
                                      ditambahkan atau coba kata kunci lainnya.
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
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button
                leftIcon={<CheckIcon />}
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={load}
                size="sm"
              >
                Simpan
              </Button>
              <Button
                leftIcon={<CloseIcon />}
                colorScheme="red"
                onClick={() => {
                  onClose();
                  resetAll();
                }}
                size="sm"
              >
                Tutup
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <ModalNotif
        isOpen={stateNotif.isNotifShow}
        onClose={() =>
          setStateNotif({
            msg: "",
            isError: false,
            isNotifShow: false,
          })
        }
        message={stateNotif.msg}
        isError={stateNotif.isError}
        onSubmit={() => onSubmit()}
      />
    </>
  );
};

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

export default AddUserToTenant;
