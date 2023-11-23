"use client";

import { Spinner, Center, Box, Text } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box rounded="md">
      <Center h="100%" m="10" flexDirection={"column"}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          mb="3"
        />
        <Text as="i" whiteSpace={"normal"}>
          Sedang memuat halaman, mohon tunggu sebentar ...
        </Text>
      </Center>
    </Box>
  );
};

export default Loading;
