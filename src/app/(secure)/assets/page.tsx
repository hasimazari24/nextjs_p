import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "./loading";

const Assets = dynamic(() => import("./getAssets"), {
  ssr: false,
  loading: ()=> <Loading />
});

function page() {
  return (
    // <Suspense fallback={<Loading />}>
      <Assets />
    // </Suspense>
  );
}

export default page;
