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
  Center,
  Image,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import ContactInfo from "./ContactTenant";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa"; // Tambahkan import untuk ikon FaInfo
import { AiOutlineCrown } from "react-icons/ai";
import DetailSocial from "./DetailSocial";
import { BsStackOverflow } from "react-icons/bs";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const CatalogTenant = () => {
  const MotionSimpleGrid = motion(SimpleGrid);
  const MotionBox = motion(Box);

  return (
    <>
      <Stack spacing={4}>
        <Text
          fontWeight="bold"
          color="gray.900"
          fontSize={["20px", "2xl", "3xl"]}
          // fontSize={["xl", "2xl", "3xl"]}
        >
          Catalog
        </Text>
          <Box
            boxShadow={"lg"}
            rounded={"2xl"}
            w="full"
            h={["auto", "320px"]}
            role={"group"}
            p={8}
            bgColor={"gray.50"}
          >
            <Stack
          spacing={8}
          direction={["column", "row"]}
          // flexWrap={"wrap"}
          alignItems={"start"}
          justifyContent={"space-between"}
        >
              <Image
                rounded={"3xl"}
                height={"250px"}
                width={"250px"}
                objectFit={"cover"}
                src="/img/avatar-default.jpg"
                alt="#"
                boxShadow={"xl"}
                mb={3}
              />
              <Stack direction={"column"} spacing={2}>
                <HStack justify={"space-between"}>
                  <Text
                    as="b"
                    fontWeight={"bold"}
                    fontSize={["lg", "xl"]}
                    whiteSpace="nowrap" // Convert string dadi tipe WhiteSpace
                    textOverflow="ellipsis"
                    maxW={{ base:"200px", sm:"sm" }}
                    cursor={"pointer"}
                    overflow="hidden"
                    title="jan lupaa tambahin ya nyuk"
                  >
                    Barang ini berharga tidak ada harganya mahal yaaaaa
                  </Text>
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    aria-label="btn-more"
                    px={6}
                    rounded={"xl"}
                    size={{ base: "sm", md: "md" }}
                  >
                    <ExternalLinkIcon mx="2px" />
                    Selengkapnya
                  </Button>
                </HStack>
                <Box w="full" h="200px" overflowY="auto" overflowX="hidden">
                  <Text fontSize={"md"} align={"justify"} lineHeight={"25px"}>
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latin professor at Hampden-Sydney College in
                    Virginia, looked up one of the more obscure Latin words,
                    consectetur, from a Lorem Ipsum passage, and going through
                    the cites of the word in classical literature, discovered
                    the undoubtable source. Lorem Ipsum comes from sections
                    1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The
                    Extremes of Good and Evil) by Cicero, written in 45 BC. This
                    book is a treatise on the theory of ethics, very popular
                    during the Renaissance. The first line of Lorem Ipsum,
                    "Lorem ipsum dolor sit amet..",
                  </Text>
                </Box>
              </Stack>
            </Stack>
          </Box>
      </Stack>
    </>
  );
};

export default CatalogTenant;
