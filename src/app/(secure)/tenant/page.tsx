"use client";

import DataTable from "../../components/datatable/data-table";
import { Column } from "react-table";
import { useEffect, useState, useContext } from "react";
import ModalEdit from "./modal-edit";
import ModalDetail from "./modal-detail";
import {
  chakra,
  Container,
  VStack,
  SimpleGrid,
  StackDivider,
  VisuallyHidden,
  List,
  ListItem,
  Button,
  Center,
  HStack,
  Spinner,
  Text,
  useColorModeValue,
  Image,
  Avatar,Td,Tr,Tbody,Table,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Box,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import ConfirmationModal from "../../components/modal/modal-confirm";
import ModalNotif from "../../components/modal/modal-notif";
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  ViewIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
// import { useNavigate } from "react-router-dom";
import { GrMoreVertical } from "react-icons/gr";
import { SiMicrosoftteams } from "react-icons/si";
import { BiLinkExternal } from "react-icons/bi";
import { CiGlobe } from "react-icons/ci";
import { axiosCustom } from "@/app/api/axios";
import Link from "next/link";
import { FiFacebook } from "react-icons/fi";
import { TbWorldWww } from "react-icons/tb";
import { AiOutlineFacebook, AiOutlineLinkedin } from "react-icons/ai";

interface DataItem {
  id: string;
  name: string;
  description: string;
  address: string;
  contact: string;
  email: string;
  founder: string;
  level_tenant: string;
  image: string;
}

export default function page() {
  const [isModalNotif, setModalNotif] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleShowMessage = (msg: string, err: boolean) => {
    setMessage(msg);
    setIsError(err);
    setModalNotif(true);
  };

  const hidenCols = ["id", "founder", "email", "contact", "description"];

  const columns: ReadonlyArray<Column<DataItem>> = [
    {
      Header: "Logo",
      accessor: "image",
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
      Header: "Deskripsi",
      accessor: "description",
    },
    {
      Header: "Alamat",
      accessor: "address",
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
            <MenuItem>
              <BiLinkExternal />
              &nbsp; Lihat Situs
            </MenuItem>
            <MenuItem
              onClick={() => router.push(`/tenant/catalog?id=${rowData.id}`)}
            >
              <HamburgerIcon />
              &nbsp; Catalog Tenant
            </MenuItem>
            <MenuItem
              onClick={() => router.push(`/tenant/team?id=${rowData.id}`)}
            >
              <SiMicrosoftteams />
              &nbsp; Team Tenant
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

  const handleDetail = (item: any) => {
    setDataDetail(item);

    setIsModalDetailOpen(true);
    // console.log(dataDetail);
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
            <Heading fontSize={"2xl"}>DATA TENANT</Heading>
            <HStack>
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
                  <MenuItem>
                    <BiLinkExternal />
                    &nbsp; Lihat Situs
                  </MenuItem>
                  <MenuItem
                  // onClick={() =>
                  //   router.push(`/tenant/catalog?id=${rowData.id}`)
                  // }
                  >
                    <HamburgerIcon />
                    &nbsp; Catalog Tenant
                  </MenuItem>
                  <MenuItem
                  // onClick={() => router.push(`/tenant/team?id=${rowData.id}`)}
                  >
                    <SiMicrosoftteams />
                    &nbsp; Team Tenant
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
                // onClick={() => handleEdit(rowData)}
                fontSize="14px"
                fontWeight="230"
                key="editData"
                size="sm"
              >
                <EditIcon /> &nbsp; Edit Data Tenant
              </Button>
            </HStack>
          </Flex>

          <Container maxW={"7xl"} pl="0" pr="0">
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              spacing={{ base: 8, md: 10 }}
            >
              <VStack>
                <Image
                  rounded={"md"}
                  alt={"product image"}
                  src={
                    "https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080"
                  }
                  fit={"cover"}
                  align={"center"}
                  w={"full"}
                  h={{ base: "150px", sm: "300px", lg: "300px" }}
                />
                <Flex
                  justify={"center"}
                  mt={{ base: "-50px", sm: "-100", lg: "-100" }}
                >
                  <Avatar
                    h={{ base: "100px", sm: "200px", lg: "200px" }}
                    w="100%"
                    src={
                      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                    }
                    css={{
                      border: "5px solid white",
                    }}
                  />
                </Flex>
              </VStack>

              <Stack spacing={{ base: 4, md: 6 }}>
                <Box as={"header"}>
                  <Heading fontSize="2xl">IMPULS.ID</Heading>
                  <Text
                    color={useColorModeValue("gray.900", "gray.400")}
                    fontWeight={300}
                    fontSize={"x5"}
                  >
                    Level Tenant : <b>Inkubasi</b>
                  </Text>
                </Box>

                <Stack
                  spacing={{ base: 4, sm: 6 }}
                  direction={"column"}
                  divider={
                    <StackDivider
                      borderColor={useColorModeValue("gray.200", "gray.600")}
                    />
                  }
                >
                  <Text
                    color={useColorModeValue("gray.500", "gray.400")}
                    fontSize={"xl"}
                    // fontWeight={"300"}
                  >
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore
                  </Text>
                  <Box>
                    <Text
                      fontSize={{ base: "16px", lg: "18px" }}
                      color={useColorModeValue("yellow.500", "yellow.300")}
                      fontWeight={"500"}
                      textTransform={"uppercase"}
                      mb={"4"}
                    >
                      Tenant Details
                    </Text>

                    <SimpleGrid spacing={10}>
                      <Table pt="0">
                        <Tbody>
                          <Tr key={2} pb="3">
                            <Td width="20%" pr="0" pl="0" pt="0">
                              Founder
                            </Td>
                            <Td
                              width="5%"
                              pr="0"
                              pl="0"
                              pt="0"
                              textAlign="center"
                            >
                              :
                            </Td>
                            <Td width="75%" pr="0" pt="0" pl="0">
                              Founder Tenant
                            </Td>
                          </Tr>

                          <Tr key={1}>
                            <Td width="20%" pr="0" pl="0">
                              Alamat
                            </Td>
                            <Td width="5%" textAlign="center" pr="0" pl="0">
                              :
                            </Td>
                            <Td width="75%" pr="0" pl="0">
                              Surakarta, Indonesia, Jawa Tengah, Timur Raya,
                              564522
                            </Td>
                            {/* Tambahkan kolom lainnya sesuai kebutuhan */}
                          </Tr>

                          <Tr key={4} pb="3">
                            <Td width="20%" pr="0" pl="0">
                              E-mail
                            </Td>
                            <Td width="5%" pr="0" pl="0" textAlign="center">
                              :
                            </Td>
                            <Td width="75%" pr="0" pl="0">
                              impuls@tech.id
                            </Td>
                          </Tr>
                          <Tr key={5} borderBottom={"hidden"}>
                            <Td width="20%" pr="0" pl="0">
                              Kontak
                            </Td>
                            <Td width="5%" pr="0" pl="0" textAlign="center">
                              :
                            </Td>
                            <Td width="75%" pr="0" pl="0">
                              089732423882
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </SimpleGrid>
                  </Box>
                </Stack>
              </Stack>
            </SimpleGrid>

            <Divider
              pt="4"
              mb="4"
              color={useColorModeValue("gray.200", "gray.600")}
              borderColor={useColorModeValue("gray.200", "gray.600")}
            />

            <Stack spacing={{ base: 4, md: 6 }} pb="3">
              <Box>
                <Flex
                  justifyContent={"space-between"}
                  direction={["column", "row"]}
                  mb={"4"}
                >
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={useColorModeValue("yellow.500", "yellow.300")}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"2"}
                  >
                    Social Links
                  </Text>

                  <Button
                    bgColor="blue.100"
                    _hover={{
                      bg: "blue.200",
                    }}
                    // color="white"
                    title="Edit Social Links"
                    // onClick={() => handleEdit(rowData)}
                    key="editSocial"
                    size="sm"
                    fontSize="14px"
                    fontWeight="230"
                  >
                    <EditIcon /> &nbsp; Edit Social Links
                  </Button>
                </Flex>

                <Stack direction={["column", "row"]}>
                  <Link href="impuls.id">
                    <HStack alignItems={"center"} pr="3">
                      <IconButton
                        colorScheme="blue"
                        aria-label="web"
                        icon={<TbWorldWww size="xs" />}
                      />
                      <Text fontSize="16px">impuls.id</Text>
                    </HStack>
                  </Link>
                  <Link href="impuls.id">
                    <HStack alignItems={"center"} pr="3">
                      <IconButton
                        colorScheme="facebook"
                        aria-label="web"
                        icon={<AiOutlineFacebook size="xs" />}
                      />
                      <Text fontSize="16px">impuls.id</Text>
                    </HStack>
                  </Link>

                  <Link href="impuls.id">
                    <HStack alignItems={"center"} pr="3">
                      <IconButton
                        colorScheme="linkedin"
                        aria-label="web"
                        icon={<AiOutlineLinkedin size="xs" />}
                      />
                      <Text fontSize="16px">impuls.id</Text>
                    </HStack>
                  </Link>
                </Stack>
              </Box>
            </Stack>
          </Container>

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
            onClose={() => setIsModalEditOpen(false)}
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
        </>
      )}
    </div>
  );
}
