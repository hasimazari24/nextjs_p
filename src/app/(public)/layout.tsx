"use client";

import Navbar from "./template/Navbar";
import Footer from "./template/Footer";
import { usePathname } from "next/navigation";
import { Box } from "@chakra-ui/react";
// import { Suspense } from "react";
// import Loading from "./loading";

// export const metadata: Metadata = {
//   title: process.env.APP_NAME,
//   description: process.env.APP_DESCRIPTION,
// };

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <main>
      {/* <Box w="full"> */}
      {pathname === "/login" ? (
        <>{children}</>
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

      {/* </Box> */}
    </main>
  );
}
