"use client";

import DataTable from "@/app/components/datatable/data-table";
import { Column } from "react-table";
import { useEffect, useState } from "react";
import ModalSocial from "@/app/components/modal/modal-social";
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
  HStack,
  Grid,
  Stack,
  Image,
  Text,
} from "@chakra-ui/react";
import ConfirmationModal from "@/app/components/modal/modal-confirm";
import ModalNotif from "@/app/components/modal/modal-notif";
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
import { useAuth } from "@/app/components/utils/AuthContext";
import Loading from "../loading";
import { UserRoles, permissions } from "@/app/type/role-access-control.d";
import { Kelas } from "@/app/type/class-type.d";
import AddClass from "./addClass";
import ClassData from "./ClassData";

function ManajemenClass({ roleAccess }: { roleAccess: string }) {
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
      const response = await axiosCustom.get(`/course/all`);
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

            <AddClass onSubmit={() => getClass()} roleAccess={roleAccess} />
          </Flex>

          {state.dataKelas && state.dataKelas.length > 0 ? (
            <ClassData
              rowData={state.dataKelas}
              onSubmit={() => getClass()}
              roleAccess={roleAccess}
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

export default ManajemenClass;
