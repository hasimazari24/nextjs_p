"use client";

import { useEffect, useState } from "react";
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
import { GrMoreVertical, GrTrophy } from "react-icons/gr";
import { SiMicrosoftteams } from "react-icons/si";
import { BsCalendar2Event } from "react-icons/bs";
import { LiaClipboardListSolid } from "react-icons/lia";
import { BiLinkExternal } from "react-icons/bi";
import { axiosCustom } from "@/app/api/axios";
import Link from "next/link";
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
import { EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { UserRoles, permissions } from "@/app/type/role-access-control.d";
import { useAuth } from "@/app/components/utils/AuthContext";
import Loading from "../loading";

// interface MyTenantProps {
//   is_admin: boolean;
// }

interface tenantLinks {
  id: string;
  title: string;
  url: string;
}

interface UserLog {
  // id: string;
  fullname: string;
  role: UserRoles;
  image_url: string;
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
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [dataMyTenant, setDataMyTenant] = useState<any | null>([]);
  const [dataTenantLinks, setDataTenantLinks] = useState<Array<tenantLinks>>(
    [],
  );
  const router = useRouter();
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

  const [dataValuasi, setDataValuasi] = useState<any | null>(null);
  const getValuasi = async () => {
    try {
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get("/valuasi");
      setDataValuasi(response.data.data);
    } catch (error) {
      console.error("Gagal memuat Data Valuasi:", error);
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsModalEditOpen(true);
    // console.log(item);
  };

  const [is_admin, setIs_Admin] = useState<boolean>(dataMyTenant?.is_admin);
  const { user } = useAuth();
  let getUser: UserLog | null = null; // Inisialisasikan getUser di sini

  if (user !== null && user !== 401) {
    getUser = user; // Setel nilai getUser jika user ada
  }

  let myTenant: any | null | undefined = null;

  useEffect(() => {
    // Panggil fungsi fetchData untuk memuat data
    getMyTenant();
    getValuasi();
    // if (is_admin) {
    //   if (getUser !== null) {
    //     // ambil permission sesuai login role
    //     myTenant = permissions[getUser.role]?.features.find(
    //       (feature) => feature.menu === "myTenant",
    //     );
    //     // console.log(backPanelTenantFeatures);
    //     // console.log(allMenu);
    //     // console.log(
    //     //   backPanelTenantFeatures?.access.includes("editTenant") ||
    //     //     allMenu?.access.includes("all_access"),
    //     // );
    //   }
    // }
    // Clear the timeout when the component is unmounted
  }, []);

  const [isModalSocial, setIsModalSocial] = useState(false);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Flex
            justifyContent={"space-between"}
            pb="2"
            direction={["column", "row"]}
          >
            <Heading fontSize={"2xl"}>DATA TENANT</Heading>
            <HStack>
              <Menu>
                {({ isOpen }) => (
                  <>
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
                    <MenuList display={isOpen ? "block" : "none"}>
                      <>
                        {dataMyTenant?.is_public === true && (
                          <Link
                            href={`/tenant-detail/${dataMyTenant?.slug}`}
                            target="_blank"
                          >
                            <MenuItem>
                              <BiLinkExternal />
                              &nbsp; Lihat Situs
                            </MenuItem>
                          </Link>
                        )}
                        <MenuItem
                          onClick={() =>
                            router.push(
                              `/backPanelTenant/catalog/${dataMyTenant?.id}`,
                            )
                          }
                        >
                          <HamburgerIcon />
                          &nbsp; Catalog Tenant
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            router.push(
                              `/backPanelTenant/team/${dataMyTenant?.id}`,
                            )
                          }
                        >
                          <SiMicrosoftteams />
                          &nbsp; Team Tenant
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            router.push(
                              `/backPanelTenant/program/${dataMyTenant.id}`,
                            )
                          }
                        >
                          <LiaClipboardListSolid />
                          &nbsp; Program Tenant
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            router.push(
                              `/backPanelTenant/awards/${dataMyTenant.id}`,
                            )
                          }
                        >
                          <GrTrophy />
                          &nbsp; Awards Tenant
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            router.push(
                              `/backPanelTenant/gallery/${dataMyTenant.id}`,
                            )
                          }
                        >
                          <BsCalendar2Event />
                          &nbsp; Gallery Events Tenant
                        </MenuItem>
                      </>
                    </MenuList>
                  </>
                )}
              </Menu>
              &nbsp;
              {is_admin ? (
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
              ) : null}
            </HStack>
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
                    src={
                      dataMyTenant?.image_banner_url ||
                      "/img/tenant-banner-default.jpg"
                    }
                    fit={"cover"}
                    align={"center"}
                    w={"full"}
                    backgroundColor={"white"}
                    h={{ base: "150px", sm: "300px", lg: "300px" }}
                  />

                  <Flex
                    justify={"center"}
                    mt={{ base: "-50px", sm: "-100", lg: "-100" }}
                  >
                    <Avatar
                      h={{ base: "100px", sm: "200px", lg: "200px" }}
                      w="100%"
                      src={
                        dataMyTenant?.image_url ||
                        "/img/tenant-logo-default.png"
                      }
                      css={{
                        border: "5px solid white",
                      }}
                      backgroundColor={"white"}
                    />
                  </Flex>
                </VStack>

                <Stack spacing={{ base: 4, md: 6 }}>
                  <Box as={"header"}>
                    <Heading fontSize="2xl">{dataMyTenant?.name}</Heading>
                    <Text color={"gray.900"} fontWeight={300} fontSize={"x5"}>
                      Level Tenant : <b>{dataMyTenant?.level_tenant}</b>
                    </Text>
                  </Box>

                  <Stack
                    spacing={{ base: 4, sm: 6 }}
                    direction={"column"}
                    divider={<StackDivider borderColor={"gray.600"} />}
                  >
                    <Box>
                      <Text>Deskripsi :</Text>
                      <Text
                        color={"gray.500"}
                        fontSize={["md", "lg"]}
                        dangerouslySetInnerHTML={{
                          __html: dataMyTenant?.description,
                        }}
                      />
                    </Box>
                    <Box>
                      <Text>Motto :</Text>
                      <Text
                        color={"gray.500"}
                        fontSize={["md", "lg"]}
                        // fontWeight={"300"}
                      >
                        {dataMyTenant?.motto}
                      </Text>
                    </Box>
                    <Box>
                      <Text
                        fontSize={{ base: "16px", lg: "18px" }}
                        color={"yellow.500"}
                        fontWeight={"500"}
                        textTransform={"uppercase"}
                        mb={"4"}
                      >
                        Tenant Details
                      </Text>

                      <SimpleGrid spacing={10}>
                        <Table pt="0">
                          <Tbody>
                            <Tr key={1} pb="3">
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

                            <Tr key={2}>
                              <Td width="20%" pr="0" pl="0">
                                Alamat
                              </Td>
                              <Td width="5%" textAlign="center" pr="0" pl="0">
                                :
                              </Td>
                              <Td width="75%" pr="0" pl="0">
                                <Text
                                  dangerouslySetInnerHTML={{
                                    __html: dataMyTenant?.address,
                                  }}
                                />
                              </Td>
                              {/* Tambahkan kolom lainnya sesuai kebutuhan */}
                            </Tr>

                            <Tr key={3} pb="3">
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
                            <Tr key={4} borderBottom={"hidden"}>
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
                            <Tr key={5} borderBottom={"hidden"}>
                              <Td width="20%" pr="0" pl="0">
                                Jangkauan
                              </Td>
                              <Td width="5%" pr="0" pl="0" textAlign="center">
                                :
                              </Td>
                              <Td width="75%" pr="0" pl="0">
                                {dataMyTenant?.jangkauan || "-"}
                              </Td>
                            </Tr>
                            <Tr key={6} borderBottom={"hidden"}>
                              <Td width="20%" pr="0" pl="0">
                                Valuasi
                              </Td>
                              <Td width="5%" pr="0" pl="0" textAlign="center">
                                :
                              </Td>
                              <Td width="75%" pr="0" pl="0">
                                {dataMyTenant?.valuasi_string || "-"}
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
                color={"gray.600"}
                borderColor={"gray.600"}
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
                      color={"yellow.500"}
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
                            <Link href={link.url} key={link.id} target="_blank">
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
                            <Link href={link.url} key={link.id} target="_blank">
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
                            <Link href={link.url} key={link.id} target="_blank">
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
                            <Link href={link.url} key={link.id} target="_blank">
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
                        } else if (link.title === "YouTube") {
                          return (
                            <Link href={link.url} key={link.id} target="_blank">
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
                        } else if (link.title === "LinkedIn") {
                          return (
                            <Link href={link.url} key={link.id} target="_blank">
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
        </>
      )}
      <ModalSocial
        isOpen={isModalSocial}
        onClose={() => setIsModalSocial(false)}
        onSubmit={() => {
          getMyTenant();
        }}
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
        dataValuasi={dataValuasi}
        myTenant={true}
      />
    </>
  );
}
