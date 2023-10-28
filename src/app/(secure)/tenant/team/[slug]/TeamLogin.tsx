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
  Avatar,
  Flex,
  Checkbox,
  Tabs,
  TabPanel,
  TabPanels,
  TabList,
} from "@chakra-ui/react";
import DataTable from "@/app/components/datatable/data-table";
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";
import { AiOutlineRollback } from "react-icons/ai";
import { axiosCustom } from "@/app/api/axios";
import SearchModal from "@/app/(secure)/tenant/team/[slug]/SearchModal";
import ModalNotif from "@/app/components/modal/modal-notif";
import ModalTeam from "./modal-team";
import ConfirmationModal from "@/app/components/modal/modal-confirm";
import { UserRoles, permissions } from "@/app/type/role-access-control.d";
import { useAuth } from "@/app/components/utils/AuthContext";
import NotFound from "@/app/components/template/NotFound";

interface DataItem {
  // id_tenant: string;
  id: string;
  image_id: string;
  image_url: string;
  username: string;
  fullname: string;
  position: string;
  is_admin: boolean;
  is_public: boolean;
}

interface UserLog {
  // id: string;
  fullname: string;
  role: UserRoles;
  image_url: string;
}

interface NonLoginTeam {
  dataTeam: DataItem[];
  onSubmit: () => void;
  idTenant?: string;
}

function TeamLogin({ dataTeam, onSubmit, idTenant }: NonLoginTeam) {
  const { user } = useAuth();
  let getUser: UserLog | null = null; // Inisialisasikan getUser di sini

  if (user !== null && user !== 401) {
    getUser = user; // Setel nilai getUser jika user ada
  }

  let teamFeatures: any | null | undefined = null; // Inisialisasikan fitur pada menunya
  let allMenu: any | null = null;
  if (getUser !== null) {
    // ambil permission sesuai login role
    teamFeatures = permissions[getUser.role]?.features.find(
      (feature) => feature.menu === "backPanelTenant_team",
    );
    //ambil permision features all menu (hanya utk admin)
    allMenu = permissions[getUser.role]?.features.find(
      (feature) => feature.menu === "allmenu",
    );
  }
  let hidenCols: string[] = ["id"];
  if (
    (teamFeatures?.access.includes("tmbhTeam") &&
      allMenu?.access.includes("all_access")) === false
  ) {
    hidenCols.push("action");
  }

  const [isModalNotif, setIsModalNotif] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleShowMessage = (msg: string, err: boolean) => {
    setIsModalNotif(true);
    setMessage(msg);
    setIsError(err);
  };

  //handle edit data
  const [editingData, setEditingData] = useState<any | null>(null);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  //handle hapus
  const [textConfirm, setTextConfirm] = useState(" ");
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

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
      accessor: "image_url",
      width: 30,
      Cell: ({ value }) => <Avatar size={"sm"} src={value} />,
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
      width: 40,
      minWidth: 30,
      accessor: "is_admin",
      Cell: ({ value }) =>
        value ? (
          // <Center>
          <Checkbox defaultChecked isDisabled size="lg" />
        ) : // </Center>
        null,
    },
    {
      Header: "Show Public",
      accessor: "is_public",
      width: 40,
      minWidth: 35,
      Cell: ({ value }) =>
        value ? (
          <Center>
            <Checkbox defaultChecked isDisabled size="lg" />
          </Center>
        ) : null,
    },
  ];

  const renderActions = (rowData: any) => {
    return teamFeatures?.access.includes("editTeam") ||
      allMenu?.access.includes("all_access") ? (
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
        </Button>{" "}
        &nbsp;
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
    ) : null;
  };

  const handleDelete = (item: any) => {
    setEditingData(item);
    setTextConfirm(
      `Yakin ingin hapus anggota tim dengan nama : ${item.fullname} ?`,
    );
    setIsModalDeleteOpen(true);
  };

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const deleteData = async () => {
    if (editingData !== null) {
      // Lakukan penghapusan data berdasarkan dataToDeleteId
      try {
        setIsLoadingDelete(true);
        // Panggil API menggunakan Axios dengan async/await
        const response = await axiosCustom.delete(
          `tenant/${idTenant}/delete-user/${editingData?.id}`,
        );

        // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
        const timer = setTimeout(() => {
          // console.log(response);
          if (response.status === 200) {
            handleShowMessage("Data berhasil dihapus.", false);
            setIsLoadingDelete(false);
            setIsModalDeleteOpen(false);
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
      setEditingData(null);
    }
  };

  const handleEdit = (item: any) => {
    setEditingData(item);
    setIsModalEditOpen(true);
    // console.log(item);
  };
  return (
    <div>
      <DataTable
        data={dataTeam}
        column={columns}
        hiddenColumns={hidenCols}
        filterOptions={filterOptions}
      >
        {(rowData: any) => renderActions(rowData)}
      </DataTable>

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
          onSubmit();
        }}
        formData={editingData}
        idTenant={idTenant}
      />
      <div id="notif1">
        <ModalNotif
          isOpen={isModalNotif}
          onClose={() => setIsModalNotif(false)}
          message={message}
          isError={isError}
          onSubmit={() => onSubmit()}
        />
      </div>
    </div>
  );
}

export default TeamLogin;
