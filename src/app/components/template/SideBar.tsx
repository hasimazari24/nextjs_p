"use client";
import NextLink from "next/link";
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  BoxProps,
  FlexProps,
  Img,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { useAuth } from "../utils/AuthContext";
import { permissions } from "@/app/type/role-access-control.d";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  link: string;
  onClose: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const NavItem = ({ icon, children, link, onClose, ...rest }: NavItemProps) => {
  // const [isLoading, setIsLoading] = useState(false);
  // const pathname = usePathname();

  // useEffect(() => {
  //   if (link === pathname) {
  //     setIsLoading(false);
  //   };
  // }, [pathname]);

  return (
    <NextLink href={link} passHref onClick={onClose}>
      {/* <a> */}
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "red.400",
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
    if (getUser) {
      return permissions[getUser.role]?.link_menu.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          link={link.href}
          onClose={() => onClose()}
        >
          {link.name}
        </NavItem>
      ));
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
        <Img src="/img/logo-primary.png" h="35px" />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {renderMenu()}
    </Box>
  );
};

export default Sidebar;
