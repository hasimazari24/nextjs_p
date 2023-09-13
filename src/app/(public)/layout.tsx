"use client";

import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  Center,Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useAuth } from "../components/AuthContext";
import { useRouter } from "next/navigation";

export const metadata = {
  title: process.env.APP_NAME,
  description: process.env.APP_DESCRIPTION,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, loadingValidation } = useAuth();
  const router = useRouter();

  if (user !== null && user !== 401) {
    router.push("/");
  }
  
  return (
    <main>
      {loadingValidation ? (
        <Center h="100%" m="10">
          <Spinner className="spinner" size="xl" color="blue.500" />
        </Center>
      ) : (
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack spacing={8} maxW={"lg"} py={6} px={6} align={"center"}>
            <Stack align={"center"}>
              <FaRegCircleUser fontSize="3.5rem" />
              <Heading fontSize={"4xl"}>SELAMAT DATANG</Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                Silahkan login terlebih dahulu
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              w="52vh"
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              {children}
            </Box>
          </Stack>
        </Flex>
      )}
    </main>
  );
}
