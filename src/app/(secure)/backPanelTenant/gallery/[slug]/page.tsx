import React from "react";
import dynamic from "next/dynamic";
import Loading from "../../loading";

const Gallery = dynamic(() => import("./getGallery"), {
  ssr: false,
  loading: () => <Loading />, // Tampilan loading saat komponen dimuat
});

function page({ params }: { params: { slug: string } }) {
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
