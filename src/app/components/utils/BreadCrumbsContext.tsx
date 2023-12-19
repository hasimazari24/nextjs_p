"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { IRoutes } from "@/app/type/routes-navigation.d";
import { FindDefaultRoute } from "./FindDefaultRoute";

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
  const getForDefaultCrumbs:any = FindDefaultRoute();
  useEffect(() => {
    if (getForDefaultCrumbs) setBreadcrumbs(getForDefaultCrumbs);
  }, []);

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};
