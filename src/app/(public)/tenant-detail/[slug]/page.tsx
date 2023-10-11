"use client";

import {
  Box,
  Td,
  Tr,
  IconButton,
  Table,
  Tbody,
  Center,
  Container,
  Spinner,
  HStack,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoSearchSharp,
} from "react-icons/io5";
import React, { ReactElement, useState, useEffect } from "react";
import ModalSocial from "@/app/components/modal/modal-social";
import { GrMoreVertical } from "react-icons/gr";
import { SiMicrosoftteams } from "react-icons/si";
import { BiLinkExternal } from "react-icons/bi";
import { CiGlobe } from "react-icons/ci";
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
import { notFound } from "next/navigation";
import { axiosCustom } from "@/app/api/axios";
import AlertBar from "@/app/components/modal/AlertBar";

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

interface tenantLinks {
  id: string;
  title: string;
  url: string;
}

interface SplitWithImageProps {
  selectedSocialLinks: any[]; // Sesuaikan dengan tipe yang benar
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function portfolioDetail({
  params,
}: {
  params: { slug: string };
}) {
  const getParamsId = params.slug;
  // console.log(getParamsId);

  const avatars = [
    {
      name: "Ryan Florence",
      url: "https://bit.ly/ryan-florence",
    },
    {
      name: "Segun Adebayo",
      url: "https://bit.ly/sage-adebayo",
    },
    {
      name: "Kent Dodds",
      url: "https://bit.ly/kent-c-dodds",
    },
    {
      name: "Prosper Otemuyiwa",
      url: "https://bit.ly/prosper-baba",
    },
    {
      name: "Christian Nwamba",
      url: "https://bit.ly/code-beast",
    },
  ];
  // if ((getParamsId && getParamsId.length === 0) || !getParamsId) {
  //   return notFound();
  // }

  const [portfolioDetail, setPortfolioDetail] = useState<any | null>([]);
  const [dataTenantLinks, setDataTenantLinks] = useState<Array<tenantLinks>>(
    [],
  );
  const [loadingDetail, setLoadingDetail] = useState<boolean>(true);

  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [status, setstatus] = useState<
    "success" | "info" | "warning" | "error"
  >("error");

  const getPortofolioDetail = async (slug: string) => {
    try {
      setLoadingDetail(true);
      // Panggil API login di sini dengan menggunakan Axios atau metode lainnya
      await axiosCustom.get(`public/tenant/${slug}`).then((response) => {
        setPortfolioDetail(response.data.data);
        setDataTenantLinks(response.data.data.tenant_link);
      });
    } catch (error: any) {
      if (error?.response) {
        // error.response?.status === 401 ? setUser(401) : setUser(null);\
        console.log(error.response.data.message);
        // setMsg(`Terjadi Kesalahan: ${error.response.data.message}`);
      } else {
        setMsg(`Terjadi Kesalahan: ${error.message}`);
        setstatus("error");
        setIsOpen(true);
      }
      setPortfolioDetail(null);
    } finally {
      setLoadingDetail(false);
    }
  };

  useEffect(() => {
    getPortofolioDetail(getParamsId);
    // if (!portfolioDetail) {
    //   return notFound();
    // }
  }, []);
  return (
    <>
      <Container maxW={"7xl"} px={{ base: 6, md: 20, "2xl": 55 }}>
        {loadingDetail ? (
          <Center h="100%" m="10" flexDirection={"column"}>
            <Spinner className="spinner" size="xl" color="blue.500" />
            <Text>Sedang memuat data</Text>
          </Center>
        ) : (
          <>
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              // spacing={{ base: 8, md: 10, lg: 20 }}
              spacing={{ base: 8, md: 10 }}
              py={{ base: 10, md: 10 }}
            >
              <Stack spacing={{ base: 5, md: 10 }}>
                <Box as={"header"}>
                  <HStack spacing={8}>
                    <Box
                      w="75px"
                      h="75px"
                      borderRadius="full"
                      overflow="hidden"
                    >
                      <img src={portfolioDetail?.image_url} alt="Foto Profil" />
                    </Box>
                    <VStack align="start" spacing={1}>
                      <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{ base: "xl", sm: "3xl", lg: "4xl" }}
                      >
                        {portfolioDetail?.name}
                      </Heading>
                      <HStack>
                        <Text
                          color={useColorModeValue("gray.900", "gray.400")}
                          fontWeight={300}
                          fontSize={"xl"}
                        >
                          Level Tenant :
                        </Text>
                        <Text
                          color={useColorModeValue("gray.900", "gray.400")}
                          fontWeight={600}
                          fontSize={"xl"}
                        >
                          {portfolioDetail?.level_tenant}
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>
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
                    <Text
                      fontSize={{ base: "16px", lg: "18px" }}
                      color={useColorModeValue("yellow.500", "yellow.300")}
                      fontWeight={"500"}
                      textTransform={"uppercase"}
                      mb={"4"}
                    >
                      Deskripsi
                    </Text>
                    <Text fontSize={"lg"}>{portfolioDetail?.description}</Text>
                  </Box>

                  {/* <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={useColorModeValue("yellow.500", "yellow.300")}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Motto
                  </Text>
                  <Text fontSize={"lg"}>{portfolioDetail?.motto}</Text>
                </Box> */}

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
                      <Table pt="0" pb="0">
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
                              {portfolioDetail?.founder}
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
                              {portfolioDetail?.address}
                            </Td>
                          </Tr>

                          <Tr key={4} pb="3">
                            <Td width="20%" pr="0" pl="0">
                              E-mail
                            </Td>
                            <Td width="5%" pr="0" pl="0" textAlign="center">
                              :
                            </Td>
                            <Td width="75%" pr="0" pl="0">
                              {portfolioDetail?.email}
                            </Td>
                          </Tr>
                          <Tr key={5} borderBottom={"hidden"} pb="0">
                            <Td width="20%" pr="0" pl="0" pb="0">
                              Kontak
                            </Td>
                            <Td
                              width="5%"
                              pr="0"
                              pl="0"
                              pb="0"
                              textAlign="center"
                            >
                              :
                            </Td>
                            <Td width="75%" pr="0" pb="0" pl="0">
                              {portfolioDetail?.contact}
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </SimpleGrid>
                  </Box>
                </Stack>
              </Stack>
              <Stack spacing={{ base: 5, md: 10 }}>
                <Image
                  rounded={"md"}
                  alt={"feature image"}
                  src={portfolioDetail?.image_banner_url}
                  fit={"cover"}
                  align={"center"}
                  w={"full"}
                  backgroundColor={"white"}
                  h={{ base: "150px", sm: "300px", lg: "300px" }}
                />
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
                    <Text
                      fontSize={{ base: "16px", lg: "18px" }}
                      color={useColorModeValue("yellow.500", "yellow.300")}
                      fontWeight={"500"}
                      textTransform={"uppercase"}
                      mb={"4"}
                    >
                      Team Tenant
                    </Text>
                    <AvatarGroup>
                      {avatars.map((avatar) => (
                        <Avatar
                          key={avatar.name}
                          name={avatar.name}
                          src={avatar.url}
                          // eslint-disable-next-line react-hooks/rules-of-hooks
                          // size={useBreakpointValue({ base: "md", md: "lg" })}
                          position={"relative"}
                          zIndex={2}
                          _before={{
                            content: '""',
                            width: "full",
                            height: "full",
                            rounded: "full",
                            transform: "scale(1.125)",
                            bgGradient: "linear(to-bl, red.400,pink.400)",
                            position: "absolute",
                            zIndex: -1,
                            top: 0,
                            left: 0,
                          }}
                        />
                      ))}
                    </AvatarGroup>
                  </Box>

                  <Box>
                    <Text
                      fontSize={{ base: "16px", lg: "18px" }}
                      color={useColorModeValue("yellow.500", "yellow.300")}
                      fontWeight={"500"}
                      textTransform={"uppercase"}
                      mb={"4"}
                    >
                      Sosial Media
                    </Text>
                    <Stack direction={["column", "row"]}>
                      {dataTenantLinks.length !== 0
                        ? dataTenantLinks.map((link) => {
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
                            } else if (link.title === "YouTube") {
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
                            } else if (link.title === "LinkedIn") {
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
                        : null}
                    </Stack>
                  </Box>
                </Stack>
              </Stack>
            </SimpleGrid>

            <Stack
              align={"center"}
              //   spacing={{ base: 8, md: 10 }}
              py={{ base: 10, md: 10 }}
              overflow={"hidden"}
            >
              <Stack w={"full"} flex={1} spacing={{ base: 5, md: 10 }} mb="3">
                <Heading
                  lineHeight={1.2}
                  fontWeight={500}
                  fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}
                  textAlign={"center"}
                >
                  Catalog
                </Heading>
              </Stack>
            </Stack>
          </>
        )}
      </Container>

      <AlertBar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={msg}
        status={status}
      />
    </>
  );
}
