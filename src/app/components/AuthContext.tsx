// context/AuthContext.ts
"use client";

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | 401>(null);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [status, setstatus] = useState<
    "success" | "info" | "warning" | "error"
  >("error");

  const login = async (username: string, password: string) => {
    try {
      // Panggil API login di sini dengan menggunakan Axios atau metode lainnya
      const response = await axiosCustom.post("/login", {
        usernameoremail: username,
        password: password,
      });
      console.log(response);
      // Jika login berhasil, atur informasi pengguna di sini
      const loggedInUser: User = {
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
    }
  };

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
