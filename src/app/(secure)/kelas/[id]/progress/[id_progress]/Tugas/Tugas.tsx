"use client";
import React from "react";
import {
  DownloadIcon,
  AddIcon,
  EditIcon,
  DeleteIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Stack,
  Image,
  VStack,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Flex,
} from "@chakra-ui/react";
import { MdArrowBackIosNew, MdTask } from "react-icons/md/";

function Tugas() {
  return (
    <div>
      <VStack spacing={3} align="flex-start">
        <HStack
          //   justify="space-between"
          flexWrap={"wrap"}
          alignItems={"center"}
        >
          <Text fontWeight={"bold"} fontSize={["md", "lg"]}>
            Tugas 1 : Apa itu Digital Marketing ?
          </Text>
          <Button
            bgColor="blue.100"
            _hover={{
              bg: "blue.200",
            }}
            title="Edit Data"
            color="gray.700"
            // onClick={() => setModalOpen(true)}
            key="editData"
            size="sm"
          >
            <EditIcon />
            &nbsp; Edit
          </Button>
          <Button
            title="Hapus Data"
            colorScheme="red"
            // onClick={() => setIsDeleteModalOpen(true)}
            key="hapusData"
            size="sm"
          >
            <DeleteIcon /> &nbsp; Hapus
          </Button>
        </HStack>
        <Box
          p={{ base: 3, md: 6 }}
          rounded={["md", "lg"]}
          borderWidth={"4px"}
          borderColor={"blue.500"}
          w="full"
        >
          <Text textAlign="justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo, id.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
            sunt.
          </Text>
        </Box>
        <HStack spacing={2}>
          <Button
            bgColor="blue.500"
            _hover={{
              bg: "blue.400",
            }}
            title="Edit Data"
            color="white"
            // onClick={() => setModalOpen(true)}
            key="editData"
            size="sm"
            fontWeight={"thin"}
          >
            <ExternalLinkIcon />
            &nbsp; Lihat Tugas
          </Button>
          <Button
            bgColor="blue.500"
            _hover={{
              bg: "blue.400",
            }}
            title="Edit Data"
            color="white"
            // onClick={() => setModalOpen(true)}
            key="editData"
            size="sm"
            fontWeight={"thin"}
          >
            <MdTask />
            &nbsp; Review Tugas
          </Button>
        </HStack>
        <Box p={2} bgColor="yellow.300" w="full" maxW="257px">
          <Text as="b" color={"gray.700"}>
            Open Date : 21 October 2023
          </Text>
        </Box>
        <Box p={2} bgColor="red.200" w="full" maxW="257px">
          <Text as="b" color={"gray.700"}>
            Due Date : 25 October 2023
          </Text>
        </Box>
      </VStack>
    </div>
  );
}

export default Tugas;
