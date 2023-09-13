"use client";
import { Heading } from "@chakra-ui/layout";
import { Container } from "@chakra-ui/layout";
// import users from "./data/users";
import DataTable from "../../components/data-table";
// import GithubCorner from "components/github-corner";
import type { NextPage } from "next";
import Head from "next/head";
import { Column } from "react-table";
import { User } from "types/model";
import { useEffect, useState } from "react";
import ModalEdit from "./modal-edit";
import ModalDetail from "./modal-detail";
import { Button, Center, HStack, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import apiCall from "../../components/api-call";
import ConfirmationModal from "../../components/modal-confirm";
import ModalNotif from "../../components/modal-notif";
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  SearchIcon,
  ViewIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context";
import { idText } from "typescript";

interface DataItem {
  id: string;
  name: string;
  description: string;
  address: string;
  contact: string;
  email: string;
  founder: string;
  level_tenant: string;
  image: string;
}

export default function page() {
  const [isModalNotif, setModalNotif] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleShowMessage = (msg: string, err: boolean) => {
    setMessage(msg);
    setIsError(err);
    setModalNotif(true);
  };

  const hidenCols = ["id", "founder", "email", "contact", "description"];

  const columns: ReadonlyArray<Column<DataItem>> = [
    {
      Header: "Logo",
      accessor: "image",
    },
    {
      Header: "User ID",
      accessor: "id",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Deskripsi",
      accessor: "description",
    },
    {
      Header: "Alamat",
      accessor: "address",
    },
    {
      Header: "Kontak",
      accessor: "contact",
    },
    {
      Header: "E-mail",
      accessor: "email",
    },
    {
      Header: "Founder",
      accessor: "founder",
    },
    {
      Header: "Level Tenant",
      accessor: "level_tenant",
    },
  ];

  //untuk menampung data yang diedit dan tambah data baru
  // const [data, setData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [dataTampil, setDataTampil] = useState<any | null>([]);
  const getTampil = async () => {
    try {
      // Panggil API menggunakan Axios dengan async/await
      const response = await axios.get(apiCall.getStartUp);

      // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
      const timer = setTimeout(() => {
        setDataTampil(response.data.data);
        // console.log(dataTampil);
        setIsLoading(false); // Set isLoading to false to stop the spinner
      }, 1000);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Gagal memuat data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Panggil fungsi fetchData untuk memuat data
    getTampil();
    // Clear the timeout when the component is unmounted
  }, []);
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

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState<any | null>(null);
  const router = useRouter();

  const renderActions = (rowData: any) => {
    return (
      <>
        <Button
          bgColor="teal.200"
          _hover={{
            bg: "teal.300",
          }}
          color="white"
          title="Tampilkan Detail"
          onClick={() => handleDetail(rowData)}
          key="dataDetail"
          size="sm"
        >
          <ViewIcon />
        </Button>
        &nbsp;
        {/* <Link
          href={{
            pathname: "/startup/page-catalog",
            query: { id: rowData.id },
          }}
          as="/startup/page-catalog"
          passHref
        >
          <Button
            bgColor="blue.200"
            color="white"
            _hover={{
              bg: "blue.300",
            }}
            title="Lihat Katalog"
            // onClick={() => router.push(`/startup/page-catalog?id=${rowData.id}`)}
            key="catalog"
            size="sm"
          >
            <HamburgerIcon />
          </Button>
        </Link> */}
        <Button
          bgColor="blue.200"
          color="white"
          _hover={{
            bg: "blue.300",
          }}
          title="Lihat Katalog"
          // onClick={() => router.push(`/startup/page-catalog?id=${rowData.id}`)}
          onClick={() => {handleCatalog(rowData.id)}}
          key="catalog"
          size="sm"
        >
          <HamburgerIcon />
        </Button>
        &nbsp;
        <Button
          colorScheme="blue"
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
  const link:string = "/startup/page-catalog";
  const handleCatalog = (id:string) => {
    router.push(`/startup/page-catalog?id=${id}`);
  }

  function handleAdd() {
    // setEditingData(null);
    setIsModalAddOpen(true);
    // console.log(editingData);
  }

  const handleDelete = (item: any) => {
    setDataDeleteId(item.id);
    setTextConfirm(
      `Yakin ingin hapus data Tenant dengan nama : ${item.name} ?`
    );
    setIsModalDeleteOpen(true);
  };

  const handleDetail = (item: any) => {
    setDataDetail(item);

    setIsModalDetailOpen(true);
    // console.log(dataDetail);
  };

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const deleteData = async () => {
    if (dataDeleteId !== null) {
      // Lakukan penghapusan data berdasarkan dataToDeleteId
      try {
        setIsLoadingDelete(true);
        // Panggil API menggunakan Axios dengan async/await
        const response = await axios.delete(
          apiCall.getStartUp + `/${dataDeleteId}`
        );

        // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
        const timer = setTimeout(() => {
          // console.log(response);
          if (response.status === 200) {
            setIsLoadingDelete(false);
            setIsModalDeleteOpen(false);
            handleShowMessage("Data berhasil dihapus.", false);
          }
        }, 1000);

        await getTampil();

        return () => clearTimeout(timer);
      } catch (error: any) {
        if (error?.response) {
          handleShowMessage(
            `Terjadi Kesalahan: ${error.response.data.message}`,
            true
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

  return (
    <div>
      {isLoading ? (
        <Center h="100%" m="10">
          <Spinner className="spinner" size="xl" color="blue.500" />
        </Center>
      ) : (
        <>
          <HStack>
            <Text fontSize="lg" fontWeight="bold">
              DATA START-UP
            </Text>
            <Button
              colorScheme="green"
              key="tambahData"
              size="sm"
              onClick={handleAdd}
            >
              <AddIcon />
              &nbsp;Tambah
            </Button>
          </HStack>
          {/* {editingData && ( */}
          <ModalEdit
            // isOpen={isModalOpen}
            // onClose={() => setIsModalOpen(false)}
            // data={editingData}
            isOpen={isModalEditOpen}
            onClose={() => setIsModalEditOpen(false)}
            onSubmit={() => {
              handleSaveData;
              setEditingData(null);
              getTampil();
            }}
            isEdit={true}
            formData={editingData}
          />

          {/* untuk menambah data baru */}
          <ModalEdit
            isOpen={isModalAddOpen}
            onClose={() => setIsModalAddOpen(false)}
            onSubmit={() => {
              handleSaveData;
              getTampil();
            }}
            isEdit={false}
          />

          {/* Modal hapus data */}
          <ConfirmationModal
            isOpen={isModalDeleteOpen}
            onClose={() => setIsModalDeleteOpen(false)}
            onConfirm={deleteData}
            dataConfirm={textConfirm}
            isLoading={isLoadingDelete}
          />

          {/* untuk membuka data detail */}
          <ModalDetail
            isOpen={isModalDetailOpen}
            onClose={() => setIsModalDetailOpen(false)}
            tableData={dataDetail}
          />

          <DataTable
            data={dataTampil}
            column={columns}
            // handleEdit={handleEdit}
            // handleDelete={handleDelete}
            hiddenColumns={hidenCols}
          >
            {(rowData: any) => renderActions(rowData)}
          </DataTable>

          <ModalNotif
            isOpen={isModalNotif}
            onClose={() => setModalNotif(false)}
            message={message}
            isError={isError}
          />
        </>
      )}
    </div>
  );
}
