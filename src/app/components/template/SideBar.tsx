"use client";
import NextLink from "next/link";
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Center,
  BoxProps,
  FlexProps,
  Img,
  Spinner,
} from "@chakra-ui/react";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsBuilding, BsPeople } from "react-icons/bs";
import { IconType } from "react-icons";
import { useAuth } from "../utils/AuthContext";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

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
  { name: "Dashboard", icon: AiOutlineDashboard, href: "/dashboard" },
  { name: "Data Tenant", icon: BsBuilding, href: "/tenant" },
  { name: "Data User", icon: BsPeople, href: "/user" },
];

const LinkItems_tenant: Array<LinkItemProps> = [
  { name: "Dashboard", icon: AiOutlineDashboard, href: "/dashboard" },
  { name: "Data Tenant", icon: BsBuilding, href: "/tenant" },
];

const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (link === pathname) {
      setIsLoading(false);
    };
  }, [pathname]);

  return (
    <NextLink
      href={link}
      passHref
      onClick={() => {
        if (link !== pathname) setIsLoading(true);
      }}
    >
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
        {children} &nbsp;
        {isLoading ? (
          <Spinner className="spinner" color="blue.500" />
        ) : null}
      </Flex>
      {/* </a> */}
    </NextLink>
  );
};

const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
  const { user } = useAuth();
  const getUser: any = user;

  const renderMenu = () => {
    if (getUser) {
      if (getUser?.role === "Super Admin") {
        return LinkItems_admin.map((link) => (
          <NavItem key={link.name} icon={link.icon} link={link.href}>
            {link.name}
          </NavItem>
        ));
      }
      if (getUser?.role === "Tenant") {
        return LinkItems_tenant.map((link) => (
          <NavItem key={link.name} icon={link.icon} link={link.href}>
            {link.name}
          </NavItem>
        ));
      }
    }
  };
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
      <Flex h="16" alignItems="center" mx="8" justifyContent="center">
        <Img src="/img/siteman-primary.png" h="35px" />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {renderMenu()}
    </Box>
  );
};

export default Sidebar;
