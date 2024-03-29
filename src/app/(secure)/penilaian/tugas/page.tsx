"use client";
import React from "react";
import Loading from "../loading";
import { useAuth } from "@/app/components/utils/AuthContext";
import dynamic from "next/dynamic";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import { FindDefaultRoute } from "@/app/components/utils/FindDefaultRoute";

const PenilaianMJM = dynamic(() => import("./pages/PenilaianTugasByMentor"), {
  ssr: false,
  loading: () => <Loading />, // Tampilan loading saat komponen dimuat
});
const PenilaianTenant = dynamic(() => import("./pages/PenilaianTugasByTenant"), {
  ssr: false,
  loading: () => <Loading />, // Tampilan loading saat komponen dimuat
});

const PageNilaiTugas = () => {
  const { user } = useAuth();
  let getUser: any | null = null; // Inisialisasikan getUser di sini

  if (user !== null && user !== 401) {
    getUser = user; // Setel nilai getUser jika user ada
  }

  const { setBreadcrumbs } = useBreadcrumbContext();
  const getForCrumbs: any = FindDefaultRoute();
  React.useEffect(() => {
    if (getForCrumbs) setBreadcrumbs(getForCrumbs);
  }, []);

  if (getUser?.role === "Tenant") {
    return <PenilaianTenant />;
  } else return <PenilaianMJM roleAccess={getUser?.role} />; 
};

export default PageNilaiTugas;
