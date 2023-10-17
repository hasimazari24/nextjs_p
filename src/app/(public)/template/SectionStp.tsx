"use client";

import {
  Box,
  chakra,
  Container,
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

interface SectionStp {
  total_tenant: number;
  level_tenant: {
    pra_inkubasi: Number;
    inkubasi: Number;
    inkubasi_lanjutan: Number;
    scale_up: Number;
  };
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

export default function BasicStatistics(props: SectionStp) {
  const { total_tenant, level_tenant } = props;
  return (
    <Container maxW={"8xl"} px={{ base: 6, md: 20, "2xl": 55 }} mb="55">
      <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        py={10}
        fontWeight={"bold"}
      >
        {total_tenant} Tenant Solo Technopark
      </chakra.h1>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }}
        spacing={{ base: 5, lg: 8 }}
        // px={{ base: 3, md: 20 }}
      >
        <StatsCard
          title={"Pra Inkubasi"}
          stat={`${level_tenant.pra_inkubasi}`}
          icon={<BsPerson size={"3em"} />}
        />
        <StatsCard
          title={"Inkubasi"}
          stat={`${level_tenant.inkubasi}`}
          icon={<FiServer size={"3em"} />}
        />
        <StatsCard
          title={"Inkubasi Lanjutan"}
          stat={`${level_tenant.inkubasi_lanjutan}`}
          icon={<GoLocation size={"3em"} />}
        />
        <StatsCard
          title={"Scale Up"}
          stat={`${level_tenant.scale_up}`}
          icon={<BsBuilding size={"3em"} />}
        />
      </SimpleGrid>
    </Container>
  );
}
