"use client";

import {
  Avatar,
  Box,
  Stack,
  Text,
  useColorModeValue,
  Image,
  Center,
} from "@chakra-ui/react";

export default function SectionStp() {
  return (
    <Stack
      py={16}
      px={8}
      spacing={{ base: 8, md: 10 }}
      align={"center"}
      direction={"column"}
    >
      <Text
        fontSize={{ base: "md", md: "xl" }}
        textAlign={"center"}
        maxW={"3xl"}
      >
        Pusat Pengelolaan dan Pemantauan Perkembangan Tenant di Solo Technopark.
      </Text>
      <Box textAlign={"center"}>
        <Center>
          <Image
            src={"/img/LOGO-STP.png"}
            alt="Logo Solo Technopark"
            width="100px"
          />
        </Center>
      </Box>
    </Stack>
  );
}
