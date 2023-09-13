"use client";
import {
  Box,
  useDisclosure,
  Drawer,
  DrawerContent,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import { redirect } from "next/navigation";
import { useAuth } from "../components/AuthContext";

export const metadata = {
  title: process.env.APP_NAME,
  description: process.env.APP_DESCRIPTION,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  
  if (user === 401) {
    redirect("/login");
  }

  return (
    <main>
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
            h="100%"
            // alignItems=""
            // justifyContent="center"
            // cursor="pointer"
            minHeight="82vh"
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
    </main>
  );
}
