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
  Icon,
  Box,
} from "@chakra-ui/react";
import Loading from "../../loading";
import { MdArrowBackIosNew } from "react-icons/md/";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import { FindDefaultRoute } from "@/app/components/utils/FindDefaultRoute";
import { useRouter } from "next/navigation";
import { HiFolderOpen } from "react-icons/hi";
import { ViewIcon } from "@chakra-ui/icons";

function page({ params }: { params: { id_group: string } }) {
  const { setBreadcrumbs } = useBreadcrumbContext();
  const getForCrumbs: any = FindDefaultRoute();
  //   useEffect(() => {
  //     if (getForCrumbs) setBreadcrumbs(getForCrumbs);
  //   }, []);
  const router = useRouter();

  return (
    <Suspense fallback={<Loading />}>
      <Stack spacing={{ base: 4, md: 6 }}>
        <Flex
          flexDirection={{ base: "column-reverse", md: "row" }} // Arah tata letak berdasarkan layar
          justify="space-between"
        >
          <Heading fontSize={"2xl"} mb={2}>
            DAFTAR GRUP PERTANYAAN
          </Heading>
          <HStack align="start" mb={2}>
            <Button
              leftIcon={<MdArrowBackIosNew />}
              colorScheme="blue"
              variant="outline"
              aria-label="btn-email"
              title={`Kembali ke Halaman Sebelumnya`}
              onClick={() => router.push(`/kuesioner/grup`)}
              size={"sm"}
            >
              Kembali
            </Button>
          </HStack>
        </Flex>
        <Flex
          flexDirection={{ base: "column", md: "row" }} // Arah tata letak berdasarkan layar
          justify="space-between"
        >
          <HStack color={"blue.500"}>
            {/* <FaRegFileAlt fontSize="18px" fontWeight={"bold"} /> */}
            <Icon
              as={HiFolderOpen}
              fontSize={["18px", "20px"]}
              fontWeight={"bold"}
            />
            <Text fontWeight={"semibold"} fontSize={["md", "lg"]} mr={2}>
              JUDUL GROUP
            </Text>
          </HStack>
          <HStack>
            <Button
              colorScheme="green"
              key="preview"
              size="sm"
              //   onClick={() => onOpen()}
            >
              <ViewIcon />
              &nbsp;Tambah Pertanyaan
            </Button>
            <Button
              colorScheme="yellow"
              key="preview"
              size="sm"
              //   onClick={() => onOpen()}
            >
              <ViewIcon />
              &nbsp;Preview
            </Button>
          </HStack>
        </Flex>

        <Box
          p={{ base: 3, md: 6 }}
          rounded={["md", "lg"]}
          borderWidth={"4px"}
          borderColor={"blue.500"}
          w="full"
        >
          <Stack justifyContent={"center"} alignItems={"center"}>
            <Text fontWeight={"bold"} fontSize={["md", "lg"]}>
              DAFTAR PERTANYAAN :
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Suspense>
  );
}

export default page;
