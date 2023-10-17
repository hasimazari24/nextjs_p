"use client";

import {
  useState,
  useEffect,
} from "react";
import {
  useColorModeValue,
  Box
} from "@chakra-ui/react";
import GallerySlider from "./template/GallerySlider";
import SectionStp from "./template/SectionStp";
import HeadingPage from "./template/HeadingPage";
import { axiosCustom } from "../api/axios";
import AlertBar from "@/app/components/modal/AlertBar";
import LoadingModal from "./loading";

interface Tenant {
  id: string;
  name: string;
  motto: string;
  slug: string;
  image_url: string;
  image_banner_url: string;
}

interface Beranda {
  total_tenant: Number;
  level_tenant: {
    pra_inkubasi: Number;
    inkubasi: Number;
    inkubasi_lanjutan: Number;
    scale_up: Number;
  };
  tenant: Tenant[];
}

interface pageProps {
  beranda: Beranda;
}

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
      console.log(error);
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
        <LoadingModal />
      ) : (
        <>
          <Box
            bg={useColorModeValue("gray.200", "gray.400")}
            id="PortofilioTenant"
          >
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

export default page;
