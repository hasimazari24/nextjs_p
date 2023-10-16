'use client'

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
  IconProps,
  useColorModeValue,
  HStack,
  Spacer,
} from '@chakra-ui/react'
import Awards from "../../template/AwardTenant";
import DetailComponent from "../../template/DetaillTenant";

import { IoMedal, IoLogoFacebook } from "react-icons/io5";
import { FaMedal, FaInfo } from "react-icons/fa";
import { useMediaQuery } from '@chakra-ui/react';


export default function TenantDetail() {

  const [isDesktop] = useMediaQuery("(min-width: 768px)");

  return (
    <Container maxW={'7xl'} px={0}>
      <Stack>
        <Center py={0}>
          <Stack
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}
            >
            <Box
              h={'560px'}
              w={'full'}
              position="relative">
                {/* Begron */}
              <Box
                backgroundImage="url('https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
                backgroundSize="cover"
                backgroundPosition="center"
                position="absolute"
                style={{filter : 'brightness(0.5)'}}
                top={0}
                left={0}
                w="100%"
                h="100%"
              />

              {/* Tulisan */}
              <Stack
                position="absolute"
                top="45%"
                left="50%"
                transform="translate(-50%, -50%)"
                textAlign="center"
                maxW="100%"
         
                >
                <VStack spacing={1}>
                  <Text 
                    fontSize={['3xl','5xl']} 
                    fontWeight="bold"
                    color="white"
                    style={{lineHeight:'1.1', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)'}}
                  >
                    Tokopedia Indonesia
                  </Text>
                  <Text
                  fontSize={['lg','2xl']} 
                  fontWeight="reguler"
                  color="white"
                  style={{lineHeight:'1.2', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)'}}
                  >
                    Supaya silaturahmi tidak terputus, Pinjam Dulu Seratus. Tetapi alangkah baiknya Limaratus
                  </Text>
                </VStack>
                <VStack >
                    <HStack>
                      <Text 
                      fontSize={['md','lg']} 
                      fontWeight="reguler"
                      color="white"
                      style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)'}}
                      >
                        Level Tenant : <Text as="span" color="yellow.300">Inkubasi</Text>
                      </Text>
                    </HStack>
                </VStack>
              </Stack>
            </Box>
            <Flex justify={'center'} mt={[-24,-36,-40]}>
              <Avatar
                boxSize={['180px', '240px', '300px']}
                mb={6}
                src={
                  'https://www.tagar.id/Asset/uploads2019/1575050504675-logo-tokopedia.jpg'
                }
                css={{
                  border: '8px solid white',
                }}
              />
            </Flex>
            <Flex
            bg={"url('/img/liquid-velvet.svg')center/cover no-repeat fixed"}
            justifyContent="center"  
            >
              
              <Stack spacing={4} p={10}>
                <VStack spacing={2}>
                  <HStack justifyContent="center">
                      <Box
                       w={["20px", "30px"]}
                       h={["20px", "30px"]}
                      bg="white"
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      >
                        <Icon as={FaMedal} 
                        w={["15px", "20px"]} 
                        h={["15px", "20px"]}
                        color="red.500"
                         />
                      </Box>
                      <Text fontWeight="bold" 
                      color="white"
                      fontSize={['sm','lg']}
                      >
                      OUR ACHIEVEMENT
                      </Text>
                  </HStack>
                  <Text fontWeight="bold" 
                  color="white" 
                  fontSize={['xl','2xl','3xl']}
                  >
                  Prestasi yang Kami Raih
                  </Text>
                </VStack>
                <HStack 
                align={isDesktop ? 'center' : 'start'} 
                justify={isDesktop ? 'center' : 'center'} 
                spacing={'6'}
                >
                  {isDesktop ? ( 
                  <>
                  <Awards></Awards> 
                  <Awards></Awards>
                  <Awards></Awards>
                  </>
                  ) :(
                    <VStack align={'center'} spacing={'-2'}>
                      <Awards></Awards>
                      <Awards></Awards>
                      <Awards></Awards>
                    </VStack>
                  )}
                </HStack>
              </Stack>
            </Flex>
            <DetailComponent></DetailComponent>
          </Stack>
        </Center>
      </Stack>
    </Container>
  )
}


