"use client";

import {
  Icon,
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  useDisclosure,
  Spinner,
  FlexProps,
  Menu,
  MenuButton,
  Button,
  Divider,
  Img,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Center,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IconType } from "react-icons";
import Link from "next/link";
// import { ImProfile } from "@react-icons/all-files/im/ImProfile";
// import { RiLogoutBoxRLine } from "@react-icons/all-files/ri/RiLogoutBoxRLine";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";

interface LinkItemProps {
  name: string;
  icon: IconType;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const Header = ({ onOpen, ...rest }: MobileProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const { user, logout, loadingLogOut } = useAuth();
  const getUser: any = user;

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="16"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={"space-between"}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      {/* <Box display={{ base: "flex", md: "none" }}>
        <Img src="/img/LOGO-STP.png" h="50px" />
      </Box> */}

      <HStack display={{ base: "flex", md: "flex-start" }}>
        <VStack
          display={{ base: "none", md: "flex" }}
          alignItems="flex-start"
          spacing="1px"
          ml="2"
        >
          <Flex
            alignItems="center"
            // p="4"
            // mx="4"
            // borderRadius="lg"
            role="group"
            cursor="pointer"
            // _hover={{
            //   bg: "cyan.400",
            //   color: "white",
            // }}
            // {...rest}
          >
            <Icon mr="2.5" fontSize="20" as={AiOutlineHome} />
            <Text>pages / tenant</Text>
          </Flex>
          {/* <Text fontSize="xs" color="gray.600">
            Halaman Daftar Tenant
          </Text> */}
        </VStack>
      </HStack>

      <HStack display={{ base: "flex", md: "flex-end" }}>
        {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        /> */}
        <Flex alignItems={"center"}>
          <Box
            position="relative"
            display="inline-block"
            py={2}
            transition="all 0.3s"
            _focus={{ boxShadow: "none" }}
          >
            <Popover placement="bottom" isLazy strategy="fixed">
              <PopoverTrigger>
                <HStack cursor={"pointer"}>
                  <Avatar
                    size={"sm"}
                    src={getUser ? getUser.image_url : null}
                  />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">
                      {getUser ? getUser.fullname : null}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      {getUser ? getUser.role : null}
                    </Text>
                  </VStack>

                  <Box display={{ base: "none", lg: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </PopoverTrigger>
              <PopoverContent _focus={{ boxShadow: "none" }} w="full">
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <Box w="300px">
                    <Center p="3">
                      <VStack>
                        <Avatar
                          size={"2xl"}
                          src={getUser ? getUser.image_url : null}
                        />
                        <Text fontSize="sm">
                          {getUser ? getUser.fullname : null}
                        </Text>
                        <Text fontSize="sm" color="gray.600" mt="-1.5">
                          {getUser ? getUser.role : null}
                        </Text>
                      </VStack>
                    </Center>

                    <Divider orientation="horizontal" />

                    <HStack justifyContent="space-between" pt="3">
                      <Link href="/myprofile" passHref>
                        <Button
                          colorScheme="teal"
                          key="Profile"
                          size="sm"
                          fontWeight="normal"
                          onClick={closeDropdown}
                        >
                          <ImProfile />
                          &nbsp;Profile
                        </Button>
                      </Link>

                      <Button
                        colorScheme="red"
                        key="LogOut"
                        size="sm"
                        fontWeight="normal"
                        onClick={logout}
                        isLoading={loadingLogOut}
                      >
                        Log Out&nbsp;
                        <RiLogoutBoxRLine />
                      </Button>
                    </HStack>
                  </Box>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
        </Flex>
      </HStack>
    </Flex>
  );
};

// const Header = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   return (
//     <div>
//       <HeaderContent onOpen={onOpen} />
//     </div>
//   );
// };

export default Header;
