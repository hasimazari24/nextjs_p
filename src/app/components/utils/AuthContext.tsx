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
import { UserRoles } from "@/app/type/role-access-control";

interface User {
  // id: string;
  fullname: string;
  role: UserRoles;
  image_url: string;
}

interface AuthContextType {
  user: User | null | 401;
  login: (username: string, password: string) => void;
  logout: () => void;
  validation: () => void;
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
      await axiosCustom
        .post("/auth/login", {
          usernameoremail: username,
          password: password,
        })
        .then((response) => {
          // Jika login berhasil, atur informasi pengguna di sini
          const loggedInUser: User = {
            fullname: response.data.data.fullname,
            role: response.data.data.role,
            image_url: response.data.data.image_url,
          };
          setUser(loggedInUser);
          router.push("/dashboard");
          setLoading(false);
          setMsg(`Login Berhasil, selamat datang ${loggedInUser?.fullname}`);
          setstatus("success");
          setIsOpen(true);
        });
    } catch (error: any) {
      // console.log(error);
      if (error?.response) {
        setMsg(`Terjadi Kesalahan: ${error.response.data.message}`);
      } else setMsg(`Terjadi Kesalahan: ${error.message}`);
      setstatus("error");
      setIsOpen(true);
      setLoading(false);
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
        image_url: response.data.data.image_url,
      };
      setUser(validUser);
    } catch (error: any) {
      if (error?.response) {
        // error.response?.status === 401 ? setUser(401) : setUser(null);\
        console.log(error.response.data.message);
        // setMsg(`Terjadi Kesalahan: ${error.response.data.message}`);
      } else {
        setMsg(`Terjadi Kesalahan: ${error.message}`);
        setstatus("error");
        setIsOpen(true);
      }
      setUser(401);
    } finally {
      setLoadingValidation(false);
    }
  };

  const logout = async () => {
    try {
      setLoadingLogOut(true);
      await axiosCustom.get("/auth/logout").then((response) => {
        router.push("/login");
        if (response.status === 200) {
          setUser(null);
          setLoadingLogOut(false);
          setMsg(`Anda telah Log Out`);
          setstatus("success");
          setIsOpen(true);
        }
      });
    } catch (error: any) {
      // console.log(error);
      if (error?.response) {
        setMsg(`Terjadi Kesalahan: ${error.response.data.message}`);
      } else setMsg(`Terjadi Kesalahan: ${error.message}`);
      setstatus("error");
      setIsOpen(true);
      setLoadingLogOut(false);
    }
  };

  useEffect(() => {
    validation();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        validation,
        loading,
        loadingValidation,
        loadingLogOut,
      }}
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
