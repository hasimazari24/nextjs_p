"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Loading from "./loading";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import { FindDefaultRoute } from "@/app/components/utils/FindDefaultRoute";

const Assets = dynamic(() => import("./getAssets"), {
  ssr: false,
  loading: () => <Loading />,
});

function page() {
  const { setBreadcrumbs } = useBreadcrumbContext();
  const getForCrumbs: any = FindDefaultRoute();
  useEffect(() => {
    if (getForCrumbs) setBreadcrumbs(getForCrumbs);
  }, []);
  return <Assets />;
}

export default page;
