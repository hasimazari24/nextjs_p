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
import { BsClipboardCheck } from "react-icons/bs";

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
  {
    name: "Data Kuesioner",
    icon: BsClipboardCheck,
    href: "/kuesioner",
  },
  { name: "Data Asset", icon: ImFileText2, href: "/assets" },
  { name: "My Profile", href: "/myprofile" },
  { name: "Nilai Tugas", href: "/penilaian/tugas" },
  { name: "Nilai Tenant", href: "/penilaian/tenant" },
  { name: "Nilai Mentor", href: "/penilaian/mentor" },
  {
    name: "Daftar Pertanyaan Nilai Mentor",
    href: "/penilaian/mentor/daftarpertanyaan",
  },
  { name: "Hasil Nilai Mentor", href: "/penilaian/mentor/hasilpenilaian" },
  {
    name: "Program",
    href: "/backPanelTenant/program",
  },
  {
    name: "Catalog",
    href: "/backPanelTenant/catalog",
  },
  {
    name: "Awards",
    href: "/backPanelTenant/awards",
  },
  {
    name: "Team",
    href: "/backPanelTenant/team",
  },
  {
    name: "Gallery Events",
    href: "/backPanelTenant/gallery",
  },
  {
    name: "Daftar Pertanyaan",
    href: "/kuesioner/daftar",
  },
  {
    name: "Grup Pertanyaan",
    href: "/kuesioner/grup",
  },
  {
    name: "Kelola Kuesioner",
    href: "/kuesioner/kelola",
  },
  {
    name: "Review Kuesioner",
    href: "/kuesioner/review",
  },
  //   { name: "Program", href: "/backPanelTenant", layout:"Data Tenant" },
];

export default Routes;
