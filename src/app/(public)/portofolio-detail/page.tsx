"use client";

import React from "react";
import { usePublic } from "../utils/PublicContext";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { GetServerSideProps } from "next";

interface dataTenant {
  id: string;
  name: string;
  motto: string;
  description: string;
  address: string;
  contact: string;
  email: string;
  founder: string;
  level_tenant: string;
  image: string;
  image_banner: string;
  tenant_link: [
    {
      id: string;
      url: string;
      title: string;
    },
  ];
}

const page: GetServerSideProps = async ({ params }) => {
  // const { portfolioDetail } = usePublic();
  // console.log(beranda);
  const router = useRouter();
  const searchParams = useSearchParams();
  const idTenant = searchParams.get("id");
  const id = params?.id as string;
  console.log(idTenant);

  return (
    <div>
      
      {/* {portfolioDetail && portfolioDetail.length > 0 ? (
        portfolioDetail.map((p: dataTenant) => (
          <div key={p.id}>
            <p>{p.name}</p>
            <p>{p.motto}</p>
            {p.tenant_link && p.tenant_link.length > 0 ? p.tenant_link.map((links)=>(
              <p>{links.url}</p>
            )) : null}
          </div>
        ))
      ) : (
        <p>Tidak ada Data</p>
      )} */}
    </div>
  );
};

export default page;
