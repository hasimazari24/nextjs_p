"use client";
import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  HStack,
  Stack,
  VStack,
  Icon,
  Button,
  Spacer,
  Tag,
  Grid,
  Center,
  Image,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
// import ContactInfo from "./ContactTenant";
import { motion } from "framer-motion";
import * as TenantTypes from "@/app/type/tenant-type.d";
import CardAward from "./AwardsCard";

const AwardTenant = ({ tenant }: { tenant: TenantTypes.Tenant }) => {
  // const MotionSimpleGrid = motion(SimpleGrid);
  // const MotionBox = motion(Box);
  const award: TenantTypes.tenant_award[] = Array.isArray(tenant?.tenant_award)
    ? tenant.tenant_award.map((d) => ({
        id: d.id,
        image_id: d.image_id,
        image_url: d.image_url,
        name: d.name,
        rank: d.rank,
      }))
    : [];

  return (
    <Box w="full">
      <Stack spacing={4}>
        <Text
          fontWeight="bold"
          color="gray.900"
          fontSize={["20px", "2xl", "3xl"]}
          // fontSize={["xl", "2xl", "3xl"]}
        >
          Prestasi
        </Text>
        {award && award.length > 0 ? (
          <Grid
            templateColumns={{
              base: "1fr 1fr",
              md: "1fr 1fr 1fr",
              xl: "1fr 1fr 1fr 1fr",
            }}
            // templateColumns={["1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr 1fr"]}
            // flexWrap={"wrap"}
            gap={8}
          >
            {award.map((data, index) => (
              <CardAward data={data} index={index} />
            ))}
          </Grid>
        ) : (
          <Stack justifyContent={"center"} spacing={0} alignItems={"center"}>
            <Image
              src="/img/data-is-empty.png"
              h={{ base: "200px", sm: "250px", md: "350px" }}
              w="auto"
              // w="auto"
              // objectFit={"cover"}
              mb="3"
            />
            <Text
              as="b"
              fontWeight={"bold"}
              fontSize={{ base: "16px", md: "17px" }}
              textAlign={"center"}
            >
              Data Prestasi Kosong
            </Text>
            <Text
              fontSize={{ base: "15.5px", md: "16.5px" }}
              textAlign={"center"}
            >
              Mungkin belum dibuat atau sudah dihapus
            </Text>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default AwardTenant;
