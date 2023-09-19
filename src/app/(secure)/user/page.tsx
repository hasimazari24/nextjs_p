"use client";

import DataTable from "../../components/datatable/data-table";
import { Column } from "react-table";
import { useEffect, useState, useContext } from "react";
import ModalEdit from "./modal-edit";
import ModalReset from "./modal-reset-pass";
import { Button, Center, HStack, Spinner, Text } from "@chakra-ui/react";
import ConfirmationModal from "../../components/modal/modal-confirm";
import ModalNotif from "../../components/modal/modal-notif";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { axiosCustom } from "@/app/api/axios";
import { MdLockReset } from "react-icons/md";

interface DataItem {
  image: string;
  id: string;
  username: string;
  //   password: string;
  email: string;
  role: string;
  fullname: string;
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

  const hidenCols = ["id"];

  const columns: ReadonlyArray<Column<DataItem>> = [
    {
      Header: "Photo",
      accessor: "image",
    },
    {
      Header: "User ID",
      accessor: "id",
    },
    {
      Header: "Nama Lengkap",
      accessor: "fullname",
    },
    {
      Header: "Username",
      accessor: "username",
    },

    {
      Header: "E-mail",
      accessor: "email",
    },
    {
      Header: "Hak Akses",
      accessor: "role",
    },
  ];

  const [isLoading, setIsLoading] = useState(true);

  const [dataTampil, setDataTampil] = useState<any | null>([]);
  const getTampil = async () => {
    try {
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get("/user");

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

  const [isModalResetOpen, setIsModalResetOpen] = useState(false);
  const [dataReset, setDataReset] = useState<any | null>(null);

  //handle hapus
  const [dataDeleteId, setDataDeleteId] = useState<number | null>(null);
  const [textConfirm, setTextConfirm] = useState(" ");
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const router = useRouter();

  const renderActions = (rowData: any) => {
    return (
      <>
        <Button
          title="Reset Password"
          bgColor="orange.300"
          _hover={{
            bg: "orange.400",
          }}
          color="white"
          onClick={() => handleReset(rowData)}
          key="resetPass"
          size="sm"
        >
          <MdLockReset size="1.3rem" />
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

  function handleAdd() {
    setIsModalAddOpen(true);
  }

  const handleReset = (item: any) => {
    setDataReset(item);
    setIsModalResetOpen(true);
  };

  const handleDelete = (item: any) => {
    setDataDeleteId(item.id);
    setTextConfirm(
      `Yakin ingin hapus data User dengan username : ${item.username} ?`,
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
          "/tenant" + `/${dataDeleteId}`,
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
              DATA USER
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

          {/* untuk reset password */}
          <ModalReset
            isOpen={isModalResetOpen}
            onClose={() => setIsModalResetOpen(false)}
            onSubmit={() => {
              getTampil();
            }}
            tableData={dataReset}
          />

          {/* Modal hapus data */}
          <ConfirmationModal
            isOpen={isModalDeleteOpen}
            onClose={() => setIsModalDeleteOpen(false)}
            onConfirm={deleteData}
            dataConfirm={textConfirm}
            isLoading={isLoadingDelete}
          />

          <DataTable
            data={dataTampil}
            column={columns}
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
