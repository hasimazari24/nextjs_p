"use client";

import apiCall from '@/app/components/api-call';
import React, { useEffect, useState } from 'react';
import { Column } from "react-table";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { Button, Center, Spinner, Text, HStack } from '@chakra-ui/react';
import DataTable from '@/app/components/data-table';
import { DeleteIcon, EditIcon, AddIcon } from '@chakra-ui/icons';
import { AiOutlineRollback } from "@react-icons/all-files/ai/AiOutlineRollback";
import { axiosCustom } from '@/app/api/axios';

interface DataItem {
  id: string;
  title: string;
  description: string;
}

export default function PageCatalog(props: any) {
    const hidenCols = ["id"];
    const columns: ReadonlyArray<Column<DataItem>> = [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "title",
        accessor: "title",
      },
      {
        Header: "description",
        accessor: "description",
      },
    ];

    const renderActions = (rowData: any) => {
      return (
        <>
          <Button
            colorScheme="blue"
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

    //daptein id dari query link router
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [dataCatalog, setDataCatalog] = useState<any | null>([]);
    const getCatalog = async () => {
      try {
        // Panggil API menggunakan Axios dengan async/await
        const response = await axiosCustom.get(
          "/tenant" + `/${id}` + "/catalog",
        );
        
        // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
        const timer = setTimeout(() => {
          setDataCatalog(response.data.data);
          console.log(dataCatalog);
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
      getCatalog();
    }, []);

    return (
      <div>
        {isLoading ? (
          <Center h="100%" m="10">
            <Spinner className="spinner" size="xl" color="blue.500" />
          </Center>
        ) : (
          <>
            <HStack pb="3">
              <Button
                bgColor="grey.400"
                color="white"
                _hover={{
                  bg: "grey.500",
                }}
                key="kembali"
                size="sm"
                onClick={() => {router.push('/startup')}}
              >
                <AiOutlineRollback />
                &nbsp;Kembali
              </Button>
              <Button
                colorScheme="green"
                key="tambahData"
                size="sm"
                // onClick={handleAdd}
              >
                <AddIcon />
                &nbsp;Tambah
              </Button>
            </HStack>
            <Text fontSize="lg" fontWeight="bold">
              CATALOG TENANT
            </Text>

            <DataTable
              data={dataCatalog}
              column={columns}
              hiddenColumns={hidenCols}
            >
              {(rowData: any) => renderActions(rowData)}
            </DataTable>
          </>
        )}
      </div>
    );
}
