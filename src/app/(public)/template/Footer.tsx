
'use client'

import {
  Box,
  chakra,
  Container,
  SimpleGrid,
  Stack,
  HStack,
  Text,
  Icon,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
  Center,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { FaInstagram, 
  FaTwitter, 
  FaYoutube,  
  FaFacebookF,  
  FaLinkedin, 
  FaTiktok,
  FaBuilding,
  FaMapPin,
  FaPhoneAlt,
  FaEnvelopeOpen,
  FaGlobe,} from 'react-icons/fa'
import { BiBorderRadius, BiMailSend } from 'react-icons/bi'

const Logo = (props: any) => {
  return (
    <img
      // height={32} 
      width={"75%"}
      viewBox="0 0 120 28"
      src="/img/LOGO-STP.png"
      alt="Logo Solo Technopark" 
      style={{
        boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: 'white',
        // Tambah Shadow
      }}
      {...props}
    />
  );
}


const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode
  label: string
  href: string
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

const GoogleMaps = () => {
  return (
    // <iframe
    //   src="https://www.google.com/maps/place/Solo+Techno+Park/@-7.5560692,110.8512916,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7a16e2b5ffa643:0xa0bf36ec85b94dfb!8m2!3d-7.5560692!4d110.8538665!16s%2Fg%2F1pp2tkfp9?entry=ttu"
    //   width="250"
    //   height="250"
    //   style={{ borderRadius: 0 }}
    //   allowFullScreen={true}
    //   loading="lazy"
    //   title="Google Maps" 
    // ></iframe>

    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.173350501295!2d110.85129157461252!3d-7.556069192457686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a16e2b5ffa643%3A0xa0bf36ec85b94dfb!2sSolo%20Techno%20Park!5e0!3m2!1sid!2sid!4v1695269322692!5m2!1sid!2sid"
      width="250"
      height="250"
      style={{
        borderRadius:"15px",
        boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
      }}
      allowFullScreen={true}
      loading="lazy"
      title="Google Maps" 

    ></iframe>

  );
};

const LargeWithNewsletter = () => {
  return (
    <Box
      bg={useColorModeValue("red.600", "gray.900")}
      // style={{
      //   borderTopRightRadius: '15px', // Border radius sudut atas kanan
      //   borderTopLeftRadius: '15px',  // Border radius sudut atas kiri
      //   borderBottomRightRadius: '0', // Border radius sudut bawah kanan
      //   borderBottomLeftRadius: '0',  // Border radius sudut bawah kiri
      // }}
      color={useColorModeValue("gray.50", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box 
              //border="2px solid white" 
              borderRadius="10px" 
              padding="2"
              //bg="gray.500"
            >
              <Logo color={useColorModeValue("gray.700", "white")} />
            </Box>
            <Text fontSize={"sm"}>© 2023 Solo Technopark. All rights reserved</Text>
              <Stack direction={"row"} spacing={6}>
                <SocialButton label={"Facebook"} href={"https://www.facebook.com/solotechnopark.id?mibextid=ZbWKwL"}>
                  <FaFacebookF />
                </SocialButton>
                <SocialButton label={"Instagram"} href={"https://www.instagram.com/solotechnopark_official/?hl=id"}>
                  <FaInstagram />
                </SocialButton>
                <SocialButton label={"Twitter"} href={"https://twitter.com/solo_technopark"}>
                  <FaTwitter />
                </SocialButton>
              </Stack>
              <HStack spacing={6}>
                <SocialButton label={"Linkedld"} href={"https://www.linkedin.com/company/solo-technopark/"}>
                  <FaLinkedin />
                </SocialButton>
                <SocialButton label={"TikTok"} href={"https://www.tiktok.com/@solotechnopark"}>
                  <FaTiktok />
                </SocialButton>
                <SocialButton label={"YouTube"} href={"https://www.youtube.com/channel/UCqtTWpV2tExmQ1pQQLILd2Q"}>
                  <FaYoutube />
                </SocialButton>
              </HStack>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Kunjungi Juga</ListHeader>
            <HStack spacing={2} alignItems="center">
              <Icon as={FaGlobe} w={4} h={4} color="teal.200" /> {/* Ikon Link */}
              <Box as="a" href={"https://solotechnopark.id/"}>Solo Technopark</Box>
            </HStack>
            <HStack spacing={2} alignItems="center">
              <Icon as={FaGlobe} w={4} h={4} color="teal.200" /> {/* Ikon Link */}
              <Box as="a" href={"https://incubator.solotechnopark.id/"}>Inkubator STP</Box>
            </HStack>
            <HStack spacing={2} alignItems="center">
              <Icon as={FaGlobe} w={4} h={4} color="teal.200" /> {/* Ikon Link */}
              <Box as="a" href={"#"}>Assesment STP</Box>
            </HStack>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Hubungi Kami</ListHeader>
            <HStack spacing={3} alignItems="center">
              <Icon as={FaBuilding} w={4} h={4} color="teal.200" />
              <Box as="a" href={"https://www.google.com/maps/place/Solo+Techno+Park/@-7.5560692,110.8512916,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7a16e2b5ffa643:0xa0bf36ec85b94dfb!8m2!3d-7.5560692!4d110.8538665!16s%2Fg%2F1pp2tkfp9?entry=ttu"}>Gedung Solo Trade Center</Box>
            </HStack>
            <HStack spacing={3} alignItems="center">
              <Icon as={FaMapPin} w={4} h={4} color="teal.200" />
              <Box as="a" href={"https://www.google.com/maps/place/Solo+Techno+Park/@-7.5560692,110.8512916,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7a16e2b5ffa643:0xa0bf36ec85b94dfb!8m2!3d-7.5560692!4d110.8538665!16s%2Fg%2F1pp2tkfp9?entry=ttu"}>Jl. Ki Hajar Dewantara No. 19 Jebres Kec. Jebres, Kota Surakarta</Box>
            </HStack>
            <HStack spacing={3} alignItems="center">
              <Icon as={FaPhoneAlt} w={4} h={4} color="teal.200" />
              <Box as="a" href={"wa.me/+62271666628"}>+62 271 666 628</Box>
            </HStack>
            <HStack spacing={3} alignItems="center">
              <Icon as={FaEnvelopeOpen} w={4} h={4} color="teal.200" />
              <Box as="a" href={"mailto:info@solotechnopark.id"}>info@solotechnopark.id</Box>
            </HStack>
            
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Find Us</ListHeader>
            {/* Google Maps */}
            <GoogleMaps />
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default LargeWithNewsletter;
