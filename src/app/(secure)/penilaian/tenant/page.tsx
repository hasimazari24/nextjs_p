"use client";
import dynamic from "next/dynamic";
import React from "react";
import Loading from "../loading";
import { useAuth } from "@/app/components/utils/AuthContext";
// import PenilaianTenantUmum from "./pages/PenilaianTenantUmum";

const TenantRated = dynamic(() => import("./pages/PenilaianTenantUmum"), {
  ssr: false,
  loading: () => <Loading />, // Tampilan loading saat komponen dimuat
});

function PenilaianUmum() {
  const { user } = useAuth();
  if (user !== null && user !== 401) {
    // switch(user.role) {
    //   case "Super Admin" : return <PenilaianUmumByMJM />;
    //   case "Mentor" : return <PenilaianUmumByMentor />
    // }
    const getUser: any = user;
    return <TenantRated roleAccess={getUser.role} />;
  }
}

export default dynamic(() => Promise.resolve(PenilaianUmum), {
  ssr: false,
  loading: () => <Loading />,
});
