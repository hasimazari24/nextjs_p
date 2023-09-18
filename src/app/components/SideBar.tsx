"use client";
import NextLink from "next/link";
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  BoxProps,
  FlexProps,
  Img,
} from "@chakra-ui/react";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsBuilding, BsPeople } from "react-icons/bs";
import { IconType } from "react-icons";
import { useAuth } from "./AuthContext";

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

const LinkItems_admin: Array<LinkItemProps> = [
  { name: "Dashboard", icon: AiOutlineDashboard, href: "/" },
  { name: "Data Tenant", icon: BsBuilding, href: "/startup" },
  { name: "Data User", icon: BsPeople, href: "/user" },
];

const LinkItems_tenant: Array<LinkItemProps> = [
  { name: "Dashboard", icon: AiOutlineDashboard, href: "/dashboard" },
  { name: "Data Tenant", icon: BsBuilding, href: "/startup" },
];

const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  return (
    <NextLink href={link} passHref>
      {/* <a> */}
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
            mr="2.5"
            fontSize="18"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
      {/* </a> */}
    </NextLink>
  );
};

const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
  const { user } = useAuth();
  const getUser: any = user;

  const renderMenu = () => {
    if (getUser){
      if (getUser?.role === "Super Admin") {
        return LinkItems_admin.map((link) => (
          <NavItem key={link.name} icon={link.icon} link={link.href}>
            {link.name}
          </NavItem>
        ));
      } if (getUser?.role === "Tenant") {
        return LinkItems_tenant.map((link) => (
          <NavItem key={link.name} icon={link.icon} link={link.href}>
            {link.name}
          </NavItem>
        ));
      }
    }
  }
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
        <Img src="/img/LOGO-STP.png" h="50px" />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {renderMenu()}
    </Box>
  );
};

export default Sidebar;
