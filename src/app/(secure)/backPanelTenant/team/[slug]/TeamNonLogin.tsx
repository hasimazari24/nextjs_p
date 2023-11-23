"use client";

import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import {
  Button,
  Center,
  Avatar,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import DataTable from "@/app/components/datatable/data-table";
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";
import { GrMoreVertical, GrShareOption } from "react-icons/gr";
import { axiosCustom } from "@/app/api/axios";
import ModalNotif from "@/app/components/modal/modal-notif";
import ModalTeamNonLogin from "./modal-team-nonlogin";
import ConfirmationModal from "@/app/components/modal/modal-confirm";
import { UserRoles, permissions } from "@/app/type/role-access-control.d";
import { useAuth } from "@/app/components/utils/AuthContext";
import ModalSocial from "./modal-team-sociallinks";

interface DataItem {
  // id_tenant: string;
  id: string;
  image_id: string;
  image_url: string;
  fullname: string;
  position: string;
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
  is_admin: boolean;
}

function TeamNonLogin({
  dataTeam,
  onSubmit,
  idTenant,
  is_admin,
}: NonLoginTeam) {
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

  //handle hapus
  const [textConfirm, setTextConfirm] = useState(" ");
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalSocialOpen, setIsModalSocialOpen] = useState(false);

  const [idUser, setIdUser] = useState<any | null>(null);

  const filterOptions = [
    { key: "fullname", label: "Nama Lengkap" },
    {
      key: "position",
      label: "Posisi",
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
      Header: "fullname",
      accessor: "fullname",
    },
    {
      Header: "position",
      accessor: "position",
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
    return (teamFeatures?.access.includes("editTeam") && is_admin === true) ||
      allMenu?.access.includes("all_access") ? (
      <>
        <Menu>
          <MenuButton
            as={Button}
            bgColor="green.100"
            _hover={{
              bg: "green.200",
            }}
            title="More ..."
            key="more"
            size="sm"
          >
            <GrMoreVertical />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleSocial(rowData)}>
              <GrShareOption size="1.3rem" />
              &nbsp; Social Links
            </MenuItem>
            <MenuItem onClick={() => handleDelete(rowData)}>
              <DeleteIcon />
              &nbsp; Hapus Team
            </MenuItem>
          </MenuList>
        </Menu>
        &nbsp;
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
          `/tenant/${idTenant}/delete-user-tenant-cant-login/${editingData?.id}`,
        );

        if (response.status === 200) {
          setIsLoadingDelete(false);
          setIsModalDeleteOpen(false);
          handleShowMessage("Data berhasil dihapus.", false);
        }
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

  const handleSocial = (item: any) => {
    setIdUser(item?.id);
    setIsModalSocialOpen(true);
  };
  return (
    <>
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

      <ModalNotif
        isOpen={isModalNotif}
        onClose={() => setModalNotif(false)}
        message={message}
        isError={isError}
        onSubmit={() => onSubmit()}
      />

      <ModalTeamNonLogin
        isOpen={isModalEditOpen}
        onClose={() => setIsModalEditOpen(false)}
        onSubmit={() => {
          setEditingData(null);
          onSubmit();
        }}
        isEdit={true}
        formData={editingData}
        idTenant={idTenant}
      />

      <ModalSocial
        isOpen={isModalSocialOpen}
        onClose={() => {
          setIsModalSocialOpen(false);
        }}
        idUser={idUser}
      />
    </>
  );
}

export default TeamNonLogin;
