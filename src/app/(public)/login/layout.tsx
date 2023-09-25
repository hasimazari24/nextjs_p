"use client";

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Center,
  Spinner,
  Box,
  useColorModeValue,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";
// import { FaRegCircleUser } from "react-icons/fa6";
import { useAuth } from "../../components/utils/AuthContext";
// import Bg_Stp from "../components/img/bg-stp.jpg";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { useState } from "react";

export const metadata = {
  title: process.env.APP_NAME,
  description: process.env.APP_DESCRIPTION,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, loadingValidation } = useAuth();
  const router = useRouter();

  // const [loadingValidation, setLoadingValidation] = useState<boolean>(false);

  if (user !== null && user !== 401) {
    router.push("/dashboard");
  }

  return (
    <>
      {loadingValidation ? (
        <Center h="100%" m="10">
          <Spinner className="spinner" size="xl" color="blue.500" />
        </Center>
      ) : (
        <Box
          position={"relative"}
          // // bgImage={`url('${Bg_Stp.src}')`}
          // backgroundImage="url('/img/bg-stp.jpg')"
          // backgroundSize="cover"
          // backgroundRepeat="no-repeat"
          // backgroundPosition="center"
          // // w="100vw"
          // h="100vh"
        >
          <Container
            as={SimpleGrid}
            maxW={"7xl"}
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 10, lg: 32 }}
            py={{ base: 10, sm: 20, lg: 32 }}
          >
            <Stack
              // bg={"gray.50"}
              bgColor="rgba(231, 231, 231, 0.5)"
              rounded={"xl"}
              p={{ base: 4, sm: 6, md: 8 }}
              spacing={{ base: 8 }}
              justifyContent="right"
              maxW="md"
            >
              <Stack align={"center"}>
                {/* <FaRegCircleUser fontSize="3.5rem" /> */}
                <Heading fontSize={"4xl"}>SELAMAT DATANG</Heading>
                <Text fontSize={"lg"} color={"gray.600"}>
                  Silahkan login terlebih dahulu
                </Text>
              </Stack>
              <Box
                rounded={"lg"}
                // w="52vh"
                bg={useColorModeValue("white", "gray.700")}
                boxShadow={"lg"}
                p={8}
              >
                {children}
              </Box>
            </Stack>
            {/* <Stack spacing={{ base: 10, md: 20 }}></Stack> */}
          </Container>
        </Box>
      )}
    </>
  );
}