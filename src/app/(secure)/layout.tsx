"use client";
import {
  Box,
  useDisclosure,
  Drawer,
  DrawerContent,
  Flex,
  Center,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Sidebar from "../components/template/SideBar";
import Header from "../components/template/Header";
import { redirect } from "next/navigation";
import { useAuth } from "../components/utils/AuthContext";
import React, { Suspense, ReactNode } from "react";
// import Loading from "@/app/loading";

// export const metadata = {
//   title: process.env.APP_NAME,
//   description: process.env.APP_DESCRIPTION,
// };

const LoadingPage = (text: string) => {
  return (
    <Center h="100%" m="10" flexDirection={"column"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        mb="3"
      />
      <Text as="i" whiteSpace={"normal"}>
        {text}
      </Text>
    </Center>
  );
};

export default function Layout({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, loadingValidation } = useAuth();

  if (user === 401) {
    redirect("/login");
  }

  return (
    <main>
      {loadingValidation ? (
        LoadingPage("Sedang melakukan validasi, mohon tunggu sebentar ...")
      ) : (
        <Suspense
          fallback={LoadingPage(
            "Sedang memuat halaman, mohon tunggu sebentar ...",
          )}
        >
          <Box minH="100vh" bg={"gray.100"}>
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
        </Suspense>
      )}
    </main>
  );
  // }
  // }, [user, loadingValidation]);
}
