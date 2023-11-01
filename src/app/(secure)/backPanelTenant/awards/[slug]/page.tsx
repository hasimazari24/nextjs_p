"use client";

import React, { Suspense, useEffect, useState, use } from "react";
import { useRouter, notFound } from "next/navigation";
import {
  Button,
  Center,
  Spinner,
  Text,
  HStack,
  Heading,
  Flex,
  Avatar,
} from "@chakra-ui/react";
import { Column } from "react-table";
import { axiosCustom } from "@/app/api/axios";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import Loading from "../../loading";
import DataTable from "@/app/components/datatable/data-table";
import { AiOutlineRollback } from "react-icons/ai";
import AddAwards from "./addAwards";
import EditAwards from "./editAwards";
import DeleteAwards from "./deleteAwards";
import { UserRoles, permissions } from "@/app/type/role-access-control.d";
import { useAuth } from "@/app/components/utils/AuthContext";
import NotFound from "@/app/components/template/NotFound";

interface AwardItem {
  id: string;
  name: string;
  rank: string;
  image_id: string;
  image_url: string;
}

interface DataItem {
  id: string;
  name: string;
  award: AwardItem;
}

interface UserLog {
  // id: string;
  fullname: string;
  role: UserRoles;
  image_url: string;
}

// const getAwards = async (paramsId: string): Promise<DataItem[]> => {
//   try {
//     // Panggil API menggunakan Axios dengan async/await
//     const response = await axiosCustom.get(`/tenant/${paramsId}/get-award`);
//     const data = await response.data.data;
//     if (data) {
//       return [data];
//     } else {
//       return []; // Mengembalikan array kosong jika data tidak tersedia
//     }
//   } catch (error: any) {
//     console.error("Gagal memuat data:", error);
//     return [];
//   }
// };

function PageAwards({ params }: { params: { slug: string } }) {
  const getParamsId = params.slug;
  if ((getParamsId && getParamsId.length === 0) || !getParamsId) {
    return notFound();
  }
  const router = useRouter();

  const [dataAwardsLoading, setDataAwardsLoading] = useState(true);
  // const [dataAwards, setDataAwards] = useState<DataItem[]>([]);
  const [awardItem, setAwardItem] = useState<AwardItem[]>([]);
  const [namaTenant, setNamaTenant] = useState<string | null>();

  const fetchData = async (): Promise<void> => {
    try {
      const response = await axiosCustom.get(
        `/tenant/${getParamsId}/get-award`,
      );
      const newDataAwards: DataItem[] = [await response.data.data];
      const newAwardItem = newDataAwards.flatMap((dataItem) =>
        Array.isArray(dataItem.award)
          ? dataItem.award.map((award) => ({
              id: award.id,
              image_id: award.image_id,
              image_url: award.image_url,
              name: award.name,
              rank: award.rank,
            }))
          : [],
      );
      const namatenant = newDataAwards
        .map((item) => item.name.toUpperCase())
        .toString();
      setNamaTenant(namatenant);
      // setDataAwards(newDataAwards);
      setAwardItem(newAwardItem);
      setDataAwardsLoading(false);
    } catch (error) {
      console.error("Error updating data:", error);
      setNamaTenant(null);
      setDataAwardsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [getParamsId]);

  const filterOptions = [{ key: "name", label: "Nama Award" }];

  const { user } = useAuth();
  let getUser: UserLog | null = null; // Inisialisasikan getUser di sini

  if (user !== null && user !== 401) {
    getUser = user; // Setel nilai getUser jika user ada
  }

  let awardsFeatures: any | null | undefined = null; // Inisialisasikan fitur pada menunya
  let allMenu: any | null = null;
  if (getUser !== null) {
    // ambil permission sesuai login role
    awardsFeatures = permissions[getUser.role]?.features.find(
      (feature) => feature.menu === "backPanelTenant_awards",
    );
    //ambil permision features all menu (hanya utk admin)
    allMenu = permissions[getUser.role]?.features.find(
      (feature) => feature.menu === "allmenu",
    );

    if (!awardsFeatures && !allMenu) {
      return (
        <NotFound
          statusCode={403}
          msg={"Access Denied"}
          statusDesc="Akses Ditolak. Anda tidak diizinkan mengakses halaman ini."
        />
      );
    }
  }
  let hidenCols: string[] = ["id", "image_id"];
  if (
    (awardsFeatures?.access.includes("tmbhAwards") &&
      allMenu?.access.includes("all_access")) === false
  ) {
    hidenCols.push("action");
  }

  const columns: ReadonlyArray<Column<AwardItem>> = [
    {
      Header: "Avatar",
      accessor: "image_url",
      Cell: ({ value }) => <Avatar size={"sm"} src={value} />,
      width: "30px",
    },
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "image_id",
      accessor: "image_id",
    },
    {
      Header: "Nama Award",
      accessor: "name",
    },
    {
      Header: "Rank",
      accessor: "rank",
      width: "260px",
      Cell: ({ value }) => <Text whiteSpace="normal">{value}</Text>,
    },
  ];
  const renderActions = (rowData: any) => {
    return awardsFeatures?.access.includes("editAwards") ||
      allMenu?.access.includes("all_access") ? (
      <HStack>
        <EditAwards
          idTenant={getParamsId}
          rowData={rowData}
          onSubmit={() => fetchData()}
        />
        &nbsp;
        <DeleteAwards
          idTenant={getParamsId}
          dataDelete={rowData}
          onSubmit={() => fetchData()}
        />
        &nbsp;
      </HStack>
    ) : null;
  };

  return (
    <div>
      {dataAwardsLoading ? (
        <Loading />
      ) : (
        <>
          {namaTenant ? (
            <Suspense fallback={<Loading />}>
              <Flex
                justifyContent={"space-between"}
                pb="2"
                direction={["column", "row"]}
              >
                <Heading fontSize={"2xl"}>AWARDS TENANT : {namaTenant}</Heading>
                <HStack>
                  <Button
                    bgColor="grey.400"
                    color="white"
                    _hover={{
                      bg: "grey.500",
                    }}
                    key="kembali"
                    size="sm"
                    onClick={() => {
                      router.push("/backPanelTenant");
                    }}
                  >
                    <AiOutlineRollback />
                    &nbsp;Data Tenant
                  </Button>
                  {awardsFeatures?.access.includes("tmbhAwards") ||
                  allMenu?.access.includes("all_access") ? (
                    <AddAwards
                      idTenant={getParamsId}
                      onSubmit={() => fetchData()}
                    />
                  ) : null}
                </HStack>
              </Flex>
              <DataTable
                data={awardItem}
                column={columns}
                hiddenColumns={hidenCols}
                filterOptions={filterOptions}
              >
                {(rowData: any) => renderActions(rowData)}
              </DataTable>
            </Suspense>
          ) : (
            <NotFound
              statusCode={404}
              msg={"Not Found"}
              statusDesc="Halaman tidak ditemukan. Periksa kembali URL Halaman yang anda kunjungi atau kembali ke halaman tenant."
              backToHome="/backPanelTenant"
            />
          )}
        </>
      )}
    </div>
  );
}

export default PageAwards;
