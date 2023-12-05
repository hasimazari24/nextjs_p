"use client";
import React, { useState, useEffect, Suspense } from "react";
import {
  Stack,
  Flex,
  Heading,
  HStack,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";
import Loading from "../../loading";
import { MdArrowBackIosNew } from "react-icons/md/";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import { FindDefaultRoute } from "@/app/components/utils/FindDefaultRoute";
import { notFound, useRouter } from "next/navigation";

function page({ params }: { params: { id_pertanyaan: string } }) {
  const getParamsId = params.id_pertanyaan;
  if ((getParamsId && getParamsId.length === 0) || !getParamsId) {
    return notFound();
  }

  const { setBreadcrumbs } = useBreadcrumbContext();
  const getForCrumbs: any = FindDefaultRoute();
  //   useEffect(() => {
  //     if (getForCrumbs) setBreadcrumbs(getForCrumbs);
  //   }, []);
  const router = useRouter();
  
  return (
    <Suspense fallback={<Loading />}>
      <Stack spacing={{ base: 6, md: 8 }}>
        <Flex
          flexDirection={{ base: "column-reverse", md: "row" }} // Arah tata letak berdasarkan layar
          justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
          // align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
        >
          <VStack spacing={1} align="flex-start" mr={{ base: 0, md: 2 }}>
            <Heading fontSize={"2xl"} mb={2}>
              DAFTAR PERTANYAAN
            </Heading>
            <Text fontSize={["md", "lg"]}>
              <span style={{ fontWeight: "bold" }}>PERTANYAAN :</span> Bagaimana
              Perkembangan Bisnis Anda dan dari tahun mana saja anda memperoleh
              Tahun Pendanaan dsfgsdfg fdgdsfgdsv fd
            </Text>
            <Text fontSize={["md", "lg"]}>
              <span style={{ fontWeight: "bold" }}>MODEL PERTANYAAN :</span>{" "}
              Checklist
            </Text>
          </VStack>
          <HStack align="start" mb={2}>
            <Button
              leftIcon={<MdArrowBackIosNew />}
              colorScheme="blue"
              variant="outline"
              aria-label="btn-email"
              title={`Kembali ke Halaman Sebelumnya`}
              onClick={() => router.push(`/kuesioner/daftar`)}
              size={"sm"}
            >
              Kembali
            </Button>
            <Button
              leftIcon={<MdArrowBackIosNew />}
              colorScheme="blue"
              variant="outline"
              aria-label="btn-email"
              title={`Kembali ke Halaman Sebelumnya`}
              onClick={() => router.push(`/kuesioner/daftar`)}
              size={"sm"}
            >
              Value Jawaban
            </Button>
          </HStack>
        </Flex>
      </Stack>
      
    </Suspense>
  );
}

export default page;
