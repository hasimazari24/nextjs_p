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
  loadingBeranda: boolean;
  loadingDetail: boolean;
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
      await axiosCustom
        .get("/public/beranda")
        .then((response) => {
          setBeranda(response.data.data);
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

  useEffect(() => {
    getBeranda();
  }, []);

  return (
    <PublicContext.Provider
      value={{
        beranda,
        portfolioDetail,
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
