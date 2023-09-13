"use client";

import {
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
  MenuItem,
  List,
  ListItem,
  MenuList,
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
import { IconType } from "react-icons";
import Link from "next/link";
import { ImProfile } from "@react-icons/all-files/im/ImProfile";
import { RiLogoutBoxRLine } from "@react-icons/all-files/ri/RiLogoutBoxRLine";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "./AuthContext";

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

  const { user, logout } = useAuth();
  const getUser : any = user;

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack>
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
            <Box onClick={toggleDropdown} cursor="pointer">
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{getUser ? getUser.fullname : null}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {getUser ? getUser.role : null}
                  </Text>
                </VStack>

                <Box display={{ base: "none", lg: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </Box>
            {isOpen && (
              <Box
                position="absolute"
                top="100%"
                right="0"
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
                w="300px"
                p="3"
                borderWidth="1px"
                borderRadius="lg"
                // onClick={closeDropdown}
                boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
                zIndex="1"
              >
                <Center p="3">
                  <VStack>
                    <Avatar
                      size={"2xl"}
                      src={
                        "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                      }
                    />
                    <Text fontSize="sm">Justina Clark</Text>
                    <Text fontSize="sm" color="gray.600" mt="-1.5">
                      Admin
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
                  >
                    Log Out&nbsp;
                    <RiLogoutBoxRLine />
                  </Button>
                </HStack>
              </Box>
            )}
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
