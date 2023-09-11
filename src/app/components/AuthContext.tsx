// context/AuthContext.ts
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import apiCall from "../components/api-call";
import AlertBar from "../components/AlertBar";
import { redirect, useRouter } from "next/navigation";

axios.defaults.withCredentials = true;

interface User {
  id: string;
  fullname: string;
  role:string;
  image:string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

   const [isOpen, setIsOpen] = useState(false);
   const [msg, setMsg] = useState("");
   const [status, setstatus] = useState<
     "success" | "info" | "warning" | "error"
   >("error");

  const login = async (username: string, password: string) => {
    try {
      // Panggil API login di sini dengan menggunakan Axios atau metode lainnya
      const response = await axios.post(apiCall.loginUser, {
        usernameoremail: username,
        password: password,
      });
      console.log(response);
      // Jika login berhasil, atur informasi pengguna di sini
      const loggedInUser: User = {
        id: response.data.data.id,
        fullname: response.data.data.fullname,
        role: response.data.data.role,
        image: response.data.data.image,
      };

      setUser(loggedInUser);
      router.push('/');
    //   redirect('/');
    } catch (error: any) {
      if (error?.response) {
        setMsg(`Terjadi Kesalahan: ${error.response.data.message}`);
      } else setMsg(`Terjadi Kesalahan: ${error.message}`);
      setstatus("error");
      setIsOpen(true);
    }
  };

  const validation = async () => {
    try {
      // Panggil API login di sini dengan menggunakan Axios atau metode lainnya
      const response = await axios.get(apiCall.userValidation, {headers: {'Access-Control-Allow-Origin':'*'}});

      // Jika login berhasil, atur informasi pengguna di sini
      const validUser: User = {
        id: response.data.data.id,
        fullname: response.data.data.fullname,
        role: response.data.data.role,
        image: response.data.data.image,
      };

      setUser(validUser);
    } catch (error) {
        console.log(error);
    }
  };

  const logout = () => {
    // Lakukan logout, misalnya dengan membersihkan informasi sesi
    setUser(null);
    redirect('/login');
  };

  useEffect(() => {
    validation();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
