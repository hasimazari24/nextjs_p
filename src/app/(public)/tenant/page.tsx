"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
  Img,
  Center,
  Wrap,
  WrapItem,
  SimpleGrid,
  Spinner,
  Skeleton
} from "@chakra-ui/react";
// import { usePublic } from "../utils/PublicContext";
import { useRouter } from "next/navigation";
import NextLink from 'next/link';
import { axiosCustom } from "@/app/api/axios";
import dynamic from "next/dynamic";
import Loading from "../loading";

interface Beranda {
  id: string;
  name: string;
  motto: string;
  slug:string;
  image_url: string;
  image_banner_url: string;
}

function Tenant() {
  // const { beranda, loadingBeranda } = usePublic();
  // console.log(beranda);
  const router = useRouter();

  const [isHovered, setIsHovered] = useState<{ [key: number]: boolean }>({});

  const handleMouseEnter = (index: number) => {
    setIsHovered((prevState) => ({ ...prevState, [index]: true }));
  };

  const handleMouseLeave = (index: number) => {
    setIsHovered((prevState) => ({ ...prevState, [index]: false }));
  };

  const [beranda, setBeranda] = useState<any[] | null>([]);
  const [loadingBeranda, setLoadingBeranda] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [status, setstatus] = useState<
    "success" | "info" | "warning" | "error"
  >("error");

  const getTenant = async () => {
    setLoadingBeranda(true);
    try {
      await axiosCustom.get("/public/tenant").then((response) => {
        setBeranda(response.data.data);
        setLoadingBeranda(false);
      });
    } catch (error: any) {
      console.log(error);
      if (error?.response) {
        setMsg(`Terjadi Kesalahan: ${error.response.data.message}`);
      } else setMsg(`Terjadi Kesalahan: ${error.message}`);
      setstatus("error");
      setIsOpen(true);
      setLoadingBeranda(false);
    }
  };

  useEffect(() => {
    getTenant();
  }, []);

  return (
    <div>
      <Container maxW={"8xl"} px={{ base: 6, md: 20, "2xl": 55 }}>
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
              Tenant Solo Technopark
            </Heading>
          </Stack>

          {loadingBeranda ? (
            <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={"15px"}>
              {[1, 2, 3, 4, 5].map((index) => (
                <Skeleton
                  key={index}
                  minW={{ base: "150px", md: "180px" }}
                  w={"full"}
                  rounded="xl"
                  borderWidth={"1px"}
                  shadow="md"
                  height={{
                    base: "80px",
                    sm: "80px",
                    md: "100px",
                    lg: "100px",
                  }}
                />
              ))}
            </SimpleGrid>
          ) : (
            <>
              {beranda && beranda.length > 0 ? (
                <SimpleGrid
                  columns={{ base: 2, md: 3, lg: 5 }}
                  spacing={"15px"}
                >
                  {beranda.map((p: Beranda, index) => (
                    <Box
                      key={p.id}
                      position="relative"
                      cursor="pointer"
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={() => handleMouseLeave(index)}
                      title={p.name}
                      onClick={() => router.push(`/tenant-detail/${p.slug}`)}
                    >
                      <Box
                        minW={{ base: "150px", md: "180px" }}
                        w={"full"}
                        rounded="xl"
                        borderWidth={"1px"}
                        shadow="md"
                        height={{
                          base: "80px",
                          sm: "80px",
                          md: "100px",
                          lg: "100px",
                        }}
                        transition="background-color 0.3s ease"
                        filter={
                          isHovered[index]
                            ? "brightness(100%)"
                            : "brightness(60%)"
                        }
                        bg={
                          isHovered[index]
                            ? "white"
                            : `url(${p.image_banner_url || "/img/tenant-banner-default.jpg"}) center/cover no-repeat`
                        }
                      ></Box>
                      <Center
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        zIndex="1"
                      >
                        <Image
                          className="module-inside"
                          src={p.image_url || "/img/tenant-logo-default.png"}
                          alt="Slide"
                          height={{
                            base: "40px",
                            sm: "40px",
                            md: "60px",
                            lg: "60px",
                          }}
                          fit={"cover"}
                          // shadow="md"
                        />
                      </Center>
                    </Box>
                  ))}
                </SimpleGrid>
              ) : (
                <Box textAlign="center" py={10} px={6}>
                  <Heading
                    display="inline-block"
                    as="h2"
                    size="2xl"
                    bgGradient="linear(to-r, red.400, red.600)"
                    backgroundClip="text"
                  >
                    404
                  </Heading>
                  <Text fontSize="18px" mt={3} mb={2}>
                    Not Found
                  </Text>
                  <Text color={"gray.500"} mb={6}>
                    Mungkin saja karena sudah dihapus atau belum dibuat. Coba
                    hubungi admin untuk info lebih lanjut atau kembali ke Home.
                  </Text>

                  <NextLink href={`${process.env.APP_URL}`} passHref>
                    <Button
                      colorScheme="red"
                      bgGradient="linear(to-r, red.400, red.500, red.600)"
                      color="white"
                      variant="solid"
                    >
                      Kembali ke Beranda
                    </Button>
                  </NextLink>
                </Box>
              )}
            </>
          )}
        </Stack>
      </Container>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Tenant), {
  ssr: false,
  // suspense: true,
  loading: () => <Loading />,
});
