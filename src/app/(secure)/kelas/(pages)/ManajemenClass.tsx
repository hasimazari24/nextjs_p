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

function ManajemenClass() {

  const initialState: { isLoading: boolean; dataKelas?: Kelas[] } = {
    isLoading: false,
    dataKelas: [
      {
        id: "654985636f11ac257523ffa9",
        name: "Catalina Bauer",
        mentor: "MIXERS",
      },
      {
        id: "654985e472b73c655776527e",
        name: "Austin Hopper",
        mentor: "GRACKER",
      },
      {
        id: "654985e409f108caa1fff92b",
        name: "Michael Hall",
        mentor: "EZENTIA",
      },
      {
        id: "654985e4a37a939260c9793d",
        name: "Nita Fowler",
        mentor: "BUZZMAKER",
      },
      {
        id: "654985e48b7afbea444ed81a",
        name: "Lindsay Reynolds",
        mentor: "GYNK",
      },
      {
        id: "654985e4774fbc3491632f7c",
        name: "Melanie Bean",
        mentor: "SHADEASE",
      },
      {
        id: "654985e4cdfe1f0f4918244a",
        name: "Mclean Thornton",
        mentor: "OPTICOM",
      },
      {
        id: "654985e42099a58bde5e4ac6",
        name: "Celina Chen",
        mentor: "VERAQ",
      },
      {
        id: "65498563b9587d91f222ca32",
        name: "Carly Browning",
        mentor: "ROCKLOGIC",
      },
      {
        id: "654985637c9ee74c6dc7c159",
        name: "Shepherd Atkinson",
        mentor: "FURNAFIX",
      },
      {
        id: "65498563ef3fbc88163fc91a",
        name: "Ross Newman",
        mentor: "SLAX",
      },
      {
        id: "65498563e55d051499643dd5",
        name: "Della Waller",
        mentor: "QUILCH",
      },
      {
        id: "65498563aad9a7dde78621b8",
        name: "Bass Cox",
        mentor: "COLLAIRE",
      },
      {
        id: "654985633d59ca1c82f37c9f",
        name: "Cunningham Guerrero",
        mentor: "PROGENEX",
      },
      {
        id: "654985638dcee63cf96a1960",
        name: "Chase Hopkins",
        mentor: "AQUOAVO",
      },
      {
        id: "6549856343be13015ce8d50f",
        name: "Paul Swanson",
        mentor: "PROSELY",
      },
      {
        id: "65498563e8c568b75cec663c",
        name: "Lynch Whitehead",
        mentor: "ANDERSHUN",
      },
      {
        id: "65498563e71f2f8ec9c0af52",
        name: "Merle Parrish",
        mentor: "CYTREX",
      },
      {
        id: "6549856358e26dd54c2c675f",
        name: "Phelps Wilder",
        mentor: "EXOSPACE",
      },
      {
        id: "65498563db40138588afa97d",
        name: "Snow Butler",
        mentor: "GEEKETRON",
      },
      {
        id: "65498563c296be5b9843ed3b",
        name: "Stokes Shaffer",
        mentor: "VORTEXACO",
      },
      {
        id: "6549856300724e2f691205e6",
        name: "Emilia Stevens",
        mentor: "FLOTONIC",
      },
      {
        id: "654985630a401cd61530f53c",
        name: "Elinor Terrell",
        mentor: "OATFARM",
      },
      {
        id: "65498563a2aaaf01e0572ce2",
        name: "Lisa Mcdowell",
        mentor: "COWTOWN",
      },
    ],
  };

  const [state, setState] = useState(initialState);

  const getClass = async () => {
    try {
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(`/tenant/get-catalog`);
      setState({
        isLoading: true,
        dataKelas: response.data.data,
      });
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
    }
    // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
    const timer = setTimeout(() => {
      // setIdTenant(id);
      setState({
        isLoading: false,
      }); // Set isLoading to false to stop the spinner
    }, 1000);

    return () => clearTimeout(timer);
  };

  // useEffect(() => {
  //   // Panggil fungsi fetchData untuk memuat data
  //   getClass();
  //   // Clear the timeout when the component is unmounted
  // }, []);

  return (
    <div>
      <Flex
        justifyContent={"space-between"}
        pb="2"
        direction={["column", "row"]}
      >
        <Heading fontSize={"2xl"}>DATA KELAS</Heading>

        <AddClass onSubmit={() => getClass()} />
      </Flex>

      {state.dataKelas ? (
        <ClassData rowData={state.dataKelas} />
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
    </div>
  );
}

export default ManajemenClass;
