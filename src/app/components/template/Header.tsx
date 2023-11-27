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
  FlexProps,
  Button,
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Center,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  SlideFade,
} from "@chakra-ui/react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { usePathname } from "next/navigation";
import Routes from "@/app/components/utils/Routes";
// import { findCurrentRoute } from "@/app/components/utils/Navigation";
import { IRoutes } from "@/app/type/routes-navigation.d";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useBreadcrumbContext } from "../utils/BreadCrumbsContext";

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

  // const { user, logout, loadingLogOut } = useAuth();
  const { breadcrumbs } = useBreadcrumbContext();
  const { user, logout } = useAuth();
  const getUser: any = user;
  const [isLoading, setIsLoading] = useState(false);
  //split membagi string ke array setiap ada /
  // filter(Boolean) untuk menghapus elemen kosong dari array, jika ada tanda /
  // const namePath = pathname.split("/").filter(Boolean);

  // let getActiveRoute: IRoutes | undefined = findCurrentRoute(Routes);

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
        flexWrap={"wrap"}
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
          {/* <div>{breadcrumbs.join(" > ")}</div> */}
          {/* <HStack alignItems="center" justify={"center"}> */}
          <Breadcrumb
            separator={
              <Box mt="-3px">
                <ChevronRightIcon color="gray.500" />
              </Box>
            }
            w="fit-content"
          >
            <BreadcrumbItem>
              <Link href="/" target="_blank">
                <Box
                  mt="-3px"
                  _hover={{
                    color: "red.500",
                  }}
                >
                  <AiOutlineHome mr="2.5" size="20px" title="Halaman Public" />
                </Box>
              </Link>
            </BreadcrumbItem>

            {/* <BreadcrumbItem>
              <Text>Page</Text>
            </BreadcrumbItem> */}
            {breadcrumbs.length > 0 &&
              breadcrumbs.map((value, index) => {
                const last = index === breadcrumbs.length - 1;
                return (
                  // <SlideFade in={breadcrumbs.length > 0} key={index}>
                  <BreadcrumbItem
                    key={index}
                    isCurrentPage={last}
                    w="fit-content"
                  >
                    {!last ? (
                      <Link href={value.href}>
                        <Text
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                          maxW={{ md: "100px", lg: "200px", xl: "full" }}
                          _hover={{ textDecoration: "underline" }}
                        >
                          {value.name}
                        </Text>
                      </Link>
                    ) : (
                      <Text
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        maxW={{ md: "100px", lg: "200px", xl: "full" }}
                      >
                        {value.name}
                      </Text>
                    )}
                  </BreadcrumbItem>
                  // </SlideFade>
                );
              })}
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
                    src={getUser ? getUser?.image_url : null}
                  />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text
                      fontSize="sm"
                      noOfLines={1}
                      whiteSpace={"nowrap"}
                      // textOverflow={"nowrap"}
                      // flex="1"
                    >
                      {getUser ? `${getUser?.fullname.substring(0, 25)}` : null}
                    </Text>
                    <Text
                      fontSize="xs"
                      color="gray.600"
                      noOfLines={1}
                      whiteSpace={"nowrap"}
                      // textOverflow={"nowrap"}
                      // flex="1"
                    >
                      {getUser ? getUser?.role : null}
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
                          src={getUser ? getUser?.image_url : null}
                        />
                        <Text fontSize="sm" textAlign={"center"}>
                          {getUser ? getUser?.fullname : null}
                        </Text>
                        <Text fontSize="sm" color="gray.600" mt="-1.5">
                          {getUser ? getUser?.role : null}
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
                        // isLoading={loadingLogOut}
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
