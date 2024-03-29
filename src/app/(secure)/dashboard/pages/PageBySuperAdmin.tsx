"use client";
import {
  Stack,
  Flex,
  Heading,
  SimpleGrid,
  Button,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { BsBuilding, BsPeople, BsPerson } from "react-icons/bs";
import { FaBookReader } from "react-icons/fa";
import { RiMoneyDollarBoxLine, RiSignalTowerLine } from "react-icons/ri";
import StatsCard from "./StatsCard";
import { GiAerialSignal, GiProgression } from "react-icons/gi";
import { ImFileText2 } from "react-icons/im";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { SiGoogleclassroom } from "react-icons/si";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FaNetworkWired } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import DetailCard from "./DetailCard";
import { useRouter } from "next/navigation";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

function PageBySuperAdmin({ data }: { data: any }) {
  const router = useRouter();
  return (
    <div>
      <Stack spacing={{ base: 4, md: 6 }}>
        <Flex
          justifyContent={"space-between"}
          pb="2"
          direction={["column", "row"]}
        >
          <Heading fontSize={"2xl"}>DASHBOARD</Heading>
        </Flex>
        {data && (
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: 6, lg: 8 }}
            height={"full"}
          >
            <StatsCard
              title={"TOTAL USER"}
              stat={data.user.total_user}
              icon={<BsPeople size={"3em"} />}
              bgcolor="blue.300"
              detail={
                <DetailCard
                  title="Total User"
                  content={[
                    {
                      icon: <BsPerson fontSize={"35px"} />,
                      title_heading: "Super Admin",
                      title_content: `${data.user.super_admin} User`,
                    },
                    {
                      icon: <BsPerson fontSize={"35px"} />,
                      title_heading: "Manajemen",
                      title_content: `${data.user.manajemen} User`,
                    },
                    {
                      icon: <BsPerson fontSize={"35px"} />,
                      title_heading: "Mentor",
                      title_content: `${data.user.mentor} User`,
                    },
                    {
                      icon: <BsPerson fontSize={"35px"} />,
                      title_heading: "Tenant",
                      title_content: `${data.user.tenant} User`,
                    },
                  ]}
                  cols={{ base: 1, sm: 2 }}
                  btnColor={{ bcolor: "blue.400", bhover: "blue.500" }}
                />
              }
            />
            <StatsCard
              title={"TOTAL TENANT"}
              stat={data.tenant.total_tenant}
              icon={<BsBuilding size={"3em"} />}
              bgcolor="green.300"
              detail={
                <DetailCard
                  title="Total Tenant"
                  content={[
                    {
                      icon: <HiUserGroup fontSize={"35px"} />,
                      title_heading: "Pra Inkubasi",
                      title_content: `${data.tenant.pra_inkubasi} Tenant`,
                    },
                    {
                      icon: <FaBookReader fontSize={"35px"} />,
                      title_heading: "Inkubasi",
                      title_content: `${data.tenant.inkubasi} Tenant`,
                    },
                    {
                      icon: <FaNetworkWired fontSize={"35px"} />,
                      title_heading: "Inkubasi Lanjutan",
                      title_content: `${data.tenant.inkubasi_lanjutan} Tenant`,
                    },
                    {
                      icon: <GiProgression fontSize={"35px"} />,
                      title_heading: "Scale-Up",
                      title_content: `${data.tenant.scale_up} Tenant`,
                    },
                  ]}
                  cols={{ base: 1, sm: 2 }}
                  btnColor={{ bcolor: "green.400", bhover: "green.500" }}
                />
              }
            />
            <StatsCard
              title={"TOTAL KELAS"}
              stat={data.course.total_course}
              icon={<SiGoogleclassroom size={"3em"} />}
              bgcolor="teal.300"
              detail={
                <DetailCard
                  title="Total Kelas"
                  content={[
                    {
                      icon: (
                        <Box
                          boxSize={"15px"}
                          borderRadius={"full"}
                          bgColor={"green.500"}
                        />
                      ),
                      title_heading: "Kelas Aktif",
                      title_content: `${data.course.active} Kelas`,
                    },
                    {
                      icon: (
                        <Box
                          boxSize={"15px"}
                          borderRadius={"full"}
                          bgColor={"red.500"}
                        />
                      ),
                      title_heading: "Kelah Diakhiri",
                      title_content: `${data.course.inactive} Kelas`,
                    },
                  ]}
                  cols={{ base: 1, sm: 2 }}
                  btnColor={{ bcolor: "teal.400", bhover: "teal.500" }}
                />
              }
            />
            <StatsCard
              title={"VALUASI TENANT"}
              stat={`${Array.isArray(data.valuasi) && data.valuasi.length}`}
              icon={<LiaFileInvoiceDollarSolid size={"3em"} />}
              bgcolor="yellow.400"
              detail={
                <DetailCard
                  title="Total Valuasi Tenant"
                  content={
                    Array.isArray(data.valuasi) &&
                    data.valuasi.map((v: any) => ({
                      icon: <RiMoneyDollarBoxLine fontSize={"35px"} />,
                      title_heading: v?.valuasi,
                      title_content: `${v?.count} Tenant`,
                    }))
                  }
                  cols={{ base: 1 }}
                  btnColor={{ bcolor: "yellow.500", bhover: "yellow.600" }}
                />
              }
            />
            <StatsCard
              title={"JANGKAUAN TENANT"}
              stat={`${Object.keys(data.jangakauan_tenant).length}`}
              icon={<GiAerialSignal size={"3em"} />}
              bgcolor="orange.400"
              detail={
                <DetailCard
                  title="Total Tenant Dalam 5 Jangkauan"
                  content={[
                    {
                      icon: <RiSignalTowerLine fontSize={"35px"} />,
                      title_heading: "Dalam Kota",
                      title_content: `${data.jangakauan_tenant.dalam_kota} Tenant`,
                    },
                    {
                      icon: <RiSignalTowerLine fontSize={"35px"} />,
                      title_heading: "Dalam Provinsi",
                      title_content: `${data.jangakauan_tenant.dalam_provinsi} Tenant`,
                    },
                    {
                      icon: <RiSignalTowerLine fontSize={"35px"} />,
                      title_heading: "Nasional",
                      title_content: `${data.jangakauan_tenant.nasional} Tenant`,
                    },
                    {
                      icon: <RiSignalTowerLine fontSize={"35px"} />,
                      title_heading: "Asia Tenggara",
                      title_content: `${data.jangakauan_tenant.asia_tenggara} Tenant`,
                    },
                    {
                      icon: <RiSignalTowerLine fontSize={"35px"} />,
                      title_heading: "Internasional",
                      title_content: `${data.jangakauan_tenant.internasional} Tenant`,
                    },
                  ]}
                  cols={{ base: 1, sm: 2 }}
                  btnColor={{ bcolor: "orange.500", bhover: "orange.600" }}
                />
              }
            />
            <StatsCard
              title={"TOTAL KUESIONER"}
              stat={data.kuesioner.total_kuesioner}
              icon={<HiOutlineClipboardDocumentList size={"3.5em"} />}
              bgcolor="purple.300"
              detail={
                <DetailCard
                  title="Total Kuesioner"
                  content={[
                    {
                      icon: (
                        <Box
                          boxSize={"15px"}
                          borderRadius={"full"}
                          bgColor={"green.500"}
                        />
                      ),
                      title_heading: "Kuesioner Aktif",
                      title_content: `${data.kuesioner.active} Kuesioner`,
                    },
                    {
                      icon: (
                        <Box
                          boxSize={"15px"}
                          borderRadius={"full"}
                          bgColor={"red.500"}
                        />
                      ),
                      title_heading: "Kuesioner Nonaktif",
                      title_content: `${data.kuesioner.inactive} Kuesioner`,
                    },
                  ]}
                  cols={{ base: 1 }}
                  btnColor={{ bcolor: "purple.400", bhover: "purple.500" }}
                />
              }
            />
            <StatsCard
              title={"ASSETS"}
              stat={data.asset.not_used}
              icon={<ImFileText2 size={"3em"} />}
              bgcolor="red.300"
              detail={
                <Button
                  fontWeight={"normal"}
                  borderTopRadius={"none"}
                  borderBottomRadius={"lg"}
                  w="full"
                  color={"white"}
                  colorScheme="red"
                  onClick={() => router.push("/assets")}
                >
                  View Details &nbsp;
                  <ExternalLinkIcon fontSize={"15px"} />
                </Button>
              }
            />
          </SimpleGrid>
        )}
      </Stack>
    </div>
  );
}

export default PageBySuperAdmin;
