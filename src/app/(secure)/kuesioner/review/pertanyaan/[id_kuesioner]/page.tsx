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
  Center,
  Divider,
  Select,
  Box,
  Checkbox,
  Tag,
} from "@chakra-ui/react";
import Loading from "../../../loading";
import { MdArrowBackIosNew } from "react-icons/md/";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import { FindDefaultRoute } from "@/app/components/utils/FindDefaultRoute";
import { notFound, useRouter } from "next/navigation";
import { EditIcon } from "@chakra-ui/icons";
import FormKuesioner from "@/app/(secure)/kuesioner/kelola/[id_kuesioner]/components/FormKuesioner";
import DownloadExcel from "@/app/components/utils/DownloadExcel";

function page({ params }: { params: { id_kuesioner: string } }) {
  const getParamsId = params.id_kuesioner;
  if ((getParamsId && getParamsId.length === 0) || !getParamsId) {
    return notFound();
  }
  const router = useRouter();

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Stack spacing={{ base: 6, md: 8 }}>
          <Flex
            flexDirection={{ base: "column-reverse", md: "row" }} // Arah tata letak berdasarkan layar
            justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
            // align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
          >
            <Heading fontSize={"2xl"} mb={2}>
              REVIEW PERTANYAAN
            </Heading>
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
            </HStack>
          </Flex>

          <Stack spacing={3} w="full" alignItems="center">
            <Heading
              textAlign="center"
              fontSize={"2xl"}
              maxW={{ base: "full", md: "540px", lg: "720px" }}
              whiteSpace={"normal"}
            >
              JUDUL KUESIONER TAHUNAN Lorem ipsum dolor, sit amet consectetur
              adipisicing elit
            </Heading>
            <Text
              textAlign="justify"
              dangerouslySetInnerHTML={{
                __html:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis delectus nam facere veritatis. Praesentium eveniet tempora voluptas, facilis saepe perspiciatis, laborum et amet iusto aliquid possimus velit quos modi neque corrupti perferendis in cumque? Illum optio odio amet, inventore quas aperiam, natus assumenda consequuntur accusamus beatae, alias quo dolor provident!",
              }}
            />
            <Divider color="gray.600" />
            <HStack alignItems={"center"} align={"start"} w="full">
              <Select w="fit-content">
                <option key="default" value="">
                  Silahkan Pilih Pertanyaan
                </option>
                <option key="tanya1" value="tanya1">
                  Pertanyaan No. 1
                </option>
              </Select>
              <DownloadExcel Url="/excel" />
            </HStack>
            <Box
              rounded={"lg"}
              p={3}
              bgColor="green.400"
              color="white"
              w="full"
            >
              <Text
                fontWeight={"semibold"}
                fontSize={["md", "lg"]}
                mr={2}
                textAlign="left"
              >
                JUDUL PERTANYAAN
              </Text>
            </Box>
            <Stack
              display={"flex"}
              rounded={"lg"}
              p={3}
              bgColor="gray.50"
              boxShadow="lg"
              alignItems={"flex-start"}
              w="full"
              spacing={3}
            >
              <Checkbox colorScheme="green" isReadOnly defaultChecked>
                Tahun 2015
              </Checkbox>
              <Divider color="gray.800" w="full" />
              <Stack
                align={"start"}
                spacing="1"
                direction={"row"}
                flexWrap={"wrap"}
              >
                <Tag
                  // key={index}
                  color="green"
                  colorScheme="green"
                  variant="outline"
                  size="md"
                  // title={tag.program}
                >
                  <Text
                    //   textOverflow="ellipsis"
                    whiteSpace={"nowrap"}
                    cursor={"default"}
                    //   overflow="hidden"
                    //   maxW={{ base: "120px", md: "200px", lg: "250px" }}
                  >
                    {/* {tag.program} */} Nama Tenant
                  </Text>
                </Tag>
              </Stack>
            </Stack>
            {/* <FormKuesioner
              data={[
                {
                  id: "ID1",
                  heading: "Pilih Jenis Produk Anda",
                  type: "radio",
                  value: [
                    { id: "val1", title: "Teknologi" },
                    { id: "val2", title: "Makanan" },
                    { id: "val3", title: "Jasa Layanan" },
                    { id: "val4", title: "Telekomunikasi" },
                    { id: "val5", title: "Seni dan Kriya" },
                  ],
                },
                {
                  id: "ID2",
                  heading: "Apa Saja Produknya ?",
                  type: "checkbox",
                  value: [
                    { id: "val1", title: "Teknologi" },
                    { id: "val2", title: "Makanan" },
                    { id: "val3", title: "Jasa Layanan" },
                    { id: "val4", title: "Telekomunikasi" },
                    { id: "val5", title: "Seni dan Kriya" },
                  ],
                },
                {
                  id: "ID3",
                  heading: "Jelaskan Bisnis anda ?",
                  type: "short_text",
                },
              ]}
            /> */}
          </Stack>
        </Stack>
      </Suspense>
    </div>
  );
}

export default page;
