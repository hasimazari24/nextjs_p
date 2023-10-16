import * as React from "react";
import { MdMailOutline, MdOutlineMap, MdOutlineContacts, MdSchool, MdMap } from "react-icons/md";
import { Box, Text, Flex, HStack, Stack, VStack, Icon, Button, Spacer, Tag } from "@chakra-ui/react";
import ContactInfo from "./ContactTenant";
import { FaInfo, FaMedal } from "react-icons/fa"; // Tambahkan import untuk ikon FaInfo

const DetailComponent = () => {
  return (
    <VStack spacing={2} p={10}>
      <HStack justifyContent={'center'}>
        <Box
        w={["20px","30px"]}
        h={["20px","30px"]}
        bg={'red.500'}
        borderRadius={'full'}
        display={'flex'}
        alignItems="center"
        justifyContent={'center'}
        >
          <Icon as={FaInfo}
          w={["15px","20px"]}
          h={["15px","20px"]}
          color={'white'}
          /> 
        </Box>
        <Text
        fontWeight={'bold'}
        color={'red.500'}
        fontSize={['sm','lg']}
        >
          DETAIL INFORMATION
        </Text>
      </HStack>
      
      <Flex justifyContent="center" flexDir={{ base: "column", md: "row" }}>
        <Box 
        w={{ base: "100%", md: "50%" }}
        >
          <Stack spacing={8} p={10} alignItems="flex-start" justifyContent="flex-start">
            <VStack>
              <Text fontWeight="bold" color="gray.900" fontSize={['xl','2xl','3xl']}>
                Apa itu <Text as="span" color="red.500">Tokopedia</Text> ?
              </Text>
            </VStack> 
            <VStack>
              <Text fontWeight="regular" color="gray.900" fontSize={['xs','sm']} textAlign="justify">
                Tokopedia merupakan perusahaan teknologi Indonesia dengan misi pemerataan ekonomi secara digital di Indonesia. Tokopedia juga salah satu platform dengan basis open marketplace yang memudahkan Anda para pelaku bisnis untuk memulai bisnis online Anda di manapun dan kapanpun.
              </Text>
            </VStack> 
            <VStack>
              <HStack spacing={6}>
                <Button leftIcon={<Icon as={MdMap} />} colorScheme="red" variant="solid" size={['sm','md']}>
                  Selengkapnya
                </Button>
              </HStack>
            </VStack>
          </Stack>
        </Box>
        <Box 
        w={{ base: "100%", md: "50%" }}
        >
          <Stack spacing={6} p={10} alignItems="flex-start" justifyContent="flex-start" boxSize={'480px'}>
            <ContactInfo
              icon={<MdMailOutline />}
              title="Email"
              content="tokopedia.service@mail.com"
              label="email"
              size={24}
            />
            <ContactInfo
              icon={<MdMap />}
              title="Address"
              content="Suite 220 9954 Gottlieb Throughway"
              label="alamat"
              size={24}
            />
            <ContactInfo
              icon={<MdOutlineContacts />}
              title="Contact"
              content="62 8973672137"
              label="kontak"
              size={24}
            />
            <ContactInfo
              icon={<MdSchool/>}
              title="Program"
              tags={["PPBT","SII","FIW","SOLOCORN2021","SOLOCORN 2022","SOLOTHESPIRITOJAVA"]}
              label="program"
              size={24}
              content=""
              
            />
          </Stack>
        </Box>
      </Flex>
    </VStack>
  );
};

export default DetailComponent;
