"use client";
import { MdArrowBackIosNew, MdOutlinePeople } from "react-icons/md";
import { HiOutlineClipboardList, HiOutlineNewspaper } from "react-icons/hi";
import {
  Box,
  Button,
  HStack,
  Stack,
  Image,
  VStack,
  Text,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, notFound } from "next/navigation";
import * as ClassInfo from "@/app/type/class-type.d";
import Loading from "../../loading";
import { axiosCustom } from "@/app/api/axios";
import NotFound from "@/app/components/template/NotFound";
import { useAuth } from "@/app/components/utils/AuthContext";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import { ViewIcon } from "@chakra-ui/icons";
import Responden from "./components/Responden";
import Kuesioner from "./components/Kuesioner";

function page({ params }: { params: { id_kuesioner: string } }) {
  const getParamsId = params.id_kuesioner;
  if ((getParamsId && getParamsId.length === 0) || !getParamsId) {
    return notFound();
  }
  const router = useRouter();
  const { setBreadcrumbs, breadcrumbs } = useBreadcrumbContext();
  let getUser: any = null; // Inisialisasikan getUser di sini

  const InitalState: {
    isLoading: boolean;
    dataKuesioner: any | null;
  } = {
    isLoading: true,
    dataKuesioner: null,
  };
  const [state, setState] = useState(InitalState);

  useEffect(() => {
    const getAll = async () => {
      try {
        const response = await axiosCustom.get(
          `/kuesioner-tahunan/${getParamsId}`,
        );
        setState({
          isLoading: false,
          dataKuesioner: response.data.data,
        });
        // Membuat nilai baru
        const newValue = {
          name: response.data.data?.title,
          href: `/kuesioner/kelola/${getParamsId}`,
        };
        // Cek apakah nilai baru sudah ada dalam breadcrumbs
        const alreadyExists = breadcrumbs.some(
          (breadcrumb) =>
            JSON.stringify(breadcrumb) === JSON.stringify(newValue),
        );
        // Jika belum ada, tambahkan ke breadcrumbs
        if (!alreadyExists) {
          setBreadcrumbs([...breadcrumbs, newValue]);
        } else {
          const newBreadcrumbs = breadcrumbs.slice(0, breadcrumbs.length - 1);
          setBreadcrumbs(newBreadcrumbs);
        }
      } catch (error) {
        console.error(error);
        setState({
          isLoading: false,
          dataKuesioner: null,
        });
      }
    };
    getAll();
  }, [getParamsId]);

  return state.isLoading ? (
    <Loading />
  ) : state.dataKuesioner ? (
    <Suspense fallback={<Loading />}>
      <Stack spacing={6}>
        <Flex
          flexDirection={{ base: "column-reverse", md: "row" }} // Arah tata letak berdasarkan layar
          justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
          align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
        >
          <HStack w="full" spacing={6} alignItems="flex-start" mr={2}>
            <Image
              maxW={{
                base: "7rem",
                // sm: "9rem",
                md: "9rem",
                // lg: "11rem",
                xl: "10rem",
              }}
              objectFit={"cover"}
              src={"/img/kelola-kuesioner-detail.png"}
              alt="#"
              // boxShadow={"xl"}
            />
            <VStack spacing={2} align="flex-start">
              <Text as="b" fontWeight={"bold"} fontSize={["17px", "xl", "2xl"]}>
                {state.dataKuesioner?.title}
              </Text>
              <Text
                fontSize={["sm", "md"]}
                fontWeight={"thin"}
                color="gray.700"
              >
                Dibuat : {state.dataKuesioner?.created_at}
              </Text>
              <Button
                bgColor={"teal.100"}
                _hover={{ bgColor: "teal.200" }}
                key="preview"
                size="sm"
                //   onClick={() => onOpen()}
              >
                <ViewIcon />
                &nbsp; Preview
              </Button>
            </VStack>
          </HStack>
          <Button
            leftIcon={<MdArrowBackIosNew />}
            colorScheme="blue"
            variant="outline"
            aria-label="btn-email"
            size={"sm"}
            mb={6}
            onClick={() => router.push("/kuesioner/kelola")}
          >
            Kembali
          </Button>
        </Flex>

        <Box>
          <Text
            textAlign="justify"
            dangerouslySetInnerHTML={{
              __html: state.dataKuesioner?.description || "",
            }}
          />
        </Box>

        <Tabs variant="unstyled">
          <TabList justifyContent="center">
            <Stack direction={{ base : "column", sm : "row" }} spacing={{ base: 4, md: 6 }}>
              <Tab
                _selected={{
                  background: "blue.500",
                  color: "white",
                  rounded: "10",
                }}
                _focus={{ boxShadow: "none" }}
                style={{ outline: "blue.500" }}
                aria-label="responden"
                shadow={{ base: "xl", md: "2xl" }}
              >
                <HStack
                  spacing={{ base: 1, md: 2 }}
                  px={{ base: 0, md: 6 }}
                  fontSize={{ base: "md", lg: "lg" }}
                >
                  <MdOutlinePeople />
                  <Text >Responden</Text>
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
                aria-label="kuesioer"
                shadow={{ base: "xl", md: "2xl" }}
              >
                <HStack
                  fontSize={{ base: "md", lg: "lg" }}
                  spacing={{ base: 1, md: 2 }}
                  px={{ base: 0, md: 6 }}
                >
                  <HiOutlineClipboardList />
                  <Text >
                    Grup Pertanyaan
                  </Text>
                </HStack>
              </Tab>
              {/* <Tab hidden={true}>Progress</Tab> */}
            </Stack>
          </TabList>
          <TabPanels>
            <TabPanel pt={6} px={0} pb={0}>
              <Responden idKuesioner={getParamsId} />
            </TabPanel>
            <TabPanel pt={6} px={0} pb={0}>
              <Kuesioner idKuesioner={getParamsId} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Suspense>
  ) : (
    <NotFound
      statusCode={404}
      msg="Not Found"
      statusDesc="Halaman tidak ditemukan. Periksa kembali URL Halaman yang anda kunjungi atau kembali ke halaman Kelola Kuesioner."
      backToHome="/kuesioner/kelola"
    />
  );
}

export default page;
