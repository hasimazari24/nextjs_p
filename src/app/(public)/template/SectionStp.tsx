"use client";

import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { BsPerson, BsBuilding } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}

function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function BasicStatistics() {
  return (
    <Box
      maxW="7xl"
      mx={"auto"}
      pt={5}
      px={{ base: 2, sm: 12, md: 17 }}
      mb="55px"
    >
      <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        py={10}
        fontWeight={"bold"}
      >
        Tenant Solo Technopark
      </chakra.h1>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }}
        spacing={{ base: 5, lg: 8 }}
        px={{ base: 3, md: 20 }}
      >
        <StatsCard
          title={"Pra Inkubasi"}
          stat={"0"}
          icon={<BsPerson size={"3em"} />}
        />
        <StatsCard
          title={"Inkubasi"}
          stat={"0"}
          icon={<FiServer size={"3em"} />}
        />
        <StatsCard
          title={"Inkubasi Lanjutan"}
          stat={"0"}
          icon={<GoLocation size={"3em"} />}
        />
        <StatsCard
          title={"Scale Up"}
          stat={"0"}
          icon={<BsBuilding size={"3em"} />}
        />
      </SimpleGrid>
    </Box>
  );
}
