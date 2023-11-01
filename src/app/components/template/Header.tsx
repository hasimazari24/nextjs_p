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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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
import { RiLogoutBoxRLine, RiArrowDropRightFill } from "react-icons/ri";
import { IconType } from "react-icons";
import Link from "next/link";
// import { ImProfile } from "@react-icons/all-files/im/ImProfile";
// import { RiLogoutBoxRLine } from "@react-icons/all-files/ri/RiLogoutBoxRLine";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { usePathname } from "next/navigation";
import Routes from "@/app/components/utils/Routes";
import { findCurrentRoute } from "@/app/components/utils/Navigation";
import { IRoutes } from "@/app/type/routes-navigation.d";
import { ChevronRightIcon } from "@chakra-ui/icons";

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
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  //split membagi string ke array setiap ada /
  // filter(Boolean) untuk menghapus elemen kosong dari array, jika ada tanda /
  const namePath = pathname.split("/").filter(Boolean);

  let getActiveRoute: IRoutes | undefined = findCurrentRoute(Routes);
  // useEffect(() => {
  //   getActiveRoute = findCurrentRoute(Routes);
  // }, [pathname]);
  // console.log(pathname);
  // console.log(getActiveRoute);
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

      <HStack
        display={{ base: "flex", md: "flex-start" }}
        align="center"
        justify={"center"}
      >
        {/* <VStack
          display={{ base: "none", md: "flex" }}
          alignItems="flex-start"
          spacing="1px"
          ml="2"
        > */}
        <Flex
          // alignItems="center"
          role="group"
          display={{ base: "none", md: "flex" }}
          // alignItems="flex-start"
          alignItems="center"
          justifyContent="center"
          // spacing="1px"
          // cursor="pointer"
        >
          {/* <HStack alignItems="center" justify={"center"}> */}
          <Breadcrumb
            separator={
              <Box mt="-3px">
                <ChevronRightIcon color="gray.500" />
              </Box>
            }
          >
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Box
                  mt="-3px"
                  _hover={{
                    color: "red.500",
                  }}
                >
                  <AiOutlineHome mr="2.5" size="20px" title="Halaman Public" />
                </Box>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <Text>Page</Text>
            </BreadcrumbItem>
            {getActiveRoute?.layout && (
              <BreadcrumbItem>
                <BreadcrumbLink isCurrentPage>
                  <Link href={getActiveRoute?.href}>
                    {getActiveRoute?.layout}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">{getActiveRoute?.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          {/* <Link href="/"></Link>
            <Text>pages</Text>
            <Text>/</Text>
            <Link href={`/${namePath[0]}`}>
              <Text
                _hover={{ textDecoration: "underline" }}
              >{`${namePath[0]}`}</Text>
            </Link>

            {namePath[1] ? (
              <>
                <Text>/</Text>
                <Text>{`${namePath[1]}`}</Text>
              </>
            ) : null} */}

          {/* {namePath.map((name) => (
              <>
                <Text>/</Text>
                <Text>{`${name}`}</Text>
              </>
            ))} */}
          {/* </HStack> */}
        </Flex>
        {/* <Text fontSize="xs" color="gray.600">
            Halaman Daftar Tenant
          </Text> */}
        {/* </VStack> */}
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
            <Popover
              placement="bottom"
              isLazy
              strategy="fixed"
              isOpen={isOpen}
              onClose={closeDropdown}
            >
              <PopoverTrigger>
                <HStack cursor={"pointer"} onClick={toggleDropdown}>
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
                      {getUser ? `${getUser.fullname.substring(0, 25)}` : null}
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
                        <Text fontSize="sm" textAlign={"center"}>
                          {getUser ? getUser.fullname : null}
                        </Text>
                        <Text fontSize="sm" color="gray.600" mt="-1.5">
                          {getUser ? getUser.role : null}
                        </Text>
                      </VStack>
                    </Center>

                    <Divider orientation="horizontal" />

                    <HStack justifyContent="space-between" pt="3">
                      <Link
                        href="/myprofile"
                        passHref
                        // onClick={() => {
                        //   if (pathname !== "/myprofile") setIsLoading(true);
                        // }}
                      >
                        <Button
                          colorScheme="teal"
                          key="Profile"
                          size="sm"
                          fontWeight="normal"
                          onClick={closeDropdown}
                          isLoading={isLoading}
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
