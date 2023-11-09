"use client";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { MdOutlinePeople } from "react-icons/md";
import { HiOutlineNewspaper } from "react-icons/hi";
import {
  Box,
  Button,
  HStack,
  Stack,
  Image,
  VStack,
  Text,
  Avatar,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TagLeftIcon,
  useTab,
} from "@chakra-ui/react";
import React from "react";
import TenantKelas from "./tenant-kelas";


// { params }: { params: { slug: string } 


function page() {

  return (
    <Stack spacing={6}>
      <Flex
        flexDirection={{ base: "column-reverse", md: "row" }} // Arah tata letak berdasarkan layar
        justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
        align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
      >
        <HStack w="full" spacing={6} alignItems="flex-start">
          <Image
            // rounded={{ base: "xl", lg: "3xl" }}
            // height={{
            //   base: "118px",
            //   sm: "126px",
            //   md: "158px",
            //   xl: "250px",
            // }}
            //   maxH={{
            //     base: "200px",
            //     // sm: "126px",
            //     sm: "120px",
            //     lg: "190px",
            //     xl: "220px",
            //   }}
            // maxW={"13rem"}
            maxW={{
              base: "9rem",
              // sm: "9rem",
              md: "10rem",
              // lg: "11rem",
              xl: "13rem",
            }}
            objectFit={"cover"}
            src={"/img/class-avatar.png"}
            alt="#"
            // boxShadow={"xl"}
          />
          <VStack spacing={2} align="flex-start">
            <Text as="b" fontWeight={"bold"} fontSize={["17px", "xl", "2xl"]}>
              Belajar Bersamaaa Lorem ipsum dolor sit amet consectetur
              adipisicing elit.
            </Text>
            <Text fontSize={["sm", "md", "lg"]}>Dibuat 29 Okt 2023</Text>
            <HStack
              cursor={"pointer"}
              
              // direction={{ base: "row", sm: "column", lg: "row" }}
              // onClick={onOpen}
            >
              <Avatar
                size={"md"}
                src={"/img/tenant-logo-default.png"}
                backgroundColor={"white"}
              />
              <VStack
                display={{ base: "none", sm: "flex" }}
                alignItems="flex-start"
                spacing={0}
                ml="2"
              >
                <Text
                  fontSize="sm"
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
                  // cursor={"default"}
                  overflow="hidden"
                  title={"Mr. dsfjskndf"}
                  noOfLines={1}
                >
                  Mr. dsfjskndf
                </Text>
                <Text fontSize="xs" color="gray.600">
                  Mentor
                </Text>
              </VStack>
              <Box>
                <ExternalLinkIcon color={"blue.500"} />
              </Box>
            </HStack>
          </VStack>
        </HStack>
        <Button
          // leftIcon={<MdEmail />}
          colorScheme="blue"
          variant="outline"
          aria-label="btn-email"
          px={6}
          size={"sm"}
        >
          Kembali
        </Button>
      </Flex>

      <Text textAlign="justify">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
        corporis, ipsum quod facilis laboriosam in quas natus voluptas. Atque
        magnam nobis facere officia molestiae quibusdam vitae eaque illum
        repellendus sit, cumque distinctio architecto modi provident ipsa!
        Inventore ad maiores impedit distinctio a, iure soluta, beatae facere
        consequatur dolorum odio libero?
      </Text>

      <Tabs variant="unstyled">
        <TabList justifyContent="center">
          <HStack spacing={10}>
            <Tab _selected={{ background: 'blue.500', color: 'white', rounded:'10' }} 
            _focus={{ boxShadow: 'none',   }}
            
            style={{outline:'blue.500'}}
            aria-label="tenant-kelas"
            shadow={'2xl'}
            
            >
              <HStack spacing={2} mx={10} fontSize="lg">
                < MdOutlinePeople/>
                <Text>Tenant</Text>
              </HStack>
            </Tab >
            <Tab _selected={{ background: 'blue.500', color: 'white', rounded:'10', shadow:'' }}
            _focus={{ boxShadow: 'none', }}
            
            style={{outline:'blue.500',}}
            aria-label="sesi-kelas"
            shadow={'2xl'}
            >
              <HStack spacing={2} mx={10} fontSize="lg">
                <HiOutlineNewspaper/>
                <Text>Sesi Kelas</Text>
              </HStack>
            </Tab>
          </HStack>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TenantKelas/>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
}

export default page;
