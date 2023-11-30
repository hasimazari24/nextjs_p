"use client";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  Image,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";
import Loading from "./loading";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/utils/AuthContext";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import { FindDefaultRoute } from "@/app/components/utils/FindDefaultRoute";

function PageKuesioner() {
  const router = useRouter();
  const { user } = useAuth();
  let getUser: any | null = null; // Inisialisasikan getUser di sini

  if (user !== null && user !== 401) {
    getUser = user; // Setel nilai getUser jika user ada
  }

  const { setBreadcrumbs } = useBreadcrumbContext();
  const getForCrumbs: any = FindDefaultRoute();
  React.useEffect(() => {
    if (getForCrumbs) setBreadcrumbs(getForCrumbs);
  }, []);

  return (
    <Stack spacing={{ base: 4, md: 6 }}>
      <Flex
        justifyContent={"space-between"}
        pb="2"
        direction={["column", "row"]}
      >
        <Heading fontSize={"2xl"}>DATA KUESIONER</Heading>
      </Flex>
      <Center>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, xl: 4 }}
          //   columns={
          //     getUser.role === "Super Admin" || getUser.role === "Manajemen"
          //       ? { base: 1, sm: 2, xl: 3 }
          //       : { base: 1, sm: 2 }
          //   }
          alignItems={"center"}
          justifyItems={"center"}
          // maxW="700px"
          w="fit-content"
          spacing={{ base: 6, md: 8 }}
        >
          {/* DAFTAR PERTANYAAN */}
          <Stack
            alignItems={"center"}
            spacing={3}
            maxW={{
              base: "15rem",
              sm: "13rem",
              // md: "15rem",
              xl: "17rem",
            }}
            w="full"
            h="full"
            p={6}
            boxShadow={"lg"}
            rounded={"2xl"}
            bgColor={"gray.50"}
            cursor={"pointer"}
            onClick={() => router.push("kuesioner/daftar")}
          >
            <Box>
              <Image
                maxH={{
                  base: "11rem",
                  sm: "7rem",
                  // md: "7rem",
                  lg: "11rem",
                  xl: "13rem",
                }}
                objectFit={"cover"}
                src={"/img/daftar-pertanyaan.png"}
                alt="#"
              />
            </Box>
            <Text
              as="b"
              fontWeight={"bold"}
              fontSize={{ base: "15.5px", md: "17.5px" }}
              textAlign={"center"}
            >
              DAFTAR PERTANYAAN
            </Text>
            <Text
              // as="b"
              // fontWeight={"bold"}
              textAlign={"center"}
            >
              Daftar Pertanyaan untuk dibuat grup.
            </Text>
          </Stack>

          {/* DAFTAR GROUP */}
          <Stack
            alignItems={"center"}
            spacing={3}
            cursor={"pointer"}
            maxW={{
              base: "15rem",
              sm: "13rem",
              // md: "15rem",
              xl: "17rem",
            }}
            w="full"
            h="full"
            p={6}
            boxShadow={"lg"}
            rounded={"2xl"}
            bgColor={"gray.50"}
            onClick={() => router.push("kuesioner/grup")}
          >
            <Box>
              <Image
                maxH={{
                  base: "11rem",
                  sm: "7rem",
                  // md: "7rem",
                  lg: "11rem",
                  xl: "13rem",
                }}
                objectFit={"cover"}
                src={"/img/group-pertanyaan.png"}
                alt="#"
              />
            </Box>
            <Text
              as="b"
              fontWeight={"bold"}
              fontSize={{ base: "15.5px", md: "17.5px" }}
              textAlign={"center"}
            >
              GRUP PERTANYAAN
            </Text>
            <Text
              // as="b"
              // fontWeight={"bold"}
              textAlign={"center"}
            >
              Daftar Group Pertanyaan untuk dibuat kuesioner.
            </Text>
          </Stack>

          {/* DAFTAR GROUP */}
          <Stack
            alignItems={"center"}
            spacing={3}
            maxW={{
              base: "15rem",
              sm: "13rem",
              // md: "15rem",
              xl: "17rem",
            }}
            w="full"
            h="full"
            p={6}
            boxShadow={"lg"}
            rounded={"2xl"}
            bgColor={"gray.50"}
            cursor={"pointer"}
            onClick={() => router.push("kuesioner/kelola")}
          >
            <Box>
              <Image
                maxH={{
                  base: "11rem",
                  sm: "7rem",
                  // md: "7rem",
                  lg: "11rem",
                  xl: "13rem",
                }}
                objectFit={"cover"}
                src={"/img/kelola-kuesioner.png"}
                alt="#"
              />
            </Box>
            <Text
              as="b"
              fontWeight={"bold"}
              fontSize={{ base: "15.5px", md: "17.5px" }}
              textAlign={"center"}
            >
              KELOLA KUESIONER
            </Text>
            <Text
              // as="b"
              // fontWeight={"bold"}
              textAlign={"center"}
            >
              Daftar Kuesioner yang dikelola untuk responden.
            </Text>
          </Stack>

          {/* DAFTAR GROUP */}
          <Stack
            alignItems={"center"}
            spacing={3}
            maxW={{
              base: "15rem",
              sm: "13rem",
              // md: "15rem",
              xl: "17rem",
            }}
            h="full"
            p={6}
            boxShadow={"lg"}
            rounded={"2xl"}
            bgColor={"gray.50"}
            cursor={"pointer"}
            onClick={() => router.push("kuesioner/review")}
          >
            <Box>
              <Image
                maxH={{
                  base: "11rem",
                  sm: "7rem",
                  // md: "7rem",
                  lg: "11rem",
                  xl: "13rem",
                }}
                objectFit={"cover"}
                src={"/img/review-kuesioner.png"}
                alt="#"
              />
            </Box>
            <Text
              as="b"
              fontWeight={"bold"}
              fontSize={{ base: "15.5px", md: "17.5px" }}
              textAlign={"center"}
            >
              REVIEW KUESIONER
            </Text>
            <Text
              // as="b"
              // fontWeight={"bold"}
              textAlign={"center"}
            >
              Melihat Hasil Kuesioner dari Responden.
            </Text>
          </Stack>
        </SimpleGrid>
      </Center>
    </Stack>
  );
}

export default dynamic(() => Promise.resolve(PageKuesioner), {
  ssr: false,
  // suspense: true,
  loading: () => <Loading />,
});
