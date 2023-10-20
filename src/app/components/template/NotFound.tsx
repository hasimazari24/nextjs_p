"use client";

import React, { useState } from "react";
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
  Img,
  Center,
  Wrap,
  WrapItem,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";

interface notFoundProps {
    statusCode : number,
    msg:string,
    statusDesc : string,
    backToHome : string,
}

function NotFound({ statusCode, statusDesc, msg, backToHome }: notFoundProps) {
  return (
    <div>
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, red.400, red.600)"
          backgroundClip="text"
        >
          {statusCode}
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          {msg}
        </Text>
        <Text color={"gray.500"} mb={6}>
          {statusDesc}
        </Text>

        <NextLink href={`${backToHome}`} passHref>
          <Button
            colorScheme="red"
            bgGradient="linear(to-r, red.400, red.500, red.600)"
            color="white"
            variant="solid"
          >
            Kembali ke Halaman Awal
          </Button>
        </NextLink>
      </Box>
    </div>
  );
}

export default NotFound;
