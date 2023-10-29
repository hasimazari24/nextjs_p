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
import NextLink from "next/link";

const CatalogTenant = () => {
  const MotionSimpleGrid = motion(SimpleGrid);
  const MotionBox = motion(Box);

  return (
    <>
      {/* sub heading */}
      <Box w={"full"} mb={3}>
        <Text
          fontWeight="bold"
          color="gray.900"
          fontSize={["20px", "2xl", "3xl"]}
        >
          Katalog
        </Text>
      </Box>
      {/* looping container */}
      <Box
        p={8}
        display={{ md: "flex" }}
        bgColor={"gray.50"}
        boxShadow={"lg"}
        rounded={"2xl"}
        h={{ md: "320px" }}
        mb={6}
      >
        <Box flexShrink={0} display={"flex"}>
          <Image
            rounded={"3xl"}
            height={"250px"}
            width={"250px"}
            objectFit={"cover"}
            src="/img/avatar-default.jpg"
            alt="#" // kasih nama title katalog
            boxShadow={"xl"}
            display={"block"}
            margin={"auto"}
          />
        </Box>
        <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text
              as="b"
              fontWeight={"bold"}
              fontSize={["lg", "xl"]}
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              cursor={"pointer"}
              overflow="hidden"
              title="jan lupaa tambahin ya nyuk"
            >
              Barang ini berharga tidak ada harganya mahal yaaaaa
            </Text>
            <NextLink href={"#"} target="_blank">
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
          </Box>
          <Text
            mt={2}
            fontSize={"md"}
            align={"justify"}
            lineHeight={"25px"}
            h="215px"
            overflowY="auto"
            pr="3"
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
          >
            Getting a new business off the ground is a lot of hard work. Here
            are five ideas you can use to find your first customers. Contrary to
            popular belief, Lorem Ipsum is not simply random text. It has roots
            in a piece of classical Latin literature from 45 BC, making it over
            2000 years old. Richard McClintock, a Latin professor at
            Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Impedit natus nesciunt fugit ad, deleniti aliquam nobis distinctio
            neque eligendi magni tenetur nam nostrum totam Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Asperiores numquam labore illum
            quibusdam nihil. Ex sunt ut recusandae doloribus magnam nisi iure
            vitae blanditiis delectus. praesentium!
          </Text>
        </Box>
      </Box>
      {/* cheat untuk mengurangi margin bottom, wkekek. jangan dihapus gaes */}
      <Box mb={-6} display={"block"} />
    </>
  );
};

export default CatalogTenant;
