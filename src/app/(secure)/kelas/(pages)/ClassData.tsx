"use client";
import * as React from "react";
import {
  Box,
  Text,
  Flex,
  HStack,
  Stack,
  VStack,
  Icon,
  Button,
  Spacer,
  Tag,
  SimpleGrid,
  Center,
  Image,
  Heading,
  IconButton,
  Grid,
  Avatar,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  useDisclosure,
  Img,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  AiFillTwitterCircle,
  AiOutlineFacebook,
  AiOutlineCrown,
  AiOutlineGlobal,
} from "react-icons/ai";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoYoutube,
} from "react-icons/io5";
import * as TenantTypes from "@/app/type/tenant-type.d";
import Link from "next/link";
import { Kelas, Mentor } from "@/app/type/class-type";
import { MdOutlinePeople } from "react-icons/md";
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineNewspaper,
} from "react-icons/hi";
import { BiDoorOpen } from "react-icons/bi";
import {
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { GrMoreVertical } from "react-icons/gr";
import { useMemo, useState } from "react";
import Pagination from "@/app/components/datatable/pagination";
import EditClass from "./editClass";
import ProfileMentor from "./profileMentor";
import { useRouter } from "next/navigation";

interface ClassProps {
  rowData: Kelas[];
  onSubmit: () => void;
}

const ClassData = ({ rowData, onSubmit }: ClassProps) => {
  // const MotionSimpleGrid = motion(SimpleGrid);
  // const MotionBox = motion(Box);
  //set query/keyword pencarian

  // const dataMentor = rowData.flatMap((d) =>
  //   Array.isArray(d.mentor)
  //     ? d.mentor.map((data) => ({
  //         id: data.id,
  //         image_id: data.image_id,
  //         image_url: data.image_url,
  //         fullname: data.fullname,
  //         role: data.role,
  //       }))
  //     : [],
  // );

  const router = useRouter();
  const [queryName, setQueryName] = useState("");
  const [queryMentor, setQueryMentor] = useState("");
  //set item per page, default 4
  const [itemsPerPage, setItemPerPage] = useState<number>(4);
  //current page utk mendapatkan page saat ini
  const [currentPage, setCurrentPage] = useState(0);
  //atur perubahan page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  //utk berpindah halaman melalui paginate
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  //fungsi pencarian menggabungkan dua array (rowData dan dataMentor)
  // const search = [
  //   ...rowData.filter((item: Kelas) =>
  //     item["name"].toString().toLowerCase().includes(queryName.toLowerCase()),
  //   ),
  //   ...dataMentor.filter((i: Mentor) =>
  //     i["fullname"]
  //       .toString()
  //       .toLowerCase()
  //       .includes(queryMentor.toLowerCase()),
  //   ),
  // ];

  const search: Kelas[] = rowData.filter(
    (item: Kelas) =>
      item["name"].toString().toLowerCase().includes(queryName.toLowerCase()) &&
      item["mentor"]["fullname"]
        .toString()
        .toLowerCase()
        .includes(queryMentor.toLowerCase()),
  );
  //menghitung total halaman berdasarkan panjang data pada hasil pencarian.
  //Math.ceil(...) => membulatkan hasil pembagian panjang data dari pencarian dengan jumlah item per halaman.
  //Ini berguna untuk menentukan jumlah halaman secara keseluruhan.
  //lakukan perubahan totalpages pada memo ketika query dan itemperpage berubah
  const totalPages = useMemo(() => {
    return Math.ceil(search.length / itemsPerPage);
  }, []);

  //untuk mengatur apakah tombol next, back bisa dipenyek, ini hasilnya true/false
  const canNextPage = currentPage < totalPages - 1;
  const canPreviousPage = currentPage > 0;

  //startIndex dan endIndex untuk memotong data sesuai dengan halaman yang sedang aktif,
  //dan hanya menampilkan item yang sesuai dengan halaman saat ini.
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  //tampilan data usai dipotong dan dilakukan pencarian
  const displayedData = search.slice(startIndex, endIndex);
  console.log(displayedData);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Stack mt="4" spacing={6}>
        <Stack
          justifyContent="space-between"
          direction={["column", "row"]}
          flexWrap={"wrap"}
        >
          <Flex justifyContent={["center", "flex-start"]} flexWrap={"wrap"}>
            <Stack
              direction={{ base: "column", md: "row", lg: "row" }}
              // alignItems={"center"}
              spacing={3}
            >
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Button pl="1rem" leftIcon={<SearchIcon />}></Button>
                </InputLeftElement>
                <Input
                  pl="3rem"
                  // key={option.key}
                  type="text"
                  placeholder={`Cari Nama Kelas`}
                  // onChange={(e) => setFilter(option.key, e.target.value)}
                  onChange={(e) => {
                    setQueryName(e.target.value);
                    setCurrentPage(0);
                  }}
                  mb="2"
                />
              </InputGroup>

              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Button pl="1rem" leftIcon={<SearchIcon />}></Button>
                </InputLeftElement>
                <Input
                  pl="3rem"
                  // key={option.key}
                  type="text"
                  placeholder={`Cari Mentor`}
                  onChange={(e) => {
                    setQueryMentor(e.target.value);
                    setCurrentPage(0);
                  }}
                  // onChange={(e) => setFilter(option.key, e.target.value)}
                  mb="2"
                />
              </InputGroup>
            </Stack>
          </Flex>
          <Flex
            justifyContent={["center", "flex-end"]}
            alignItems={"center"}
            mt="-2"
          >
            {/* <Stack direction={["column","row"]}> */}
            <Text>Showing</Text>
            <Select
              w="auto"
              minW="20"
              fontSize="sm"
              onChange={(e) => {
                setItemPerPage(Number(e.target.value));
              }}
              cursor="pointer"
              pl="2"
              pr="2"
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="24">24</option>
              <option value="100">100</option>
            </Select>
            <Text>Data Per Page</Text>
            {/* </Stack> */}
          </Flex>
        </Stack>
        {displayedData && displayedData.length > 0 ? (
          <>
            <Grid
              templateColumns={{
                base: "1fr",
                sm: "1fr 1fr",
                lg: "1fr 1fr 1fr",
                xl: "1fr 1fr 1fr 1fr",
              }}
              // templateColumns={["1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr 1fr"]}
              // flexWrap={"wrap"}
              alignItems={"center"}
              justifyItems={"center"}
              gap={{ base: 8, sm: 6, lg: 8 }}
              mb={2}
            >
              {displayedData.flatMap((data) => (
                <Stack
                  // direction={"column"}
                  alignItems={"center"}
                  spacing={3}
                  w="full"
                  h="full"
                  p={6}
                  boxShadow={"lg"}
                  rounded={"2xl"}
                  bgColor={"gray.50"}
                  key={data.id}
                  // display="flex"
                >
                  <Box
                  // p={{ base: 4, sm: 2, lg: 4 }}
                  >
                    <Image
                      // rounded={{ base: "xl", lg: "3xl" }}
                      // height={{
                      //   base: "118px",
                      //   sm: "126px",
                      //   md: "158px",
                      //   xl: "250px",
                      // }}
                      //   maxH={{
                      //     base: "200px",
                      //     // sm: "126px",
                      //     sm: "120px",
                      //     lg: "190px",
                      //     xl: "220px",
                      //   }}
                      // maxW={"13rem"}
                      maxW={{
                        base: "13rem",
                        sm: "9rem",
                        md: "10rem",
                        // lg: "11rem",
                        xl: "13rem",
                      }}
                      objectFit={"cover"}
                      src={"/img/class-avatar.png"}
                      alt="#"
                      // boxShadow={"xl"}
                    />
                  </Box>

                  <Text
                    as="b"
                    fontWeight={"bold"}
                    fontSize={{ base: "16px", md: "17px" }}
                    textOverflow="ellipsis"
                    // maxW={{
                    //   base: "auto",
                    //   sm: "340px",
                    //   md: "408px",
                    //   lg: "544px",
                    // }}
                    // w="auto"
                    // whiteSpace="nowrap"
                    flex="1"
                    cursor={"default"}
                    overflow="hidden"
                    title={data.name}
                    noOfLines={2}
                  >
                    {data.name}
                  </Text>

                  <HStack w="full" justifyContent={"center"} spacing={2}>
                    <Box
                      borderColor={"blue.500"}
                      rounded={"7px"}
                      borderWidth={1}
                      pr={2}
                      pl={2}
                    >
                      <HStack
                        flexWrap={"wrap"}
                        spacing={1}
                        fontSize={{ base: "sm", sm: "xs", lg: "sm" }}
                        justifyContent={"center"}
                        color="blue.500"
                      >
                        <Icon
                          as={MdOutlinePeople}
                          boxSize={{ base: "20px", sm: "17px", lg: "20px" }}
                        />
                        <p>{data.participant_count}</p>
                      </HStack>
                    </Box>
                    <Box
                      borderColor={"blue.400"}
                      rounded={"7px"}
                      borderWidth={1}
                      pr={2}
                      pl={2}
                    >
                      <HStack
                        flexWrap={"wrap"}
                        spacing={1}
                        fontSize={{ base: "sm", sm: "xs", lg: "sm" }}
                        color="blue.500"
                        justifyContent={"center"}
                      >
                        <Icon
                          as={HiOutlineNewspaper}
                          boxSize={{ base: "20px", sm: "17px", lg: "20px" }}
                        />
                        <p>{data.activity_count}</p>
                      </HStack>
                    </Box>
                  </HStack>

                  <HStack
                    cursor={"pointer"}
                    // direction={{ base: "row", sm: "column", lg: "row" }}
                    onClick={onOpen}
                  >
                    <Avatar
                      size={"sm"}
                      src={data.mentor.image_url || "/img/avatar-default.jpg"}
                      backgroundColor={"white"}
                    />
                    <VStack
                      display={{ base: "flex", sm: "none", lg: "flex" }}
                      alignItems="flex-start"
                      spacing={0}
                      ml="2"
                    >
                      <Text
                        fontSize="sm"
                        textOverflow="ellipsis"
                        // maxW={{
                        //   base: "auto",
                        //   sm: "340px",
                        //   md: "408px",
                        //   lg: "544px",
                        // }}
                        // w="auto"
                        // whiteSpace="nowrap"
                        flex="1"
                        // cursor={"default"}
                        overflow="hidden"
                        title={"Mr. dsfjskndf"}
                        noOfLines={1}
                      >
                        {data.mentor.fullname}
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        {data.mentor.role}
                      </Text>
                    </VStack>
                    <Box>
                      <ExternalLinkIcon color={"blue.500"} />
                    </Box>
                  </HStack>

                  <Stack spacing={2} direction={"row"} w="full">
                    <Button
                      bgColor="gray.500"
                      _hover={{
                        bg: "gray.400",
                      }}
                      color="white"
                      w="full"
                      size={{ base: "xs", sm: "sm" }}
                      alignContent={"center"}
                      onClick={() => router.push(`/kelas/24df32`)}
                    >
                      <BiDoorOpen size="20px" />
                      &nbsp;Masuk
                    </Button>
                    <Menu>
                      <MenuButton
                        as={Button}
                        bgColor="teal.400"
                        _hover={{
                          bg: "teal.300",
                        }}
                        // colorScheme="aqua"
                        title="More ..."
                        color="white"
                        // onClick={() => handleDetail(rowData)}
                        key="more"
                        size={{ base: "xs", sm: "sm" }}
                      >
                        <GrMoreVertical />
                      </MenuButton>
                      <MenuList>
                        <MenuItem style={{ width: "100%" }}>
                          <EditClass
                            rowData={data}
                            onSubmit={() => onSubmit()}
                          />
                        </MenuItem>
                        <MenuItem>
                          <DeleteIcon
                            boxSize={{ base: "20px", sm: "17px", lg: "20px" }}
                          />
                          &nbsp; Hapus Kelas
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Stack>
                </Stack>
              ))}
            </Grid>
            <Flex justify="flex-end" alignItems="center">
              <HStack>
                <Pagination
                  currentPage={currentPage}
                  data={search}
                  onClick={handlePageChange}
                  totalPages={totalPages}
                />
                <Button
                  disabled={!canPreviousPage}
                  onClick={previousPage}
                  colorScheme="blue"
                  size="sm"
                  leftIcon={<HiChevronLeft />}
                >
                  Prev
                </Button>
                <Button
                  disabled={!canNextPage}
                  onClick={nextPage}
                  colorScheme="blue"
                  size="sm"
                  rightIcon={<HiChevronRight />}
                >
                  Next
                </Button>
              </HStack>
            </Flex>
          </>
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
              Hasil Pencarian Tidak Ditemukan
            </Text>
          </Stack>
        )}
      </Stack>
      <ProfileMentor isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ClassData;
