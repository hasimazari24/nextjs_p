"use client";
import * as React from "react";
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
  Heading,
  IconButton,
} from "@chakra-ui/react";
// import ContactInfo from "./ContactTenant";
import { motion } from "framer-motion";
import * as TenantTypes from "@/app/type/tenant-type.d";

const AwardTenant = ({ tenant }: { tenant: TenantTypes.Tenant }) => {
  // const MotionSimpleGrid = motion(SimpleGrid);
  // const MotionBox = motion(Box);
  const award: TenantTypes.tenant_award[] = Array.isArray(
    tenant?.tenant_award,
  )
    ? tenant.tenant_award.map((d) => ({
        id: d.id,
        image_id: d.image_id,
        image_url: d.image_url,
        name: d.name,
        rank: d.rank
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
              <Stack
                key={index}
                maxW={"xl"}
                p={4}
                boxShadow={"lg"}
                // rounded={"2xl"}
                bgColor={"gray.50"}
                spacing="2"
                rounded="2xl"
                align="center"
                // flexDirection={"column"}
                // justifyContent={'flex-start'}
              >
                <Image
                  // boxSize={[20,40]}
                  h={{ base: "80px", sm: "140px", xl: "200px" }}
                  maxW={{ base: "80px", sm: "140px", xl: "200px" }}
                  // w={"xl"}
                  objectFit={"cover"}
                  src={data.image_url || "/img/tenant-logo-default.png"}
                  rounded={{ base: "xl", lg: "3xl" }}
                  boxShadow="xl"
                  mb={[2, 4]}
                />
                <Text
                  as="b"
                  fontSize={["sm", "lg", "xl"]}
                  textOverflow="ellipsis"
                  align="center"
                  cursor={"pointer"}
                  overflow="hidden"
                  title={data.rank}
                  noOfLines={{ base: 2, sm: 1 }}
                >
                  {data.rank}
                </Text>
                <Text
                  textAlign="center"
                  fontSize={["sm", "md"]}
                  textOverflow="ellipsis"
                  align="center"
                  cursor={"pointer"}
                  overflow="hidden"
                  noOfLines={2}
                  title={data.name}
                >
                  {data.name}
                </Text>
              </Stack>
            ))}
          </Grid>
        ) : (
          <p>belum ada </p>
        )}
      </Stack>
    </Box>
  );
};

export default AwardTenant;
