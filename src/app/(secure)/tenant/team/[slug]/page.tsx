"use client";

import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import {
  useSearchParams,
  useRouter,
  useParams,
  notFound,
} from "next/navigation";
import {
  Button,
  Center,
  Spinner,
  Text,
  Stack,
  HStack,
  Heading,
  Avatar,
  Flex,
  Checkbox,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
  TabList,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import DataTable from "@/app/components/datatable/data-table";
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";
import { AiOutlineRollback } from "react-icons/ai";
import { axiosCustom } from "@/app/api/axios";
import SearchModal from "@/app/(secure)/tenant/team/[slug]/SearchModal";
import ModalNotif from "@/app/components/modal/modal-notif";
import ModalTeam from "./modal-team";
import ConfirmationModal from "@/app/components/modal/modal-confirm";
import { UserRoles, permissions } from "@/app/type/role-access-control.d";
import { useAuth } from "@/app/components/utils/AuthContext";
import NotFound from "@/app/components/template/NotFound";
import TeamLogin from "./TeamLogin";
import TeamNonLogin from "./TeamNonLogin";
import ModalTeamNonLogin from "./modal-team-nonlogin";
import dynamic from "next/dynamic";

interface UserLog {
  // id: string;
  fullname: string;
  role: UserRoles;
  image_url: string;
}

export default function PageTeam({ params }: { params: { slug: string } }) {
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

    if (!teamFeatures && !allMenu) {
      return (
        <NotFound
          statusCode={403}
          msg={"Access Denied"}
          statusDesc="Akses Ditolak. Anda tidak diizinkan mengakses halaman ini."
        />
      );
    }
  }

  const getParamsId = params.slug;
  // console.log(getParamsId);

  if ((getParamsId && getParamsId.length === 0) || !getParamsId) {
    return notFound();
  }

  const [isModalNotifPage, setIsModalNotifPage] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleShowMessage = (msg: string, err: boolean) => {
    setMessage(msg);
    setIsError(err);
    setIsModalNotifPage(true);
  };

  //handle add team
  const [isModalSearchOpen, setIsModalSearchOpen] = useState(false);
  const [isModalNonLogin, setIsModalNonLogin] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [resultNothing, setResultNothing] = useState<string | null>(null);

  const [dataTeamLogin, setDataTeam] = useState<any[]>([]);
  const [dataTeamNonLogin, setDataTeamNon] = useState<any[]>([]);
  const searchParams = useSearchParams();
  // const idTenant = searchParams.get("id");
  const [namaTenant, setNamaTenant] = useState<string | null>();
  const [loadingTeam, setLoadingTeam] = useState<boolean>(false);
  const router = useRouter();

  // if (!idTenant) {
  //   router.push("/tenant");
  // }

  const getTeam = async () => {
    try {
      setLoadingTeam(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(`/tenant/${getParamsId}/get-user`);

      // Imitasi penundaan dengan setTimeout (ganti nilai 2000 dengan waktu yang Anda inginkan dalam milidetik)
      const timer = setTimeout(() => {
        setDataTeam(response.data.data.user_tenant);
        setDataTeamNon(response.data.data.user_tenant_cant_login);

        setNamaTenant(response.data.data.name);
        // setIdTenant(id);
        setLoadingTeam(false); // Set isLoading to false to stop the spinner
      }, 1000);

      return () => clearTimeout(timer);
    } catch (error) {
      setNamaTenant(null);
      console.error("Gagal memuat data:", error);
      setLoadingTeam(false);
    }
  };

  useEffect(() => {
    // Panggil fungsi fetchData untuk memuat data
    // if (idTenant)
    getTeam();
    if (namaTenant && namaTenant === "false") {
      return notFound();
    }
    // Clear the timeout when the component is unmounted
  }, []);

  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const handleSearch = async (query: string) => {
    try {
      setIsLoadingSearch(true);
      const response = await axiosCustom.get(
        `/user/search-user-tenant/${query}`,
      );
      // console.log(response);
      const timer = setTimeout(() => {
        if (response.status === 200 && response.data.data) {
          setSearchResults(response.data.data);
          setResultNothing(null);
          setIsLoadingSearch(false);
        }
      }, 1000);

      return () => clearTimeout(timer);
    } catch (error: any) {
      if (error?.response) {
        if (error.response.status === 404) {
          setResultNothing(error.response.data.message);
        } else
          handleShowMessage(
            `Terjadi Kesalahan: ${error.response.data.message}`,
            true,
          );
      } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
      setIsLoadingSearch(false);
    }
  };
  const [isLoadSave, setIsLoadSave] = useState(false);
  const saveSelectedItem = async (data: any) => {
    setIsLoadSave(true);
    try {
      const response = await axiosCustom.post(
        `/tenant/${getParamsId}/add-user`,
        data,
      );
      if (response.status === 201) {
        handleShowMessage(`Anggota Tim berhasil ditambahkan`, false);
        setIsLoadSave(false);
        await getTeam();
        setIsModalSearchOpen(false);
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response) {
        handleShowMessage(`Terjadi Kesalahan: ${error.response.data}`, true);
      } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
      setIsLoadSave(false);
    }
  };
  const DynamicDataComponent = dynamic(() => import("./TeamNonLogin"), {
    ssr: false,
    suspense : true,
    loading: () => <p>Loading ...</p>, // Tampilan loading saat komponen dimuat
  });

  return (
    <div>
      {loadingTeam ? (
        <Center h="100%" m="10">
          <Spinner className="spinner" size="xl" color="blue.500" />
        </Center>
      ) : (
        <>
          {namaTenant ? (
            <>
              <Flex
                justifyContent={"space-between"}
                pb="2"
                direction={["column", "row"]}
              >
                <Heading fontSize={"2xl"}>
                  TEAM TENANT : {namaTenant.toUpperCase()}
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
                  {teamFeatures?.access.includes("tmbhTeam") ||
                  allMenu?.access.includes("all_access") ? (
                    <Popover placement="bottom" isLazy>
                      <PopoverTrigger>
                        <Button colorScheme="green" key="tambahData" size="sm">
                          <AddIcon />
                          &nbsp;Tambah Anggota
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        w="fit-content"
                        _focus={{ boxShadow: "none" }}
                      >
                        <PopoverArrow />
                        <PopoverBody>
                          <Stack>
                            <Button
                              variant="ghost"
                              key="tambahTeamLogin"
                              size="sm"
                              onClick={() => setIsModalSearchOpen(true)}
                              fontWeight="normal"
                              justifyContent={"start"}
                            >
                              <AddIcon />
                              &nbsp;Login Team
                            </Button>
                            <Button
                              variant="ghost"
                              key="tambahTeamNonLogin"
                              size="sm"
                              onClick={() => setIsModalNonLogin(true)}
                              justifyContent="start"
                              fontWeight="normal"
                            >
                              <AddIcon />
                              &nbsp;Non-Login Team
                            </Button>
                          </Stack>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  ) : null}
                </HStack>
              </Flex>

              <Tabs isLazy>
                <TabList>
                  <Tab
                    _selected={{
                      color: "blue.500",
                      fontWeight: "bold",
                      borderBottom: "2px solid blue",
                    }}
                  >
                    Login Team
                  </Tab>
                  <Tab
                    _selected={{
                      color: "blue.500",
                      fontWeight: "bold",
                      borderBottom: "2px solid blue",
                    }}
                  >
                    Non-Login Team
                  </Tab>
                </TabList>
                <TabPanels>
                  {/* initially mounted */}
                  <TabPanel>
                    <TeamLogin
                      dataTeam={dataTeamLogin}
                      onSubmit={getTeam}
                      idTenant={getParamsId}
                    />
                  </TabPanel>
                  {/* initially not mounted */}
                  <TabPanel>
                    <DynamicDataComponent
                      dataTeam={dataTeamNonLogin}
                      onSubmit={() => getTeam()}
                      idTenant={getParamsId}
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </>
          ) : (
            <NotFound
              statusCode={404}
              msg={"Not Found"}
              statusDesc="Halaman tidak ditemukan. Periksa kembali URL Halaman yang anda kunjungi atau kembali ke halaman tenant."
              backToHome="/tenant"
            />
          )}
        </>
      )}

      {/* buka modal search */}
      <SearchModal
        isOpen={isModalSearchOpen}
        onClose={() => {
          setIsModalSearchOpen(false);
          setSearchResults([]);
          setResultNothing(null);
        }}
        onSearch={handleSearch}
        searchResults={searchResults}
        isLoading={isLoadingSearch}
        isLoadSave={isLoadSave}
        onSubmit={(item) => {
          saveSelectedItem(item);
        }}
        ifResultNothing={resultNothing}
      />

      <ModalTeamNonLogin
        isOpen={isModalNonLogin}
        onClose={() => setIsModalNonLogin(false)}
        onSubmit={() => {
          getTeam();
        }}
        idTenant={getParamsId}
      />

      <ModalNotif
        isOpen={isModalNotifPage}
        onClose={() => setIsModalNotifPage(false)}
        message={message}
        isError={isError}
      />
    </div>
  );
}
