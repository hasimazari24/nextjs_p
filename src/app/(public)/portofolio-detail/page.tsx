'use client'

import {
  Box,
  Td,
  Tr,
  IconButton,
  Table,
  Tbody,
  chakra,
  Container,
  Spacer,
  HStack,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
} from '@chakra-ui/react'
import { IoAnalyticsSharp, IoLogoBitcoin, IoSearchSharp } from 'react-icons/io5'
import { ReactElement, useState } from 'react'
import ModalSocial from "../../components/modal/modal-social";
import { GrMoreVertical } from "react-icons/gr";
import { SiMicrosoftteams } from "react-icons/si";
import { BiLinkExternal } from "react-icons/bi";
import { CiGlobe } from "react-icons/ci";
import { axiosCustom } from "@/app/api/axios";
import Link from "next/link";
import { FiFacebook } from "react-icons/fi";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";

interface FeatureProps {
  text: string
  iconBg: string
  icon?: ReactElement
}

interface SplitWithImageProps {
  selectedSocialLinks: any[]; // Sesuaikan dengan tipe yang benar
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex w={8} h={8} align={'center'} justify={'center'} rounded={'full'} bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  )
}



export default function SplitWithImage() {
  return (
    <Container maxW={'7xl'}>
      <SimpleGrid columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10, lg: 20, }}
        py={{ base: 18, md: 24 }}>
        <Stack spacing={{ base: 5, md: 8 }}>
          <Box as={'header'}>
            <HStack spacing={8}>
              <Box
                w="75px"  
                h="75px"  
                borderRadius="full"
                overflow="hidden"
              >
                <img
                  src="/img/lego-logo.png"  
                  alt="Foto Profil"
                />
              </Box>
              <VStack align="start" spacing={1}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: 'xl', sm: '3xl', lg: '4xl' }}>
                  Lego.ID
                </Heading>
                <HStack>
                <Text
                  color={useColorModeValue('gray.900', 'gray.400')}
                  fontWeight={300}
                  fontSize={'xl'}>
                  Level Tenant :
                </Text>
                <Text
                  color={useColorModeValue('gray.900', 'gray.400')}
                  fontWeight={600}
                  fontSize={'xl'}>
                  Pasca Inkubasi
                </Text>
                </HStack>
              </VStack>
            </HStack>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
            }>

            {/* <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize={'2xl'}
                fontWeight={'300'}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore
              </Text>
              <Text fontSize={'lg'}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid amet
                at delectus doloribus dolorum expedita hic, ipsum maxime modi nam officiis
                porro, quae, quisquam quos reprehenderit velit? Natus, totam.
              </Text>
            </VStack> */}

            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Deskripsi
              </Text>
              <Text fontSize={'lg'}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid amet
                at delectus doloribus dolorum expedita hic, ipsum maxime modi nam officiis
                porro, quae, quisquam quos reprehenderit velit? Natus, totam.
              </Text>

              {/* <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Chronograph</ListItem>
                  <ListItem>Master Chronometer Certified</ListItem>{' '}
                  <ListItem>Tachymeter</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>Anti‑magnetic</ListItem>
                  <ListItem>Chronometer</ListItem>
                  <ListItem>Small seconds</ListItem>
                </List>
              </SimpleGrid> */}
            </Box>
            
            {/* <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Tenant Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Between lugs:
                  </Text>{' '}
                  20 mm
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Bracelet:
                  </Text>{' '}
                  leather strap
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Case:
                  </Text>{' '}
                  Steel
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Case diameter:
                  </Text>{' '}
                  42 mm
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Dial color:
                  </Text>{' '}
                  Black
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Crystal:
                  </Text>{' '}
                  Domed, scratch‑resistant sapphire crystal with anti‑reflective treatment
                  inside
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Water resistance:
                  </Text>{' '}
                  5 bar (50 metres / 167 feet){' '}
                </ListItem>
              </List>
            </Box> */}
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Tenant Details
              </Text>

              <SimpleGrid spacing={10}>
                <Table pt="0">
                  <Tbody>
                    <Tr key={2} pb="3">
                      <Td width="20%" pr="0" pl="0" pt="0">
                        Founder
                      </Td>
                      <Td
                        width="5%"
                        pr="0"
                        pl="0"
                        pt="0"
                        textAlign="center"
                      >
                        :
                      </Td>
                      <Td width="75%" pr="0" pt="0" pl="0">
                        {/* {dataMyTenant?.founder} */}
                      </Td>
                    </Tr>

                    <Tr key={1}>
                      <Td width="20%" pr="0" pl="0">
                        Alamat
                      </Td>
                      <Td width="5%" textAlign="center" pr="0" pl="0">
                        :
                      </Td>
                      <Td width="75%" pr="0" pl="0">
                        {/* {dataMyTenant?.address} */}
                      </Td>
                      {/* Tambahkan kolom lainnya sesuai kebutuhan */}
                    </Tr>

                    <Tr key={4} pb="3">
                      <Td width="20%" pr="0" pl="0">
                        E-mail
                      </Td>
                      <Td width="5%" pr="0" pl="0" textAlign="center">
                        :
                      </Td>
                      <Td width="75%" pr="0" pl="0">
                        {/* {dataMyTenant?.email} */}
                      </Td>
                    </Tr>
                    <Tr key={5} borderBottom={"hidden"}>
                      <Td width="20%" pr="0" pl="0">
                        Kontak
                      </Td>
                      <Td width="5%" pr="0" pl="0" textAlign="center">
                        :
                      </Td>
                      <Td width="75%" pr="0" pl="0">
                        {/* {dataMyTenant?.contact} */}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Sosial Media
              </Text>
            </Box>
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={
              '/img/legoo.jpg'
            }
            objectFit={'cover'}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  )
}