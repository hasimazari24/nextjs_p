"use client";
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
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import React, { useState, useEffect, Suspense } from "react";
import TenantKelas from "./partisipan/tenant-kelas";
import SesiKelas from "./sesi-kelas/sesi-kelas";
import { useRouter, notFound } from "next/navigation";
import * as ClassInfo from "@/app/type/class-type.d";
import Loading from "../loading";
import { axiosCustom } from "@/app/api/axios";
import NotFound from "@/app/components/template/NotFound";
import ProfileMentor from "../pages/profileMentor";
import { useAuth } from "@/app/components/utils/AuthContext";
import Progress from "./partisipan/progress";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import DownloadExcel from "@/app/components/utils/DownloadExcel";

function page({ params }: { params: { id: string } }) {
  const getParamsId = params.id;
  if ((getParamsId && getParamsId.length === 0) || !getParamsId) {
    return notFound();
  }
  const router = useRouter();

  const { user } = useAuth();
  const { setBreadcrumbs, breadcrumbs } = useBreadcrumbContext();
  let getUser: any = null; // Inisialisasikan getUser di sini

  if (user !== null && user !== 401) {
    getUser = user; // Setel nilai getUser jika user ada
  }

  const InitalState: {
    isLoading: boolean;
    dataClass: ClassInfo.classHeading | null;
  } = {
    isLoading: true,
    dataClass: null,
  };
  const [state, setState] = useState(InitalState);

  useEffect(() => {
    const getAll = async () => {
      try {
        const response = await axiosCustom.get(`/course/${getParamsId}`);
        setState({
          isLoading: false,
          dataClass: response.data.data,
        });
        // Membuat nilai baru
        const newValue = {
          name: response.data.data?.name,
          href: `/kelas/${getParamsId}`,
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
          // Jika sudah ada, buat array baru tanpa nilai breadcrumb terakhir
          // ini diperlukan jika berpindah dari sub-route yg ada didalam route ini
          const newBreadcrumbs = breadcrumbs.slice(0, breadcrumbs.length - 1);
          setBreadcrumbs(newBreadcrumbs);
        }
      } catch (error) {
        console.error(error);
        setState({
          isLoading: false,
          dataClass: null,
        });
      }
    };
    getAll();
  }, [getParamsId]);

  // console.log(sesiKelas?.item);
  const [idTenant, setIdTenant] = useState<string>("");
  const [partisipanIndex, setPartisipanIndex] = useState(0);

  const partisipanPageChange = (index: number) => {
    setPartisipanIndex(index);
  };

  return state.isLoading ? (
    <Loading />
  ) : state.dataClass ? (
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
              src={
                state?.dataClass.course_ends === false
                  ? "/img/class-avatar.png"
                  : "/img/class-ends-min.png"
              }
              alt="#"
              // boxShadow={"xl"}
            />
            <VStack spacing={2} align="flex-start">
              <Text as="b" fontWeight={"bold"} fontSize={["17px", "xl", "2xl"]}>
                {state.dataClass?.name}
              </Text>
              <Text
                fontSize={["sm", "md"]}
                fontWeight={"thin"}
                color="gray.700"
              >
                Dibuat : {state.dataClass?.created_at}
              </Text>
              <ProfileMentor mentor={state.dataClass?.mentor || null} />
            </VStack>
          </HStack>
          <HStack mb={{ base: 4, md: 0 }}>
            <Button
              leftIcon={<MdArrowBackIosNew />}
              colorScheme="blue"
              variant="outline"
              aria-label="btn-email"
              size={"sm"}
              onClick={() => router.push("/kelas")}
            >
              Kembali
            </Button>
            <DownloadExcel Url={`/export-course/${getParamsId}`} />
          </HStack>
        </Flex>
        {state.dataClass.description && (
          <Box>
            <Text
              textAlign="justify"
              dangerouslySetInnerHTML={{
                __html: state.dataClass ? state.dataClass.description : "",
              }}
            />
          </Box>
        )}

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
                  <Text>Partisipan</Text>
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
              {/* <Tab hidden={true}>Progress</Tab> */}
            </HStack>
          </TabList>
          <TabPanels>
            <TabPanel pt={6} px={0} pb={0}>
              {partisipanIndex === 0 ? (
                <TenantKelas
                  idKelas={getParamsId}
                  roleAccess={getUser?.role}
                  classEnd={state?.dataClass.course_ends}
                  idTenant={(id) => setIdTenant(id)}
                  tabIndex={() => setPartisipanIndex(1)}
                />
              ) : (
                <Progress
                  idKelas={state?.dataClass.id}
                  idTenant={idTenant}
                  tabIndex={() => partisipanPageChange(0)}
                />
              )}
            </TabPanel>
            <TabPanel pt={6} px={0} pb={0}>
              <SesiKelas
                idKelas={getParamsId}
                roleAccess={getUser?.role}
                classEnd={state?.dataClass.course_ends}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Suspense>
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
