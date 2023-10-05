"use client";

import { useEffect, useState, useContext } from "react";
import {
  Container,
  VStack,
  SimpleGrid,
  StackDivider,
  Button,
  Center,
  Spinner,
  HStack,
  Text,
  useColorModeValue,
  Image,
  Avatar,
  Td,
  Tr,
  Tbody,
  Table,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import ModalSocial from "../../../components/modal/modal-social";
import { GrMoreVertical } from "react-icons/gr";
import { SiMicrosoftteams } from "react-icons/si";
import { BiLinkExternal } from "react-icons/bi";
import { CiGlobe } from "react-icons/ci";
import { axiosCustom } from "@/app/api/axios";
import Link from "next/link";
import { FiFacebook } from "react-icons/fi";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";
import ModalNotif from "@/app/components/modal/modal-notif";
import ModalEdit from "../modal-edit";
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  ViewIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
// import SplitWithImage from '@/app/(public)/portofolio-detail/page';

interface MyTenantProps {
  is_admin: boolean;
}

interface tenantLinks {
  id: string;
  title: string;
  url: string;
}

export default function MyTenant() {
  const [isModalNotif, setModalNotif] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleShowMessage = (msg: string, err: boolean) => {
    setMessage(msg);
    setIsError(err);
    setModalNotif(true);
  };
  const [selectedSocialLinks, setSelectedSocialLinks] = useState<Array<tenantLinks>>([]);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [dataMyTenant, setDataMyTenant] = useState<any | null>([]);
  const [dataTenantLinks, setDataTenantLinks] = useState<Array<tenantLinks>>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const getMyTenant = async () => {
    try {
      // Panggil API menggunakan Axios dengan async/await
      await axiosCustom.get("/tenant/mytenant").then((response) => {
        setDataMyTenant(response.data.data);
        setIs_Admin(response.data.data.is_admin);
        setDataTenantLinks(response.data.data.tenant_link);
        // menyimpan social links yang sudah dipilih
        // setSelectedSocialLinks(response.data.data.tenant_link); //
      });

      // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
      const timer = setTimeout(() => {
        setIsLoading(false); // Set isLoading to false to stop the spinner
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      // console.error(error);
      if (error?.response) {
        handleShowMessage(
          `Terjadi Kesalahan: ${error.response.data.message}`,
          true,
        );
      } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsModalEditOpen(true);
    // console.log(item);
  };

  const [is_admin, setIs_Admin] = useState<boolean>(dataMyTenant?.is_admin);

  useEffect(() => {
    // Panggil fungsi fetchData untuk memuat data
    getMyTenant();
    // Clear the timeout when the component is unmounted
  }, []);

  const [isModalSocial, setIsModalSocial] = useState(false);

  return (
    <>
      {isLoading ? (
        <Center h="100%" m="10">
          <Spinner className="spinner" size="xl" color="blue.500" />
        </Center>
      ) : (
        <>
          <Flex
            justifyContent={"space-between"}
            pb="2"
            direction={["column", "row"]}
          >
            <Heading fontSize={"2xl"}>DATA TENANT</Heading>
            {is_admin ? (
              <HStack>
                <Menu>
                  <MenuButton
                    as={Button}
                    bgColor="green.100"
                    _hover={{
                      bg: "green.200",
                    }}
                    // color="white"
                    title="More ..."
                    // onClick={() => handleDetail(rowData)}
                    key="dataDetail"
                    size="sm"
                  >
                    <GrMoreVertical />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <BiLinkExternal />
                      &nbsp; Lihat Situs
                    </MenuItem>
                    <MenuItem
                    // onClick={() =>
                    //   router.push(`/tenant/catalog?id=${rowData.id}`)
                    // }
                    >
                      <HamburgerIcon />
                      &nbsp; Catalog Tenant
                    </MenuItem>
                    <MenuItem
                    // onClick={() => router.push(`/tenant/team?id=${rowData.id}`)}
                    >
                      <SiMicrosoftteams />
                      &nbsp; Team Tenant
                    </MenuItem>
                  </MenuList>
                </Menu>
                &nbsp;
                <Button
                  bgColor="blue.100"
                  _hover={{
                    bg: "blue.200",
                  }}
                  // color="white"
                  title="Edit Data"
                  onClick={() => handleEdit()}
                  fontSize="14px"
                  fontWeight="230"
                  key="editData"
                  size="sm"
                >
                  <EditIcon /> &nbsp; Edit Data Tenant
                </Button>
              </HStack>
            ) : null}
          </Flex>
          {dataMyTenant?.name ? (
            <Container maxW={"7xl"} pl="0" pr="0">
              <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={{ base: 8, md: 10 }}
              >
                <VStack>
                  <Image
                    rounded={"md"}
                    alt={"product image"}
                    src={dataMyTenant?.image_banner_url}
                    fit={"cover"}
                    align={"center"}
                    w={"full"}
                    h={{ base: "150px", sm: "300px", lg: "300px" }}
                  />

                  <Flex
                    justify={"center"}
                    mt={{ base: "-50px", sm: "-100", lg: "-100" }}
                  >
                    <Avatar
                      h={{ base: "100px", sm: "200px", lg: "200px" }}
                      w="100%"
                      src={dataMyTenant?.image_url}
                      css={{
                        border: "5px solid white",
                      }}
                    />
                  </Flex>
                </VStack>

                <Stack spacing={{ base: 4, md: 6 }}>
                  <Box as={"header"}>
                    <Heading fontSize="2xl">{dataMyTenant?.name}</Heading>
                    <Text
                      color={useColorModeValue("gray.900", "gray.400")}
                      fontWeight={300}
                      fontSize={"x5"}
                    >
                      Level Tenant : <b>{dataMyTenant?.level_tenant}</b>
                    </Text>
                  </Box>

                  <Stack
                    spacing={{ base: 4, sm: 6 }}
                    direction={"column"}
                    divider={
                      <StackDivider
                        borderColor={useColorModeValue("gray.200", "gray.600")}
                      />
                    }
                  >
                    <Box>
                      <Text>Deskripsi :</Text>
                      <Text
                        color={useColorModeValue("gray.500", "gray.400")}
                        fontSize={"xl"}
                        // fontWeight={"300"}
                      >
                        {dataMyTenant?.description}
                      </Text>
                    </Box>
                    <Box>
                      <Text>Motto :</Text>
                      <Text
                        color={useColorModeValue("gray.500", "gray.400")}
                        fontSize={"xl"}
                        // fontWeight={"300"}
                      >
                        {dataMyTenant?.motto}
                      </Text>
                    </Box>
                    <Box>
                      <Text
                        fontSize={{ base: "16px", lg: "18px" }}
                        color={useColorModeValue("yellow.500", "yellow.300")}
                        fontWeight={"500"}
                        textTransform={"uppercase"}
                        mb={"4"}
                      >
                        Tenant Details
                      </Text>

                      <SimpleGrid spacing={10}>
                        <Table pt="0">
                          <Tbody>
                            <Tr key={2} pb="3">
                              <Td width="20%" pr="0" pl="0" pt="0">
                                Founder
                              </Td>
                              <Td
                                width="5%"
                                pr="0"
                                pl="0"
                                pt="0"
                                textAlign="center"
                              >
                                :
                              </Td>
                              <Td width="75%" pr="0" pt="0" pl="0">
                                {dataMyTenant?.founder}
                              </Td>
                            </Tr>

                            <Tr key={1}>
                              <Td width="20%" pr="0" pl="0">
                                Alamat
                              </Td>
                              <Td width="5%" textAlign="center" pr="0" pl="0">
                                :
                              </Td>
                              <Td width="75%" pr="0" pl="0">
                                {dataMyTenant?.address}
                              </Td>
                              {/* Tambahkan kolom lainnya sesuai kebutuhan */}
                            </Tr>

                            <Tr key={4} pb="3">
                              <Td width="20%" pr="0" pl="0">
                                E-mail
                              </Td>
                              <Td width="5%" pr="0" pl="0" textAlign="center">
                                :
                              </Td>
                              <Td width="75%" pr="0" pl="0">
                                {dataMyTenant?.email}
                              </Td>
                            </Tr>
                            <Tr key={5} borderBottom={"hidden"}>
                              <Td width="20%" pr="0" pl="0">
                                Kontak
                              </Td>
                              <Td width="5%" pr="0" pl="0" textAlign="center">
                                :
                              </Td>
                              <Td width="75%" pr="0" pl="0">
                                {dataMyTenant?.contact}
                              </Td>
                            </Tr>
                          </Tbody>
                        </Table>
                      </SimpleGrid>
                    </Box>
                  </Stack>
                </Stack>
              </SimpleGrid>

              <Divider
                pt="4"
                mb="4"
                color={useColorModeValue("gray.200", "gray.600")}
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />

              <Stack spacing={{ base: 4, md: 6 }} pb="3">
                <Box>
                  <Flex
                    justifyContent={"space-between"}
                    direction={["column", "row"]}
                    mb={"4"}
                  >
                    <Text
                      fontSize={{ base: "16px", lg: "18px" }}
                      color={useColorModeValue("yellow.500", "yellow.300")}
                      fontWeight={"500"}
                      textTransform={"uppercase"}
                      mb={"2"}
                    >
                      Social Links
                    </Text>
                    {is_admin ? (
                      <Button
                        bgColor="blue.100"
                        _hover={{
                          bg: "blue.200",
                        }}
                        // color="white"
                        title="Edit Social Links"
                        onClick={() => setIsModalSocial(true)}
                        key="editSocial"
                        size="sm"
                        fontSize="14px"
                        fontWeight="230"
                      >
                        <EditIcon /> &nbsp; Edit Social Links
                      </Button>
                    ) : null}
                  </Flex>
                  <Stack direction={["column", "row"]}>
                    {dataTenantLinks.length !== 0 ? (
                      dataTenantLinks.map((link) => {
                        if (link.title === "Website") {
                          return (
                            <Link href={link.url} target="_blank">
                              <HStack alignItems={"center"} pr="4">
                                <IconButton
                                  color="blue.300"
                                  aria-label="web"
                                  size="sm"
                                  icon={<FaGlobe size="sm" />}
                                  _hover={{
                                    color: "blue.500", // Ganti dengan warna saat hover
                                  }}
                                  title={link.url}
                                  backgroundColor="rgba(0, 0, 0, 0)"
                                />
                              </HStack>
                            </Link>
                          );
                        } else if (link.title === "Facebook") {
                          return (
                            <Link href={link.url} target="_blank">
                              <HStack alignItems={"center"} pr="3">
                                <IconButton
                                  color="blue.600"
                                  aria-label="web"
                                  icon={<FaFacebook size="sm" />}
                                  size="sm"
                                  title={link.url}
                                  _hover={{
                                    color: "blue.900", // Ganti dengan warna saat hover
                                  }}
                                  backgroundColor="rgba(0, 0, 0, 0)"
                                />
                              </HStack>
                            </Link>
                          );
                        } else if (link.title === "Instagram") {
                          return (
                            <Link href={link.url} target="_blank">
                              <HStack alignItems={"center"} pr="3">
                                <IconButton
                                  color="pink.500"
                                  aria-label="web"
                                  icon={<FaInstagram size="sm" />}
                                  size="sm"
                                  title={link.url}
                                  _hover={{
                                    color: "pink.700",
                                  }}
                                  backgroundColor="rgba(0, 0, 0, 0)"
                                />
                              </HStack>
                            </Link>
                          );
                        } else if (link.title === "Twitter") {
                          return (
                            <Link href={link.url} target="_blank">
                              <HStack alignItems={"center"} pr="3">
                                <IconButton
                                  color="blue.400"
                                  aria-label="web"
                                  icon={<FaTwitter size="sm" />}
                                  size="sm"
                                  title={link.url}
                                  _hover={{
                                    color: "blue.700",
                                  }}
                                  backgroundColor="rgba(0, 0, 0, 0)"
                                />
                              </HStack>
                            </Link>
                          );
                        } else if (link.title === "Youtube") {
                          return (
                            <Link href={link.url} target="_blank">
                              <HStack alignItems={"center"} pr="3">
                                <IconButton
                                  color="red.500"
                                  aria-label="web"
                                  icon={<FaYoutube size="sm" />}
                                  size="sm"
                                  title={link.url}
                                  _hover={{
                                    color: "red.700",
                                  }}
                                  backgroundColor="rgba(0, 0, 0, 0)"
                                />
                              </HStack>
                            </Link>
                          );
                        } else if (link.title === "Linkedin") {
                          return (
                            <Link href={link.url} target="_blank">
                              <Link href="impuls.id">
                                <HStack alignItems={"center"} pr="3">
                                  <IconButton
                                    color="blue.500"
                                    aria-label="web"
                                    icon={<FaLinkedin size="sm" />}
                                    size="sm"
                                    title={link.url}
                                    _hover={{
                                      color: "blue.800",
                                    }}
                                    backgroundColor="rgba(0, 0, 0, 0)"
                                  />
                                </HStack>
                              </Link>
                            </Link>
                          );
                        }
                      })
                    ) : (
                      <Text as="i">
                        Belum ada social links. Tambahkan melalui Edit Social
                        Links di kanan atas ini.
                      </Text>
                    )}
                  </Stack>
                </Box>
              </Stack>
            </Container>
          ) : (
            <Flex
              h="80px"
              width="100%"
              bgColor={"red.100"}
              align={"center"}
              justify={"center"}
            >
              <Center>
                <Text>
                  Tidak Ada Tenant, silahkan hubungi admin untuk mendaftarkan
                  tenant
                </Text>
              </Center>
            </Flex>
          )}
          {/* <SplitWithImage selectedSocialLinks={selectedSocialLinks} /> */}
        </>
      )}
      <ModalSocial
        isOpen={isModalSocial}
        onClose={() => setIsModalSocial(false)}
        onSubmit={() => {
          getMyTenant();
        }}
        formData={dataTenantLinks}
        idTenant={dataMyTenant?.id}
        onDelete={() => getMyTenant()}
      />

      <ModalNotif
        isOpen={isModalNotif}
        onClose={() => setModalNotif(false)}
        message={message}
        isError={isError}
      />

      <ModalEdit
        isOpen={isModalEditOpen}
        onClose={() => setIsModalEditOpen(false)}
        onSubmit={() => {
          getMyTenant();
        }}
        isEdit={true}
        formData={dataMyTenant}
      />
    </>
  );
}
