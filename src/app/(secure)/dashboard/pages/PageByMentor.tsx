"use client";
import {
  Stack,
  Flex,
  Heading,
  SimpleGrid,
  Button,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Image,
  HStack,
  VStack,
  Table,
  Tr,
  Td,
  Tbody,
  TableContainer,
} from "@chakra-ui/react";
import React from "react";
import { BsBuilding, BsPeople, BsPerson } from "react-icons/bs";
import { FaBookReader } from "react-icons/fa";
import { RiMoneyDollarBoxLine, RiSignalTowerLine } from "react-icons/ri";
import StatsCard from "./StatsCard";
import { GiAerialSignal, GiProgression } from "react-icons/gi";
import { ImFileText2 } from "react-icons/im";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { SiGoogleclassroom } from "react-icons/si";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FaNetworkWired } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import DetailCard from "./DetailCard";
import { VscFolderActive, VscCloseAll } from "react-icons/vsc";
import { BiDoorOpen } from "react-icons/bi";
import Link from "next/link";

function PageByMentor({ data }: { data: any }) {
  return (
    <div>
      <Stack spacing={{ base: 4, md: 6 }}>
        <Flex
          justifyContent={"space-between"}
          pb="2"
          direction={["column", "row"]}
        >
          <Heading fontSize={"2xl"}>DASHBOARD</Heading>
        </Flex>
        {data && (
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: 6, lg: 8 }}
            height={"full"}
            pb={3}
          >
            <StatsCard
              title={"TOTAL KELAS"}
              stat={data.course.total_course}
              icon={<SiGoogleclassroom size={"3em"} />}
              bgcolor="blue.300"
            />
            <StatsCard
              title={"KELAS AKTIF"}
              stat={data.course.active}
              icon={<VscFolderActive size={"3em"} />}
              bgcolor="green.300"
            />
            <StatsCard
              title={"KELAS BERAKHIR"}
              stat={data.course.inactive}
              icon={<VscCloseAll size={"4em"} />}
              bgcolor="red.300"
            />
          </SimpleGrid>
        )}

        <Accordion w={"full"} allowToggle defaultIndex={[0]}>
          <AccordionItem>
            <AccordionButton
              bg={"yellow.100"}
              _hover={{ bg: "yellow.200" }}
              _expanded={{ bg: "yellow.200" }}
            >
              <Text
                flex="1"
                textAlign="left"
                fontWeight={"bold"}
                color={"gray.600"}
              >
                DAFTAR TUGAS BELUM DINILAI
              </Text>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel
              pb={4}
              maxH={{ base: "250px", md: "320px" }}
              overflowY={"auto"}
              css={{
                // For Chrome
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#E2E8F0",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#A0AEC0",
                  borderRadius: "4px",
                },
                // For Firefox
                scrollbarColor: "#A0AEC0",
                scrollbarWidth: "thin",
              }}
              pr="1"
            >
              <Stack spacing={3}>
                {data.tugas && Array.isArray(data.tugas) ? (
                  data.tugas.map((d: any, index: number) => (
                    <Link
                      href={`/penilaian/tugas/${d.id_tenant}/kelas/${d.id_kelas}`}
                      target="_blank"
                      key={index}
                    >
                      <Flex
                        justifyContent={"space-between"}
                        backgroundColor={"gray.50"}
                        borderColor={"gray.400"}
                        rounded={"lg"}
                        alignItems={"center"}
                        h="full"
                        p={{ base: 2, md: 4 }}
                        cursor="pointer"
                        _hover={{ bgColor: "gray.100" }}
                      >
                        <HStack align={"start"} spacing={3}>
                          <Box
                            p={2}
                            rounded={"md"}
                            bgColor={"teal.300"}
                            boxSize={"30px"}
                            color={"white"}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Text
                              as={"b"}
                              textAlign={"center"}
                              whiteSpace={"nowrap"}
                            >
                              {index + 1}
                            </Text>
                          </Box>
                          <Stack spacing={[2, 1]} direction="column" w="full">
                            <Stack
                              direction={["column", "row"]}
                              spacing={[0, 3]}
                            >
                              <HStack align={"start"}>
                                <Box w="75px">
                                  <Text
                                    as="b"
                                    fontSize={"md"}
                                    color={"gray.500"}
                                  >
                                    Kelas
                                  </Text>
                                </Box>
                                <Text as="b">:</Text>
                              </HStack>

                              <Box w="full">
                                <Text fontSize={"md"} color={"gray.500"}>
                                  {d.nama_kelas}
                                </Text>
                              </Box>
                            </Stack>
                            <Stack
                              direction={["column", "row"]}
                              spacing={[0, 3]}
                            >
                              <HStack align={"start"}>
                                <Box w="75px">
                                  <Text
                                    fontSize={{ base: "lg", md: "xl" }}
                                    fontWeight={"bold"}
                                  >
                                    Tugas
                                  </Text>
                                </Box>
                                <Text as="b">:</Text>
                              </HStack>

                              <Box w="full">
                                <Text
                                  fontSize={{ base: "lg", md: "xl" }}
                                  fontWeight={"bold"}
                                >
                                  {d.nama_tugas}
                                </Text>
                              </Box>
                            </Stack>
                            <Stack
                              direction={["column", "row"]}
                              spacing={[0, 3]}
                            >
                              <HStack align={"start"}>
                                <Box w="75px">
                                  <Text fontSize="15px" color={"gray.500"}>
                                    <span style={{ fontWeight: "bold" }}>
                                      Dikirim
                                    </span>
                                  </Text>
                                </Box>
                                <Text as="b">:</Text>
                              </HStack>

                              <Box w="full">
                                <Text fontSize="15px" color={"gray.500"}>
                                  {d.nama_tenant} - {d.tgl_submit_jawaban}
                                </Text>
                              </Box>
                            </Stack>
                          </Stack>
                        </HStack>
                        <Box
                          bgColor="gray.500"
                          color="white"
                          rounded={"md"}
                          alignContent={"center"}
                          p={{ base: 2, md: 3 }}
                          opacity={"0.2"}
                        >
                          <ExternalLinkIcon
                            fontSize={{
                              base: "18px",
                              sm: "19px",
                              md: "20px",
                              xl: "22px",
                            }}
                          />
                        </Box>
                      </Flex>
                    </Link>
                  ))
                ) : (
                  <Stack
                    justifyContent={"center"}
                    spacing={3}
                    alignItems={"center"}
                  >
                    <Image
                      src="/img/grades-notfound.png"
                      h={{ base: "150px", sm: "180px", md: "200px" }}
                      w="auto"
                      // w="auto"
                      // objectFit={"cover"}
                    />
                    <Text
                      as="b"
                      fontWeight={"bold"}
                      fontSize={{ base: "14px", md: "15px" }}
                      textAlign={"center"}
                    >
                      Tidak ada tugas yang belum dinilai
                    </Text>
                  </Stack>
                )}
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </div>
  );
}

export default PageByMentor;
