"use client";
import React, { useEffect, useState } from "react";
import { axiosCustom } from "@/app/api/axios";
import dynamic from "next/dynamic";
import Loading from "../../loading";
import TenantDetail from "./DetaillTenant";
import * as TenantTypes from "@/app/type/tenant-type.d";
import NotFound from "@/app/components/template/NotFound";

function page({ params }: { params: { slug: string } }) {
  const [detailTenant, setDetailTenant] = useState<TenantTypes.Tenant | null>(null);
  const [loadingBeranda, setLoadingBeranda] = useState<boolean>(true);

  const getTenant = async () => {
    setLoadingBeranda(true);
    try {
      await axiosCustom.get(`/public/tenant/${params.slug}`).then((response) => {
        setDetailTenant(response.data.data);
        // setLoadingBeranda(false);
      });
    } catch (error: any) {
      console.error(error);
    }
    setLoadingBeranda(false);
  };

  useEffect(() => {
    getTenant();
  }, []);

  return loadingBeranda ? (
    <Loading />
  ) : (
    <>
      {detailTenant ? (
        <TenantDetail tenant={detailTenant} />
      ) : (
        <NotFound
          statusCode={404}
          msg={"Not Found"}
          statusDesc="Halaman tidak ditemukan. Periksa kembali URL Halaman yang anda kunjungi atau kembali ke halaman awal."
          backToHome="/"
        />
      )}
    </>
  );

  // <pre>
  //   {
  //     detailTenant && detailTenant.map((d) => JSON.stringify(d, null, 2)) // Argumen kedua (null) adalah replacer, dan argumen ketiga (2) adalah jumlah spasi indentasi
  //   }
  // </pre>
}

export default dynamic(() => Promise.resolve(page), {
  ssr: false,
  // suspense: true,
  loading: () => <Loading />,
});
