import React from "react";
import dynamic from "next/dynamic";
import Loading from "./loading";

const PageTenant = dynamic(() => import("./get-tenant"), {
  ssr: false,
  loading: () => <Loading />, // Tampilan loading saat komponen dimuat
});

function page() {
  return (
    <div>
      <PageTenant />
    </div>
  );
}

export default page;
