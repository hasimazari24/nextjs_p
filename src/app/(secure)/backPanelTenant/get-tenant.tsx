"use client";

import DataTable from "../../components/datatable/data-table";
import { Column } from "react-table";
import { useEffect, useState } from "react";
import ModalEdit from "./modal-edit";
import ModalDetail from "./modal-detail";
import ModalSocial from "../../components/modal/modal-social";
import {
  Button,
  Center,
  Spinner,
  Heading,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
  Avatar,
  Checkbox,
} from "@chakra-ui/react";
import ConfirmationModal from "../../components/modal/modal-confirm";
import ModalNotif from "../../components/modal/modal-notif";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
// import { useNavigate } from "react-router-dom";
import { GrMoreVertical, GrShareOption, GrTrophy } from "react-icons/gr";
import { SiMicrosoftteams } from "react-icons/si";
import { BsCalendar2Event } from "react-icons/bs";
import { LiaClipboardListSolid } from "react-icons/lia";
import { BiLinkExternal, BiBookBookmark } from "react-icons/bi";
import { axiosCustom } from "@/app/api/axios";
import Link from "next/link";
import MyTenant from "./mytenant/mytenant";
import { useAuth } from "@/app/components/utils/AuthContext";
import Loading from "./loading";
import { UserRoles, permissions } from "@/app/type/role-access-control.d";

interface DataItem {
  id: string;
  name: string;
  slug: string;
  motto: string;
  description: string;
  address: string;
  contact: string;
  email: string;
  founder: string;
  level_tenant: string;
  image_id: string;
  image_banner_id: string;
  image_url: string;
  image_banner_url: string;
  is_public: boolean;
  jangkauan: string;
  valuasi_id: string;
  valuasi_string: string;
  // tenant_link : [{
  //   id : string,
  //   title:string,
  //   url:string
  // }];
}

// interface tenantLinks {
//   id: string;
//   title: string;
//   url: string;
// }

interface UserLog {
  // id: string;
  fullname: string;
  role: UserRoles;
  image_url: string;
}

