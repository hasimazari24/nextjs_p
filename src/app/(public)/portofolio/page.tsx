"use client";

import React, { useState } from "react";
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
  Link,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
  Img,
  Center,
  Wrap,
  WrapItem,
  SimpleGrid,
  Spinner
} from "@chakra-ui/react";
import { usePublic } from "../utils/PublicContext";

interface Beranda {
  id: string;
  name: string;
  motto: string;
  image_url: string;
  image_banner_url: string;
}

function page() {
  const { beranda, getPortofolioDetail, loadingBeranda } = usePublic();
  // console.log(beranda);

  const [isHovered, setIsHovered] = useState<{ [key: number]: boolean }>({});

  const handleMouseEnter = (index: number) => {
    setIsHovered((prevState) => ({ ...prevState, [index]: true }));
  };

  const handleMouseLeave = (index: number) => {
    setIsHovered((prevState) => ({ ...prevState, [index]: false }));
  };

  return (
    <div>
      <Container maxW={"7xl"}>
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
              Portofolio
            </Heading>
          </Stack>

          {loadingBeranda ? (
            <Center h="100%" m="10">
              <Spinner className="spinner" size="xl" color="blue.500" />
            </Center>
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
                    >
                      <Box
                        w={{ base: "150px", md: "200px" }}
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
                            : `url(${p.image_banner_url}) center/cover no-repeat`
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
                          src={p.image_url}
                          alt="Slide"
                          height={{
                            base: "40px",
                            sm: "40px",
                            md: "60px",
                            lg: "60px",
                          }}
                          fit={"cover"}
                          shadow="md"
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

                  <Link href={process.env.APP_URL}>
                    <Button
                      colorScheme="red"
                      bgGradient="linear(to-r, red.400, red.500, red.600)"
                      color="white"
                      variant="solid"
                    >
                      Kembali ke Beranda
                    </Button>
                  </Link>
                </Box>
              )}
            </>
          )}
        </Stack>
      </Container>
    </div>
  );
}

export default page;
