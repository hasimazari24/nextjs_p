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

function PageNilaiMentor() {
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
        <Heading fontSize={"2xl"}>NILAI MENTOR</Heading>
      </Flex>
      <Center>
        <SimpleGrid
          // templateColumns={{
          //   base: "1fr",
          //   sm: "1fr 1fr",
          //   xl: "1fr 1fr 1fr",
          //   //   xl: "1fr 1fr 1fr",
          // }}
          columns={{ base: 1, sm: 2 }}
          alignItems={"center"}
          justifyItems={"center"}
          // maxW="700px"
          w="fit-content"
          spacing={{ base: 6, sm: 8, lg: 10 }}
        >
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            spacing={3}
            maxW={{
              base: "17rem",
              sm: "15rem",
              md: "17rem",
              xl: "19rem",
            }}
            w="full"
            h="full"
            p={6}
            boxShadow={"lg"}
            rounded={"2xl"}
            bgColor={"gray.50"}
            cursor={"pointer"}
            onClick={() => router.push("/penilaian/mentor/daftarpertanyaan")}
          >
            <Box>
              <Image
                maxH={{
                  base: "13rem",
                  sm: "9rem",
                  md: "11rem",
                  lg: "13rem",
                  xl: "15rem",
                }}
                objectFit={"cover"}
                src={"/img/nilai-tenant.png"}
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
              Daftar pertanyaan untuk Tenant menilai Mentor.
            </Text>
          </Stack>
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            spacing={3}
            maxW={{
              base: "17rem",
              sm: "15rem",
              md: "17rem",
              xl: "19rem",
            }}
            w="full"
            h="full"
            p={6}
            boxShadow={"lg"}
            rounded={"2xl"}
            bgColor={"gray.50"}
            cursor={"pointer"}
            onClick={() => router.push("/penilaian/mentor/hasilpenilaian")}
          >
            <Box>
              <Image
                maxH={{
                  base: "13rem",
                  sm: "9rem",
                  md: "11rem",
                  lg: "13rem",
                  xl: "15rem",
                }}
                objectFit={"cover"}
                src={"/img/nilai-tenant.png"}
                alt="#"
              />
            </Box>
            <Text
              as="b"
              fontWeight={"bold"}
              fontSize={{ base: "15.5px", md: "17.5px" }}
              textAlign={"center"}
            >
              HASIL PENILAIAN
            </Text>
            <Text
              // as="b"
              // fontWeight={"bold"}
              textAlign={"center"}
            >
              Lihat hasil penilaian mentor oleh tenant.
            </Text>
          </Stack>
        </SimpleGrid>
      </Center>
    </Stack>
  );
}

export default dynamic(() => Promise.resolve(PageNilaiMentor), {
  ssr: false,
  // suspense: true,
  loading: () => <Loading />,
});
