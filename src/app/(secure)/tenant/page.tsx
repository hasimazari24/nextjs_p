"use client";

import DataTable from "../../components/datatable/data-table";
import { Column } from "react-table";
import { useEffect, useState, useContext } from "react";
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
} from "@chakra-ui/react";
import ConfirmationModal from "../../components/modal/modal-confirm";
import ModalNotif from "../../components/modal/modal-notif";
import { AddIcon, DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
// import { useNavigate } from "react-router-dom";
import { GrMoreVertical, GrShareOption, GrTrophy } from "react-icons/gr";
import { SiMicrosoftteams } from "react-icons/si";
import { LiaClipboardListSolid } from "react-icons/lia";
import { BiLinkExternal, BiBookBookmark } from "react-icons/bi";
import { axiosCustom } from "@/app/api/axios";
import Link from "next/link";
import MyTenant from "./mytenant/mytenant";
import { useAuth } from "@/app/components/utils/AuthContext";
import dynamic from "next/dynamic";

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
  // tenant_link : [{
  //   id : string,
  //   title:string,
  //   url:string
  // }];
}

interface tenantLinks {
  id: string;
  title: string;
  url: string;
}

function PageTenant() {
  const { user } = useAuth();
  const getUser: any = user;

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
      Header: "Founder",
      accessor: "founder",
    },
    {
      Header: "Level Tenant",
      accessor: "level_tenant",
      width: "150px",
      minWidth: 160,
      maxWidth: 200,
    },
  ];

  //untuk menampung data yang diedit dan tambah data baru
  // const [data, setData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [dataTampil, setDataTampil] = useState<any | null>([]);
  const getTampil = async () => {
    try {
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get("/tenant");

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
              onClick={() => router.push(`/tenant/catalog/${rowData.id}`)}
            >
              <BiBookBookmark />
              &nbsp; Catalog Tenant
            </MenuItem>
            <MenuItem onClick={() => router.push(`/tenant/team/${rowData.id}`)}>
              <SiMicrosoftteams />
              &nbsp; Team Tenant
            </MenuItem>
            <MenuItem
              onClick={() => router.push(`/tenant/program/${rowData.id}`)}
            >
              <LiaClipboardListSolid />
              &nbsp; Program Tenant
            </MenuItem>
            <MenuItem
              onClick={() => router.push(`/tenant/awards/${rowData.id}`)}
            >
              <GrTrophy />
              &nbsp; Awards Tenant
            </MenuItem>
            <MenuItem onClick={() => handleSocial(rowData)}>
              <GrShareOption />
              &nbsp; Social Links Tenant
            </MenuItem>
            <MenuItem onClick={() => handleDelete(rowData)}>
              <DeleteIcon />
              &nbsp; Hapus Tenant
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
      {getUser?.role === "Super Admin" ? (
        <>
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
                <Heading fontSize={"2xl"}>DAFTAR TENANT</Heading>
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

              <ModalNotif
                isOpen={isModalNotif}
                onClose={() => setModalNotif(false)}
                message={message}
                isError={isError}
              />

              <ModalSocial
                isOpen={isModalSocial}
                onClose={() => {setIsModalSocial(false);}}
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

export default dynamic(() => Promise.resolve(PageTenant), {
  ssr: false,
  suspense: true,
});
