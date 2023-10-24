"use client";
import { IconType } from "@chakra-ui/react";
import { AiOutlineDashboard } from "react-icons/ai";
import {
  BsBuilding,
  BsPeople,
  BsFillJournalBookmarkFill,
} from "react-icons/bs";
import { MdOutlineQuiz } from "react-icons/md";
import { ImFileText2 } from "react-icons/im";
import { SiGoogleclassroom } from "react-icons/si";

export interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

export interface FeaturesItem {
    menu : string;
    access:any[]
}

export interface RoleAccessItem {
  // role: string;
  link_menu: LinkItemProps[];
  features: FeaturesItem[];
}

export enum UserRoles {
  SuperAdmin = "Super Admin",
  Tenant = "Tenant",
  Tenant_team = false,
  Mentor = "Mentor",
  Manajemen = "Manajemen",
}

// Definisikan izin berdasarkan menu
export const permissions: Record<UserRoles, RoleAccessItem> = {
  [UserRoles.SuperAdmin]: {
    link_menu: [
      { name: "Dashboard", icon: AiOutlineDashboard, href: "/dashboard" },
      { name: "Data Tenant", icon: BsBuilding, href: "/tenant" },
      { name: "Data User", icon: BsPeople, href: "/user" },
      { name: "Data Kuesioner", icon: MdOutlineQuiz, href: "#" },
      { name: "Data Asset", icon: ImFileText2, href: "/assets" },
    ],
    features: [
      {
        menu: "allmenu",
        access: ["all_access"],
      },
    ],
  },
  [UserRoles.Mentor]: {
    link_menu: [
      { name: "Dashboard", icon: AiOutlineDashboard, href: "/dashboard" },
      { name: "Data Tenant", icon: BsBuilding, href: "/tenant" },
      { name: "Data Kelas", icon: SiGoogleclassroom, href: "#" },
      { name: "Data Penilaian", icon: BsFillJournalBookmarkFill, href: "#" },
    ],
    features: [
      {
        menu: "backPanelTenant",
        access: [],
      },
      {
        menu: "backPanelTenant_catalog",
        access: [],
      },
      {
        menu: "backPanelTenant_team_login",
        access: [],
      },
      {
        menu: "backPanelTenant_team_nonlogin",
        access: [],
      },
      {
        menu: "backPanelTenant_team_social",
        access: [],
      },
      {
        menu: "backPanelTenant_links",
        access: [],
      },
      {
        menu: "backPanelTenant_program",
        access: [],
      },
      {
        menu: "backPanelTenant_awards",
        access: [],
      },
    ],
  },
  [UserRoles.Tenant]: {
    link_menu: [
      { name: "Dashboard", icon: AiOutlineDashboard, href: "/dashboard" },
      { name: "Data Tenant", icon: BsBuilding, href: "/tenant" },
      { name: "Data Kelas", icon: SiGoogleclassroom, href: "#" },
      { name: "Data Penilaian", icon: BsFillJournalBookmarkFill, href: "#" },
      { name: "Data Kuesioner", icon: MdOutlineQuiz, href: "#" },
    ],
    features: [
      {
        menu: "backPanelTenant",
        access: [],
      },
      {
        menu: "backPanelTenant_catalog",
        access: ["editCatalog", "hapusCatalog", "tmbhCatalog"],
      },
      {
        menu: "backPanelTenant_team_login",
        access: ["editTeam", "hapusTeam", "tmbhTeam"],
      },
      {
        menu: "backPanelTenant_team_nonlogin",
        access: ["editTeam", "hapusTeam", "tmbhTeam"],
      },
      {
        menu: "backPanelTenant_team_social",
        access: ["all_access"],
      },
      {
        menu: "backPanelTenant_links",
        access: ["all_access"],
      },
      {
        menu: "backPanelTenant_program",
        access: ["editProgram", "hapusProgram", "tmbhProgram"],
      },
      {
        menu: "backPanelTenant_awards",
        access: ["editAwards", "hapusAwards", "tmbhAwards"],
      },
    ],
  },
  [UserRoles.Tenant_team]: {
    link_menu: [
      { name: "Dashboard", icon: AiOutlineDashboard, href: "/dashboard" },
      { name: "Data Tenant", icon: BsBuilding, href: "/tenant" },
      { name: "Data Kelas", icon: SiGoogleclassroom, href: "#" },
      { name: "Data Penilaian", icon: BsFillJournalBookmarkFill, href: "#" },
      { name: "Data Kuesioner", icon: MdOutlineQuiz, href: "#" },
    ],
    features: [
      {
        menu: "myTenant",
        access: [],
      },
      {
        menu: "backPanelTenant_catalog",
        access: [],
      },
      {
        menu: "backPanelTenant_team_login",
        access: [],
      },
      {
        menu: "backPanelTenant_team_nonlogin",
        access: [],
      },
      {
        menu: "backPanelTenant_team_social",
        access: [],
      },
      {
        menu: "backPanelTenant_links",
        access: [],
      },
      {
        menu: "backPanelTenant_program",
        access: [],
      },
      {
        menu: "backPanelTenant_awards",
        access: [],
      },
    ],
  },
  [UserRoles.Manajemen]: {
    link_menu: [
      { name: "Dashboard", icon: AiOutlineDashboard, href: "/dashboard" },
      { name: "Data Tenant", icon: BsBuilding, href: "/tenant" },
      { name: "Data Kelas", icon: SiGoogleclassroom, href: "#" },
      { name: "Data Penilaian", icon: BsFillJournalBookmarkFill, href: "#" },
      { name: "Data Kuesioner", icon: MdOutlineQuiz, href: "#" },
    ],
    features: [
      {
        menu: "backPanelTenant",
        access: [],
      },
      {
        menu: "backPanelTenant_catalog",
        access: [],
      },
      {
        menu: "backPanelTenant_team_login",
        access: [],
      },
      {
        menu: "backPanelTenant_team_nonlogin",
        access: [],
      },
      {
        menu: "backPanelTenant_team_social",
        access: [],
      },
      {
        menu: "backPanelTenant_links",
        access: [],
      },
      {
        menu: "backPanelTenant_program",
        access: [],
      },
      {
        menu: "backPanelTenant_awards",
        access: [],
      },
    ],
  },
};

