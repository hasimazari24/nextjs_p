"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import {
  BsBuilding,
  BsPeople,
  BsFillJournalBookmarkFill,
} from "react-icons/bs";
import { MdOutlineQuiz } from "react-icons/md";
import { ImFileText2 } from "react-icons/im";
import { SiGoogleclassroom } from "react-icons/si";
import {IRoutes} from "@/app/type/routes-navigation.d";

const Routes: IRoutes[] = [
  { name: "Dashboard", icon: AiOutlineDashboard, href: "/dashboard" },
  { name: "Back Panel Tenant", icon: BsBuilding, href: "/backPanelTenant" },
  { name: "Data User", icon: BsPeople, href: "/user" },
  { name: "Data Kuesioner", icon: MdOutlineQuiz, href: "#" },
  { name: "Data Asset", icon: ImFileText2, href: "/assets" },
  { name: "Data Kelas", icon: SiGoogleclassroom, href: "#" },
  { name: "Data Penilaian", icon: BsFillJournalBookmarkFill, href: "#" },
  { name: "My Profile", href: "/myprofile" },
  {
    name: "Program",
    href: "/backPanelTenant",
    layout: "Back Panel Tenant",
    pathname: "/backPanelTenant/program",
  },
  {
    name: "Catalog",
    href: "/backPanelTenant",
    layout: "Back Panel Tenant",
    pathname: "/backPanelTenant/catalog",
  },
  {
    name: "Awards",
    href: "/backPanelTenant",
    layout: "Back Panel Tenant",
    pathname: "/backPanelTenant/awards",
  },
  {
    name: "Team",
    href: "/backPanelTenant",
    layout: "Back Panel Tenant",
    pathname: "/backPanelTenant/team",
  },
  {
    name: "Gallery Events",
    href: "/backPanelTenant",
    layout: "Back Panel Tenant",
    pathname: "/backPanelTenant/gallery",
  },
  //   { name: "Program", href: "/backPanelTenant", layout:"Back Panel Tenant" },
];

export default Routes