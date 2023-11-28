"use client";
import dynamic from "next/dynamic";
import React, { Suspense, useState, useEffect } from "react";
// import Loading from "@/components/modal/Loading";
// import DataComponent from "./data";
import Loading from "./loading";
import { FindDefaultRoute } from "@/app/components/utils/FindDefaultRoute";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";

export default function YourPage() {
  const susKey = new Date().getTime();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setBreadcrumbs } = useBreadcrumbContext();
  const getForCrumbs: any = FindDefaultRoute();
  // console.log(getForCrumbs);

  useEffect(() => {
    if (getForCrumbs) setBreadcrumbs(getForCrumbs);
  }, []);

  return <div>Ini Dashboard</div>;
}
