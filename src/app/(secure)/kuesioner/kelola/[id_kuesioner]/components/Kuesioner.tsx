"use client";
import React, { useState, useEffect, ReactNode, Suspense } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Stack,
  Text,
  VStack,
  Image,
  Select,
} from "@chakra-ui/react";
import { DeleteIcon, Search2Icon, SearchIcon } from "@chakra-ui/icons";

import { Column, useFilters, usePagination, useTable } from "react-table";
import Loading from "../../../loading";
import { axiosCustom } from "@/app/api/axios";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Pagination from "@/app/components/datatable/pagination";
import dynamic from "next/dynamic";

function Kuesioner() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Stack spacing={{ base: 4, md: 6 }}>
          <Flex
            flexDirection={{ base: "column", sm: "row" }} // Arah tata letak berdasarkan layar
            justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
            // align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
          >
            <VStack spacing={0} align="flex-start" mr={2}>
              <Text fontWeight={"bold"} fontSize={["lg", "xl"]}>
                Pertanyaan Kuesioner
              </Text>
              <Text fontWeight="medium">
                Total : <span style={{ color: "green" }}>10 Responden</span>
              </Text>
            </VStack>
            <HStack spacing={2} align="start">
              <Stack spacing={4}>
                <Spacer />
              </Stack>
            </HStack>
          </Flex>
          {/* konten disinii (daftar participant) */}
          {/* {dataPartisipan &&
        Array.isArray(dataPartisipan.participant) &&
        dataPartisipan.participant.length > 0 ? ( */}
          <></>
          {/* )  */}
          {/* // : (
        //   <Stack justifyContent={"center"} spacing={0} alignItems={"center"}>
        //     <Image
        //       src="/img/classroom.png"
        //       h={{ base: "150px", sm: "170px", md: "250px" }}
        //       w="auto"
        //       // w="auto"
        //       // objectFit={"cover"}
        //     />
        //     <Text
        //       as="b"
        //       fontWeight={"bold"}
        //       fontSize={{ base: "16px", md: "17px" }}
        //       textAlign={"center"}
        //     >
        //       Data Partisipan Kosong
        //     </Text>
        //     <Text
        //       fontSize={{ base: "15.5px", md: "16.5px" }}
        //       textAlign={"center"}
        //     >
        //       Mungkin belum dibuat atau sudah dihapus
        //     </Text>
        //   </Stack>
        // )} */}
        </Stack>
      </Suspense>
    </div>
  );
}

export default Kuesioner;
