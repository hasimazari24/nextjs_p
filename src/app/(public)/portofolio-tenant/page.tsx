"use client";

import React, {useState} from 'react';
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
} from "@chakra-ui/react";

function page() {
    const cards = [
    {
        title: "Garena",
        text: "Perusahaan teknologi Asia yang berfokus pada game, e-sports, dan solusi digital, memimpin industri hiburan digital dengan inovasi dan dampak global.",
        image:
        "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        logo: "https://cdn-icons-png.flaticon.com/512/1907/1907675.png",
        link: "/portolio-detail",
    },
    {
        title: "Shopee",
        text: "Platform e-commerce terkemuka di Asia Tenggara, menyediakan berbagai produk dan layanan dengan fokus pada pengalaman belanja online yang inovatif..",
        image:
        "https://plus.unsplash.com/premium_photo-1661774910035-05257f7d73a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
        logo: "https://cdn-icons-png.flaticon.com/512/1538/1538293.png",
        link: "/portolio-detail",
    },
    {
        title: "Tokopedia",
        text: "Platform e-commerce besar di Indonesia, yang menawarkan beragam produk dan layanan dengan penekanan pada pengalaman belanja yang inklusif.",
        image:
        "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
        logo: "https://cdn-icons-png.flaticon.com/512/12053/12053266.png",
        link: "/portolio-detail",
    },
    {
        title: "Tokopedia 2",
        text: "Platform e-commerce besar di Indonesia, yang menawarkan beragam produk dan layanan dengan penekanan pada pengalaman belanja yang inklusif.",
        image:
        "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
        logo: "https://cdn-icons-png.flaticon.com/128/11940/11940420.png",
        link: "/portolio-detail",
    },
    {
        title: "Tokopedia 3",
        text: "Platform e-commerce besar di Indonesia, yang menawarkan beragam produk dan layanan dengan penekanan pada pengalaman belanja yang inklusif.",
        image:
        "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
        logo: "https://cdn-icons-png.flaticon.com/128/11722/11722397.png",
        link: "/portolio-detail",
    },
    {
        title: "Tokopedia 4",
        text: "Platform e-commerce besar di Indonesia, yang menawarkan beragam produk dan layanan dengan penekanan pada pengalaman belanja yang inklusif.",
        image:
        "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
        logo: "https://cdn-icons-png.flaticon.com/128/11940/11940446.png",
        link: "/portolio-detail",
    },
    {
        title: "Tokopedia 5",
        text: "Platform e-commerce besar di Indonesia, yang menawarkan beragam produk dan layanan dengan penekanan pada pengalaman belanja yang inklusif.",
        image:
        "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
        logo: "https://cdn-icons-png.flaticon.com/128/11134/11134906.png",
        link: "/portolio-detail",
    },
    {
        title: "Tokopedia 6",
        text: "Platform e-commerce besar di Indonesia, yang menawarkan beragam produk dan layanan dengan penekanan pada pengalaman belanja yang inklusif.",
        image:
        "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
        logo: "https://cdn-icons-png.flaticon.com/128/10988/10988039.png",
        link: "/portolio-detail",
    },
    ];

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
          <SimpleGrid columns={{ base: 2, md:3, lg: 5 }} spacing={"15px"}>
            {cards.map((image, index) => (
              <Box
                key={index}
                position="relative"
                cursor="pointer"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <Box
                  w={{ base:"150px", md:"200px" }}
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
                    isHovered[index] ? "brightness(100%)" : "brightness(60%)"
                  }
                  bg={
                    isHovered[index]
                      ? "white"
                      : `url(${image.image}) center/cover no-repeat`
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
                    src={image.logo}
                    alt="Slide"
                    height={{
                      base: "40px",
                      sm: "40px",
                      md: "60px",
                      lg: "60px",
                    }}
                    fit={"cover"}
                    shadow="md"
                    // filter={
                    //   isHovered[index] ? "brightness(100%)" : "brightness(150%)"
                    // }
                  />
                </Center>
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </div>
  );
}

export default page