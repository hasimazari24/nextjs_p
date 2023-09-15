"use client";

import { axiosCustom } from "@/app/api/axios";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Catalog {
  id: string;
  title: string;
  description: string;
}

interface ContextType {
  dataCatalog: any[];
  idTenant: string;
  getCatalog: (id: string) => void;
  loadingCatalog: boolean;
}

const StartUpContext = createContext<ContextType | undefined>(undefined);

export const StartUpProvider = ({ children }: { children: ReactNode }) => {
  const [dataCatalog, setDataCatalog] = useState<any[]>([]);
  const [idTenant, setIdTenant] = useState("");
  const [loadingCatalog, setLoadingCatalog] = useState<boolean>(false);

  const getCatalog = async (id: string) => {
    try {
      setLoadingCatalog(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(`/tenant/${id}/catalog`);

      // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
      const timer = setTimeout(() => {
        setDataCatalog(response.data.data);
        setIdTenant(id);
        console.log(dataCatalog);
        setLoadingCatalog(false); // Set isLoading to false to stop the spinner
      }, 1000);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Gagal memuat data:", error);
      setLoadingCatalog(false);
    }
  };
  return (
    <StartUpContext.Provider
      value={{ dataCatalog, idTenant, getCatalog, loadingCatalog }}
    >
      {children}
    </StartUpContext.Provider>
  );
};

// Buat custom hook untuk menggunakan context
export const useAPIContext = () => {
  const context = useContext(StartUpContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
