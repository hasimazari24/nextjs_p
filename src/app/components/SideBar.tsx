"use client";
import NextLink from "next/link";
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  // NextLink,
  Spinner,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from "react-icons/fi";
import React, { useState, useEffect } from "react";
import { IconType } from "react-icons";

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  link: string;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, href: '/dashboard' },
  { name: "Data Start-Up", icon: FiTrendingUp, href: '/startup' },
  //   { name: "Data User", icon: FiCompass },
  //   { name: "Favourites", icon: FiStar },
  //   { name: "Settings", icon: FiSettings },
];



const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleNavigation = () => {
    setIsLoading(true); // Set isLoading menjadi true saat memulai navigasi
  };

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false); // Setelah navigasi selesai, kembalikan isLoading menjadi false
    }
  }, [isLoading]);

  return (
    <Box onClick={handleNavigation}>
      <NextLink href={link} passHref>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
          &nbsp; {isLoading ? <Spinner size="sm" /> : " "}
        </Flex>
      </NextLink>
    </Box>
  );
};

const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} link={link.href}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

// const Sidebar = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   return (
//     <Box>
//       <SidebarContent
//         onClose={() => onClose}
//         display={{ base: "none", md: "block" }}
//       />
//       <Drawer
//         isOpen={isOpen}
//         placement="left"
//         onClose={onClose}
//         returnFocusOnClose={false}
//         onOverlayClick={onClose}
//         size="full"
//       >
//         <DrawerContent>
//           <SidebarContent onClose={onClose} />
//         </DrawerContent>
//       </Drawer>
//     </Box>
//   );
// };

export default Sidebar;
