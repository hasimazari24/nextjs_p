"use client";

import Navbar from "./template/Navbar";
import Footer from "./template/Footer";
import { usePathname } from "next/navigation";
import { Box } from "@chakra-ui/react";

// export const metadata: Metadata = {
//   title: process.env.APP_NAME,
//   description: process.env.APP_DESCRIPTION,
// };

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <main>
      {pathname === "/login" ? (
        <>{children}</>
      ) : (
        <div>
          <Box display="flex" minH="100vh" w="full" flexDirection={"column"}>
            <Navbar />
            <Box flex="1">{children}</Box>
            <Box as="footer" w="full">
              <Footer />
            </Box>
          </Box>
        </div>
      )}
    </main>
  );
}
