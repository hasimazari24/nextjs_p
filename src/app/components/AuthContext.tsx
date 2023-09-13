// context/AuthContext.ts
"use client";

<<<<<<< HEAD
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AlertBar from "../components/AlertBar";
import { useRouter } from "next/navigation";
import { axiosCustom } from "../api/axios";
// axios.defaults.withCredentials = true;
=======
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AlertBar from "../components/AlertBar";
import { useRouter } from "next/navigation";
import { axiosCustom } from "../api/axios";
>>>>>>> d75f85974989b7de8f5308a8d567bacfb3f9477e

interface User {
  // id: string;
  fullname: string;
  role: string;
  image: string;
}

interface AuthContextType {
  user: User | null | 401;
  login: (username: string, password: string) => void;
  logout: () => void;
  loading: boolean;
  loadingValidation: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | 401>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingValidation, setLoadingValidation] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [status, setstatus] = useState<
    "success" | "info" | "warning" | "error"
  >("error");

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      // Panggil API login di sini dengan menggunakan Axios atau metode lainnya
      const response = await axiosCustom.post("/login", {
        usernameoremail: username,
        password: password,
      });
      console.log(response);

      // Jika login berhasil, atur informasi pengguna di sini
      const loggedInUser: User = {
<<<<<<< HEAD
        // id: response.data.data.id,
=======
>>>>>>> d75f85974989b7de8f5308a8d567bacfb3f9477e
        fullname: response.data.data.fullname,
        role: response.data.data.role,
        image: response.data.data.image,
      };
      setUser(loggedInUser);
      router.push("/");
    } catch (error: any) {
      // console.log(error);
      if (error?.response) {
        setMsg(`Terjadi Kesalahan: ${error.response.data.message}`);
      } else setMsg(`Terjadi Kesalahan: ${error.message}`);
      setstatus("error");
      setIsOpen(true);
    } finally {
      setLoading(false); // Set loading menjadi false setelah proses login selesai
    }
  };

  const validation = async () => {
    try {
      setLoadingValidation(true);
      // Panggil API login di sini dengan menggunakan Axios atau metode lainnya
      const response = await axiosCustom.get("/validation");
      // Jika login berhasil, atur informasi pengguna di sini
      const validUser: User = {
        // id: response.data.data.id,
        fullname: response.data.data.fullname,
        role: response.data.data.role,
        image: response.data.data.image,
      };
      setUser(validUser);
    } catch (error) {
        // console.log(error);
    } finally{
      setLoadingValidation(false);
    }
  };

  const logout = async () => {
    try {
      // Lakukan logout, misalnya dengan membersihkan informasi sesi
      console.log(axiosCustom);
      await axiosCustom.get("/logout");
      setUser(null);
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      if (error?.response) {
        setMsg(`Terjadi Kesalahan: ${error.response.data.message}`);
      } else setMsg(`Terjadi Kesalahan: ${error.message}`);
      setstatus("error");
      setIsOpen(true);
    }
  };

<<<<<<< HEAD
=======
  const validation = async () => {
    try {
      // Panggil API login di sini dengan menggunakan Axios atau metode lainnya
      const response = await axiosCustom.get("/validation");
      // Jika login berhasil, atur informasi pengguna di sini
      const validUser: User = {
        // id: response.data.data.id,
        fullname: response.data.data.fullname,
        role: response.data.data.role,
        image: response.data.data.image,
      };
      setUser(validUser);
    } catch (error: any) {
      error.response.status === 401 ? setUser(401) : setUser(null);
    }
  };

  const logout = async () => {
    try {
      // Lakukan logout, misalnya dengan membersihkan informasi sesi
      await axiosCustom.get("/logout");
      setUser(null);
      router.push("/login");
    } catch (error: any) {
      // console.log(error);
      if (error?.response) {
        setMsg(`Terjadi Kesalahan: ${error.response.data.message}`);
      } else setMsg(`Terjadi Kesalahan: ${error.message}`);
      setstatus("error");
      setIsOpen(true);
    }
  };

>>>>>>> d75f85974989b7de8f5308a8d567bacfb3f9477e
  useEffect(() => {
    validation();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, loadingValidation }}
    >
      <>
        <AlertBar
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          message={msg}
          status={status}
        />
      </>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
