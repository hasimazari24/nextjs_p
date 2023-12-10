"use client";

import { useEffect, useState } from "react";
import { Heading, Flex, Stack, Image, Text } from "@chakra-ui/react";
import { axiosCustom } from "@/app/api/axios";
import Loading from "../loading";
import { Kelas } from "@/app/type/class-type.d";
import DownloadExcel from "@/app/components/utils/DownloadExcel";
import ClassData from "./ClassData";

function TenantClass() {
  const initialState: { isLoading?: boolean; dataKelas?: Kelas[] } = {
    isLoading: true,
    dataKelas: [],
  };

  const [state, setState] = useState(initialState);

  const getClass = async () => {
    try {
      setState({
        isLoading: true,
      });
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(`/course/tenant`);
      const timer = setTimeout(() => {
        // setIdTenant(id);
        setState({
          isLoading: false,
          dataKelas: response.data.data,
        }); // Set isLoading to false to stop the spinner
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setState({
        isLoading: false,
      });
    }
    // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
  };

  useEffect(() => {
    // Panggil fungsi fetchData untuk memuat data
    getClass();
    // Clear the timeout when the component is unmounted
  }, []);

  return (
    <div>
      {state.isLoading ? (
        <Loading />
      ) : (
        <>
          <Flex
            justifyContent={"space-between"}
            pb="2"
            direction={["column", "row"]}
          >
            <Heading fontSize={"2xl"}>DATA KELAS</Heading>
            <DownloadExcel Url={"/export-course"} />
          </Flex>

          {state.dataKelas && state.dataKelas.length > 0 ? (
            <ClassData
              rowData={state.dataKelas}
              onSubmit={() => getClass()}
              roleAccess={"Tenant"}
            />
          ) : (
            <Stack justifyContent={"center"} spacing={0} alignItems={"center"}>
              <Image
                src="/img/classroom.png"
                h={{ base: "200px", sm: "250px", md: "350px" }}
                w="auto"
                // w="auto"
                // objectFit={"cover"}
              />
              <Text
                as="b"
                fontWeight={"bold"}
                fontSize={{ base: "16px", md: "17px" }}
                textAlign={"center"}
              >
                Data Kelas Kosong
              </Text>
              <Text
                fontSize={{ base: "15.5px", md: "16.5px" }}
                textAlign={"center"}
              >
                Mungkin belum dibuat atau sudah dihapus
              </Text>
            </Stack>
          )}
        </>
      )}
    </div>
  );
}

export default TenantClass;
