"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css";
import {
  Box,
  Flex,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { usePublic } from "../utils/PublicContext";

interface tenantBeranda {
  id: string;
  name: string;
  motto: string;
  image_url: string;
  image_banner_url: string;
}
export default function GallerySlider() {
  // init state untuk menampilkan slide yg aktif
  const [activeSlide, setActiveSlide] = useState(0);
  // init state data cards
  // const [cards, setCards] = useState<Array<tenantBeranda>>([]);
  const { beranda, loadingBeranda } = usePublic();
  const cards = beranda || [];
  // untuk jumlah yang tayang ngaturnya disini aja ya bos
  const SLIDES_TO_SHOW = cards.length <= 5 ? cards.length : 5;
  // jika datanya kurang dari 3 maka state nya false., biar card nya gk dobel
 const infinite = cards.length >= SLIDES_TO_SHOW && cards.length >= 5;
  // style untuk box jika tampilan data kosong dan juga sebagai fallback (loading..)
  const boxStyles = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    textShadow: "0 0 20px black",
    fontWeight: "bold",
    fontSize: "20px",
    background: `url("/img/tenant-banner-default.jpg") center/cover no-repeat`,
  };
  // setting untuk slider
  const sliderSettings = {
    className: "center",
    infinite: true,
    speed: 500,
    slidesToShow: cards.length <= 5 ? cards.length : 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: true,
    focusOnSelect: true,
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 4000,
    variableWidth: cards.length <= 3 ? true : false,
    afterChange: (index: number) => {
      // console.log(`index ke-${index}`);
      setActiveSlide(index);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: cards.length <= 3 ? cards.length : 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: cards.length <= 3 ? cards.length : 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: cards.length <= 2 ? cards.length : 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // console.log(cards);
  // console.log(`active slide : ${activeSlide}`);
  // console.log(`SLIDES_TO_SHOW : ${SLIDES_TO_SHOW}`);
  // console.log(`varwidth : ${cards.length <= 3 ? true : false}`);

  return loadingBeranda ? (
    <Box
      sx={boxStyles}
      filter="grayscale(80%)"
      height={{
        base: "400px",
        sm: "400px",
        md: "600px",
        lg: "600px",
      }}
    >
      <Center h="100%" m="10" flexDirection={"column"}>
        <Spinner className="spinner" size="xl" color="blue.500" />
        <Text>Sedang memuat data</Text>
      </Center>
    </Box>
  ) : (
    <>
      {cards && cards.length > 0 ? (
        <>
          <div>
            <Box
              position={"relative"}
              height={{
                base: "400px",
                sm: "400px",
                md: "600px",
                lg: "600px",
              }}
              width={"100%"}
              overflow={"hidden"}
            >
              <Box
                key={activeSlide}
                height={{
                  base: "400px",
                  sm: "400px",
                  md: "600px",
                  lg: "600px",
                }}
                width={"100%"}
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                backgroundImage={`url(${cards[activeSlide]?.image_banner_url})`}
                filter="auto"
                brightness="60%"
              />
              <Stack align="center" justify="center">
                <Box
                  w={"auto"}
                  maxW={"lg"}
                  position="absolute"
                  top={{ base: "15%", md: "20%" }}
                  transform="translate(0, -20%)"
                  color={"white"}
                  p="3"
                >
                  <Heading
                    fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                    textAlign="center"
                    mb="4"
                  >
                    {cards[activeSlide]?.name}
                  </Heading>
                  <Text
                    fontSize={{ base: "md", lg: "lg" }}
                    textAlign="center"
                    mb="4"
                  >
                    {cards[activeSlide]?.motto}
                  </Text>
                  <Box>
                    <Center>
                      <Link
                        href={`portfolio-detail?id=${cards[activeSlide]?.id}`}
                      >
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
                      </Link>
                    </Center>
                  </Box>
                </Box>
              </Stack>
              <Box mt={{ base: "-130px", md: "-200px" }}>
                <Slider {...sliderSettings}>
                  {cards &&
                    cards.map((card, index) => (
                      <Box
                        className="slick-slider"
                        key={index}
                        width={{
                          base: "auto",
                          sm: "150px",
                          md: "280px",
                          lg: "280px",
                        }}
                        minW={{
                          base: "100px",
                          sm: "150px",
                          md: "280px",
                          lg: "280px",
                        }}
                        // width={"200px"}
                        height={"auto"}
                        // style={{ width: 100, height: "auto" }}
                      >
                        <Center>
                          <Image
                            src={card.image_url}
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
        </>
      ) : (
        <Flex
          height={{
            base: "400px",
            sm: "400px",
            md: "600px",
            lg: "600px",
          }}
          flexWrap="wrap"
          gap="24px"
          justifyContent="space-evenly"
        >
          {/* adding filter property to the element */}
          <Box sx={boxStyles} filter="grayscale(80%)">
            Belum ada data.
          </Box>
        </Flex>
      )}
    </>
  );
}
