"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css";
import {
  Box,
  Flex,
  Image,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Button,
  Container,
  Center,
  Fade,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

export default function GallerySlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  const sliderSettings = {
    className: "center",
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: true,
    focusOnSelect: true,
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 4000,
    afterChange: (index: number) => {
      setActiveSlide(index);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

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

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Box
        position={"relative"}
        height={{ base: "400px", sm: "400px", md: "600px", lg: "600px" }}
        width={"100%"}
        overflow={"hidden"}
      >
        <Box
          key={activeSlide}
          height={{ base: "400px", sm: "400px", md: "600px", lg: "600px" }}
          width={"100%"}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundImage={`url(${cards[activeSlide].image})`}
          filter="auto"
          brightness="60%"
        />
        <Stack align="center" justify="center">
          <Box
            w={"auto"}
            maxW={"lg"}
            position="absolute"
            top={{ base:"15%", md:"20%" }}
            transform="translate(0, -20%)"
            color={"white"}
            p="3"
          >
            <Heading
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              textAlign="center"
              mb="4"
            >
              {cards[activeSlide].title}
            </Heading>
            <Text fontSize={{ base: "md", lg: "lg" }} textAlign="center" mb="4">
              {cards[activeSlide].text}
            </Text>
            <Box>
              <Center>
                <Button
                  rounded={"full"}
                  size={"lg"}
                  _hover={{
                    bg: "blue.200",
                  }}
                  color={"white"}
                  fontWeight={"normal"}
                  variant="outline"
                >
                  Lihat Selengkapnya
                </Button>
              </Center>
            </Box>
          </Box>
        </Stack>
        <Box mt={{ base: "-130px", md: "-200px" }}>
          <Slider {...sliderSettings}>
            {cards.map((image, index) => (
              <Box
                className="slick-slider"
                key={index}
                height={"auto"}
                width="200px"
              >
                <Center>
                  <Image
                    src={image.logo}
                    alt="Slide"
                    height={{
                      base: "80px",
                      sm: "80px",
                      md: "100px",
                      lg: "100px",
                    }}
                    fit={"cover"}
                  />
                </Center>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    </div>
  );
}
