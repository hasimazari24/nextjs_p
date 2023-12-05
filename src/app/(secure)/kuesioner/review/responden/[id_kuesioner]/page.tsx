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
  useDisclosure,
} from "@chakra-ui/react";
import Loading from "../../../loading";
import { MdArrowBackIosNew } from "react-icons/md/";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import { FindDefaultRoute } from "@/app/components/utils/FindDefaultRoute";
import { notFound, useRouter } from "next/navigation";
import { EditIcon } from "@chakra-ui/icons";
import FormKuesioner from "@/app/(secure)/kuesioner/kelola/[id_kuesioner]/components/FormKuesioner";
import ChooseResponden from "./ChooseResponden";

function page({ params }: { params: { id_kuesioner: string } }) {
  const getParamsId = params.id_kuesioner;
  if ((getParamsId && getParamsId.length === 0) || !getParamsId) {
    return notFound();
  }
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [responden, setResponden] = useState<any | null>();

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Stack spacing={{ base: 6, md: 8 }}>
          <Flex
            flexDirection={{ base: "column-reverse", md: "row" }} // Arah tata letak berdasarkan layar
            justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
            // align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
          >
            <VStack spacing={1} align="flex-start" mr={{ base: 0, md: 2 }}>
              <Heading fontSize={"2xl"} mb={2}>
                REVIEW RESPONDEN
              </Heading>
              <HStack>
                <Text fontSize={["md", "lg"]}>
                  <span style={{ fontWeight: "bold" }}>Responden : </span>
                  {responden && <span style={{ color: "green" }}>{responden.name}</span>}
                </Text>
                <Button
                  leftIcon={<EditIcon />}
                  bgColor={"blue.200"}
                  _hover={{ bgColor: "blue.300" }}
                  size={"sm"}
                  onClick={() => onOpen()}
                >
                  {responden ? "Ubah" : "Pilih Responden"}
                </Button>
              </HStack>
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

          <Stack spacing={3} alignItems={"center"} w="full">
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
            <FormKuesioner
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
            />
          </Stack>
        </Stack>
        <ChooseResponden
          isOpen={isOpen}
          onClose={() => onClose()}
          onChoose={(tenant) => setResponden(tenant)}
        />
      </Suspense>
    </div>
  );
}

export default page;
