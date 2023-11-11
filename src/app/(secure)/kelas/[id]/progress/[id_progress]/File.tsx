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

function File() {
  return (
    <div>
      <VStack spacing={3} align="flex-start">
        <HStack
          //   justify="space-between"
          flexWrap={"wrap"}
          alignItems={"center"}
        >
          <Text fontWeight={"bold"} fontSize={["md", "lg"]}>
            File Materi 1 : Apa itu Digital Marketing ?
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
          <DownloadIcon />
          &nbsp; Download - Materi 1 : Digital ...
        </Button>
      </VStack>
    </div>
  );
}

export default File;
