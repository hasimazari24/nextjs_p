"use client";

import React, { Suspense, useEffect, useState } from 'react';
import {
  useRouter,
  notFound,
} from "next/navigation";
import {
  Button,
  Center,
  Spinner,
  Text,
  HStack,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { Column } from 'react-table';
import { axiosCustom } from '@/app/api/axios';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import LoadingModal from '../../loading';
import DataTable from '@/app/components/datatable/data-table';

interface DataItem {
  id: string;
  name: string;
  rank: string;
  image_id : string;
  image_url : string;
}

export async function getAwards(paramsId : string){
  try {
    // Panggil API menggunakan Axios dengan async/await
    const response = await axiosCustom.get(`/tenant-catalog/${paramsId}`);
    if (response.data.data) {
      return response.data.data; 
    }
  } catch (error: any) {
    console.error("Gagal memuat data:", error);
  }
} 

export default async function PageAwards({ params }: { params: { slug: string } }) {
  const getParamsId = params.slug;
  if ((getParamsId && getParamsId.length === 0) || !getParamsId) {
    return notFound();
  }
  const [loadingData, setLoadingData] = useState<boolean>(false);

  const dataAwards: DataItem[] = await getAwards(getParamsId);
  const router = useRouter();
//set data table react
const filterOptions = [{ key: "name", label: "Nama Award" }];
const hidenCols = ["id"];
const columns: ReadonlyArray<Column<DataItem>> = [
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
  },
];
  const renderActions = (rowData: any) => {
    return (
      <>
        <Button
          bgColor="blue.100"
          _hover={{
            bg: "blue.200",
          }}
          title="Edit Data"
          // onClick={() => handleEdit(rowData)}
          key="editData"
          size="sm"
        >
          <EditIcon />
        </Button>
        &nbsp;
        <Button
          title="Hapus Data"
          colorScheme="red"
          // onClick={() => handleDelete(rowData)}
          key="hapusData"
          size="sm"
        >
          <DeleteIcon />
        </Button>
      </>
    );
  };

  return (
    <div>
      <Suspense fallback={<LoadingModal />}>
        <DataTable
          data={dataAwards}
          column={columns}
          hiddenColumns={hidenCols}
          filterOptions={filterOptions}
        >
          {(rowData: any) => renderActions(rowData)}
        </DataTable>
      </Suspense>
    </div>
  );
}