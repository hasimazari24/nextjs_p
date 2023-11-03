"use client";

import DataTable from "../../components/datatable/data-table";
import { Column } from "react-table";
import { useEffect, useState } from "react";
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
  Image,
  Avatar,
  Checkbox,
  Icon,
  HStack,
} from "@chakra-ui/react";
import ConfirmationModal from "../../components/modal/modal-confirm";
import ModalNotif from "../../components/modal/modal-notif";
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  HamburgerIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { GrMoreVertical, GrShareOption, GrTrophy } from "react-icons/gr";
import { SiMicrosoftteams } from "react-icons/si";
import {
  BsFiletypeJpg,
  BsFiletypePng,
  BsFiletypeGif,
  BsFiletypeSvg,
  BsFiletypePdf,
} from "react-icons/bs";
import { AiOutlineFileUnknown } from "react-icons/ai";
import { BiLinkExternal, BiBookBookmark } from "react-icons/bi";
import { axiosCustom } from "@/app/api/axios";
import Link from "next/link";
import { useAuth } from "@/app/components/utils/AuthContext";
import Loading from "./loading";
import { UserRoles, permissions } from "@/app/type/role-access-control.d";
import dynamic from "next/dynamic";

interface DataItem {
  id: string;
  asset?: string;
  type?: string;
  extension?: string;
  url?: string;
}

interface UserLog {
  // id: string;
  fullname: string;
  role: UserRoles;
  image_url: string;
}

function GetAssets() {
  const { user } = useAuth();
  let getUser: UserLog | null = null; // Inisialisasikan getUser di sini

  if (user !== null && user !== 401) {
    getUser = user; // Setel nilai getUser jika user ada
  }

  let assetsFeatures: any | null | undefined = null; // Inisialisasikan fitur pada menunya
  let allMenu: any | null = null;
  if (getUser !== null) {
    // ambil permission sesuai login role
    assetsFeatures = permissions[getUser.role]?.features.find(
      (feature) => feature.menu === "assets",
    );
    //ambil permision features all menu (hanya utk admin)
    allMenu = permissions[getUser.role]?.features.find(
      (feature) => feature.menu === "allmenu",
    );
  }

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalNotif, setModalNotif] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleShowMessage = (msg: string, err: boolean) => {
    setMessage(msg);
    setIsError(err);
    setModalNotif(true);
  };

  const hidenCols = ["id", "url"];

  const avatarExt = (type: any) => {
    switch (type) {
      case "JPG" || "JPEG":
        return BsFiletypeJpg;
      case "PNG":
        return BsFiletypePng;
      case "GIF":
        return BsFiletypeGif;
      case "SVG":
        return BsFiletypeSvg;
      case "PDF":
        return BsFiletypePdf;
      default:
        return AiOutlineFileUnknown;
    }
  };

  const columns: ReadonlyArray<Column<DataItem>> = [
    {
      id: "selection",
      Header: ({ getToggleAllPageRowsSelectedProps }) => {
        const { checked, indeterminate, ...props } = getToggleAllPageRowsSelectedProps();
        return (
          <Checkbox
            {...props}
            isChecked={checked}
            boxShadow={"md"}
            borderWidth={1}
            // isIndeterminate={false}
          />
        );
      },
      Cell: ({ row }: any) => {
        const { checked, indeterminate, ...props } = row.getToggleRowSelectedProps();
        return (
          <Checkbox
            {...props}
            boxShadow={"md"}
            isChecked={checked}
            borderWidth={1}
            // isIndeterminate={false}
          />
        );
      },
      disableFilters: true,
    },
    {
      Header: "Extention",
      accessor: "extension",
      Cell: ({ value }) => <Icon w="40px" h="auto" as={avatarExt(value)} />,
      width: "40px",
    },
    {
      Header: "Asset",
      accessor: "asset",
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "URL",
      accessor: "url",
    },
    {
      Header: "ID",
      accessor: "id",
    },
  ];

  //untuk menampung data yang diedit dan tambah data baru
  // const [data, setData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [dataTampil, setDataTampil] = useState<any | null>([]);
  const getTampil = async () => {
    try {
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get("/assets/not-used");

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

  const renderActions = (rowData: any) => {
    return (
      <>
        <Link href={rowData?.url} target="_blank">
          <Button
            bgColor="teal.100"
            _hover={{
              bg: "teal.200",
            }}
            title="Lihat"
            size="sm"
          >
            <ViewIcon />
          </Button>
        </Link>
      </>
    );
  };

  const [getCheckedRows, setGetCheckedRows] = useState<DataItem[]>([]);
  let getSelectedRows: { id: string }[] = [];

  const handleSelectedRowsChange = (newSelectedRows: DataItem[]) => {
    if (newSelectedRows.length !== 0) {
      getSelectedRows = newSelectedRows.flatMap((dataItem) => ({
        id: dataItem.id,
      }));
    } else getSelectedRows = [];
    // console.log(newSelectedRows);
    // console.log(getSelectedRows);
  };

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const deleteData = async () => {
    try {
      setIsLoadingDelete(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.post(`/assets/bulk-delete`, {
        asset: getSelectedRows,
      });

      // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
      const timer = setTimeout(() => {
        // console.log(response);
        if (response.status === 200) {
          setIsLoadingDelete(false);
          handleShowMessage(response.data?.message, false);
          // setIsDeleteModalOpen(false);
          getTampil();
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
  };
  const handleDelete = () => {
    if (getSelectedRows.length !== 0) {
      setIsDeleteModalOpen(true);
    } else
      return handleShowMessage(
        `Terjadi Kesalahan: Pilih terlebih dahulu asset yang ingin dihapus!.`,
        true,
      );
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Flex
            justifyContent={"space-between"}
            pb="2"
            direction={["column", "row"]}
          >
            <Heading fontSize={"2xl"}>ASSET TIDAK DIPAKAI</Heading>

            <HStack>
              <Button
                colorScheme="red"
                key="tambahData"
                size="md"
                onClick={() => handleDelete()}
                isLoading={isLoadingDelete}
              >
                <DeleteIcon />
                &nbsp;Hapus Asset
              </Button>
            </HStack>
          </Flex>
          <DataTable
            data={dataTampil}
            column={columns}
            hiddenColumns={hidenCols}
            filterOptions={[]}
            onSelectedRowsChange={handleSelectedRowsChange}
          >
            {(rowData: any) => renderActions(rowData)}
          </DataTable>
          <ModalNotif
            isOpen={isModalNotif}
            onClose={() => setModalNotif(false)}
            message={message}
            isError={isError}
          />
          <ConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={() => {
              deleteData();
              setIsDeleteModalOpen(false);
            }}
            dataConfirm={`Yakin ingin hapus data asset terpilih ?`}
            isLoading={isLoadingDelete}
          />
        </>
      )}
    </div>
  );
}

export default GetAssets;
