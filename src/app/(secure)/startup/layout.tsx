"use client";

import React from 'react';
import {StartUpProvider} from './context/StartUpContext';

export default function layout({ children }: { children: React.ReactNode }) {
  return <StartUpProvider>{children}</StartUpProvider>;
}
