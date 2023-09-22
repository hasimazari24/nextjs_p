"use client";
import {
  Box,
  useDisclosure,
  Drawer,
  DrawerContent,
  useColorModeValue,
  Flex,
  Center,
  Spinner,
} from "@chakra-ui/react";
import Sidebar from "../components/template/SideBar";
import Header from "../components/template/Header";
import { redirect } from "next/navigation";
import { useAuth } from "../components/utils/AuthContext";
import { useEffect } from "react";

export const metadata = {
  title: process.env.APP_NAME,
  description: process.env.APP_DESCRIPTION,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, loadingValidation } = useAuth();

  if (user === 401) {
    redirect("/login");
  }

  return (
    <main>
      {loadingValidation ? (
        <>
          <Center h="100%" m="10">
            <Spinner className="spinner" size="xl" color="blue.500" />
          </Center>
        </>
      ) : (
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
          <Sidebar
            onClose={() => onClose}
            display={{ base: "none", md: "block" }}
          />
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full"
          >
            <DrawerContent>
              <Sidebar onClose={onClose} />
            </DrawerContent>
          </Drawer>
          {/* <SidebarWithHeader /> */}
          {/* <Header /> */}
          <Header onOpen={onOpen} />
          <Box ml={{ base: 0, md: 60 }} p="4">
            <Flex
              w="full"
              // alignItems=""
              // justifyContent="center"
              // cursor="pointer"
              minHeight="85vh"
              bg="white"
              rounded="xl"
              shadow="lg"
              // borderWidth="1px"
            >
              <Box p="6" height="full" width="full">
                {children}
              </Box>
            </Flex>
          </Box>
        </Box>
      )}
    </main>
  );
}
