"use client";

import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import {
  useSearchParams,
  useRouter,
  useParams,
  notFound,
} from "next/navigation";
import {
  Button,
  Center,
  Spinner,
  Text,
  HStack,
  Heading,
  Flex,
} from "@chakra-ui/react";
import DataTable from "@/app/components/datatable/data-table";
import Loading from "../../loading";
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";
import { AiOutlineRollback } from "react-icons/ai";
import { axiosCustom } from "@/app/api/axios";
import ModalEditProgram from "./modal-edit-program";
import ConfirmationModal from "@/app/components/modal/modal-confirm";
import { UserRoles, permissions } from "@/app/type/role-access-control.d";
import { useAuth } from "@/app/components/utils/AuthContext";
import NotFound from "@/app/components/template/NotFound";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import { FindDefaultRoute } from "@/app/components/utils/FindDefaultRoute";

interface DataItem {
  id: string;
  program: string;
}

interface UserLog {
  // id: string;
  fullname: string;
  role: UserRoles;
  image_url: string;
}

export default function PageProgram({ params }: { params: { slug: string } }) {
  const { user } = useAuth();
  const [is_admin, setIs_Admin] = useState<boolean>(false);
  let getUser: UserLog | null = null; // Inisialisasikan getUser di sini

  if (user !== null && user !== 401) {
    getUser = user; // Setel nilai getUser jika user ada
  }

  let programFeatures: any | null | undefined = null; // Inisialisasikan fitur pada menunya
  let allMenu: any | null = null;
  if (getUser !== null) {
    // ambil permission sesuai login role
    programFeatures = permissions[getUser.role]?.features.find(
      (feature) => feature.menu === "backPanelTenant_program",
    );
    //ambil permision features all menu (hanya utk admin)
    allMenu = permissions[getUser.role]?.features.find(
      (feature) => feature.menu === "allmenu",
    );

    if (!programFeatures && !allMenu) {
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
    (programFeatures?.access.includes("tmbhProgram") &&
      is_admin === true &&
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

  const filterOptions = [{ key: "program", label: "Nama Program" }];

  const columns: ReadonlyArray<Column<DataItem>> = [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "Nama Program",
      accessor: "program",
      Cell: ({ value }) => (
        <Text
          textOverflow={"ellipsis"}
          overflow={"hidden"}
          flex="1"
          noOfLines={2}
          whiteSpace="normal"
        >
          {value}
        </Text>
      ),
      // width: "450px",
      // minWidth: 260,
      // maxWidth: 550,
    },
  ];

  const [dataProgram, setDataProgram] = useState<Array<DataItem>>([]);
  const searchParams = useSearchParams();
  // console.log(params);
  const idTenant = searchParams.get("id");
  // const idTenant = params.id;
  const [namaTenant, setNamaTenant] = useState<string | null>();
  const [loadingProgram, setLoadingProgram] = useState<boolean>(true);
  const router = useRouter();
  // if (!params.program) {
  //   router.push("/tenant");
  //   // handleShowMessage(`Silahkan pilih tenant terlebih dahulu!`, true);
  // }

  // console.log(window.location.href.indexOf(4));
  // console.log(searchParams.values());

  // const getParamsId = params.program.split("program-")[1];
  const getParamsId = params.slug;

  if ((getParamsId && getParamsId.length === 0) || !getParamsId) {
    return notFound();
  }

  const getProgram = async () => {
    try {
      setLoadingProgram(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(
        `/tenant/${getParamsId}/get-program`,
      );
      if (response.data.data) {
        // console.log(response);
        setDataProgram(response.data.data.program);
        setNamaTenant(response.data.data.name.toUpperCase());
        setIs_Admin(response.data.data.is_admin);
      }

      // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
      const timer = setTimeout(() => {
        // setIdTenant(id);
        setLoadingProgram(false); // Set isLoading to false to stop the spinner
      }, 1000);

      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setNamaTenant(null);
      setLoadingProgram(false);
    }
  };

  const { breadcrumbs, setBreadcrumbs } = useBreadcrumbContext();
  const getForCrumbs: any = FindDefaultRoute();
  useEffect(() => {
    if (getForCrumbs) setBreadcrumbs(getForCrumbs);
  }, []);

  useEffect(() => {
    // Panggil fungsi fetchData untuk memuat data
    getProgram();
    // Clear the timeout when the component is unmounted
  }, []);

  const renderActions = (rowData: any) => {
    return (programFeatures?.access.includes("editProgram") &&
      is_admin === true) ||
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
      `Yakin ingin hapus data Tenant dengan Judul : ${item.program} ?`,
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
          `/tenant/${getParamsId}/delete-program/${dataDeleteId}`,
        );

        // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
        const timer = setTimeout(() => {
          // console.log(response);
          if (response.status === 200) {
            setIsLoadingDelete(false);
            setIsModalDeleteOpen(false);
            handleShowMessage("Data berhasil dihapus.", false);
            // getProgram(idTenant);
          }
        }, 1000);

        await getProgram();

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

  // const [dataProgram, setDataProgram] = useState<any | null>([]);
  return (
    <div>
      {loadingProgram ? (
        <Loading />
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
                  PROGRAM TENANT : {namaTenant?.toUpperCase()}
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
                  {(programFeatures?.access.includes("tmbhProgram") &&
                    is_admin === true) ||
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
                data={dataProgram}
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
      <ModalEditProgram
        // isOpen={isModalOpen}
        // onClose={() => setIsModalOpen(false)}
        // data={editingData}
        isOpen={isModalEditOpen}
        onClose={() => setIsModalEditOpen(false)}
        onSubmit={() => {
          handleSaveData;
          setEditingData(null);
          getProgram();
          // getTampil();
        }}
        isEdit={true}
        formData={editingData}
        idTenant={getParamsId}
      />

      {/* untuk menambah data baru */}
      <ModalEditProgram
        isOpen={isModalAddOpen}
        onClose={() => setIsModalAddOpen(false)}
        onSubmit={() => {
          handleSaveData;
          getProgram();
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
/*kode pertama
import React from "react";

function page() {
  return <div>page</div>;
}

export default page;*/
