"use client";
import React from "react";
import dynamic from "next/dynamic";
import Loading from "../../loading";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import { FindDefaultRoute } from "@/app/components/utils/FindDefaultRoute";

const Gallery = dynamic(() => import("./getGallery"), {
  ssr: false,
  loading: () => <Loading />, // Tampilan loading saat komponen dimuat
});

function page({ params }: { params: { slug: string } }) {
  const { setBreadcrumbs } = useBreadcrumbContext();
  const getForCrumbs: any = FindDefaultRoute();
  React.useEffect(() => {
    if (getForCrumbs) setBreadcrumbs(getForCrumbs);
  }, []);
  return (
    <div>
      <Gallery
        params={{
          slug: params.slug,
        }}
      />
    </div>
  );
}

export default page;
