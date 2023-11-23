"use client";

import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import GallerySlider from "./template/GallerySlider";
import SectionStp from "./template/SectionStp";
import HeadingPage from "./template/HeadingPage";
import { axiosCustom } from "../api/axios";
import Loading from "./loading";
import dynamic from "next/dynamic";

function page() {
  const [beranda, setBeranda] = useState<any | null>([]);
  const [loadingBeranda, setLoadingBeranda] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [status, setstatus] = useState<
    "success" | "info" | "warning" | "error"
  >("error");

  const getBeranda = async () => {
    setLoadingBeranda(true);
    try {
      await axiosCustom.get("/public/beranda").then((response) => {
        setBeranda(response.data.data);
        setLoadingBeranda(false);
      });
    } catch (error: any) {
      // console.log(error);
      if (error?.response) {
        setMsg(`Terjadi Kesalahan: ${error.response.data.message}`);
      } else setMsg(`Terjadi Kesalahan: ${error.message}`);
      setstatus("error");
      setIsOpen(true);
      setLoadingBeranda(false);
    }
  };

  useEffect(() => {
    getBeranda();
  }, []);

  return (
    <>
      <div>
        <HeadingPage />
      </div>
      {loadingBeranda ? (
        <Loading />
      ) : (
        <>
          <Box bg={"gray.200"} id="GallerySliderTenant">
            <GallerySlider beranda={beranda?.tenant} />
          </Box>
          <div>
            <SectionStp
              level_tenant={beranda?.level_tenant}
              total_tenant={beranda?.total_tenant}
            />
          </div>
        </>
      )}
    </>
  );
}

export default dynamic(() => Promise.resolve(page), {
  ssr: false,
  // suspense: true,
  loading: () => <Loading />,
});
