// context/AuthContext.ts
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AlertBar from "../modal/AlertBar";
import { useRouter } from "next/navigation";
import { axiosCustom } from "../../api/axios";

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
  loadingLogOut: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | 401>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingValidation, setLoadingValidation] = useState<boolean>(true);
  const [loadingLogOut, setLoadingLogOut] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [status, setstatus] = useState<
    "success" | "info" | "warning" | "error"
  >("error");

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      // Panggil API login di sini dengan menggunakan Axios atau metode lainnya
      const response = await axiosCustom.post("/auth/login", {
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
      router.push("/dashboard");
    } catch (error: any) {
      // console.log(error);
      if (error?.response) {
        setMsg(`Terjadi Kesalahan: ${error.response.data.message}`);
      } else setMsg(`Terjadi Kesalahan: ${error.message}`);
      setstatus("error");
      setIsOpen(true);
    }
    setLoading(false);
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
    } catch (error: any) {
      error.response.status === 401 ? setUser(401) : setUser(null);
    } finally {
      setLoadingValidation(false);
    }
  };

  const logout = async () => {
    try {
      setLoadingLogOut(true);
      await axiosCustom.get("/auth/logout").then(() => {
        router.push("/login");
        setUser(null);
      });
    } catch (error: any) {
      // console.log(error);
      if (error?.response) {
        setMsg(`Terjadi Kesalahan: ${error.response.data.message}`);
      } else setMsg(`Terjadi Kesalahan: ${error.message}`);
      setstatus("error");
      setIsOpen(true);
    }
    setLoadingLogOut(false);
  };

  useEffect(() => {
    validation();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, loadingValidation, loadingLogOut }}
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
