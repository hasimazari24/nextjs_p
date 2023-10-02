"use client";

import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import {
  Button,
  Center,
  Spinner,
  Text,
  HStack,
  Heading,
  Flex, Checkbox,
} from "@chakra-ui/react";
import DataTable from "@/app/components/datatable/data-table";
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";
// import { AiOutlineRollback } from "@react-icons/all-files/ai/AiOutlineRollback";
import { AiOutlineRollback } from "react-icons/ai";
import { axiosCustom } from "@/app/api/axios";
import SearchModal from "@/app/(secure)/tenant/team/SearchModal";
import ModalNotif from "@/app/components/modal/modal-notif";
import ModalTeam from "./modal-team";
import ConfirmationModal from "@/app/components/modal/modal-confirm";

interface DataItem {
  // id_tenant: string;
  id: string;
  image: string;
  username: string;
  fullname: string;
  position: string;
  is_admin: boolean;
  is_public: boolean;
}

export default function PageTeam() {
  const hidenCols = ["id"];
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

  //handle hapus
  const [dataDeleteId, setDataDeleteId] = useState<number | null>(null);
  const [textConfirm, setTextConfirm] = useState(" ");
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  //handle add team
  const [isModalSearchOpen, setIsModalSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [resultNothing, setResultNothing] = useState<string | null>(null);

  const filterOptions = [
    { key: "username", label: "Username" },
    {
      key: "position",
      label: "Posisi",
    },
    {
      key: "is_admin",
      label: "Hanya Admin",
      type: "val_check",
    },
    {
      key: "is_public",
      label: "Hanya Public",
      type: "val_check",
    },
  ];

  const columns: ReadonlyArray<Column<DataItem>> = [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "image",
      accessor: "image",
    },
    {
      Header: "username",
      accessor: "username",
    },
    {
      Header: "fullname",
      accessor: "fullname",
    },
    {
      Header: "position",
      accessor: "position",
    },
    {
      Header: "Admin",
      width : 20,
      accessor: "is_admin",
      Cell: ({ value }) =>
        value ? (
          // <Center>
            <Checkbox defaultChecked isDisabled size="lg" />
          // </Center>
        ) : null,
    },
    {
      Header: "Show Public",
      accessor: "is_public",
      Cell: ({ value }) =>
        value ? (
          <Center>
            <Checkbox defaultChecked isDisabled size="lg" />
          </Center>
        ) : null,
    },
  ];

  const [dataTeam, setDataTeam] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const idTenant = searchParams.get("id");
  const [namaTenant, setNamaTenant] = useState("");
  const [loadingTeam, setLoadingTeam] = useState<boolean>(false);
  const router = useRouter();

  if(!idTenant) {
    router.push("/tenant");
  };

  const getTeam = async () => {
    try {
      setLoadingTeam(true);
      // Panggil API menggunakan Axios dengan async/await
      const response =  await axiosCustom.get(`/tenant/${idTenant}/get-user`);

      // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
      const timer = setTimeout(() => {
        setDataTeam(response.data.data.user_tenant);
        
        setNamaTenant(response.data.data.name);
        // setIdTenant(id);
        setLoadingTeam(false); // Set isLoading to false to stop the spinner
      }, 1000);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Gagal memuat data:", error);
      setLoadingTeam(false);
    }
  };

  useEffect(() => {
    // Panggil fungsi fetchData untuk memuat data
    if (idTenant) getTeam();
    // Clear the timeout when the component is unmounted
  }, []);

  const renderActions = (rowData: any) => {
    return (
      <>
        <Button
          bgColor="blue.100"
          _hover={{
            bg: "blue.200",
          }}
          // color="white"
          title="Edit Data"
          onClick={() => handleEdit(rowData)}
          key="editData"
          size="sm"
        >
          <EditIcon />
        </Button> &nbsp;
        <Button
          title="Hapus Tim"
          colorScheme="red"
          onClick={() => handleDelete(rowData)}
          key="hapusData"
          size="sm"
        >
          <DeleteIcon />
        </Button>
      </>
    );
  };

  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const handleSearch = async (query: string) => {
    try {
      setIsLoadingSearch(true);
      const response = await axiosCustom.get(`/user/search-user-tenant/${query}`);
      // console.log(response);
      const timer = setTimeout(() => {
        if (response.status === 200 && response.data.data) {
          setSearchResults(response.data.data);
          setResultNothing(null);
          setIsLoadingSearch(false);
        }
      }, 1000);

      return () => clearTimeout(timer);
    } catch (error: any) {
      if (error?.response) {
        if (error.response.status === 404) {
          setResultNothing(error.response.data.message);
        } else
          handleShowMessage(
            `Terjadi Kesalahan: ${error.response.data.message}`,
            true,
          );
      } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
      setIsLoadingSearch(false);
    }
  };
  const [isLoadSave, setIsLoadSave] = useState(false);
  const saveSelectedItem = async (data: any) => {
    setIsLoadSave(true);
    try {
      const response = await axiosCustom.post(
        `/tenant/${idTenant}/add-user`,
        data,
      );
      if (response.status === 201) {
        handleShowMessage(
          `Anggota Tim berhasil ditambahkan`,
          false,
        );
        setIsLoadSave(false);
        await getTeam();
        setIsModalSearchOpen(false);
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response) {
        handleShowMessage(
          `Terjadi Kesalahan: ${error.response.data}`,
          true,
        );
      } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
      setIsLoadSave(false);
    }
  };

  const handleDelete = (item: any) => {
    setDataDeleteId(item.id);
    setTextConfirm(
      `Yakin ingin hapus anggota tim dengan nama : ${item.fullname} ?`,
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
          `tenant/${idTenant}/delete-user/${dataDeleteId}`
        );

        // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
        const timer = setTimeout(() => {
          // console.log(response);
          if (response.status === 200) {
            setIsLoadingDelete(false);
            setIsModalDeleteOpen(false);
            handleShowMessage("Data berhasil dihapus.", false);
            getTeam();
          }
        }, 1000);

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

  const handleEdit = (item: any) => {
    setEditingData(item);
    setIsModalEditOpen(true);
    // console.log(item);
  };

  return (
    <div>
      {loadingTeam ? (
        <Center h="100%" m="10">
          <Spinner className="spinner" size="xl" color="blue.500" />
        </Center>
      ) : (
        <>
          <Flex
            justifyContent={"space-between"}
            pb="2"
            direction={["column", "row"]}
          >
            <Heading fontSize={"2xl"}>
              TEAM TENANT : {namaTenant.toUpperCase()}
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
                  router.push("/tenant");
                }}
              >
                <AiOutlineRollback />
                &nbsp;Daftar Tenant
              </Button>
              <Button
                colorScheme="green"
                key="tambahData"
                size="sm"
                onClick={() => setIsModalSearchOpen(true)}
              >
                <AddIcon />
                &nbsp;Tambah Anggota
              </Button>
            </HStack>
          </Flex>

          <DataTable
            data={dataTeam}
            column={columns}
            hiddenColumns={hidenCols}
            filterOptions={filterOptions}
          >
            {(rowData: any) => renderActions(rowData)}
          </DataTable>
        </>
      )}

      {/* buka modal search */}
      <SearchModal
        isOpen={isModalSearchOpen}
        onClose={() => {
          setIsModalSearchOpen(false);
          setSearchResults([]);
          setResultNothing(null);
        }}
        onSearch={handleSearch}
        searchResults={searchResults}
        isLoading={isLoadingSearch}
        isLoadSave={isLoadSave}
        onSubmit={(item) => {
          saveSelectedItem(item);
        }}
        ifResultNothing={resultNothing}
      />

      {/* Modal hapus data */}
      <ConfirmationModal
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        onConfirm={deleteData}
        dataConfirm={textConfirm}
        isLoading={isLoadingDelete}
      />

      <ModalTeam
        isOpen={isModalEditOpen}
        onClose={() => setIsModalEditOpen(false)}
        onSubmit={() => {
          setEditingData(null);
          getTeam();
        }}
        formData={editingData}
        idTenant={idTenant}
      />

      <ModalNotif
        isOpen={isModalNotif}
        onClose={() => setModalNotif(false)}
        message={message}
        isError={isError}
      />
    </div>
  );
}
