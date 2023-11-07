import React from "react";
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
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";

interface dataDetail {
  name: string;
  description: string;
  address: string;
  contact: string;
  email: string;
  founder: string;
  level_tenant: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileMentor = ({ isOpen, onClose }: ModalProps) => {
  const getIconByTitle = (title: string) => {
    switch (title) {
      case "Website":
        return FaGlobe;
      case "Instagram":
        return FaInstagram;
      case "Facebook":
        return FaFacebook;
      case "Twitter":
        return FaTwitter;
      case "YouTube":
        return FaYoutube;
      case "LinkedIn":
        return FaLinkedin;
    }
  };
  // console.log(tableData);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center fontSize={{ base: "15px", md: "16px" }}>
              Profil Mentor
            </Center>
          </ModalHeader>
          <ModalBody>
            <Stack justifyContent={"center"} align={"center"} spacing={3}>
              <Avatar
                size={"2xl"}
                src={"/img/tenant-logo-default.png"}
                backgroundColor={"gray.50"}
              />
              <VStack spacing={0}>
                <Text
                  as="b"
                  fontWeight={"bold"}
                  fontSize={{ base: "16.5px", md: "17.5px" }}
                  textAlign="center"
                >
                  Mr. Simple Simple Simple
                </Text>
                <Text
                  fontSize={{ base: "16px", md: "17px" }}
                  textAlign="center"
                >
                  Mentor
                </Text>
              </VStack>
              <HStack spacing={{ base: 1, lg: 3 }}>
                <Icon
                  color="blue.600"
                  aria-label="web"
                  as={FaFacebook}
                  boxSize={"30px"}
                  //   title={link.url}
                  _hover={{
                    color: "blue.900",
                  }}
                  backgroundColor="rgba(0, 0, 0, 0)"
                />
              </HStack>
            </Stack>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button
              leftIcon={<CloseIcon />}
              color={"red.400"}
              bgColor="red.50"
              _hover={{
                bg: "red.50",
              }}
              onClick={onClose}
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
