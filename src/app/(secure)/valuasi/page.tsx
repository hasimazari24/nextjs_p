"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HStack, Heading, Flex } from "@chakra-ui/react";
import { Column } from "react-table";
import { axiosCustom } from "@/app/api/axios";
import Loading from "../backPanelTenant/loading";
import DataTable from "@/app/components/datatable/data-table";
import { UserRoles, permissions } from "@/app/type/role-access-control.d";
import { useAuth } from "@/app/components/utils/AuthContext";
import NotFound from "@/app/components/template/NotFound";
import AddValuasi from "./addValuasi";
import DeleteValuasi from "./deleteValuasi";
import EditValuasi from "./editValuasi";

interface DataItem {
  id: string;
  valuasi: string;
}

interface UserLog {
  // id: string;
  fullname: string;
  role: UserRoles;
  image_url: string;
}

function PageValuasi() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  // const [dataAwards, setDataAwards] = useState<DataItem[]>([]);
  const [valuasiItem, setValuasiItem] = useState<DataItem[] | []>([]);

  const getValuasi = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get("/valuasi");
      const timer = setTimeout(() => {
        // setIdTenant(id);
        setValuasiItem(response.data.data); // Set isLoading to false to stop the spinner
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // if (need_updated === true)
    getValuasi();
  }, []);

  const filterOptions = [{ key: "valuasi", label: "Valuasi" }];

  const { user } = useAuth();
  let getUser: UserLog | null = null; // Inisialisasikan getUser di sini

  if (user !== null && user !== 401) {
    getUser = user; // Setel nilai getUser jika user ada
  }

  let valuasiFeatures: any | null | undefined = null; // Inisialisasikan fitur pada menunya
  let allMenu: any | null = null;
  if (getUser !== null) {
    // ambil permission sesuai login role
    valuasiFeatures = permissions[getUser.role]?.features.find(
      (feature) => feature.menu === "valuasi",
    );
    //ambil permision features all menu (hanya utk admin)
    allMenu = permissions[getUser.role]?.features.find(
      (feature) => feature.menu === "allmenu",
    );

    if (!valuasiFeatures && !allMenu) {
      return (
        <NotFound
          statusCode={403}
          msg={"Access Denied"}
          statusDesc="Akses Ditolak. Anda tidak diizinkan mengakses halaman ini."
        />
      );
    }
  }
  let hidenCols: string[] = ["id"];
  if (
    (valuasiFeatures?.access.includes("editValuasi") &&
      allMenu?.access.includes("all_access")) === false
  ) {
    hidenCols.push("action");
  }

  const columns: ReadonlyArray<Column<DataItem>> = [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "valuasi",
      accessor: "valuasi",
    },
  ];
  const renderActions = (rowData: any) => {
    return valuasiFeatures?.access.includes("editValuasi") ||
      allMenu?.access.includes("all_access") ? (
      <HStack>
        <EditValuasi rowData={rowData} onSubmit={() => getValuasi()} />
        &nbsp;
        <DeleteValuasi dataDelete={rowData} onSubmit={() => getValuasi()} />
        &nbsp;
      </HStack>
    ) : null;
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Suspense fallback={<Loading />}>
            <Flex
              justifyContent={"space-between"}
              pb="2"
              direction={["column", "row"]}
            >
              <Heading fontSize={"2xl"}>DATA VALUASI TENANT</Heading>
              <HStack>
                {valuasiFeatures?.access.includes("tmbhValuasi") ||
                allMenu?.access.includes("all_access") ? (
                  <AddValuasi onSubmit={() => getValuasi()} />
                ) : null}
              </HStack>
            </Flex>
            <DataTable
              data={valuasiItem}
              column={columns}
              hiddenColumns={hidenCols}
              filterOptions={filterOptions}
            >
              {(rowData: any) => renderActions(rowData)}
            </DataTable>
          </Suspense>
        </>
      )}
    </div>
  );
}

export default PageValuasi;
