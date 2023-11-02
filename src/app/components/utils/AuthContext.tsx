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
import { useToast } from "@chakra-ui/react";

interface User {
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | 401>(null);
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingValidation, setLoadingValidation] = useState<boolean>(true);

  const validation = async () => {
    try {
      setLoadingValidation(true);
      const response = await axiosCustom.get("/validation");
      const validUser: User = {
        fullname: response.data.data.fullname,
        role: response.data.data.role,
        image_url: response.data.data.image_url,
      };
      setUser(validUser);
    } catch (error: any) {
      setUser(401);
      // toast({
      //   render: () => (
      //     <AlertBar
      //       status="error"
      //       message={`Terjadi Kesalahan : ${error.message}`}
      //     />
      //   ),
      //   duration: 8000,
      //   isClosable: true,
      //   position: "top-right",
      // });
    } finally {
      setLoadingValidation(false);
    }
  };

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
          toast({
            render: () => (
              <AlertBar
                status="success"
                message={`Login Berhasil, Selamat Datang ${response.data.data.fullname}`}
              />
            ),
            duration: 8000,
            isClosable: true,
            position: "top-right",
          });
          router.push("/dashboard");
        });
    } catch (error: any) {
      // console.log(error);
      toast({
        render: () => (
          <AlertBar
            status="error"
            message={`Terjadi Kesalahan : ${
              error?.response ? error.response.data.message : error.message
            }`}
          />
        ),
        duration: 8000,
        isClosable: true,
        position: "top-right",
      });
    }
    setLoading(false);
  };

  const logout = async () => {
    try {
      await axiosCustom.get("/auth/logout").then((response) => {
        if (response.status === 200) {
          toast({
            render: () => (
              <AlertBar
                status="warning"
                message={`Anda telah Logout dari sistem.`}
              />
            ),
            duration: 8000,
            isClosable: true,
            position: "top-right",
          });
        }
      });
    } catch (error: any) {
      toast({
        render: () => (
          <AlertBar
            status="error"
            message={`Terjadi Kesalahan : ${
              error?.response ? error.response.data.message : error.message
            }`}
          />
        ),
        duration: 8000,
        isClosable: true,
        position: "top-right",
      });
    }
    validation();
  };

  useEffect(() => {
    validation();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loadingValidation,
        login,
        logout,
        validation,
      }}
    >
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
