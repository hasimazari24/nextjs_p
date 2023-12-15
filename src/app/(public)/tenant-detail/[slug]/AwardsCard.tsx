"use client";
import * as React from "react";
import { useState } from "react";
import {
  Text,
  Stack,
  Image,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import * as TenantTypes from "@/app/type/tenant-type.d";

const CardAward = ({
  data,
  index,
}: {
  data: TenantTypes.tenant_award;
  index: number;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  return (
    <>
      <Stack
        maxW={"xl"}
        p={4}
        boxShadow={"lg"}
        // rounded={"2xl"}
        bgColor={"gray.50"}
        spacing="2"
        rounded="2xl"
        align="center"
        cursor={"pointer"}
        onClick={openDrawer}
        key={index}
      >
        <Image
          // boxSize={[20,40]}
          h={{ base: "80px", sm: "140px", xl: "200px" }}
          maxW={{ base: "80px", sm: "140px", xl: "200px" }}
          // w={"xl"}
          objectFit={"cover"}
          src={data.image_url || "/img/tenant-logo-default.png"}
          rounded={{ base: "xl", lg: "3xl" }}
          boxShadow="xl"
          mb={[2, 4]}
        />
        <Text
          as="b"
          fontSize={["sm", "lg", "xl"]}
          textOverflow="ellipsis"
          align="center"
          overflow="hidden"
          title={data.rank}
          noOfLines={{ base: 2, sm: 1 }}
        >
          {data.rank}
        </Text>
        <Text
          textAlign="center"
          fontSize={["sm", "md"]}
          textOverflow="ellipsis"
          align="center"
          overflow="hidden"
          noOfLines={2}
          title={data.name}
        >
          {data.name}
        </Text>
      </Stack>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        placement="right"
        size={["sm", "md"]}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text
              fontSize={["20", "24"]}
              color="gray.800"
              fontWeight={"bold"}
              px={4}
              textAlign={"center"}
            >
              {data.rank}
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing={3} px={4}>
              <Image
                src={data.image_url || "/img/tenant-logo-default.png"}
                rounded={"xl"}
              />
              <Text
                // color={"gray.700"}
                // textAlign={"justify"}
                dangerouslySetInnerHTML={{ __html: data.name }}
              />
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CardAward;
