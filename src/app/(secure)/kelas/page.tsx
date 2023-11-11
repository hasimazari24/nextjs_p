"use client";
import { useAuth } from "@/app/components/utils/AuthContext";
import Loading from "./loading";
import { UserRoles, permissions } from "@/app/type/role-access-control.d";
import dynamic from "next/dynamic";
import ManajemenClass from "./pages/ManajemenClass";

interface UserLog {
  // id: string;
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
  let getUser: UserLog | null = null; // Inisialisasikan getUser di sini

  if (user !== null && user !== 401) {
    getUser = user; // Setel nilai getUser jika user ada
  }

  if (getUser?.role === "Super Admin" || getUser?.role === "Manajemen") {
    return <Manajemen roleAccess={getUser?.role} />;
  }
  else if (getUser?.role === "Mentor") {
    return <Mentor roleAccess={getUser?.role} />;
  } 
  else if (getUser?.role === "Tenant") {
    return <Tenant />
  } 
  // return <ManajemenClass />;
};

export default page;
