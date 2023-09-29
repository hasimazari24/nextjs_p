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
  Flex,
} from "@chakra-ui/react";
import DataTable from "@/app/components/datatable/data-table";
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";
import { AiOutlineRollback } from "@react-icons/all-files/ai/AiOutlineRollback";
import { axiosCustom } from "@/app/api/axios";
import ModalEditCatalog from "./modal-edit-catalog";
import ConfirmationModal from "@/app/components/modal/modal-confirm";

interface DataItem {
  id: string;
  title: string;
  description: string;
}

export default function PageCatalog() {
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
      Header: "id",
      accessor: "id",
    },
    {
      Header: "title",
      accessor: "title",
    },
    {
      Header: "description",
      accessor: "description",
    },
  ];

  const [dataCatalog, setDataCatalog] = useState<Array<DataItem>>([]);
  const searchParams = useSearchParams();
  const idTenant = searchParams.get("id");
  const [namaTenant, setNamaTenant] = useState("");
  const [loadingCatalog, setLoadingCatalog] = useState<boolean>(false);
  const router = useRouter();
  if (!idTenant) {
    router.push("/tenant");
    // handleShowMessage(`Silahkan pilih tenant terlebih dahulu!`, true);
  }

  const getCatalog = async () => {
    try {
      setLoadingCatalog(true);
      // Panggil API menggunakan Axios dengan async/await
      await axiosCustom.get(`/tenant-catalog/${idTenant}`).then((response) => {
        console.log(response);
        setDataCatalog(response.data.data.catalog);
        setNamaTenant(response.data.data.name);
      });
      
      // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
      const timer = setTimeout(() => {
        // setIdTenant(id);
        setLoadingCatalog(false); // Set isLoading to false to stop the spinner
      }, 1000);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Gagal memuat data:", error);
      setLoadingCatalog(false);
    }
  };

  console.log(dataCatalog);

  useEffect(() => {
    // Panggil fungsi fetchData untuk memuat data
    if(idTenant) getCatalog();
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
    );
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
          "/tenant-catalog" + `/${dataDeleteId}`,
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
        <Center h="100%" m="10">
          <Spinner className="spinner" size="xl" color="blue.500" />
        </Center>
      ) : (
        <>
          <Text fontSize="lg" fontWeight="bold"></Text>

          <Flex
            justifyContent={"space-between"}
            pb="2"
            direction={["column", "row"]}
          >
            <Heading fontSize={"2xl"}>
              CATALOG TENANT : {namaTenant.toUpperCase()}
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
                onClick={handleAdd}
              >
                <AddIcon />
                &nbsp;Tambah Baru
              </Button>
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
        idTenant={idTenant}
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
