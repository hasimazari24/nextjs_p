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
    dataClass: any | null;
  } = {
    isLoading: false,
    dataClass: null,
  };
  const [state, setState] = useState(InitalState);

  //   useEffect(() => {
  //     const getAll = async () => {
  //       try {
  //         const response = await axiosCustom.get(`/course/${getParamsId}`);
  //         setState({
  //           isLoading: false,
  //           dataClass: response.data.data,
  //         });
  //         // Membuat nilai baru
  //         const newValue = {
  //           name: response.data.data?.name,
  //           href: `/kelas/${getParamsId}`,
  //         };
  //         // Cek apakah nilai baru sudah ada dalam breadcrumbs
  //         const alreadyExists = breadcrumbs.some(
  //           (breadcrumb) =>
  //             JSON.stringify(breadcrumb) === JSON.stringify(newValue),
  //         );
  //         // Jika belum ada, tambahkan ke breadcrumbs
  //         if (!alreadyExists) {
  //           setBreadcrumbs([...breadcrumbs, newValue]);
  //         } else {
  //           const newBreadcrumbs = breadcrumbs.slice(0, breadcrumbs.length - 1);
  //           setBreadcrumbs(newBreadcrumbs);
  //         }
  //       } catch (error) {
  //         console.error(error);
  //         setState({
  //           isLoading: false,
  //           dataClass: null,
  //         });
  //       }
  //     };
  //     getAll();
  //   }, [getParamsId]);

  return (
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
              src={"/img/class-avatar.png"}
              alt="#"
              // boxShadow={"xl"}
            />
            <VStack spacing={2} align="flex-start">
              <Text as="b" fontWeight={"bold"} fontSize={["17px", "xl", "2xl"]}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis, maxime?
              </Text>
              <Text
                fontSize={["sm", "md"]}
                fontWeight={"thin"}
                color="gray.700"
              >
                Dibuat : 27 November 2025
              </Text>
              <Button
                colorScheme="yellow"
                key="preview"
                size="sm"
                //   onClick={() => onOpen()}
              >
                <ViewIcon />
                &nbsp;Preview
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
            onClick={() => router.push("/kelas")}
          >
            Kembali
          </Button>
        </Flex>

        <Box>
          <Text
            textAlign="justify"
            dangerouslySetInnerHTML={{
              __html:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo culpa obcaecati labore rem itaque commodi. Dicta repudiandae minus, et commodi nemo, amet ex architecto at harum illo delectus tenetur consequatur.",
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
                aria-label="responden"
                shadow={{ base: "xl", md: "2xl" }}
              >
                <HStack
                  spacing={{ base: 1, md: 2 }}
                  px={{ base: 0, md: 6 }}
                  fontSize={{ base: "md", lg: "lg" }}
                >
                  <MdOutlinePeople />
                  <Text>Responden</Text>
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
                  <Text>Kuesioner</Text>
                </HStack>
              </Tab>
              {/* <Tab hidden={true}>Progress</Tab> */}
            </HStack>
          </TabList>
          <TabPanels>
            <TabPanel pt={6} px={0} pb={0}>
              <Responden />
            </TabPanel>
            <TabPanel pt={6} px={0} pb={0}>
              <Kuesioner />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Suspense>
  );
}

export default page;
