"use client";
import dynamic from "next/dynamic";
import React, { Suspense, useState, useEffect } from "react";
import { useAuth } from "@/app/components/utils/AuthContext";
import { UserRoles } from "@/app/type/role-access-control.d";
import Loading from "./loading";
import { FindDefaultRoute } from "@/app/components/utils/FindDefaultRoute";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import { axiosCustom } from "@/app/api/axios";

const SuperAdmin = dynamic(() => import("./pages/PageBySuperAdmin"), {
  ssr: false,
  loading: () => <Loading />, // Tampilan loading saat komponen dimuat
});
const Manajemen = dynamic(() => import("./pages/PageByManajemen"), {
  ssr: false,
  loading: () => <Loading />, // Tampilan loading saat komponen dimuat
});
const Mentor = dynamic(() => import("./pages/PageByMentor"), {
  ssr: false,
  loading: () => <Loading />, // Tampilan loading saat komponen dimuat
});
const Tenant = dynamic(() => import("./pages/PageByTenant"), {
  ssr: false,
  loading: () => <Loading />, // Tampilan loading saat komponen dimuat
});

interface UserLog {
  // id: string;
  fullname: string;
  role: UserRoles;
  image_url: string;
}

export default function Dashboard() {
  const { setBreadcrumbs } = useBreadcrumbContext();
  const getForCrumbs: any = FindDefaultRoute();
  // console.log(getForCrumbs);

  const { user } = useAuth();
  let getUser: UserLog | null = null; // Inisialisasikan getUser di sini

  if (user !== null && user !== 401) {
    getUser = user; // Setel nilai getUser jika user ada
  }

  useEffect(() => {
    if (getForCrumbs) setBreadcrumbs(getForCrumbs);
  }, []);

  const [state, setState] = useState<{ isLoading: boolean; data: any | null }>({
    isLoading: true,
    data: null,
  });

  useEffect(() => {
    async function callApi() {
      try {
        // Panggil API menggunakan Axios dengan async/await
        const response = await axiosCustom.get(`/dashboard`);
        const timer = setTimeout(() => {
          // setIdTenant(id);
          setState({
            isLoading: false,
            data: response.data.data,
          }); // Set isLoading to false to stop the spinner
        }, 1000);
        return () => clearTimeout(timer);
      } catch (error: any) {
        console.error("Gagal memuat data:", error);
        setState({
          isLoading: false,
          data: null,
        });
      }
    }
    callApi();
  },[]);

  if (state.isLoading) return <Loading />;

  switch (getUser?.role) {
    case "Super Admin":
      return <SuperAdmin data={state.data} />;
    case "Manajemen":
      return <Manajemen />;
    case "Mentor":
      return <Mentor />;
    case "Tenant":
      return <Tenant />;
    default:
      break;
  }
}
