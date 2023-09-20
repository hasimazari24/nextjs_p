"use client";

import Navbar from "./template/Navbar";
import type { Metadata } from "next";
// import { useState } from "react";

export const metadata: Metadata = {
  title: process.env.APP_NAME,
  description: process.env.APP_DESCRIPTION,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <Navbar />
        
        {children}
    </div>
  );
}
