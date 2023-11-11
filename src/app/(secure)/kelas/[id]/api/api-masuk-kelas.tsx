"use client";

import { axiosCustom } from "@/app/api/axios";
import * as ClassInfo from "@/app/type/class-type.d";
import { useMemo } from "react";

const getClassHeading = async (idKelas: string) => {
  try {
    // Panggil API menggunakan Axios dengan async/await
    const response = await axiosCustom.get(`/course/${idKelas}`);
    const dataPartisipan: ClassInfo.classHeading = response.data.data;
    return dataPartisipan;
  } catch (error: any) {
    console.error("Gagal memuat data Partisipan:", error);
    return null;
  }
};

const getPartisipan = async (idKelas: string) => {
  try {
    // Panggil API menggunakan Axios dengan async/await
    const response = await axiosCustom.get(`/course/${idKelas}/participant`);
    const dataPartisipan: ClassInfo.Partisipan = response.data.data;
    return dataPartisipan;
  } catch (error: any) {
    console.error("Gagal memuat data Partisipan:", error);
    return null;
  }
};

const getSesi = async (idKelas: string) => {
  try {
    // Panggil API menggunakan Axios dengan async/await
    const response = await axiosCustom.get(`/course/${idKelas}/item`);
    const dataSesi: ClassInfo.Sesi = response.data.data;
    return dataSesi;
  } catch (error: any) {
    console.error("Gagal memuat data Partisipan:", error);
    return null;
  }
};

const useSession = () => {
  const session = useMemo(() => {
    return {
      getPartisipan: getPartisipan,
      getSesi: getSesi,
      getClassHeading: getClassHeading,
    };
  }, []);

  return session;
};

export default useSession;