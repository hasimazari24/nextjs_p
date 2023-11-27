// BreadcrumbContext.tsx
"use client";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { IRoutes } from "@/app/type/routes-navigation.d";
import Routes from "@/app/components/utils/Routes";
// import { findCurrentRoute } from "@/app/components/utils/Navigation";
type BreadcrumbContextType = {
  breadcrumbs: IRoutes[];
  setBreadcrumbs: (breadcrumbs: IRoutes[]) => void;
};

const BreadcrumbContextDefault: BreadcrumbContextType = {
  breadcrumbs: [],
  setBreadcrumbs: () => {},
};

export const BreadcrumbContext = createContext(BreadcrumbContextDefault);

export function useBreadcrumbContext() {
  return useContext(BreadcrumbContext);
}

type BreadcrumbProviderProps = {
  children: ReactNode;
};

export const BreadcrumbProvider = ({ children }: BreadcrumbProviderProps) => {
  const [breadcrumbs, setBreadcrumbs] = useState<IRoutes[]>([]);
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);
  useEffect(() => {
    const defaultRoute: IRoutes | undefined = Routes.find(
      // cari route href atau jika ada pathname temukan pathname yg mengandung nilai dari usepathname
      // buat kondisi indexOf tidak sama dgn -1 (pathname tidak ditemukan)
      (route) => pathname === route.href || route.href === "/" + pathnames[0],
    );
    if (defaultRoute) {
      setBreadcrumbs([defaultRoute]);
    }
  }, []);

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};
