"use client";

import {
  Box,
  Container,
  Flex,
  Text,
  SlideFade,
  Grid,
  Button,
  GridItem,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { FaBookReader, FaNetworkWired } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { GiProgression } from "react-icons/gi";
import NextLink from "next/link";

interface SectionStp {
  total_tenant: number;
  level_tenant: {
    pra_inkubasi: Number;
    inkubasi: Number;
    inkubasi_lanjutan: Number;
    scale_up: Number;
  };
}

export default function BasicStatistics(props: SectionStp) {
  const { total_tenant, level_tenant } = props;
  console.log({ total_tenant, level_tenant });
  return (
    <SlideFade in={true} offsetY="20px">
      <Container
        maxW={"8xl"}
        py={16}
        textAlign={"center"}
        px={{
          base: 6,
          md: 20,
          "2xl": 55,
        }}
      >
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            sm: "repeat(4, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(4, 1fr",
          }}
          templateRows={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
          }}
          gap={6}
        >
          <GridItem
            w="100%"
            colSpan={{
              base: 2,
              sm: 4,
              md: 2,
            }}
            rowSpan={{
              base: 1,
              sm: 1,
              md: 2,
            }}
            textAlign={{ base: "center", md: "left" }}
            my={{ base: 0, md: 10, lg: 14 }}
          >
            <Heading as={"h3"} size={"xl"} mb={3}>
              Solo Technopark
              {total_tenant !== undefined ||
                (total_tenant === 0 && (
                  <>
                    <br />
                    Memiliki&nbsp;
                    <Text as={"span"} color={"red.400"}>
                      {total_tenant} Tenant
                    </Text>
                  </>
                ))}
            </Heading>
            <Text mb={3} size={{ base: "md", lg: "lg" }}>
              Pusat Inovasi dan Vokasi yang Memadukan Unsur Pengembangan Iptek,
              Kebutuhan Pasar, Industri dan Bisnis Untuk Penguatan Daya Saing
              Daerah.
            </Text>
            <NextLink href={`${process.env.APP_URL}/tenant`} passHref>
              <Button
                colorScheme="red"
                bgGradient="linear(to-r, red.400, red.500, red.600)"
                color="white"
                variant="solid"
              >
                Lihat Tenant
              </Button>
            </NextLink>
          </GridItem>
          <GridItem
            w="100%"
            p={{ base: 2, md: 3 }}
            boxShadow="xs"
            border="1px"
            borderColor="gray.200"
            rounded="lg"
            bgColor={"gray.50"}
            _hover={{ boxShadow: "md" }}
          >
            <Icon as={HiUserGroup} boxSize={8} />
            <Flex flexDirection={"column"}>
              <Text fontSize={"4xl"} fontWeight={"bold"}>
                {level_tenant?.pra_inkubasi === undefined ||
                level_tenant?.pra_inkubasi === 0
                  ? "-"
                  : `${level_tenant?.pra_inkubasi}`}
              </Text>
              <Box fontSize={"xs"}>Pra Inkubasi</Box>
            </Flex>
          </GridItem>
          <GridItem
            w="100%"
            p={{ base: 2, md: 3 }}
            boxShadow="xs"
            border="1px"
            borderColor="gray.200"
            rounded="lg"
            bgColor={"gray.50"}
            _hover={{ boxShadow: "md" }}
          >
            <Icon as={FaBookReader} boxSize={8} />
            <Flex flexDirection={"column"}>
              <Text fontSize={"4xl"} fontWeight={"bold"}>
                {level_tenant?.inkubasi === undefined ||
                level_tenant?.inkubasi === 0
                  ? "-"
                  : `${level_tenant?.inkubasi}`}
              </Text>
              <Box fontSize={"xs"}>Inkubasi</Box>
            </Flex>
          </GridItem>
          <GridItem
            w="100%"
            p={{ base: 2, md: 3 }}
            boxShadow="xs"
            border="1px"
            borderColor="gray.200"
            rounded="lg"
            bgColor={"gray.50"}
            _hover={{ boxShadow: "md" }}
          >
            <Icon as={FaNetworkWired} boxSize={8} />
            <Flex flexDirection={"column"}>
              <Text fontSize={"4xl"} fontWeight={"bold"}>
                {level_tenant?.inkubasi_lanjutan === undefined ||
                level_tenant?.inkubasi_lanjutan === 0
                  ? "-"
                  : `${level_tenant?.inkubasi_lanjutan}`}
              </Text>
              <Box fontSize={"xs"}>Inkubasi Lanjutan</Box>
            </Flex>
          </GridItem>
          <GridItem
            w="100%"
            p={{ base: 2, md: 3 }}
            boxShadow="xs"
            border="1px"
            borderColor="gray.200"
            rounded="lg"
            bgColor={"gray.50"}
            _hover={{ boxShadow: "md" }}
          >
            <Icon as={GiProgression} boxSize={8} />
            <Flex flexDirection={"column"}>
              <Text fontSize={"4xl"} fontWeight={"bold"}>
                {level_tenant?.scale_up === undefined ||
                level_tenant?.scale_up === 0
                  ? "-"
                  : `${level_tenant?.scale_up}`}
              </Text>
              <Box fontSize={"xs"}>Scale Up</Box>
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </SlideFade>
  );
}
