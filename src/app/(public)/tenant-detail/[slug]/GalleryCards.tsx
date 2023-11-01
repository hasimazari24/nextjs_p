"use client";
import * as React from "react";
import {
  Box,
  Text,
  Stack,
  Container,
  Image,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdDateRange } from "react-icons/md";

interface GalleryCardProps {
  image: string;
  judul: string;
  deskripsi: string;
  tgl: string;
  tgl_format: string;
}

const CardGallery = ({
  image,
  judul,
  deskripsi,
  tgl,
  tgl_format,
}: GalleryCardProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box w="full" cursor={"pointer"} onClick={openDrawer}>
      <Stack
        bgColor="gray.50"
        maxW={"xl"}
        h="full"
        boxShadow="lg"
        spacing="2"
        rounded="xl"
        objectFit={"cover"}
        //   align="center"
        p="4"
        // alignItems={"center"}
      >
        <Image
          h={{ base: "90px", sm: "140px", xl: "200px" }}
          // maxW={{ base: "80px", sm: "140px", xl: "200px" }}
          w={"xl"}
          objectFit={"cover"}
          src={image}
          rounded={{ base: "xl", lg: "3xl" }}
          boxShadow="xl"
          mb={[2, 4]}
        />
        <Text
          as="b"
          fontSize={["sm", "lg", "xl"]}
          textOverflow="ellipsis"
          textAlign="start"
          overflow="hidden"
          // title={data.rank}
          noOfLines={{ base: 2, sm: 1 }}
        >
          {judul}
        </Text>
        <HStack alignItems="center" spacing={2}>
          <MdDateRange fontSize={{ base: "12px", lg: "15px" }} />
          <Text fontSize={{ base: "12px", lg: "15px" }}>{tgl}</Text>
        </HStack>

        <Text
          // textAlign="justify"
          fontSize={["sm", "md"]}
          textOverflow="ellipsis"
          overflow="hidden"
          // flex="1"
          noOfLines={2}
          // title={data.name}
        >
          {deskripsi}
        </Text>
      </Stack>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        placement="right"
        size={["sm", "md"]}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text
              fontSize={["20", "24"]}
              color="gray.800"
              fontWeight={"bold"}
              px={4}
              textAlign={"center"}
            >
              {judul}
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing={3} px={4}>
              <Image src={image} rounded={"xl"} />
              <HStack alignItems="center" spacing={2}>
                <MdDateRange fontSize={{ base: "12px", lg: "15px" }} />
                <Text
                  textAlign={"start"}
                  fontSize={{ base: "12px", lg: "15px" }}
                >
                  {tgl_format}
                </Text>
              </HStack>
              <Text color={"gray.700"} textAlign={"justify"}>
                {deskripsi}
              </Text>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default CardGallery;
