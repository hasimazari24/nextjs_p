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
  SimpleGrid,
  Center,
  Image,
  Heading,
  IconButton,
  Grid,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  AiFillTwitterCircle,
  AiOutlineFacebook,
  AiOutlineCrown,
  AiOutlineGlobal,
} from "react-icons/ai";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoYoutube,
} from "react-icons/io5";
import * as TenantTypes from "@/app/type/tenant-type.d";
import Link from "next/link";

const TeamTenant = ({ tenant }: { tenant: TenantTypes.Tenant }) => {
  // const MotionSimpleGrid = motion(SimpleGrid);
  // const MotionBox = motion(Box);

  const userTenant: TenantTypes.user_tenant[] = Array.isArray(
    tenant?.user_tenant,
  )
    ? tenant.user_tenant.map((d) => ({
        id: d.id,
        image_id: d.image_id,
        image_url: d.image_url,
        fullname: d.fullname,
        position: d.position,
        user_link: d.user_link,
      }))
    : [];

  // console.log(socmed);

  const getIconByTitle = (title: string) => {
    switch (title) {
      case "Website":
        return AiOutlineGlobal;
      case "Instagram":
        return IoLogoInstagram;
      case "Facebook":
        return IoLogoFacebook;
      case "Twitter":
        return AiFillTwitterCircle;
      case "YouTube":
        return IoLogoYoutube;
      case "LinkedIn":
        return IoLogoLinkedin;
    }
  };

  return (
    <>
      <Stack spacing={4}>
        <Text
          fontWeight="bold"
          color="gray.900"
          fontSize={["20px", "2xl", "3xl"]}
          // fontSize={["xl", "2xl", "3xl"]}
        >
          Team
        </Text>
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          }}
          // templateColumns={["1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr 1fr"]}
          // flexWrap={"wrap"}
          alignItems={"center"}
          justifyItems={"center"}
          gap={8}
        >
          {userTenant.map((data, index) => (
            <Stack
              // direction={"column"}
              alignItems={"center"}
              spacing={1}
              w="full"
              h="full"
              p={4}
              boxShadow={"lg"}
              rounded={"2xl"}
              bgColor={"gray.50"}
              key={index}
              // display="flex"
            >
              <Image
                rounded={{ base: "xl", lg: "3xl" }}
                // height={{
                //   base: "118px",
                //   sm: "126px",
                //   md: "158px",
                //   xl: "250px",
                // }}
                h={{
                  base: "200px",
                  // sm: "126px",
                  sm: "140px",
                  lg: "200px",
                  xl: "250px",
                }}
                maxW={{
                  base: "200px",
                  // sm: "126px",
                  sm: "140px",
                  lg: "200px",
                  xl: "250px",
                }}
                objectFit={"cover"}
                src={data.image_url || "/img/tenant-logo-default.png"}
                alt="#"
                boxShadow={"xl"}
                mb={6}
              />
              <Text
                fontSize={"md"}
                align="center"
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
                cursor={"default"}
                overflow="hidden"
                title={data.position}
                noOfLines={{ base: 2, sm: 1 }}
              >
                {data.position}
              </Text>
              <Text
                as="b"
                fontWeight={"bold"}
                fontSize={["lg", "xl"]}
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
                cursor={"default"}
                overflow="hidden"
                title={data.fullname}
                noOfLines={{ base: 2, sm: 1 }}
              >
                {data.fullname}
              </Text>
              <HStack spacing={3} pt="4px">
                {data.user_link && data.user_link.length > 0 ? (
                  data.user_link.map((d) => (
                    <Link href={d.url} target="_blank">
                      <Icon
                        as={getIconByTitle(d.title)}
                        color="black"
                        aria-label={d.title}
                        cursor={"pointer"}
                        // icon={<FaInstagram />}
                        boxSize={{ base: "25px", md: "28px" }}
                        title={d.title}
                        _hover={{
                          color: "red.500",
                        }}
                        backgroundColor="rgba(0, 0, 0, 0)"
                      />
                    </Link>
                  ))
                ) : (
                  <Box>&nbsp;</Box>
                )}
              </HStack>
            </Stack>
          ))}
        </Grid>
      </Stack>
    </>
  );
};

export default TeamTenant;
