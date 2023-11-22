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
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { IRoutes } from "@/app/type/routes-navigation.d";

const Routes: IRoutes[] = [
  { name: "Dashboard", icon: AiOutlineDashboard, href: "/dashboard" },
  { name: "Data User", icon: BsPeople, href: "/user" },
  { name: "Data Valuasi", icon: LiaFileInvoiceDollarSolid, href: "/valuasi" },
  { name: "Data Tenant", icon: BsBuilding, href: "/backPanelTenant" },
  { name: "Data Kelas", icon: SiGoogleclassroom, href: "/kelas" },
  {
    name: "Data Penilaian",
    icon: BsFillJournalBookmarkFill,
    href: "/penilaian",
  },
  { name: "Data Kuesioner", icon: MdOutlineQuiz, href: "#" },
  { name: "Data Asset", icon: ImFileText2, href: "/assets" },
  { name: "My Profile", href: "/myprofile" },
  {
    name: "Program",
    href: "/backPanelTenant",
    layout: "Data Tenant",
    pathname: "/backPanelTenant/program",
  },
  {
    name: "Catalog",
    href: "/backPanelTenant",
    layout: "Data Tenant",
    pathname: "/backPanelTenant/catalog",
  },
  {
    name: "Awards",
    href: "/backPanelTenant",
    layout: "Data Tenant",
    pathname: "/backPanelTenant/awards",
  },
  {
    name: "Team",
    href: "/backPanelTenant",
    layout: "Data Tenant",
    pathname: "/backPanelTenant/team",
  },
  {
    name: "Gallery Events",
    href: "/backPanelTenant",
    layout: "Data Tenant",
    pathname: "/backPanelTenant/gallery",
  },
  //   { name: "Program", href: "/backPanelTenant", layout:"Data Tenant" },
];

export default Routes;
