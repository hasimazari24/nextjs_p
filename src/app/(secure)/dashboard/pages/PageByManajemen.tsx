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

function PageByManajemen() {
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

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 6, lg: 8 }}
          height={"full"}
          px={{ base: 0, md: 10, lg: 20 }}
        >
          <StatsCard
            title={"TOTAL TENANT"}
            stat={"5"}
            icon={<BsBuilding size={"3em"} />}
            bgcolor="green.300"
            detail={
              <DetailCard
                title="Total Tenant"
                content={[
                  {
                    icon: <HiUserGroup fontSize={"35px"} />,
                    title_heading: "Pra Inkubasi",
                    title_content: `5 Tenant`,
                  },
                  {
                    icon: <FaBookReader fontSize={"35px"} />,
                    title_heading: "Inkubasi",
                    title_content: `5 Tenant`,
                  },
                  {
                    icon: <FaNetworkWired fontSize={"35px"} />,
                    title_heading: "Inkubasi Lanjutan",
                    title_content: `5 Tenant`,
                  },
                  {
                    icon: <GiProgression fontSize={"35px"} />,
                    title_heading: "Scale-Up",
                    title_content: `5 Tenant`,
                  },
                ]}
                cols={{ base: 1, sm: 2 }}
                btnColor={{ bcolor: "green.400", bhover: "green.500" }}
              />
            }
          />
          <StatsCard
            title={"TOTAL KELAS"}
            stat={"7"}
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
                    title_content: `5 Kelas`,
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
                    title_content: `5 Kelas`,
                  },
                ]}
                cols={{ base: 1, sm: 2 }}
                btnColor={{ bcolor: "teal.400", bhover: "teal.500" }}
              />
            }
          />
          <StatsCard
            title={"VALUASI TENANT"}
            stat={"7"}
            icon={<LiaFileInvoiceDollarSolid size={"3em"} />}
            bgcolor="yellow.400"
            detail={
              <DetailCard
                title="Total Valuasi Tenant"
                content={[
                  {
                    icon: <RiMoneyDollarBoxLine fontSize={"35px"} />,
                    title_heading: `1.000.000 s.d 10.000.000`,
                    title_content: `5 Tenant`,
                  },
                  {
                    icon: <RiMoneyDollarBoxLine fontSize={"35px"} />,
                    title_heading: ">= 900.000.000.000",
                    title_content: `5 Tenant`,
                  },
                  {
                    icon: <RiMoneyDollarBoxLine fontSize={"35px"} />,
                    title_heading: `1.000.000 s.d 10.000.000`,
                    title_content: `5 Tenant`,
                  },
                  {
                    icon: <RiMoneyDollarBoxLine fontSize={"35px"} />,
                    title_heading: ">= 900.000.000.000",
                    title_content: `5 Tenant`,
                  },
                  {
                    icon: <RiMoneyDollarBoxLine fontSize={"35px"} />,
                    title_heading: `1.000.000 s.d 10.000.000`,
                    title_content: `5 Tenant`,
                  },
                  {
                    icon: <RiMoneyDollarBoxLine fontSize={"35px"} />,
                    title_heading: ">= 900.000.000.000",
                    title_content: `5 Tenant`,
                  },
                ]}
                cols={{ base: 1 }}
                btnColor={{ bcolor: "yellow.500", bhover: "yellow.600" }}
              />
            }
          />
          <StatsCard
            title={"JANGKAUAN TENANT"}
            stat={"5"}
            icon={<GiAerialSignal size={"3em"} />}
            bgcolor="orange.400"
            detail={
              <DetailCard
                title="Total Tenant Dalam 5 Jangkauan"
                content={[
                  {
                    icon: <RiSignalTowerLine fontSize={"35px"} />,
                    title_heading: "Dalam Kota",
                    title_content: "5 Tenant",
                  },
                  {
                    icon: <RiSignalTowerLine fontSize={"35px"} />,
                    title_heading: "Dalam Provinsi",
                    title_content: "5 Tenant",
                  },
                  {
                    icon: <RiSignalTowerLine fontSize={"35px"} />,
                    title_heading: "Nasional",
                    title_content: "5 Tenant",
                  },
                  {
                    icon: <RiSignalTowerLine fontSize={"35px"} />,
                    title_heading: "Asia Tenggara",
                    title_content: "5 Tenant",
                  },
                  {
                    icon: <RiSignalTowerLine fontSize={"35px"} />,
                    title_heading: "Internasional",
                    title_content: "5 Tenant",
                  },
                ]}
                cols={{ base: 1, sm: 2 }}
                btnColor={{ bcolor: "orange.500", bhover: "orange.600" }}
              />
            }
          />
        </SimpleGrid>
      </Stack>
    </div>
  );
}

export default PageByManajemen;
