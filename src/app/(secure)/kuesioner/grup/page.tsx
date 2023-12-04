"use client";
import React, { useState, useEffect, Suspense } from "react";
import { Stack, Flex, Heading, HStack } from "@chakra-ui/react";
import Loading from "../loading";
import { useBreadcrumbContext } from "@/app/components/utils/BreadCrumbsContext";
import { FindDefaultRoute } from "@/app/components/utils/FindDefaultRoute";
import AddGroup from "./AddGroup";

function page() {
  const { setBreadcrumbs } = useBreadcrumbContext();
  const getForCrumbs: any = FindDefaultRoute();
  useEffect(() => {
    if (getForCrumbs) setBreadcrumbs(getForCrumbs);
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <Stack spacing={{ base: 6, md: 8 }}>
        <Flex
          flexDirection={{ base: "column", md: "row" }} // Arah tata letak berdasarkan layar
          justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
          // align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
        >
          <Heading fontSize={"2xl"} mb="2">
            DAFTAR GRUP PERTANYAAN
          </Heading>
          <HStack>
            <AddGroup />
          </HStack>
        </Flex>
      </Stack>
    </Suspense>
  );
}

export default page;
