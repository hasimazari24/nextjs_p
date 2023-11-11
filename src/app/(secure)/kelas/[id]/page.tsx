"use client";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { MdArrowBackIosNew, MdOutlinePeople } from "react-icons/md";
import { HiOutlineNewspaper } from "react-icons/hi";
import {
  Box,
  Button,
  HStack,
  Stack,
  Image,
  VStack,
  Text,
  Avatar,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TagLeftIcon,
  useTab,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import TenantKelas from "./partisipan/tenant-kelas";
import SesiKelas from "./sesi-kelas/sesi-kelas";
import { useRouter, notFound } from "next/navigation";
import * as ClassInfo from "@/app/type/class-type.d";
import Loading from "../loading";
import { axiosCustom } from "@/app/api/axios";
import NotFound from "@/app/components/template/NotFound";
import useSession from "./api/api-masuk-kelas";
import ProfileMentor from "../pages/profileMentor";
import { useAuth } from "@/app/components/utils/AuthContext";
import { isJSDocNullableType } from "typescript";

function page({ params }: { params: { id: string } }) {
  const getParamsId = params.id;
  if ((getParamsId && getParamsId.length === 0) || !getParamsId) {
    return notFound();
  }
  const router = useRouter();

  const { user } = useAuth();
  let getUser: any = null; // Inisialisasikan getUser di sini

  if (user !== null && user !== 401) {
    getUser = user; // Setel nilai getUser jika user ada
  }

  const session = useSession();

  const InitalState: {
    isLoading: boolean;
    dataClass: ClassInfo.classHeading | null;
    dataPartisipan: ClassInfo.Partisipan | null;
    dataSesi: ClassInfo.Sesi | null;
  } = {
    isLoading: true,
    dataClass: null,
    dataPartisipan: null,
    dataSesi: null,
  };
  const [state, setState] = useState(InitalState);

  useEffect(() => {
    const getAll = async () => {
      try {
        const dataPartisipan = await session.getPartisipan(getParamsId);
        const dataSesi = await session.getSesi(getParamsId);
        const dataClass = await session.getClassHeading(getParamsId);

        setState({
          isLoading: false,
          dataClass,
          dataPartisipan,
          dataSesi,
        });
      } catch (error) {
        console.error(error);
      }
    };
    getAll();
  }, []);

  // console.log(sesiKelas?.item);

  return state.isLoading ? (
    <Loading />
  ) : state.dataClass ? (
    <Stack spacing={6}>
      <Flex
        flexDirection={{ base: "column-reverse", md: "row" }} // Arah tata letak berdasarkan layar
        justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
        align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
      >
        <HStack w="full" spacing={6} alignItems="flex-start" mr={2}>
          <Image
            // rounded={{ base: "xl", lg: "3xl" }}
            // height={{
            //   base: "118px",
            //   sm: "126px",
            //   md: "158px",
            //   xl: "250px",
            // }}
            //   maxH={{
            //     base: "200px",
            //     // sm: "126px",
            //     sm: "120px",
            //     lg: "190px",
            //     xl: "220px",
            //   }}
            // maxW={"13rem"}
            maxW={{
              base: "7rem",
              // sm: "9rem",
              md: "9rem",
              // lg: "11rem",
              xl: "10rem",
            }}
            objectFit={"cover"}
            src={"/img/class-avatar.png"}
            alt="#"
            // boxShadow={"xl"}
          />
          <VStack spacing={2} align="flex-start">
            <Text as="b" fontWeight={"bold"} fontSize={["17px", "xl", "2xl"]}>
              {state.dataClass?.name}
            </Text>
            <Text fontSize={["sm", "md"]} fontWeight={"thin"} color="gray.700">
              Dibuat : {state.dataClass?.created_at}
            </Text>
            <ProfileMentor mentor={state.dataClass?.mentor || null} />
          </VStack>
        </HStack>
        <Button
          leftIcon={<MdArrowBackIosNew />}
          colorScheme="blue"
          variant="outline"
          aria-label="btn-email"
          size={"sm"}
          mb={6}
          onClick={() => router.push("/kelas")}
        >
          Kembali
        </Button>
      </Flex>

      <Box>
        <Text
          textAlign="justify"
          dangerouslySetInnerHTML={{
            __html: state.dataClass ? state.dataClass.description : "",
          }}
        />
      </Box>

      <Tabs variant="unstyled">
        <TabList justifyContent="center">
          <HStack spacing={{ base: 6, md: 10 }}>
            <Tab
              _selected={{
                background: "blue.500",
                color: "white",
                rounded: "10",
              }}
              _focus={{ boxShadow: "none" }}
              style={{ outline: "blue.500" }}
              aria-label="tenant-kelas"
              shadow={{ base: "xl", md: "2xl" }}
            >
              <HStack
                spacing={{ base: 1, md: 2 }}
                px={{ base: 0, md: 6 }}
                fontSize={{ base: "md", lg: "lg" }}
              >
                <MdOutlinePeople />
                <Text>Tenant</Text>
              </HStack>
            </Tab>
            <Tab
              _selected={{
                background: "blue.500",
                color: "white",
                rounded: "10",
                shadow: "",
              }}
              _focus={{ boxShadow: "none" }}
              style={{ outline: "blue.500" }}
              aria-label="sesi-kelas"
              shadow={{ base: "xl", md: "2xl" }}
            >
              <HStack
                fontSize={{ base: "md", lg: "lg" }}
                spacing={{ base: 1, md: 2 }}
                px={{ base: 0, md: 6 }}
              >
                <HiOutlineNewspaper />
                <Text>Sesi Kelas</Text>
              </HStack>
            </Tab>
          </HStack>
        </TabList>
        <TabPanels>
          <TabPanel pt={6} px={0} pb={0}>
            <TenantKelas />
          </TabPanel>
          <TabPanel pt={6} px={0} pb={0}>
            <SesiKelas
              sesi={state?.dataSesi}
              idKelas={getParamsId}
              roleAccess={getUser?.role}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  ) : (
    <NotFound
      statusCode={404}
      msg="Not Found"
      statusDesc="Halaman tidak ditemukan. Periksa kembali URL Halaman yang anda kunjungi atau kembali ke halaman kelas."
      backToHome="/kelas"
    />
  );
}

export default page;
