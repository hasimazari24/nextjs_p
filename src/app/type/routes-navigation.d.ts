"use client";
import { IconType } from "@chakra-ui/react";

export interface IRoutes {
  name: string;
  icon?: IconType;
  href: string;
  pathname?: string;
  layout?:string;
}
