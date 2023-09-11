// app/providers.tsx
'use client'
import React from "react";
import customTheme from "./theme";

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
    <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}