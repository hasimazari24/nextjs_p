"use client";

import Navbar from "./template/Navbar";
import Footer from "./template/Footer";
import type { Metadata } from "next";
import { usePathname } from "next/navigation";
import { PublicProvider } from "./utils/PublicContext";
import {Box, Flex} from "@chakra-ui/react";
// import { useState } from "react";

export const metadata: Metadata = {
  title: process.env.APP_NAME,
  description: process.env.APP_DESCRIPTION,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <main>
      {/* <Box w="full"> */}
      <PublicProvider>
        {pathname === "/login" ? (
          <div>{children}</div>
        ) : (
          <div>
            <Box display="flex" minH="100vh" w="full" flexDirection={"column"}>
              <Navbar />
              <Box flex="1">{children}</Box>
              <Box as="footer" w="full">
                {/* Footer Anda di sini */}
                <Footer />
              </Box>
            </Box>
          </div>
        )}
      </PublicProvider>
      {/* </Box> */}
    </main>
  );
}
