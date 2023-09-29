"use client";

import DataTable from "../../components/datatable/data-table";
import { Column } from "react-table";
import { useEffect, useState, useContext } from "react";
import ModalEdit from "./modal-edit";
import ModalReset from "./modal-reset-pass";
import {
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Spinner,
  Text,
  Menu, MenuButton, MenuList, MenuItem, } from "@chakra-ui/react";
import ConfirmationModal from "../../components/modal/modal-confirm";
import ModalNotif from "../../components/modal/modal-notif";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { GrMoreVertical, GrShareOption } from "react-icons/gr";
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
        <Menu>
          <MenuButton
            as={Button}
            bgColor="green.100"
            _hover={{
              bg: "green.200",
            }}
            // color="white"
            title="More ..."
            // onClick={() => handleDetail(rowData)}
            key="more"
            size="sm"
          >
            <GrMoreVertical />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleReset(rowData)}>
              <MdLockReset size="1.3rem" />
              &nbsp; Reset Password
            </MenuItem>
            <MenuItem onClick={() => handleDelete(rowData)}>
              <DeleteIcon />
              &nbsp; Hapus user
            </MenuItem>
          </MenuList>
        </Menu>
        &nbsp;
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
          "/user" + `/${dataDeleteId}`,
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

  const filterOptions = [
    { key: "username", label: "Username" },
    { key: "email", label: "E-Mail" },
    {
      key: "role",
      label: "Hak Akses",
      values: ["Super Admin", "Manajemen", "Mentor", "Tenant"],
    },
  ];

  return (
    <div>
      {isLoading ? (
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
            <Heading fontSize={"2xl"}>DAFTAR USER</Heading>
            <Button
              colorScheme="green"
              key="tambahData"
              size="md"
              onClick={handleAdd}
            >
              <AddIcon />
              &nbsp;Tambah Baru
            </Button>
          </Flex>
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
            filterOptions={filterOptions}
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
