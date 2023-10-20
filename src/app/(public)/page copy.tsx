"use client";

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
  AbsoluteCenter,
} from "@chakra-ui/react";
import GallerySlider from "./template/GallerySlider";
import Link from "next/link";
import SectionStp from "./template/SectionStp";
import React, { useEffect } from "react";

export default function CallToActionWithVideo() {
  const scrollToElement = (elementId: any) => {
    //isi nama element id yang menjadi target scroll
    const element = document.getElementById(elementId); // Ganti dengan ID elemen yang ingin Anda gulirkan
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleHashScrolling = () => {
    if (window.location.hash) {
      const elementId = window.location.hash.substring(1); // Menghilangkan karakter "#" dari hash
      scrollToElement(elementId);
    }
  };

  useEffect(() => {
    window.addEventListener("load", handleHashScrolling);
  }, []);

  return (
    <>
      <Container maxW={"7xl"} px={{ base: 6, md: 20, "2xl": 55 }}>
        <Stack
          align={"center"}
          spacing={{ base: 5, md: 10 }}
          py={{ base: 8, lg: 16 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack w={"full"} flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={500}
              fontSize={{ base: "xl", sm: "2xl", lg: "4xl" }}
            >
              <Box
                position={"absolute"}
                w={{ base: 34, md: 34, lg: 34 }}
                top={{ base: 80, md: 110, lg: 415 }}
                left={{ base: 30, md: 70, lg: 500 }}
                opacity={0.4}
                zIndex={-1}
              >
                <Image
                  src="/img/cloud-backup-svgrepo-com.svg"
                  alt="svg"
                ></Image>
              </Box>

              <Box
                position={"absolute"}
                w={{ base: 39, md: 39, lg: 41 }}
                top={{ base: 140, md: 350, lg: 100 }}
                left={{ base: 290, md: 280, lg: 680 }}
                opacity={0.4}
                zIndex={-1}
              >
                <Image
                  src="/img/statistics-1-svgrepo-com.svg"
                  alt="svg"
                ></Image>
              </Box>

              <Box
                position={"absolute"}
                w={{ base: 38, md: 38, lg: 38 }}
                top={{ base: 245, md: 110, lg: 175 }}
                left={{ base: 210, md: 480, lg: 280 }}
                opacity={0.4}
                zIndex={-1}
              >
                <Image
                  src="/img/creativity-1-svgrepo-com.svg"
                  alt="svg"
                ></Image>
              </Box>

              <Box
                position={"absolute"}
                w={{ base: 38, md: 39, lg: 41 }}
                top={{ base: 550, md: 405, lg: 500 }}
                left={{ base: 235, md: 740, lg: 1000 }}
                opacity={0.4}
                zIndex={1}
              >
                <Image
                  src="/img/multi-select-svgrepo-com.svg"
                  alt="svg"
                ></Image>
              </Box>

              <Box
                position={"absolute"}
                w={{ base: 180, md: 245, lg: 305 }}
                top={{ base: 220, md: 175, lg: 35 }}
                left={{ base: 0, md: -35, lg: 730 }}
                opacity={0.1}
                zIndex={0}
              >
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern
                      id="fill"
                      viewBox="0,0,100,100"
                      width="10%"
                      height="5%"
                    >
                      <circle cx="50" cy="50" r="12.5" fill="DarkBlue"></circle>
                    </pattern>
                  </defs>
                  <path
                    d="M62.5,71.5Q25,93,25,50Q25,7,62.5,28.5Q100,50,62.5,71.5Z"
                    stroke="none"
                    stroke-width="0"
                    fill="url(#fill)"
                  ></path>
                </svg>
              </Box>

              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "30%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "red.400",
                  zIndex: -1,
                }}
              >
                {process.env.APP_NAME?.toUpperCase()}
              </Text>
              <br />
              <Text as={"span"} color={"red.400"}>
                {process.env.APP_DESCRIPTION?.toUpperCase()}
              </Text>
            </Heading>
            <Text color={"gray.800"} fontSize="20px">
              Pusat Pengelolaan dan Pemantauan Perkembangan Tenant di Solo
              Technopark.
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <Button
                // rounded={"full"}
                // size={"lg"}
                // fontWeight={"normal"}
                // px={6}
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                colorScheme={"gray"}
                bg={"gray.100"}
                _hover={{ bg: "gray.200" }}
                leftIcon={<PlayIcon h={4} w={4} color={"gray.400"} />}
                onClick={() => scrollToElement("PortofilioTenant")}
              >
                Get Started
              </Button>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Blob
              w={"100%"}
              h={"150%"}
              position={"absolute"}
              top={"-25%"}
              left={0}
              zIndex={-1}
              color={useColorModeValue("red.50", "red.400")}
            />
            <Image
              alt={"STP"}
              style={{ objectFit: "contain" }}
              // fit={"cover"}
              w={"100%"}
              h={{ base: "330px", sm: "330px", md: "400px", lg: "400px" }}
              src="/img/gb-stp.png"
            />
          </Flex>
        </Stack>
      </Container>
      <Box bg={useColorModeValue("gray.100", "gray.400")}>
        {/* <Container maxW={"7xl"}>
          <Stack
            // align={"center"}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 10, md: 10 }}
            direction={{ base: "column", md: "row" }}
          >
            <Stack w={"full"} flex={1} spacing={{ base: 5, md: 10 }}>
              <Heading
                lineHeight={1.2}
                fontWeight={500}
                fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}
                textAlign={"center"}
              >
                All Tenants
              </Heading>
            </Stack>
          </Stack>
        </Container> */}
        <Box id="PortofilioTenant">
          <GallerySlider />
        </Box>
      </Box>
      <Box>
        <SectionStp />
      </Box>
    </>
  );
}

const PlayIcon = createIcon({
  displayName: "PlayIcon",
  viewBox: "0 0 58 58",
  d: "M28.9999 0.562988C13.3196 0.562988 0.562378 13.3202 0.562378 29.0005C0.562378 44.6808 13.3196 57.438 28.9999 57.438C44.6801 57.438 57.4374 44.6808 57.4374 29.0005C57.4374 13.3202 44.6801 0.562988 28.9999 0.562988ZM39.2223 30.272L23.5749 39.7247C23.3506 39.8591 23.0946 39.9314 22.8332 39.9342C22.5717 39.9369 22.3142 39.8701 22.0871 39.7406C21.86 39.611 21.6715 39.4234 21.5408 39.1969C21.4102 38.9705 21.3421 38.7133 21.3436 38.4519V19.5491C21.3421 19.2877 21.4102 19.0305 21.5408 18.8041C21.6715 18.5776 21.86 18.3899 22.0871 18.2604C22.3142 18.1308 22.5717 18.064 22.8332 18.0668C23.0946 18.0696 23.3506 18.1419 23.5749 18.2763L39.2223 27.729C39.4404 27.8619 39.6207 28.0486 39.7458 28.2713C39.8709 28.494 39.9366 28.7451 39.9366 29.0005C39.9366 29.2559 39.8709 29.507 39.7458 29.7297C39.6207 29.9523 39.4404 30.1391 39.2223 30.272Z",
});

const Blob = (props: IconProps) => {
  return (
    <Icon
      width={"100%"}
      viewBox="0 0 590 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};
