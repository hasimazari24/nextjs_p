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
} from "@chakra-ui/react";
import AwardsTenant from "./AwardTenant";
import DetailComponent from "./DetaillTenant";
import DetailSocial from "./DetailSocial";
import TeamTenant from "../TeamTenant";

import { IoMedal, IoLogoFacebook } from "react-icons/io5";
import { FaMedal, FaInfo, FaShoppingBag, FaImages } from "react-icons/fa";
import { useMediaQuery } from "@chakra-ui/react";
import { MdAddAlert, MdEmail, MdInfo, MdPhone, MdPictureInPicture } from "react-icons/md";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { IconType } from "react-icons";
import { RiPictureInPicture2Fill } from "react-icons/ri";


interface TabCustomProps {
  icon: IconType;
  title : string;
  size? : number;

}

const TabCustom = ({icon, title,size=5}: TabCustomProps) => {
  return (
    <Tab>
      <IconButton
      as={icon}
      title={title}
      boxSize={size}
      aria-label={title}
      background={'none'}
      _hover={{background:"none"}}
      />
    </Tab>
  );  
};


export default function TenantDetail() {
  

  return (
    <Box w="full">
      <Stack >
        <Box
          position={"relative"}
          height={'208px'}
          width={"100%"}
          overflow={"hidden"}
        >
          {/* Begron */}
          <Box
            backgroundImage="url('https://images.pexels.com/photos/2467506/pexels-photo-2467506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
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
        
        <Box
          // justify={"left"}
          // mt={[-24, -36, -40]}
          // mt={{ base: "-20%", md: "-25%", lg: "-4%" }}
          // spacing={'25px'}
          aria-label="body-content"
          maxW="80rem"
          mx={['30px','80px','140px']}
          
        >
          
          <Avatar
            boxSize={['96px','128px']}
            mt={{base: "-14", md:"-16", lg:"-16"}}
            src={
              "https://www.tagar.id/Asset/uploads2019/1575050504675-logo-tokopedia.jpg"
            }
            borderWidth={"4px"}
            borderColor={"grey.100"}
          />
          <Heading
                fontSize={["2xl","2xl","4xl"]}
                fontWeight="bold"
                my={2}
                style={{
                  lineHeight: "1.1",
                  // textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                }}
              >
                PT Bank Rakyat Indonesia (Persero) Tbk
          </Heading>
          <Stack
          // templateColumns={isDesktop ? "80% 10%" : "100%"}
          // columns={{base: 1, lg:2}}
          flexDirection={{ base: "column", lg: "row" }}
          spacing={{base: 2, md: 4, lg: 16}}
          >
            <Box w={'full'}>
              <Stack
              spacing={4}
              alignItems={'flex-start'}
              justifyContent={'flex-start'}
              aria-label="area-kiri"
              >
                <Text
                fontSize={['sm','md','lg']} 
                fontWeight="normal"
                color="black"
                textAlign={'justify'}
                aria-label="motto"
                style={{
                  lineHeight: "1.2",
                }}
                >
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer too remaining essentially unchanged maksimal 255 karakter, dan spasi dihitung. Ini adalah Motto Tenant.
              </Text>
              <Text
                fontSize={{ base: "14px", md: "lg", lg: "lg" }}
                fontWeight="reguler"
                color="black"
              >
                Level Tenant :{" "}
                <Text as="b" color="red.500">
                  Inkubasi
                </Text>
              </Text>
              </Stack>
            </Box>
            <Box>
              <Stack flexDirection={{ base: "row", lg: "column" }}
              justifyContent={'flex-start'} 
              aria-label="area-kanan"
              >
                  <Button leftIcon={<MdEmail />} 
                  colorScheme='blue'    
                  variant='outline'
                  aria-label="btn-email"
                  px={6}
                
                  >
                  Email
                  </Button>
                  <Button leftIcon={<MdPhone />} 
                  colorScheme='blue' 
                  variant='outline'
                
                  aria-label="btn-contact">
                  Contact
                  </Button>
                  <Spacer/>
              </Stack>
            </Box>
          </Stack>
          <Tabs isLazy={true} my={4}>
            <TabList justifyContent={'left'}>
              <TabCustom title="Tentang" icon={FaInfo}/>
              <TabCustom title="Prestasi" icon={FaMedal}/>
              <TabCustom title="Produk" icon={FaShoppingBag}/>
              <TabCustom title="Team" icon={BsPeopleFill}/>
              <TabCustom title="Galeri" icon={FaImages}/>
            </TabList>
            <TabPanels>
              <TabPanel><DetailComponent></DetailComponent></TabPanel>
              <TabPanel><AwardsTenant></AwardsTenant></TabPanel>
              <TabPanel><p>Produk</p></TabPanel>
              <TabPanel><p>Team</p></TabPanel>
              <TabPanel><p>Galeri</p></TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Flex>
       
        </Flex>
        {/* <Container maxW={"8xl"} px={{ base: 6, md: 20, "2xl": 55 }} my={'50px'}>
          <DetailComponent></DetailComponent>
        </Container>
        <Container maxW={"full"} px={'full'} my={'50px'} >
          <DetailSocial></DetailSocial>
        </Container>
        <TeamTenant></TeamTenant> */}
      </Stack>
      {/* </Center> */}
      {/* </Stack> */}
      {/* </Container> */}
    </Box>
  );
}
