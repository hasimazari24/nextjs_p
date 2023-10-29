"use client";
import dynamic from "next/dynamic";
import React, { Suspense, useState } from "react";
// import Loading from "@/components/modal/Loading";
// import DataComponent from "./data";
import Loading from "@/app/loading";
import { Button } from "@chakra-ui/react";

const Data = dynamic(() => import("./data"), {
  ssr: false,
  suspense: true,
  loading: () => <Loading />, // Tampilan loading saat komponen dimuat
});

export default function YourPage() {
  const susKey = new Date().getTime();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      {/* Konten lainnya */}
      {/* <Suspense key={susKey} fallback={<Loading />}> */}
      <Data />
      {/* <Button onClick={() => setIsModalOpen(true)}>Click Me</Button> */}
      {/* </Suspense> */}

      {/* <DynamicDataComponent /> */}

      {/* Konten lainnya */}
    </div>
  );
}
