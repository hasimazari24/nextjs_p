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
import AddGallery from "./addGallery";
import EditGallery from "./editGallery";
import DeleteGallery from "./deleteGallery";
import { UserRoles, permissions } from "@/app/type/role-access-control.d";
import { useAuth } from "@/app/components/utils/AuthContext";
import NotFound from "@/app/components/template/NotFound";

interface GalleryItem {
  id: string;
  image_id: string;
  image_url: string;
  title: string;
  description: string;
  event_date_format: string;
  event_date: string;
}

interface DataItem {
  id: string;
  name: string;
  gallery: GalleryItem;
}

interface UserLog {
  // id: string;
  fullname: string;
  role: UserRoles;
  image_url: string;
}

function PageGallery({ params }: { params: { slug: string } }) {
  const getParamsId = params.slug;
  if ((getParamsId && getParamsId.length === 0) || !getParamsId) {
    return notFound();
  }
  const router = useRouter();

  const [dataGalleryLoading, setDataGalleryLoading] = useState(true);
  // const [dataGallery, setDataGallery] = useState<DataItem[]>([]);
  const [galleryItem, setGalleryItem] = useState<GalleryItem[]>([]);
  const [namaTenant, setNamaTenant] = useState<string | null>();

  const fetchData = async (): Promise<void> => {
    try {
      const response = await axiosCustom.get(
        `/tenant/${getParamsId}/get-gallery`,
      );
      const newDataGallery: DataItem[] = [await response.data.data];
      const newGalleryItem = newDataGallery.flatMap((dataItem) =>
        Array.isArray(dataItem.gallery)
          ? dataItem.gallery.map((gallery) => ({
              id: gallery.id,
              image_id: gallery.image_id,
              image_url: gallery.image_url,
              title: gallery.title,
              description: gallery.description,
              event_date_format: gallery.event_date_format,
              event_date: gallery.event_date,
            }))
          : [],
      );
      const namatenant = newDataGallery
        .map((item) => item.name.toUpperCase())
        .toString();
      setNamaTenant(namatenant);
      // setDataGallery(newDataGallery);
      setGalleryItem(newGalleryItem);
      setDataGalleryLoading(false);
    } catch (error) {
      console.error("Error updating data:", error);
      setNamaTenant(null);
      setDataGalleryLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [getParamsId]);

  const filterOptions = [{ key: "name", label: "Nama Gallery" }];

  const { user } = useAuth();
  let getUser: UserLog | null = null; // Inisialisasikan getUser di sini

  if (user !== null && user !== 401) {
    getUser = user; // Setel nilai getUser jika user ada
  }

  let GalleryFeatures: any | null | undefined = null; // Inisialisasikan fitur pada menunya
  let allMenu: any | null = null;
  if (getUser !== null) {
    // ambil permission sesuai login role
    GalleryFeatures = permissions[getUser.role]?.features.find(
      (feature) => feature.menu === "backPanelTenant_gallery",
    );
    //ambil permision features all menu (hanya utk admin)
    allMenu = permissions[getUser.role]?.features.find(
      (feature) => feature.menu === "allmenu",
    );
    if (!GalleryFeatures && !allMenu) {
      return (
        <NotFound
          statusCode={403}
          msg={"Access Denied"}
          statusDesc="Akses Ditolak. Anda tidak diizinkan mengakses halaman ini."
        />
      );
    }
  }
  let hidenCols: string[] = ["id", "event_date", "image_id"];
  if (
    (GalleryFeatures?.access.includes("tmbhGallery") &&
      allMenu?.access.includes("all_access")) === false
  ) {
    hidenCols.push("action");
  }

  const columns: ReadonlyArray<Column<GalleryItem>> = [
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
      Header: "Judul Event",
      accessor: "title",
    },
    {
      Header: "Deskripsi",
      accessor: "description",
      Cell: ({ value }) => (
        <Text
          textOverflow={"ellipsis"}
          overflow={"hidden"}
          flex="1"
          noOfLines={2}
          whiteSpace="normal"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      ),
      width: "450px",
      minWidth: 260,
      maxWidth: 450,
    },
    {
      Header: "Tanggal Event",
      accessor: "event_date_format",
      minWidth: 150,
    },
    {
      Header: "Tgl_Event",
      accessor: "event_date",
    },
  ];
  const renderActions = (rowData: any) => {
    return GalleryFeatures?.access.includes("editGallery") ||
      allMenu?.access.includes("all_access") ? (
      <HStack>
        <EditGallery
          idTenant={getParamsId}
          rowData={rowData}
          onSubmit={() => fetchData()}
        />
        &nbsp;
        <DeleteGallery
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
      {dataGalleryLoading ? (
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
                <Heading fontSize={"2xl"}>
                  GALLERY TENANT : {namaTenant}
                </Heading>
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
                  {GalleryFeatures?.access.includes("tmbhGallery") ||
                  allMenu?.access.includes("all_access") ? (
                    <AddGallery
                      idTenant={getParamsId}
                      onSubmit={() => fetchData()}
                    />
                  ) : null}
                </HStack>
              </Flex>
              <DataTable
                data={galleryItem}
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

export default PageGallery;
