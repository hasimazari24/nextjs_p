import * as React from "react";
import { Box, Text, Stack, Button, SimpleGrid, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import * as TenantTypes from "@/app/type/tenant-type.d";

const CatalogTenant = ({ tenant }: { tenant: TenantTypes.Tenant }) => {
  // const MotionSimpleGrid = motion(SimpleGrid);
  // const MotionBox = motion(Box);
  const catalog: TenantTypes.tenant_catalog[] = Array.isArray(
    tenant?.tenant_catalog,
  )
    ? tenant.tenant_catalog.map((d) => ({
        id: d.id,
        image_id: d.image_id,
        image_url: d.image_url,
        title: d.title,
        description: d.description,
        url: d.url,
      }))
    : [];
  return (
    <>
      <Stack spacing={4}>
        <Text
          fontWeight="bold"
          color="gray.900"
          fontSize={["20px", "2xl", "3xl"]}
          // fontSize={["xl", "2xl", "3xl"]}
        >
          Katalog
        </Text>
        {catalog && catalog.length > 0 ? (
          catalog.map((data, index) => (
            <Box
              boxShadow={"lg"}
              rounded={"2xl"}
              w="full"
              h={{ base: "auto", lg: "320px" }}
              role={"group"}
              p={8}
              bgColor={"gray.50"}
              key={index}
            >
              <Stack
                spacing={{ base: 4, md: 6, lg: 8 }}
                direction={{ base: "column", md: "row" }}
                // flexWrap={"wrap"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Image
                  rounded={"3xl"}
                  height={{
                    base: "180px",
                    sm: "250px",
                    md: "185px",
                    lg: "250px",
                  }}
                  width={{
                    base: "180px",
                    sm: "250px",
                    md: "185px",
                    lg: "250px",
                  }}
                  objectFit={"cover"}
                  src={data.image_url || "/img/avatar-default.jpg"}
                  alt="#"
                  boxShadow={"xl"}
                  mb={3}
                />
                <Box w="full">
                  <Stack
                    justify={"space-between"}
                    alignItems={"flex-start"}
                    mb={3}
                    // display={"flex"}
                    flexDirection={{ base: "column", md: "row" }}
                    flexWrap={"wrap"}
                    spacing={{ base: 2, md: 1 }}
                  >
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
                      title={data.title}
                      noOfLines={{ base: 2, sm: 1 }}
                    >
                      {data.title}
                    </Text>
                    {data.url && (
                      <NextLink href={data.url} target="_blank">
                        <Button
                          colorScheme="blue"
                          variant="outline"
                          aria-label="btn-more"
                          px={6}
                          rounded={"xl"}
                          size={{ base: "xs", md: "sm" }}
                        >
                          <ExternalLinkIcon mx="2px" />
                          Selengkapnya
                        </Button>
                      </NextLink>
                    )}
                  </Stack>
                  <Stack
                    w="auto"
                    spacing={1}
                    h={{ base: "75px", sm: "100px", md: "120px", lg: "200px" }}
                  >
                    <Text
                      fontSize={["sm", "md", "lg"]}
                      align={"justify"}
                      lineHeight={"25px"}
                      overflowY="auto"
                      css={{
                        // For Chrome
                        "&::-webkit-scrollbar": {
                          width: "4px",
                        },
                        "&::-webkit-scrollbar-track": {
                          background: "#E2E8F0",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: "#A0AEC0",
                          borderRadius: "4px",
                        },
                        // For Firefox
                        scrollbarColor: "#A0AEC0",
                        scrollbarWidth: "thin",
                      }}
                      pr="3"
                    >
                      {data.description}
                    </Text>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          ))
        ) : (
          <p>kosong yaaa</p>
        )}
      </Stack>
    </>
  );
};

export default CatalogTenant;
