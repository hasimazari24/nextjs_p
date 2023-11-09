import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as ClassType from "@/app/type/class-type";
import { Search2Icon, SearchIcon } from "@chakra-ui/icons";
import { MdArrowBackIosNew } from "react-icons/md";

interface TenantKelasProps {
  logo?: string;
  nama?: string;
}

const TenantKelas = ({ logo, nama }: TenantKelasProps) => {
  return (
    <Stack spacing={{ base: 6, md: 8 }}>
      <Flex
        flexDirection={{ base: "column", md: "row" }} // Arah tata letak berdasarkan layar
        justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
        // align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
      >
        <VStack spacing={0} align="flex-start">
          <Text fontWeight={"bold"} fontSize={["lg", "xl"]}>
            Partisipan Kelas
          </Text>
          <Text
            fontWeight="medium"
          >
            Total :10 Partisipan
          </Text>
        </VStack>
        <HStack spacing={2} align="start">
          {/* jika butuh btn kembali, ada disinii */}

          {/* <Button
            leftIcon={<MdArrowBackIosNew />}
            colorScheme="blue"
            variant="outline"
            size={"sm"}
            mb={6}
          >
            Kembali
          </Button> */}
          <Stack spacing={4}>
            <Spacer />

            <Input
              w={40}
              type="text"
              aria-label="cari-tenant"
              alignItems=""
              placeholder="Cari Tenant.."
              borderColor="gray.400"
              bg="gray.100"
              _placeholder={{ color: "gray.500" }}
              _focus={{ borderColor: "blue.500" }}
              _hover={{ borderColor: "gray.400" }}
            />
          </Stack>
        </HStack>
      </Flex>

      {/* konten disinii (daftar participant) */}
      <Box>
        <Stack spacing={4}>
          {/* <Box maxW="100px"
                        bgColor="gray.50"
                        outline={'blue.500'}
                        rounded={'xl'}   
                        >

                        </Box> */}
        </Stack>
      </Box>
    </Stack>
  );
};

export default TenantKelas;
