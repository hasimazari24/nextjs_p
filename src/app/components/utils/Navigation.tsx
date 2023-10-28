import { IRoutes } from "@/app/type/routes-navigation.d";
import { usePathname } from "next/navigation";

export const isWindowAvailable = () => typeof window !== "undefined";

export const findCurrentRoute = (routes: IRoutes[]): IRoutes | undefined => {
    const pathname = usePathname();
  const foundRoute: IRoutes | undefined = routes.find(
    // cari route href atau jika ada pathname temukan pathname yg mengandung nilai dari usepathname
    // buat kondisi indexOf tidak sama dgn -1 (pathname tidak ditemukan)
    (route) => pathname === route.href || route.pathname !== undefined && (pathname.indexOf(route?.pathname) !== -1),
  );

  return foundRoute;
};