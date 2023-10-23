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
import { FaInfo, FaMedal } from "react-icons/fa"; // Tambahkan import untuk ikon FaInfo
import { AiOutlineCrown } from "react-icons/ai";
import { wrap } from "module";

const DetailComponent = () => {
  return (
    <VStack spacing={8} py={{ base: "4", md: "6" }}>
      <HStack justifyContent={"center"}>
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
      </HStack>

      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 6, md: 12, lg: 20 }}
      >
        <Box w={"full"}>
          <Stack
            spacing={4}
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <Box>
              <Text
                fontWeight="bold"
                color="red.500"
                fontSize={["xl", "2xl", "3xl"]}
              >
                Tokopedia Indonesia
              </Text>
            </Box>
            <Box>
              <Text
                fontWeight="regular"
                color="gray.900"
                fontSize={["sm", "md"]}
                textAlign="justify"
              >
                Tokopedia merupakan perusahaan teknologi Indonesia dengan misi
                pemerataan ekonomi secara digital di Indonesia. Tokopedia juga
                salah satu platform dengan basis open marketplace yang
                memudahkan Anda para pelaku bisnis untuk memulai bisnis online
                Anda di manapun dan kapanpun.
              </Text>
            </Box>
            <Button
              leftIcon={<Icon as={MdMap} />}
              colorScheme="red"
              variant="solid"
              size={["sm", "md"]}
            >
              Selengkapnya
            </Button>
          </Stack>
        </Box>
        <Box w={"full"}>
          <Stack
            spacing={6}
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <ContactInfo
              icon={AiOutlineCrown}
              title="Founder"
              content="Alex Major"
              label="founder"
              size={24}
            />
            <ContactInfo
              icon={MdMailOutline}
              title="Email"
              content="tokopedia.service@mail.com"
              label="email"
              size={24}
            />
            <ContactInfo
              icon={MdMap}
              title="Address"
              content="Suite 220 9954 Gottlieb Throughway sgdfhjksdjbfkslfgjl sjhdfkjsdfksdjhf sdhfjskdfksjfd"
              label="alamat"
              size={24}
            />
            <ContactInfo
              icon={MdOutlineContacts}
              title="Contact"
              content="62 8973672137"
              label="kontak"
              size={24}
            />
            <ContactInfo
              icon={MdSchool}
              title="Program"
              tags={[
                "PPBT",
                "SII",
                "FIW",
                "SOLOCORN2021",
                "SOLOCORN 2022",
                "SOLOTHESPIRITOJAVA",
              ]}
              label="program"
              size={24}
              content=""
            />
          </Stack>
        </Box>
      </SimpleGrid>
    </VStack>
  );
};

export default DetailComponent;
