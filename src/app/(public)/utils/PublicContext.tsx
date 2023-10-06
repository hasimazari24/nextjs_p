import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AlertBar from "../../components/modal/AlertBar";
import { useRouter } from "next/navigation";
import { axiosCustom } from "../../api/axios";
import { GetServerSideProps } from "next";

interface Beranda {
  id: string;
  name: string;
  motto:string;
  slug:string;
  image_url: string;
  image_banner_url: string;
}

interface ContextType {
  beranda: Beranda[] | null;
  portfolioDetail: any;
  // getBeranda: () => void;
  getPortofolioDetail: (idTenant: string) => void;
  // logout: () => void;
  // validation: () => void;
  // loading: boolean;
  loadingBeranda: boolean;
  loadingDetail: boolean;
  // loadingLogOut: boolean;
}

const PublicContext = createContext<ContextType | undefined>(undefined);

export const PublicProvider = ({ children }: { children: ReactNode }) => {
  const [beranda, setBeranda] = useState<Beranda[] | null>([]);
  const [portfolioDetail, setPortfolioDetail] = useState<any | null>([]);
  const router = useRouter();
  const [loadingBeranda, setLoadingBeranda] = useState<boolean>(true);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(true);
  const [loadingLogOut, setLoadingLogOut] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [status, setstatus] = useState<
    "success" | "info" | "warning" | "error"
  >("error");

  const getBeranda = async () => {
    setLoadingBeranda(true);
    try {
      // Panggil API login di sini dengan menggunakan Axios atau metode lainnya
      await axiosCustom
        .get("/public/beranda")
        .then((response) => {
          // Jika login berhasil, atur informasi pengguna di sini;
          setBeranda(response.data.data);
          // router.push("/dashboard");
          // console.log(response);
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

  const getPortofolioDetail = async (slug:string) => {
    try {
      setLoadingDetail(true);
      // Panggil API login di sini dengan menggunakan Axios atau metode lainnya
      await axiosCustom.get(`public/portfolio/${slug}`).then((response) => {
        setPortfolioDetail(response.data.data);
        router.push("/portofolio/");
      });
      // Jika login berhasil, atur informasi pengguna di sini
      
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
      setPortfolioDetail(null);
    } finally {
      setLoadingDetail(false);
    }
  };

  useEffect(() => {
    getBeranda();
  }, []);

  return (
    <PublicContext.Provider
      value={{
        beranda,
        portfolioDetail,
        getPortofolioDetail,
        // login,
        // logout,
        // validation,
        // loading,
        loadingBeranda,
        loadingDetail,
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
    </PublicContext.Provider>
  );
};

export const usePublic = () => {
  const context = useContext(PublicContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
