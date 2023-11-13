import React, { useEffect, useState, Suspense } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Stack,
  Center,
  Avatar,
  VStack,
  HStack,
  Icon,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";
import { TLinks } from "@/app/type/tenant-type.d";
import { axiosCustom } from "@/app/api/axios";
import Link from "next/link";
import Loading from "../loading";

interface MentorPofile {
  id: string;
  username?: string;
  email?: string;
  role: string;
  fullname: string;
  image_url: string;
  user_link?: TLinks;
}

interface ModalProps {
  // isOpen: boolean;
  // onClose: () => void;
  mentor: MentorPofile | null;
}

const ProfileMentor = ({ mentor }: ModalProps) => {
  const [profil, setProfil] = useState<MentorPofile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getIconByTitle = (title: string) => {
    switch (title) {
      case "Website":
        return (
          <Icon
            key={title} // tambahkan key untuk masing-masing elemen
            color="blue.300"
            aria-label="web"
            as={FaGlobe}
            boxSize={"30px"}
            title={title}
            _hover={{
              color: "blue.500", // Ganti dengan warna saat hover
            }}
            backgroundColor="rgba(0, 0, 0, 0)"
          />
        );
      case "Instagram":
        return (
          <Icon
            key={title} // tambahkan key untuk masing-masing elemen
            color="pink.500"
            aria-label="instagram"
            as={FaInstagram}
            boxSize={"30px"}
            title={title}
            _hover={{
              color: "pink.700",
            }}
            backgroundColor="rgba(0, 0, 0, 0)"
          />
        );
      case "Facebook":
        return (
          <Icon
            key={title} // tambahkan key untuk masing-masing elemen
            color="blue.600"
            aria-label="facebook"
            as={FaFacebook}
            boxSize={"30px"}
            title={title}
            _hover={{
              color: "blue.900",
            }}
            backgroundColor="rgba(0, 0, 0, 0)"
          />
        );
      case "Twitter":
        return (
          <Icon
            key={title} // tambahkan key untuk masing-masing elemen
            color="blue.400"
            aria-label="twitter"
            as={FaTwitter}
            boxSize={"30px"}
            title={title}
            _hover={{
              color: "blue.700",
            }}
            backgroundColor="rgba(0, 0, 0, 0)"
          />
        );
      case "YouTube":
        return (
          <Icon
            key={title} // tambahkan key untuk masing-masing elemen
            color="red.500"
            aria-label="youtube"
            as={FaYoutube}
            boxSize={"30px"}
            title={title}
            _hover={{
              color: "red.700",
            }}
            backgroundColor="rgba(0, 0, 0, 0)"
          />
        );
      case "LinkedIn":
        return (
          <Icon
            key={title} // tambahkan key untuk masing-masing elemen
            color="blue.500"
            aria-label="LinkedIn"
            as={FaLinkedin}
            boxSize={"30px"}
            title={title}
            _hover={{
              color: "blue.800",
            }}
            backgroundColor="rgba(0, 0, 0, 0)"
          />
        );
    }
  };

  const getProfil = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(`/user/${mentor?.id}/profile`);
      const timer = setTimeout(() => {
        // setIdTenant(id);
        setProfil(response.data.data); // Set isLoading to false to stop the spinner
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
    } 
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isOpen === true) getProfil();
    // console.log("masuk gk sihh");
  }, [isOpen]);

  return (
    <>
      <HStack
        cursor={"pointer"}
        // direction={{ base: "row", sm: "column", lg: "row" }}
        onClick={onOpen}
      >
        <Avatar
          size={"sm"}
          src={mentor?.image_url || "/img/avatar-default.jpg"}
          backgroundColor={"white"}
        />
        <VStack
          display={{ base: "flex", sm: "none", lg: "flex" }}
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
            {mentor?.fullname}
          </Text>
          <Text fontSize="xs" color="gray.600">
            {mentor?.role}
          </Text>
        </VStack>
        <Box>
          <ExternalLinkIcon color={"blue.500"} />
        </Box>
      </HStack>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setProfil(null);
        }}
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center fontSize={{ base: "15px", md: "16px" }}>
              Profil Mentor
            </Center>
          </ModalHeader>
          <ModalBody>
            <Suspense fallback={<Loading />}>
              {isLoading ? (
                <Loading />
              ) : (
                <Stack justifyContent={"center"} align={"center"} spacing={3}>
                  <Avatar
                    size={"2xl"}
                    src={profil?.image_url || "/img/avatar-default.jpg"}
                    backgroundColor={"gray.50"}
                  />
                  <VStack spacing={0}>
                    <Text
                      as="b"
                      fontWeight={"bold"}
                      fontSize={{ base: "16.5px", md: "17.5px" }}
                      textAlign="center"
                    >
                      {profil?.fullname}
                    </Text>
                    <Text
                      fontSize={{ base: "16px", md: "17px" }}
                      textAlign="center"
                    >
                      {profil?.role}
                    </Text>
                  </VStack>
                  <HStack spacing={{ base: 1, lg: 3 }}>
                    {profil && Array.isArray(profil.user_link)
                      ? profil.user_link.map((d) => (
                          <Link href={d.url} key={d.id} target="_blank">
                            {getIconByTitle(d.title)}
                          </Link>
                        ))
                      : null}
                  </HStack>
                </Stack>
              )}
            </Suspense>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Button
              leftIcon={<CloseIcon />}
              color={"red.400"}
              bgColor="red.50"
              _hover={{
                bg: "red.50",
              }}
              onClick={() => {
                onClose();
                setProfil(null);
              }}
              boxShadow="md"
              size="sm"
              w="120px"
            >
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileMentor;
