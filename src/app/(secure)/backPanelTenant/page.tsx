"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Loading from "./loading";
import { FindDefaultRoute } from "@/app/components/utils/FindDefaultRoute";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";

const PageTenant = dynamic(() => import("./get-tenant"), {
  ssr: false,
  loading: () => <Loading />, // Tampilan loading saat komponen dimuat
});

function page() {
  const { setBreadcrumbs } = useBreadcrumbContext();
  const getForCrumbs: any = FindDefaultRoute();
  useEffect(() => {
    if (getForCrumbs) setBreadcrumbs(getForCrumbs);
  }, []);

  return (
    <div>
      <PageTenant />
    </div>
  );
}

export default page;
