// "use client";
import { Providers } from "./components/utils/Providers";
import { AuthProvider } from "./components/utils/AuthContext";
import type { Metadata } from "next";
import { BreadcrumbProvider } from "./components/utils/BreadCrumbsContext";
// import Loading from "./loading";

export const metadata: Metadata = {
  title: process.env.APP_NAME,
  description: process.env.APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <Suspense fallback={<Loading />}> */}
        <Providers>
          <AuthProvider>
            <BreadcrumbProvider>{children}</BreadcrumbProvider>
          </AuthProvider>
        </Providers>
        {/* </Suspense> */}
      </body>
    </html>
  );
}