function PageTenant() {
  const { user } = useAuth();
  let getUser: UserLog | null = null; // Inisialisasikan getUser di sini

  if (user !== null && user !== 401) {
    getUser = user; // Setel nilai getUser jika user ada
  }

  let backPanelTenantFeatures: any | null | undefined = null; // Inisialisasikan fitur pada menunya
  let allMenu: any | null = null;
  if (getUser !== null) {
    // ambil permission sesuai login role
    backPanelTenantFeatures = permissions[getUser.role]?.features.find(
      (feature) => feature.menu === "backPanelTenant",
    );
    //ambil permision features all menu (hanya utk admin)
    allMenu = permissions[getUser.role]?.features.find(
      (feature) => feature.menu === "allmenu",
    );
    // console.log(backPanelTenantFeatures);
    // console.log(allMenu);
    // console.log(
    //   backPanelTenantFeatures?.access.includes("editTenant") ||
    //     allMenu?.access.includes("all_access"),
    // );
  }

  const [isModalNotif, setModalNotif] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleShowMessage = (msg: string, err: boolean) => {
    setMessage(msg);
    setIsError(err);
    setModalNotif(true);
  };

  const hidenCols = [
    "id",
    "slug",
    "founder",
    "email",
    "contact",
    "description",
    "image_id",
    "image_banner_id",
    "image_banner_url",
    "motto",
    "valuasi_id",
    "valuasi_string",
    "jangkauan",
  ];

  const columns: ReadonlyArray<Column<DataItem>> = [
    {
      Header: "Logo",
      accessor: "image_url",
      Cell: ({ value }) => <Avatar size={"sm"} src={value} />,
      width: "30px",
    },
    {
      Header: "Image Banner URL",
      accessor: "image_banner_url",
    },
    {
      Header: "Image ID",
      accessor: "image_id",
    },
    {
      Header: "Image Banner ID",
      accessor: "image_banner_id",
    },
    {
      Header: "User ID",
      accessor: "id",
    },
    {
      Header: "Name",
      accessor: "name",
      Cell: ({ value }) => <div style={{ whiteSpace: "normal" }}>{value}</div>,
      // Cell: ({ value, row }) => (
      //   <div
      //     style={{
      //       whiteSpace: "normal",
      //       color: row.values["level_tenant"] === "Inkubasi" ? "blue" : "black",
      //     }}
      //   >
      //     {value}
      //   </div>
      // ),
    },
    {
      Header: "Slug",
      accessor: "slug",
    },
    {
      Header: "Deskripsi",
      accessor: "description",
    },
    {
      Header: "Motto",
      accessor: "motto",
    },
    {
      Header: "Alamat",
      accessor: "address",
      width: "450px",
      minWidth: 260,
      maxWidth: 450,
      // dibikin kayak gni biar auto wrap ketika textnya kepanjangan shg tdk merusak col width
      Cell: ({ value }) => <div style={{ whiteSpace: "normal" }}>{value}</div>,
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
      Header: "Jangkauan",
      accessor: "jangkauan",
    },
    {
      Header: "Valuasi_ID",
      accessor: "valuasi_id",
    },
    {
      Header: "Valuasi_string",
      accessor: "valuasi_string",
    },
    {
      Header: "Founder",
      accessor: "founder",
    },
    {
      Header: "Level Tenant",
      accessor: "level_tenant",
      width: "150px",
      filter: (rows, id, filterValues) => {
        if (filterValues === "") {
          return rows;
        }
        return rows.filter(
          (row) => row.values["level_tenant"] === filterValues,
        );
      },
      minWidth: 160,
      maxWidth: 200,
    },
    {
      Header: "Show Public",
      accessor: "is_public",
      width: 40,
      minWidth: 40,
      Cell: ({ value }) =>
        value ? (
          <Center>
            <Checkbox defaultChecked isDisabled size="lg" />
          </Center>
        ) : null,
    },
  ];

  //untuk menampung data yang diedit dan tambah data baru
  // const [data, setData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [dataTampil, setDataTampil] = useState<any | null>([]);
  const [dataValuasi, setDataValuasi] = useState<any | null>(null);

  const getTampil = async () => {
    try {
      
      setIsLoading(true); 
      // Panggil API menggunakan Axios dengan async/await
      await Promise.all([
        axiosCustom.get("/tenant"),
        axiosCustom.get("/valuasi"), // ganti dengan endpoint API kedua Anda
      ]).then((responses) => {
        const [response1, response2] = responses;
        setDataTampil(response1.data.data);
        setDataValuasi(response2.data.data);
        setIsLoading(false); 
      });
    } catch (error) {
      console.error("Gagal memuat data:", error);
      setIsLoading(false);
    }
  };

  // const getValuasi = async () => {
  //   try {
  //     // Panggil API menggunakan Axios dengan async/await
  //     const response = await axiosCustom.get("/valuasi");
  //     setDataValuasi(response.data.data);
  //   } catch (error) {
  //     console.error("Gagal memuat Data Valuasi:", error);
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    // Panggil fungsi fetchData untuk memuat data
    if (getUser?.role !== "Tenant") {
      getTampil();
      // getValuasi();
    }
    // Clear the timeout when the component is unmounted
  }, []);
  //handle edit data
  const [editingData, setEditingData] = useState<any | null>(null);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  //handle tambah data
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  // const [selectedData, setSelectedData] = useState<any | null>(null);

  const [idTenant, setIdTenant] = useState<any | null>(null);
  const [isModalSocial, setIsModalSocial] = useState<any | null>(null);
  //  const [editingSocial, setEditingSocial] = useState<Array<tenantLinks>>([]);

  //handle hapus
  const [dataDeleteId, setDataDeleteId] = useState<number | null>(null);
  const [textConfirm, setTextConfirm] = useState(" ");
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState<any | null>(null);
  const router = useRouter();

  const filterOptions = [
    { key: "name", label: "Nama" },
    { key: "address", label: "Alamat" },
    {
      key: "level_tenant",
      label: "Level",
      values: ["Pra Inkubasi", "Inkubasi", "Inkubasi Lanjutan", "Scale Up"],
    },
    {
      key: "is_public",
      label: "Hanya Public",
      type: "val_check",
    },
  ];

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
            key="dataDetail"
            size="sm"
          >
            <GrMoreVertical />
          </MenuButton>
          <MenuList>
            <Link href={`/tenant-detail/${rowData?.slug}`} target="_blank">
              <MenuItem>
                <BiLinkExternal />
                &nbsp; Lihat Situs
              </MenuItem>
            </Link>

            <MenuItem
              onClick={() =>
                router.push(`/backPanelTenant/catalog/${rowData.id}`)
              }
            >
              <BiBookBookmark />
              &nbsp; Catalog Tenant
            </MenuItem>
            <MenuItem
              onClick={() => router.push(`/backPanelTenant/team/${rowData.id}`)}
            >
              <SiMicrosoftteams />
              &nbsp; Team Tenant
            </MenuItem>
            <MenuItem
              onClick={() =>
                router.push(`/backPanelTenant/program/${rowData.id}`)
              }
            >
              <LiaClipboardListSolid />
              &nbsp; Program Tenant
            </MenuItem>
            <MenuItem
              onClick={() =>
                router.push(`/backPanelTenant/awards/${rowData.id}`)
              }
            >
              <GrTrophy />
              &nbsp; Awards Tenant
            </MenuItem>
            <MenuItem
              onClick={() =>
                router.push(`/backPanelTenant/gallery/${rowData.id}`)
              }
            >
              <BsCalendar2Event />
              &nbsp; Gallery Events Tenant
            </MenuItem>
            <MenuItem onClick={() => handleSocial(rowData)}>
              <GrShareOption />
              &nbsp; Social Links Tenant
            </MenuItem>
            {backPanelTenantFeatures?.access.includes("deleteTenant") ||
            allMenu?.access.includes("all_access") ? (
              <MenuItem onClick={() => handleDelete(rowData)}>
                <DeleteIcon />
                &nbsp; Hapus Tenant
              </MenuItem>
            ) : null}
          </MenuList>
        </Menu>
        &nbsp;
        {backPanelTenantFeatures?.access.includes("editTenant") ||
        allMenu?.access.includes("all_access") ? (
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
        ) : null}
      </>
    );
  };

  const handleEdit = (item: any) => {
    setEditingData(item);
    setIsModalEditOpen(true);
    // console.log(item);
  };

  // const handleCatalog = (id:string) => {
  //   router.push(`/tenant/page-catalog`);
  //   getCatalog(id);
  // }

  function handleAdd() {
    // setEditingData(null);
    setIsModalAddOpen(true);
    // console.log(editingData);
  }

  const handleDelete = (item: any) => {
    setDataDeleteId(item.id);
    setTextConfirm(
      `Yakin ingin hapus data Tenant dengan nama : ${item.name} ?`,
    );
    setIsModalDeleteOpen(true);
  };

  const handleSocial = (item: any) => {
    // setEditingSocial(item?.tenant_link);
    setIdTenant(item?.id);
    setIsModalSocial(true);
    // console.log(editingSocial);
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
      {getUser?.role !== "Tenant" ? (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Flex
                justifyContent={"space-between"}
                pb="2"
                direction={["column", "row"]}
              >
                <Heading fontSize={"2xl"}>DATA TENANT</Heading>

                {backPanelTenantFeatures?.access.includes("tmbhTenant") ||
                allMenu?.access.includes("all_access") ? (
                  <Button
                    colorScheme="green"
                    key="tambahData"
                    size="md"
                    onClick={handleAdd}
                  >
                    <AddIcon />
                    &nbsp;Tambah Baru
                  </Button>
                ) : null}
              </Flex>
              <Box>
                <DataTable
                  data={dataTampil}
                  column={columns}
                  hiddenColumns={hidenCols}
                  filterOptions={filterOptions}
                >
                  {(rowData: any) => renderActions(rowData)}
                </DataTable>
              </Box>
              {/* {editingData && ( */}
              <ModalEdit
                // isOpen={isModalOpen}
                // onClose={() => setIsModalOpen(false)}
                // data={editingData}
                isOpen={isModalEditOpen}
                onClose={() => {
                  setIsModalEditOpen(false);
                  setEditingData(null);
                }}
                onSubmit={() => {
                  handleSaveData;
                  setEditingData(null);
                  getTampil();
                }}
                isEdit={true}
                formData={editingData}
                dataValuasi={dataValuasi}
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
                dataValuasi={dataValuasi}
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

              <ModalNotif
                isOpen={isModalNotif}
                onClose={() => setModalNotif(false)}
                message={message}
                isError={isError}
              />

              <ModalSocial
                isOpen={isModalSocial}
                onClose={() => {
                  setIsModalSocial(false);
                }}
                onSubmit={() => {
                  getTampil();
                }}
                idTenant={idTenant}
                onDelete={() => getTampil()}
              />
            </>
          )}
        </>
      ) : (
        <MyTenant />
      )}
    </div>
  );
}

export default PageTenant;
