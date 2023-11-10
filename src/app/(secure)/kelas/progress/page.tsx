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
  Avatar,
  VStack,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Flex,
  Input,
} from "@chakra-ui/react";
import { MdArrowBackIosNew, MdTask } from "react-icons/md/";
import File from "./File";
import Link from "./Link";
import Tugas from "./Tugas";
import { BsSendPlusFill } from "react-icons/bs";

// { params }: { params: { slug: string } }
const page = () => {
  return (
    <Stack spacing={{ base: 6, md: 8 }}>
      <Flex
        flexDirection={{ base: "column-reverse", md: "row" }} // Arah tata letak berdasarkan layar
        justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
        // align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
      >
        <VStack spacing={0} align="flex-start">
          <Text as="b" fontWeight={"bold"} fontSize={["17px", "xl", "2xl"]}>
            Digital Marketing Business Social Media Batch 1 - SOLO Techno.
          </Text>
          <Text fontWeight={"thin"}>Publish : 25 Okt 2023</Text>
          <Text fontWeight={"bold"} fontSize={["md", "lg"]}>
            Mentor : Mr. John
          </Text>
        </VStack>
        <HStack spacing={2} align="start">
          <Button
            leftIcon={<MdArrowBackIosNew />}
            colorScheme="blue"
            variant="outline"
            aria-label="btn-email"
            size={"sm"}
            mb={6}
          >
            Kembali
          </Button>
          <Popover placement="bottom" isLazy>
            <PopoverTrigger>
              <Button colorScheme="green" key="tambahData" size="sm">
                <AddIcon />
                &nbsp;Tambah
              </Button>
            </PopoverTrigger>
            <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
              <PopoverArrow />
              <PopoverBody>
                <Stack>
                  <Button
                    variant="ghost"
                    key="tambahFile"
                    size="sm"
                    w="134px"
                    alignItems={"center"}
                    // onClick={() => setIsModalNonLogin(true)}
                    justifyContent="start"
                    fontWeight="normal"
                  >
                    <AddIcon />
                    &nbsp; File
                  </Button>
                  <Button
                    variant="ghost"
                    key="tambahLink"
                    size="sm"
                    // onClick={() => setIsModalSearchOpen(true)}
                    fontWeight="normal"
                    justifyContent={"start"}
                    alignItems={"center"}
                    w="134px"
                  >
                    <AddIcon />
                    &nbsp; Link
                  </Button>
                  <Button
                    variant="ghost"
                    key="tambahTugas"
                    size="sm"
                    w="134px"
                    alignItems={"center"}
                    // onClick={() => setIsModalNonLogin(true)}
                    justifyContent="start"
                    fontWeight="normal"
                  >
                    <AddIcon />
                    &nbsp; Tugas
                  </Button>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>
      </Flex>

      <Box
        p={{ base: 3, md: 6 }}
        rounded={["md", "lg"]}
        borderWidth={"4px"}
        borderColor={"blue.500"}
        w="full"
      >
        <Text textAlign="justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
          corporis, ipsum quod facilis laboriosam in quas natus voluptas. Atque
          magnam nobis facere officia molestiae quibusdam vitae eaque illum
          repellendus sit, cumque distinctio architecto modi provident ipsa!
          Inventore ad maiores impedit distinctio a, iure soluta, beatae facere
          consequatur dolorum odio libero?
        </Text>
      </Box>

      <File />
      <Link />
      <Tugas />

      <Stack spacing={3} align="flex-start">
        <Text fontWeight={"bold"} fontSize={["md", "lg"]}>
          Komentar
        </Text>
        <Box
          rounded={["md", "lg"]}
          boxShadow={["md", "lg"]}
          p={[2, 4]}
          w="full"
          backgroundColor={"gray.50"}
          mb={2}
        >
          <Stack justifyContent={"justify-content"} direction={"row"}>
            <Stack w="full" spacing={1}>
              <Text fontSize={["md", "lg"]} mb={1}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat, voluptatum voluptatibus quae facere doloribus enim
                consequuntur magnam sed labore aliquid possimus maxime
                recusandae. Deleniti quia tempora provident natus, modi dolorem!
              </Text>
              <HStack
                cursor={"pointer"}
                // direction={{ base: "row", sm: "column", lg: "row" }}
                // onClick={onOpen}
              >
                <Avatar
                  size={"sm"}
                  src="/img/avatar-default.jpg"
                  backgroundColor={"white"}
                />
                <VStack
                  display={{ base: "flex", sm: "none", lg: "flex" }}
                  alignItems="flex-start"
                  spacing={0}
                >
                  <Text
                    as="b"
                    fontSize="md"
                    textOverflow="ellipsis"
                    // maxW={{
                    //   base: "auto",
                    //   sm: "340px",
                    //   md: "408px",
                    //   lg: "544px",
                    // }}
                    // w="auto"
                    // whiteSpace="nowrap"
                    flex="1"
                    // cursor={"default"}
                    overflow="hidden"
                    title={"Mr. dsfjskndf"}
                    noOfLines={1}
                  >
                    Tenant Lagi Comment
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Tenant
                  </Text>
                </VStack>
              </HStack>
              <Text fontSize="xs" fontWeight={"thin"}>
                Dikirim 26 Okt 2023 jam 15:20
              </Text>
            </Stack>
            <Box alignItems={"start"}>
              <Button
                title="Hapus Komentar"
                colorScheme="red"
                // onClick={() => setIsDeleteModalOpen(true)}
                key="hapusData"
                size={["xs", "sm"]}
              >
                <DeleteIcon />
              </Button>
            </Box>
          </Stack>
        </Box>
        <Stack
          justifyContent={"justify-content"}
          direction={"row"}
          alignItems="center"
          w="full"
        >
          <Input
            w="full"
            focusBorderColor="teal.500"
            placeholder="Tulis komentar disini ..."
            size={["md", "lg"]}
          />
          <Button
            leftIcon={<BsSendPlusFill />}
            title="Kirim Komentar"
            bgColor="teal.500"
            _hover={{
              bg: "teal.400",
            }}
            color="white"
            // onClick={() => setIsDeleteModalOpen(true)}
            key="Kirim"
            size={["sm", "md"]}
          >
            Kirim
          </Button>
        </Stack>
      </Stack>
      {/* tambah tabs disini */}
    </Stack>
  );
};

export default page;
