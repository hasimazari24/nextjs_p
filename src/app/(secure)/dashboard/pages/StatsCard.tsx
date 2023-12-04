"use client";

import {
  Box,
  Flex,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
  detail?: ReactNode;
  bgcolor: string;
}

export default function StatsCard(props: StatsCardProps) {
  const { title, stat, icon, detail, bgcolor } = props;
  return (
    <div>
      <Stack
        shadow={"xl"}
        //   border={"1px solid"}
        backgroundColor={bgcolor}
        // borderColor={useColorModeValue("gray.800", "gray.500")}
        rounded={"lg"}
        h="full"
        spacing={0}
      >
        <Flex
          justifyContent={"space-between"}
          p={{ base: 2, md: 4 }}
          // pt={"5"}
          textColor={"white"}
          h="full"
        >
          <VStack pl={{ base: 2, md: 1 }} spacing={0} alignItems={"start"}>
            <Text fontWeight={"bold"} fontSize={"md"} whiteSpace={"normal"}>
              {title}
            </Text>
            <Text fontSize={"3xl"} fontWeight={"bold"}>
              {stat}
            </Text>
          </VStack>
          <Box
            my={"auto"}
            color="rgba(255, 255, 255, 0.6)"
            alignContent={"center"}
          >
            {icon}
          </Box>
        </Flex>
        {detail || null}
      </Stack>
    </div>
  );
}
