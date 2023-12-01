import * as React from "react";
import { MdSchool, MdMap } from "react-icons/md";
import { Box, Text, Stack } from "@chakra-ui/react";
import ContactInfo from "./ContactTenant";
import SocialInfo from "./MediaSocial";
import { AiFillTwitterCircle, AiOutlineGlobal } from "react-icons/ai";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoYoutube,
} from "react-icons/io5";
import { GiQueenCrown, GiAerialSignal } from "react-icons/gi";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
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
      <Stack
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
                dangerouslySetInnerHTML={{
                  __html: tenant.description,
                }}
              />
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
                icon={GiQueenCrown}
                title="Founder"
                content={tenant.founder}
                label="founder"
                size={24}
              />
              {tenant.valuasi_string !== null && (
                <ContactInfo
                  icon={LiaFileInvoiceDollarSolid}
                  title="Valuasi"
                  content={tenant.valuasi_string}
                  label="valuasi"
                  size={24}
                />
              )}
              {tenant.jangkauan !== null && (
                <ContactInfo
                  icon={GiAerialSignal}
                  title="Jangkauan"
                  content={tenant.jangkauan}
                  label="jangkauan"
                  size={24}
                />
              )}
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
