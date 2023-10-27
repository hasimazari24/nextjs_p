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
  Stack,
  Heading,
  Text,
  Button,
  Center,
  SlideFade,
  // Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
// import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// import { usePublic } from "../utils/PublicContext";
// import AlertBar from "../../components/modal/AlertBar";
// import { useRouter } from "next/navigation";
// import { axiosCustom } from "../../api/axios";

// interface tenantBeranda {
//   id: string;
//   name: string;
//   motto: string;
//   image_url: string;
//   image_banner_url: string;
// }

interface Tenant {
  id: string;
  name: string;
  motto: string;
  slug: string;
  level_tenant: string;
  image_url: string;
  image_banner_url: string;
}

interface GalleryProps {
  beranda: Tenant[];
}

const GallerySlider: React.FC<GalleryProps> = ({ beranda }) => {
  // const [loadingBeranda, setLoadingBeranda] = useState<boolean>(true);

  // const [isOpen, setIsOpen] = useState(false);
  // const [msg, setMsg] = useState("");
  // const [status, setstatus] = useState<
  //   "success" | "info" | "warning" | "error"
  // >("error");
  // init state untuk menampilkan slide yg aktif
  const [activeSlide, setActiveSlide] = useState(0);
  // init state data cards
  // const [cards, setCards] = useState<Array<tenantBeranda>>([]);
  // const { beranda, loadingBeranda } = usePublic();
  // const cards = await getBeranda();
  const cards = beranda || [];
  // untuk jumlah yang tayang ngaturnya disini aja ya bos
  // const SLIDES_TO_SHOW = cards.length <= 5 ? cards.length : 5;
  // jika datanya kurang dari 3 maka state nya false., biar card nya gk dobel
  // const infinite = cards.length >= SLIDES_TO_SHOW && cards.length >= 5;
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

  return (
    <>
      {cards && cards.length > 0 ? (
        <>
          <div>
            <Box
              position={"relative"}
              h={"100vh"}
              width={"100%"}
              overflow={"hidden"}
            >
              <Box
                key={activeSlide}
                h={"100vh"}
                width={"100%"}
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                backgroundImage={`url(${
                  cards[activeSlide]?.image_banner_url ||
                  "img/tenant-banner-default.jpg"
                })`}
                filter="auto"
                brightness="40%"
              />
              <Stack align="center" justify="center">
                <Box
                  w={"auto"}
                  maxW={"8xl"}
                  position="absolute"
                  top={{ base: "15%", md: "20%" }}
                  transform="translate(0, -20%)"
                  color={"white"}
                  p="3"
                >
                  <SlideFade in={true} offsetY="20px">
                    <Heading
                      fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                      fontWeight={"bold"}
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
                    <Text
                      fontSize={{ base: "14px", md: "lg", lg: "lg" }}
                      fontWeight="reguler"
                      textAlign="center"
                      mb="4"
                    >
                      Level Tenant :{" "}
                      <Text as="b" color="red.200">
                        {cards[activeSlide]?.level_tenant}
                      </Text>
                    </Text>

                    <Box>
                      <Center>
                        <Link
                          href={`/tenant-detail/${cards[activeSlide]?.slug}`}
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
                  </SlideFade>
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
                            src={
                              card.image_url || "/img/tenant-logo-default.png"
                            }
                            alt="Logo Tenant"
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
          h={"100vh"}
          flexWrap="wrap"
          gap="24px"
          justifyContent="space-evenly"
        >
          <Box sx={boxStyles} filter="grayscale(80%)">
            <SlideFade in={true} offsetY="20px">
              Belum ada data.
            </SlideFade>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default GallerySlider;
