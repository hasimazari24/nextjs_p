"use client";
import dynamic from "next/dynamic";
import React from "react";
import Loading from "../loading";
import { useAuth } from "@/app/components/utils/AuthContext";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import { FindDefaultRoute } from "@/app/components/utils/FindDefaultRoute";
import { notFound } from "next/navigation";
// import PenilaianTenantUmum from "./pages/PenilaianTenantUmum";

const TenantRated = dynamic(() => import("./pages/PenilaianTenantUmum"), {
  ssr: false,
  loading: () => <Loading />, // Tampilan loading saat komponen dimuat
});

function PenilaianUmum() {
  const { user } = useAuth();
  const { setBreadcrumbs } = useBreadcrumbContext();
  const getForCrumbs: any = FindDefaultRoute();
  React.useEffect(() => {
    if (getForCrumbs) setBreadcrumbs(getForCrumbs);
  }, []);
  if (user !== null && user !== 401) {
    // switch(user.role) {
    //   case "Super Admin" : return <PenilaianUmumByMJM />;
    //   case "Mentor" : return <PenilaianUmumByMentor />
    // }
    const getUser: any = user;
    if (getUser.role !== "Tenant") {
      return <TenantRated roleAccess={getUser.role} />;
    } else notFound();
  }
}

export default dynamic(() => Promise.resolve(PenilaianUmum), {
  ssr: false,
  loading: () => <Loading />,
});
