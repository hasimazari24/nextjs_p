"use client";

import Navbar from "./template/Navbar";
import Footer from "./template/Footer";
import type { Metadata } from "next";
import { usePathname } from "next/navigation";
// import { useState } from "react";

export const metadata: Metadata = {
  title: process.env.APP_NAME,
  description: process.env.APP_DESCRIPTION,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div>
      {pathname === "/login" ? (
        <div>{children}</div>
      ) : (
        <div>
          <Navbar />
          {children}
          <Footer />
        </div>
      )}
    </div>
  );
}
