"use client";

import React, { Suspense, useEffect, useState, use } from "react";
import { useRouter, notFound } from "next/navigation";
import {
  Button,
  Center,
  Spinner,
  Text,
  HStack,
  Heading,
  Flex,
  Avatar,
} from "@chakra-ui/react";
import { Column } from "react-table";
import { axiosCustom } from "@/app/api/axios";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import LoadingModal from "../../loading";
import DataTable from "@/app/components/datatable/data-table";
import { AiOutlineRollback } from "react-icons/ai";
import EditAwards from "./editAwards";
import AddAwards from "./addAwards";
import DeleteAwards from "./deleteAwards";

interface AwardItem {
  id: string;
  name: string;
  rank: string;
  image_id: string;
  image_url: string;
}

interface DataItem {
  id: string;
  name: string;
  award: AwardItem;
}

type AwardObject = {
  [key: string]: AwardItem;
};

const getAwards = async (paramsId: string): Promise<DataItem[]> => {
  try {
    // Panggil API menggunakan Axios dengan async/await
    const response = await axiosCustom.get(`/tenant/${paramsId}/get-award`);
    const data = await response.data.data;
    if (data) {
      return [data];
    } else {
      return []; // Mengembalikan array kosong jika data tidak tersedia
    }
  } catch (error: any) {
    console.error("Gagal memuat data:", error);
    return [];
  }
}

export default function PageAwards({ params }: { params: { slug: string } }) {
  const getParamsId = params.slug;
  if ((getParamsId && getParamsId.length === 0) || !getParamsId) {
    return notFound();
  }
  const router = useRouter();

  const [dataAwards, setDataAwards] = useState<DataItem[]>([]);
  const [awardItem, setAwardItem] = useState<AwardItem[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dataEdited, setDataEdited] = useState<AwardItem[]>([]);

  const getUpdatedData = async ():Promise<void> => {
    try {
       const response = await axiosCustom.get(
         `/tenant/${getParamsId}/get-award`,
       );
      const newDataAwards:DataItem[] = [await response.data.data];
      const newAwardItem = newDataAwards.flatMap((dataItem) =>
        Array.isArray(dataItem.award)
          ? dataItem.award.map((award) => ({
              id: award.id,
              image_id: award.image_id,
              image_url: award.image_url,
              name: award.name,
              rank: award.rank,
            }))
          : [],
      );
      setDataAwards(newDataAwards);
      setAwardItem(newAwardItem);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  useEffect(()=>{
    getUpdatedData();
  },[])

  // Use the map function to flatten the nested arrays of awards
  // const awardItem: AwardItem[] = dataAwards.map((item) => item.award);
  // const router = useRouter();

  const filterOptions = [{ key: "name", label: "Nama Award" }];
  const hidenCols = ["id"];
  const columns: ReadonlyArray<Column<AwardItem>> = [
    {
      Header: "Avatar",
      accessor: "image_url",
      Cell: ({ value }) => <Avatar size={"sm"} src={value} />,
      width: "30px",
    },
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "Nama Award",
      accessor: "name",
    },
    {
      Header: "Rank",
      accessor: "rank",
      width: "160px",
      Cell: ({ value }) => <Text whiteSpace="normal">{value}</Text>,
    },
  ];

  // const columns: ReadonlyArray<Column<AwardItem>> = React.useMemo(
  //   () => [
      
  //   ],
  //   [],
  // );
  const renderActions = (rowData: any) => {
    return (
      <HStack>
        <Button
          bgColor="blue.100"
          _hover={{
            bg: "blue.200",
          }}
          title="Edit Data"
          key="editData"
          size="sm"
          onClick={() => handleEdit(rowData)}
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
      </HStack>
    );
  };

  const handleEdit = (item:any) => {
    setIsEditModalOpen(true);
    setDataEdited(item);
  }

  const handleDelete = (item:any) => {
    setIsDeleteModalOpen(true);
    setDataEdited(item);
  }

  console.log(dataEdited);

  return (
    <div>
      <Suspense fallback={<LoadingModal />}>
        <Flex
          justifyContent={"space-between"}
          pb="2"
          direction={["column", "row"]}
        >
          <Heading fontSize={"2xl"}>
            AWARDS TENANT : {dataAwards.map((item) => item.name.toUpperCase())}
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
              &nbsp;Data Tenant
            </Button>
            <AddAwards
              idTenant={getParamsId}
              onSubmit={() => getUpdatedData()}
            />
          </HStack>
        </Flex>

        <DataTable
          data={awardItem}
          column={columns}
          hiddenColumns={hidenCols}
          filterOptions={filterOptions}
        >
          {(rowData: any) => renderActions(rowData)}
        </DataTable>

        <EditAwards
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setDataEdited([]);
          }}
          idTenant={getParamsId}
          rowData={dataEdited}
          onSubmit={() => getUpdatedData()}
        />

        <DeleteAwards
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDataEdited([]);
          }}
          idTenant={getParamsId}
          dataDelete={dataEdited}
          onSubmit={() => getUpdatedData()}
        />
      </Suspense>
    </div>
  );
}
