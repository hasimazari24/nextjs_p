"use client";
import { MdArrowBackIosNew, MdOutlinePeople } from "react-icons/md";
import {
  HiFolderOpen,
  HiOutlineClipboardList,
  HiOutlineNewspaper,
} from "react-icons/hi";
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
  Heading,
  Icon,
} from "@chakra-ui/react";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, notFound, useParams } from "next/navigation";
import * as ClassInfo from "@/app/type/class-type.d";
import Loading from "../../../loading";
import { axiosCustom } from "@/app/api/axios";
import NotFound from "@/app/components/template/NotFound";
import { useAuth } from "@/app/components/utils/AuthContext";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import { ViewIcon } from "@chakra-ui/icons";
import FormKuesioner from "../../../kelola/[id_kuesioner]/components/FormKuesioner";

interface PertanyaanProps {
  id: string;
  pertanyaan: string;
  type: string;
  is_required: boolean;
  note: string;
  is_active: boolean;
  opsi: OpsiProps;
}

interface OpsiProps {
  id: string;
  value: string;
}

function page() {
  const params = useParams();
  const getParamsId = params.id_group;
  if ((getParamsId && getParamsId.length === 0) || !getParamsId) {
    return notFound();
  }
  const router = useRouter();
  const { setBreadcrumbs, breadcrumbs } = useBreadcrumbContext();

  const InitalState: {
    isLoading: boolean;
    dataReview: any | null;
  } = {
    isLoading: true,
    dataReview: null,
  };
  const [state, setState] = useState(InitalState);

  useEffect(() => {
    const getAll = async () => {
      try {
        const response = await axiosCustom.get(
          `/grup-pertanyaan/${getParamsId}/review/`,
        );
        setState({
          isLoading: false,
          dataReview: response.data.data,
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
          dataReview: null,
        });
      }
    };
    getAll();
  }, [getParamsId]);

  return state.isLoading ? (
    <Loading />
  ) : state.dataReview ? (
    <Suspense fallback={<Loading />}>
      <Stack spacing={{ base: 2, md: 4 }}>
        <Flex
          flexDirection={{ base: "column-reverse", md: "row" }} // Arah tata letak berdasarkan layar
          justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
          align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
        >
          <Heading fontSize={"2xl"}>PREVIEW GRUP PERTANYAAN</Heading>
          <Button
            leftIcon={<MdArrowBackIosNew />}
            colorScheme="blue"
            variant="outline"
            aria-label="btn-email"
            size={"sm"}
            mb={6}
            onClick={() => router.push(`/kuesioner/grup/${getParamsId}`)}
          >
            Kembali
          </Button>
        </Flex>
        <FormKuesioner
          title={state.dataReview.title}
          data={state.dataReview.pertanyaan}
        />
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
