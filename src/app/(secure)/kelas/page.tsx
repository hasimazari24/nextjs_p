"use client";
import { useAuth } from "@/app/components/utils/AuthContext";
import Loading from "./loading";
import { UserRoles } from "@/app/type/role-access-control.d";
import dynamic from "next/dynamic";
import { FindDefaultRoute } from "@/app/components/utils/FindDefaultRoute";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import React from "react";

interface UserLog {
  fullname: string;
  role: UserRoles;
  image_url: string;
}

const Manajemen = dynamic(() => import("./pages/ManajemenClass"), {
  ssr: false,
  loading: () => <Loading />, // Tampilan loading saat komponen dimuat
});
const Mentor = dynamic(() => import("./pages/MentorClass"), {
  ssr: false,
  loading: () => <Loading />, // Tampilan loading saat komponen dimuat
});
const Tenant = dynamic(() => import("./pages/TenantClass"), {
  ssr: false,
  loading: () => <Loading />, // Tampilan loading saat komponen dimuat
});

const page = () => {
  const { user } = useAuth();
  const { setBreadcrumbs } = useBreadcrumbContext();
  //temukan rute default kelas lalu set breadcrumbs dengan rute yang ditemukan
  const getForCrumbs: any = FindDefaultRoute();
  React.useEffect(() => {
    if (getForCrumbs) setBreadcrumbs(getForCrumbs);
  }, []);

  let getUser: UserLog | null = null; // Inisialisasikan getUser di sini

  if (user !== null && user !== 401) {
    getUser = user; // Setel nilai getUser jika user ada
  }

  if (getUser?.role === "Super Admin" || getUser?.role === "Manajemen") {
    return <Manajemen roleAccess={getUser?.role} />;
  } else if (getUser?.role === "Mentor") {
    return <Mentor roleAccess={getUser?.role} />;
  } else if (getUser?.role === "Tenant") {
    return <Tenant />;
  }
};

export default page;
