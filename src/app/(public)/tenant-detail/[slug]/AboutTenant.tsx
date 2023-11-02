import * as React from "react";
import {
  MdMailOutline,
  MdOutlineMap,
  MdOutlineContacts,
  MdSchool,
  MdMap,
} from "react-icons/md";
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
} from "@chakra-ui/react";
import ContactInfo from "./ContactTenant";
import SocialInfo from "./MediaSocial";
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

const AboutTenant = ({ tenant }: { tenant: TenantTypes.Tenant }) => {
  const program: TenantTypes.tenant_program[] = Array.isArray(
    tenant.tenant_program,
  )
    ? tenant.tenant_program.map((d) => ({
        program: d.program,
        id: d.id,
      }))
    : [];
  const socmed: TenantTypes.TLinks[] = Array.isArray(tenant.tenant_link)
    ? tenant.tenant_link.map((d) => ({
        id: d.id,
        title: d.title,
        url: d.url,
      }))
    : [];

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
    <Stack spacing={8}>
      {/* <HStack justifyContent={"center"}>
        <Box
          w={["20px", "30px"]}
          h={["20px", "30px"]}
          bg={"red.500"}
          borderRadius={"full"}
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
        >
          <Icon
            as={FaInfo}
            w={["15px", "20px"]}
            h={["15px", "20px"]}
            color={"white"}
          />
        </Box>
        <Text fontWeight={"bold"} color={"red.500"} fontSize={["sm", "lg"]}>
          DETAIL INFORMATION
        </Text>
      </HStack> */}
      <Stack
        // columns={{ base: 1, lg: 2 }}
        // spacing={{ base: 6, md: 12, lg: 20 }}
        flexDirection={{ base: "column", lg: "row" }}
        spacing={{ base: 10, md: 4, lg: 20 }}
      >
        <Box aria-label="box-kiri" w="full">
          <Stack
            spacing={4}
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <Box>
              <Text
                fontWeight="bold"
                color="gray.900"
                fontSize={["20px", "2xl", "3xl"]}
                // fontSize={["xl", "2xl", "3xl"]}
              >
                Tentang
              </Text>
            </Box>
            <Box>
              <Text
                fontWeight="regular"
                color="gray.900"
                fontSize="md"
                textAlign="justify"
              >
                {tenant.description}
              </Text>
            </Box>
            <Stack
              spacing={4}
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              <ContactInfo
                icon={MdMap}
                title="Address"
                content={tenant.address}
                label="alamat"
                size={24}
              />

              {program && program.length > 0 && (
                <ContactInfo
                  icon={MdSchool}
                  title="Program"
                  tags={program}
                  label="program"
                  size={24}
                  content=""
                />
              )}

              <ContactInfo
                icon={AiOutlineCrown}
                title="Founder"
                content={tenant.founder}
                label="founder"
                size={24}
              />
            </Stack>
          </Stack>
        </Box>
        {socmed && socmed.length > 0 && (
          <Box aria-label="box-kanan">
            <Stack
              // alignItems="flex-start"
              // justifyContent="flex-start"
              spacing={4}
            >
              <Text
                fontWeight="bold"
                color="gray.900"
                fontSize={["20px", "2xl", "3xl"]}
                w="180px"
              >
                Sosial Media
              </Text>
              <Box mt="-5px">
                <Stack
                  spacing={4}
                  flexWrap={"wrap"}
                  direction={{ base: "row", lg: "column" }}
                  // alignItems={{ base: "flex-start", md: "space-between" }}
                  justifyContent={{ base: "flex-start", sm: "space-between" }}
                  // w={{ base: "auto", sm: "230px", md: "230px" }}
                  w="full"
                >
                  {socmed.map((d) => (
                    <SocialInfo
                      key={d.id}
                      icon={getIconByTitle(d.title)}
                      title={d.title}
                      content={d.url}
                      href={d.url}
                      label={d.title}
                    />
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Box>
        )}
      </Stack>
    </Stack>
  );
};

export default AboutTenant;
