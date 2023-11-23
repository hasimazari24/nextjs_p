"use client";

import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import {
  useSearchParams,
  useRouter,
} from "next/navigation";
import {
  Button,
  Text,
  HStack,
  Link,
  Heading,
  Flex,
  Avatar,
} from "@chakra-ui/react";
import DataTable from "@/app/components/datatable/data-table";
import {
  DeleteIcon,
  EditIcon,
  AddIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import { AiOutlineRollback } from "react-icons/ai";
import { axiosCustom } from "@/app/api/axios";
import Loading from "../../loading";                    
import ModalEditCatalog from "./modal-edit-catalog";
import ConfirmationModal from "@/app/components/modal/modal-confirm";
import { UserRoles, permissions } from "@/app/type/role-access-control.d";
import { useAuth } from "@/app/components/utils/AuthContext";
import NotFound from "@/app/components/template/NotFound";

interface DataItem {
  id: string;
  title: string;
  description: string;
  image_id: string;
  image_url: string;
  url?: string | null;
}

interface UserLog {
  // id: string;
  fullname: string;
  role: UserRoles;
  image_url: string;
}

export default function PageCatalog({ params }: { params: { slug: string } }) {
  const { user } = useAuth();
  let getUser: UserLog | null = null; // Inisialisasikan getUser di sini

  if (user !== null && user !== 401) {
    getUser = user; // Setel nilai getUser jika user ada
  }

  let catalogFeatures: any | null | undefined = null; // Inisialisasikan fitur pada menunya
  let allMenu: any | null = null;
  if (getUser !== null) {
    // ambil permission sesuai login role
    catalogFeatures = permissions[getUser.role]?.features.find(
      (feature) => feature.menu === "backPanelTenant_catalog",
    );
    //ambil permision features all menu (hanya utk admin)
    allMenu = permissions[getUser.role]?.features.find(
      (feature) => feature.menu === "allmenu",
    );
    if (!catalogFeatures && !allMenu) {
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
    (catalogFeatures?.access.includes("tmbhCatalog") &&
      allMenu?.access.includes("all_access")) === false
  ) {
    hidenCols.push("action");
  }

  const [isModalNotif, setModalNotif] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleShowMessage = (msg: string, err: boolean) => {
    setMessage(msg);
    setIsError(err);
    setModalNotif(true);
  };

  //handle edit data
  const [editingData, setEditingData] = useState<any | null>(null);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  //handle tambah data
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  // const [selectedData, setSelectedData] = useState<any | null>(null);

  //handle hapus
  const [dataDeleteId, setDataDeleteId] = useState<number | null>(null);
  const [textConfirm, setTextConfirm] = useState(" ");
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const filterOptions = [{ key: "title", label: "Judul" }];

  const columns: ReadonlyArray<Column<DataItem>> = [
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
      Header: "title",
      accessor: "title",
      Cell: ({ value }) => <div style={{ whiteSpace: "normal" }}>{value}</div>,
    },
    {
      Header: "description",
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
      Header: "URL",
      accessor: "url",
      Cell: ({ value }) =>
        value !== null ? (
          <div style={{ whiteSpace: "normal" }}>
            <Link color="blue.500" href={value} target="_blank">
              {value} <ExternalLinkIcon mx="2px" />
            </Link>
          </div>
        ) : (
          ""
        ),
    },
  ];

  const [dataCatalog, setDataCatalog] = useState<Array<DataItem>>([]);
  const searchParams = useSearchParams();
  // console.log(params);
  const idTenant = searchParams.get("id");
  // const idTenant = params.id;
  const [namaTenant, setNamaTenant] = useState<string | null>();
  const [loadingCatalog, setLoadingCatalog] = useState<boolean>(true);
  const router = useRouter();
  // if (!params.catalog) {
  //   router.push("/tenant");
  //   // handleShowMessage(`Silahkan pilih tenant terlebih dahulu!`, true);
  // }

  // const getParamsId = params.catalog.split("catalog-")[1];
  const getParamsId = params.slug;

  const getCatalog = async () => {
    try {
      setLoadingCatalog(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(
        `/tenant/${getParamsId}/get-catalog`,
      );
      if (response.data.data) {
        // console.log(response);
        setDataCatalog(response.data.data.catalog);
        setNamaTenant(response.data.data.name);
      }

      // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
      const timer = setTimeout(() => {
        // setIdTenant(id);
        setLoadingCatalog(false); // Set isLoading to false to stop the spinner
      }, 1000);

      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setNamaTenant(null);
      setLoadingCatalog(false);
    }
  };

  useEffect(() => {
    // Panggil fungsi fetchData untuk memuat data
    getCatalog();
    // Clear the timeout when the component is unmounted
  }, []);

  const renderActions = (rowData: any) => {
    return catalogFeatures?.access.includes("tmbhCatalog") ||
      allMenu?.access.includes("all_access") ? (
      <>
        <Button
          bgColor="blue.100"
          _hover={{
            bg: "blue.200",
          }}
          title="Edit Data"
          onClick={() => handleEdit(rowData)}
          key="editData"
          size="sm"
        >
          <EditIcon />
        </Button>
        &nbsp;
        <Button
          title="Hapus Data"
          colorScheme="red"
          onClick={() => handleDelete(rowData)}
          key="hapusData"
          size="sm"
        >
          <DeleteIcon />
        </Button>
      </>
    ) : null;
  };

  const handleEdit = (item: any) => {
    setEditingData(item);
    setIsModalEditOpen(true);
    // console.log(item);
  };

  function handleAdd() {
    // setEditingData(null);
    setIsModalAddOpen(true);
    // console.log(editingData);
  }

  const handleDelete = (item: any) => {
    setDataDeleteId(item.id);
    setTextConfirm(
      `Yakin ingin hapus data Tenant dengan Judul : ${item.title} ?`,
    );
    setIsModalDeleteOpen(true);
  };

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const deleteData = async () => {
    if (dataDeleteId !== null) {
      // Lakukan penghapusan data berdasarkan dataToDeleteId
      try {
        setIsLoadingDelete(true);
        // Panggil API menggunakan Axios dengan async/await
        const response = await axiosCustom.delete(
          `/tenant/${getParamsId}/delete-catalog/${dataDeleteId}`,
        );

        // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
        const timer = setTimeout(() => {
          // console.log(response);
          if (response.status === 200) {
            setIsLoadingDelete(false);
            setIsModalDeleteOpen(false);
            handleShowMessage("Data berhasil dihapus.", false);
            // getCatalog(idTenant);
          }
        }, 1000);

        await getCatalog();

        return () => clearTimeout(timer);
      } catch (error: any) {
        if (error?.response) {
          handleShowMessage(
            `Terjadi Kesalahan: ${error.response.data.message}`,
            true,
          );
        } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
        setIsLoadingDelete(false);
      }
      setDataDeleteId(null);
    }
  };

  const handleSaveData = () => {
    setIsModalAddOpen(false);
    setIsModalEditOpen(false);
  };

  // const [dataCatalog, setDataCatalog] = useState<any | null>([]);
  return (
    <div>
      {loadingCatalog ? (
        <Loading/>
      ) : (
        <>
          {namaTenant ? (
            <>
              <Text fontSize="lg" fontWeight="bold"></Text>

              <Flex
                justifyContent={"space-between"}
                pb="2"
                direction={["column", "row"]}
              >
                <Heading fontSize={"2xl"}>
                  CATALOG TENANT : {namaTenant?.toUpperCase()}
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
                      router.push(`/backPanelTenant`);
                    }}
                  >
                    <AiOutlineRollback />
                    &nbsp;Data Tenant
                  </Button>
                  {catalogFeatures?.access.includes("tmbhCatalog") ||
                  allMenu?.access.includes("all_access") ? (
                    <Button
                      colorScheme="green"
                      key="tambahData"
                      size="sm"
                      onClick={handleAdd}
                    >
                      <AddIcon />
                      &nbsp;Tambah Baru
                    </Button>
                  ) : null}
                </HStack>
              </Flex>
              <DataTable
                data={dataCatalog}
                column={columns}
                hiddenColumns={hidenCols}
                filterOptions={filterOptions}
              >
                {(rowData: any) => renderActions(rowData)}
              </DataTable>
            </>
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

      {/* {editingData && ( */}
      <ModalEditCatalog
        // isOpen={isModalOpen}
        // onClose={() => setIsModalOpen(false)}
        // data={editingData}
        isOpen={isModalEditOpen}
        onClose={() => setIsModalEditOpen(false)}
        onSubmit={() => {
          handleSaveData;
          setEditingData(null);
          getCatalog();
          // getTampil();
        }}
        isEdit={true}
        formData={editingData}
        idTenant={getParamsId}
      />

      {/* untuk menambah data baru */}
      <ModalEditCatalog
        isOpen={isModalAddOpen}
        onClose={() => setIsModalAddOpen(false)}
        onSubmit={() => {
          handleSaveData;
          getCatalog();
        }}
        isEdit={false}
        idTenant={getParamsId}
      />

      {/* Modal hapus data */}
      <ConfirmationModal
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        onConfirm={deleteData}
        dataConfirm={textConfirm}
        isLoading={isLoadingDelete}
      />
    </div>
  );
}
