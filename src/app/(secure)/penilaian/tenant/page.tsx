"use client";
import dynamic from "next/dynamic";
import React from "react";
import Loading from "../loading";
import { useAuth } from "@/app/components/utils/AuthContext";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import { FindDefaultRoute } from "@/app/components/utils/FindDefaultRoute";
// import PenilaianTenantUmum from "./pages/PenilaianTenantUmum";

const TenantRated = dynamic(() => import("./pages/PenilaianTenantUmum"), {
  ssr: false,
  loading: () => <Loading />, // Tampilan loading saat komponen dimuat
});

function PenilaianUmum() {
  const { user } = useAuth();
   const { setBreadcrumbs, breadcrumbs } = useBreadcrumbContext();
   React.useEffect(() => {
     // Membuat nilai baru
     const newValue = { name: "Nilai Tenant", href: "penilaian/tenant" };
     // Cek apakah nilai baru sudah ada dalam breadcrumbs
     const alreadyExists = breadcrumbs.some(
       (breadcrumb) => JSON.stringify(breadcrumb) === JSON.stringify(newValue),
     );
     // Jika belum ada, tambahkan ke breadcrumbs
     if (!alreadyExists) {
       setBreadcrumbs([...breadcrumbs, newValue]);
     }
   }, []);
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
