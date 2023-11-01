"use client";

import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  IconButton,
  createIcon,
  Center,
  VStack,
  Avatar,
  TabPanel,
  IconProps,
  useColorModeValue,
  HStack,
  Spacer,
  SimpleGrid,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  PopoverTrigger,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
} from "@chakra-ui/react";
import AwardsTenant from "./AwardTenant";
// import TeamTenant from "../TeamTenant";
import TeamTenant from "./TeamTenant";
import CatalogTenant from "./CatalogTenant";

import { IoMedal, IoLogoFacebook } from "react-icons/io5";
import { FaMedal, FaInfo, FaShoppingBag, FaImages } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { IconType } from "react-icons";
import { RiPictureInPicture2Fill } from "react-icons/ri";
import * as TenantTypes from "@/app/type/tenant-type.d";
import AboutTenant from "./AboutTenant";
import NextLink from "next/link";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import GalleryTenant from "./GalleryTenant";

interface TabCustomProps {
  icon: IconType;
  title: string;
  size?: number;
}

const TenantDetail = ({ tenant }: { tenant: TenantTypes.Tenant }) => {
  // const dataTenant: any = tenant;
  // tenant.flatMap((d) => [({
  //   name: d.name,
  //   motto: d.motto,
  //   description: d.description,
  //   address: d.address,
  //   contact: d.contact,
  //   email: d.email,
  //   founder: d.founder,
  //   level_tenant: d.level_tenant,
  //   image_url: d.image_url,
  //   image_banner_url: d.image_banner_url,
  // })]);
  // console.log(dataTenant.tenant_link);
  return (
    <>
      <Box
        position={"relative"}
        height={"208px"}
        width={"100%"}
        overflow={"hidden"}
      >
        {/* Begron */}
        <Box
          backgroundImage={`url(${tenant.image_banner_url})`}
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundPosition="center"
          aria-label="background-cover"
          filter="auto"
          brightness="60%"
          top={0}
          left={0}
          w={"100%"}
          h={"100%"}
        />
      </Box>
      <Container maxW={"8xl"} px={{ base: 6, md: 20, "2xl": 55 }}>
        {/* <Stack> */}
        <Avatar
          boxSize={["96px", "128px"]}
          mt={{ base: "-14", md: "-16", lg: "-16" }}
          src={tenant.image_url || "/img/tenant-banner-default.jpg"}
          borderWidth={"4px"}
          borderColor={"grey.100"}
          bgColor={"white"}
          // mx={["30px", "80px", "140px"]}
        />
        <Heading
          fontSize={["2xl", "3xl", "4xl"]}
          fontWeight="bold"
          my={4}
          style={{
            lineHeight: "1.1",
            // textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
          }}
        >
          {tenant.name}
        </Heading>
        {/* </Stack> */}
        <Stack
          // templateColumns={isDesktop ? "80% 10%" : "100%"}
          // columns={{base: 1, lg:2}}
          flexDirection={{ base: "column", lg: "row" }}
          spacing={{ base: 4, md: 4, lg: 16 }}
        >
          <Box w={"full"}>
            <Stack
              spacing={4}
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
              aria-label="area-kiri"
            >
              <Text
                fontSize={["sm", "md", "lg"]}
                fontWeight="regular"
                color="gray.900"
                textAlign={"justify"}
                aria-label="motto"
                // style={{
                //   lineHeight: "1.2",
                // }}
              >
                {tenant.motto}
              </Text>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="bold"
                color="black"
              >
                Level Tenant :{" "}
                <Text as="b" color="red.500">
                  {tenant.level_tenant}
                </Text>
              </Text>
            </Stack>
          </Box>
          <Box>
            <Stack
              flexDirection={{ base: "row", lg: "column" }}
              justifyContent={"flex-start"}
              aria-label="area-kanan"
            >
              <Popover>
                <PopoverTrigger>
                  <Button
                    leftIcon={<MdEmail />}
                    colorScheme="blue"
                    variant="outline"
                    aria-label="btn-email"
                    px={6}
                    size={{ base: "xs", md: "sm" }}
                  >
                    E-mail
                  </Button>
                </PopoverTrigger>
                <PopoverContent w={"auto"} maxW={"sm"}>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>E-mail</PopoverHeader>
                  <PopoverBody>
                    <Text
                      href={`mailto:${tenant.email}`}
                      as={NextLink}
                      color={"blue.400"}
                      _hover={{
                        textDecoration: "underline",
                      }}
                    >
                      {tenant.email}
                      <ExternalLinkIcon mx="3px" />
                    </Text>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger>
                  <Button
                    leftIcon={<MdPhone />}
                    colorScheme="blue"
                    variant="outline"
                    aria-label="btn-contact"
                    size={{ base: "xs", md: "sm" }}
                  >
                    Telp.
                  </Button>
                </PopoverTrigger>
                <PopoverContent w={"auto"} maxW={"sm"}>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Telepon</PopoverHeader>
                  <PopoverBody>
                    <Text
                      href={`tel:${tenant.contact}`}
                      as={NextLink}
                      color={"blue.400"}
                      _hover={{
                        textDecoration: "underline",
                      }}
                    >
                      {tenant.contact}
                      <ExternalLinkIcon mx="3px" />
                    </Text>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <Spacer />
            </Stack>
          </Box>
        </Stack>
      </Container>

      <Tabs isFitted>
        <Container maxW={"8xl"} px={{ base: 6, md: 20, "2xl": 55 }} pt="3">
          <TabList justifyContent={"left"} display="flex" flexWrap="wrap">
            <TabCustom title="Tentang" icon={FaInfo} />
            <TabCustom title="Prestasi" icon={FaMedal} />
            <TabCustom title="Katalog" icon={FaShoppingBag} />
            <TabCustom title="Team" icon={BsPeopleFill} />
            <TabCustom title="Galeri" icon={FaImages} />
          </TabList>
        </Container>
        <Box
          position={"relative"}
          height={"100%"}
          width={"100%"}
          overflow={"hidden"}
          bgColor={"gray.50"}
          py={6}
        >
          <Container maxW={"8xl"} px={{ base: 6, md: 20, "2xl": 55 }}>
            <Box rounded={"xl"} bgColor="white" pb="5">
              <TabPanels>
                <TabPanel>
                  <AboutTenant tenant={tenant} />
                </TabPanel>
                <TabPanel>
                  <AwardsTenant tenant={tenant} />
                </TabPanel>
                <TabPanel>
                  <CatalogTenant tenant={tenant} />
                </TabPanel>
                <TabPanel>
                  <TeamTenant tenant={tenant} />
                </TabPanel>
                <TabPanel>
                  <GalleryTenant tenant={tenant} />
                </TabPanel>
              </TabPanels>
            </Box>
          </Container>
        </Box>
      </Tabs>
    </>
  );
};

const TabCustom = ({ icon, title, size = 5 }: TabCustomProps) => {
  return (
    <Tab padding="10px 15px 10px 0px">
      <Icon
        as={icon}
        title={title}
        boxSize={size}
        aria-label={title}
        background={"none"}
        _hover={{ background: "none" }}
      />
      &nbsp;
      {title}
    </Tab>
  );
};

export default TenantDetail;
