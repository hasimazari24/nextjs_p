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
  Center,
  VStack,
  Avatar,
  IconProps,
  useColorModeValue,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import Awards from "../../template/AwardTenant";
import DetailComponent from "./DetaillTenant";
import DetailSocial from "./DetailSocial";
import TeamTenant from "../TeamTenant";

import { IoMedal, IoLogoFacebook } from "react-icons/io5";
import { FaMedal, FaInfo } from "react-icons/fa";
import { useMediaQuery } from "@chakra-ui/react";

export default function TenantDetail() {
  // const [isDesktop] = useMediaQuery("(min-width: 768px)");

  return (
    <Box w="full">
      {/* <Container maxW={"8xl"} px={{ base: 6, md: 20, "2xl": 55 }}> */}
      {/* <Stack> */}
      {/* <Center py={0}> */}
      <Stack
        align={"center"}
        //   spacing={{ base: 8, md: 10 }}
        // py={{ base: 5, md: 5 }}
        overflow={"hidden"}
      >
        <Box
          position={"relative"}
          height={{
            base: "200px",
            sm: "300px",
            md: "400px",
            lg: "500px",
          }}
          width={"100%"}
          overflow={"hidden"}
        >
          {/* Begron */}
          <Box
            backgroundImage="url('https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundPosition="center"
            aria-label="background-cover"
            position="absolute"
            filter="auto"
            brightness="60%"
            top={0}
            left={0}
            w={"100%"}
            h={"100%"}
          />

          {/* Tulisan */}
          <Stack align="center" justify="center">
            <VStack
              w={"auto"}
              maxW={"lg"}
              position="absolute"
              top={{ base: "15%", md: "20%", lg: "25%" }}
              // left={"50%"}
              transform="translate(0, -20%)"
              color={"white"}
              p="3"
              spacing={"3"}
            >
              <Heading
                fontSize={["2xl", "3xl", "5xl"]}
                fontWeight="bold"
                textAlign="center"
                style={{
                  lineHeight: "1.1",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                }}
              >
                Tokopedia Indonesia
              </Heading>
              <Text
                fontSize={{ base: "14px", md: "lg", lg: "xl" }}
                textAlign="center"
                fontWeight="reguler"
                color="white"
                style={{
                  lineHeight: "1.2",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                }}
              >
                Supaya silaturahmi tidak terputus, Pinjam Dulu Seratus. Tetapi
                alangkah baiknya Limaratus
              </Text>
              <HStack>
                <Text
                  fontSize={{ base: "14px", md: "lg", lg: "lg" }}
                  fontWeight="reguler"
                  color="white"
                  style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)" }}
                >
                  Level Tenant :{" "}
                  <Text as="b" color="red.300">
                    Inkubasi
                  </Text>
                </Text>
              </HStack>
            </VStack>
          </Stack>
        </Box>
        <Flex
          justify={"center"}
          // mt={[-24, -36, -40]}
          mt={{ base: "-20%", md: "-25%", lg: "-12%" }}
        >
          <Avatar
            boxSize={["120px", "150px", "300px"]}
            mb={6}
            src={
              "https://www.tagar.id/Asset/uploads2019/1575050504675-logo-tokopedia.jpg"
            }
            borderWidth={"10px"}
            borderColor={"grey.100"}
          />
        </Flex>
        {/* <Flex> */}
        <Stack
          spacing={4}
          p={10}
          bg={"url('/img/liquid-velvet.svg')center/cover no-repeat fixed"}
          justifyContent="center"
          w="full"
        >
          <VStack spacing={2}>
            <HStack justifyContent="center">
              <Box
                w={["20px", "30px"]}
                h={["20px", "30px"]}
                bg="white"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon
                  as={FaMedal}
                  w={["15px", "20px"]}
                  h={["15px", "20px"]}
                  color="red.500"
                />
              </Box>
              <Text fontWeight="bold" color="white" fontSize={["sm", "lg"]}>
                OUR ACHIEVEMENT
              </Text>
            </HStack>
          </VStack>
          <Stack
            // align={{ base: "start", md: "center" }}
            justify={{ base: "start", md: "center" }}
            spacing={['2','6']}
            direction={{ base: "column", md: "row" }}
          >
            <>
              <Awards></Awards>
              <Awards></Awards>
              <Awards></Awards>
            </>
          </Stack>
        </Stack>
        {/* </Flex> */}
        <Container maxW={"8xl"} px={{ base: 6, md: 20, "2xl": 55 }} my={'50px'}>
          <DetailComponent></DetailComponent>
        </Container>
        <Container maxW={"full"} px={'full'} my={'50px'} >
          <DetailSocial></DetailSocial>
        </Container>
        <TeamTenant></TeamTenant>
      </Stack>
      {/* </Center> */}
      {/* </Stack> */}
      {/* </Container> */}
    </Box>
  );
}
