import { IRoutes } from "@/app/type/routes-navigation.d";
import { usePathname } from "next/navigation";
import Routes from "./Routes";

export const FindDefaultRoute = () => {
  const pathname = usePathname();
  const defaultRoute: IRoutes[] = Routes.filter(
    // cari Routes href yg mengandung nilai dari usepathname
    // atau cari href yg memiliki nilai sama dari pathnames index pertama utk dijadikan default route
    // (route) =>
    // pathname === route.href ||
    // route.href === "/" + pathnames[0] ||
    // route.pathname === pathname,
    (route) =>
      pathname === route.href ||
      // || route.href === "/" + pathnames[0],
      pathname.indexOf(route.href) !== -1,
  );

  return defaultRoute;
};
