"use client";

import { useEffect, useState } from "react";
import { axiosCustom } from "@/app/api/axios";

function DataComponent() {
  const [dataTampil, setDataTampil] = useState<any | null>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosCustom.get("/tenant");
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        setDataTampil(response.data.data);

        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(dataTampil);
          }, 3000);
        });
        
      } catch (error) {
        console.error("Gagal memuat data:", error);
      }
    };
fetchData();
  }, []);

  return (
    <>
      {dataTampil
        ? dataTampil.map((i: any) => <p key={i.id}>{i.name}</p>)
        : null}
    </>
  );
}

export default DataComponent;
