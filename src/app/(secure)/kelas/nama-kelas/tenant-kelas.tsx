import React from "react";
import { Avatar, Box, Grid, HStack, Input, InputGroup, InputLeftElement, Spacer, Stack, Text } from "@chakra-ui/react";
import * as ClassType from "@/app/type/class-type";
import { Search2Icon, SearchIcon } from "@chakra-ui/icons";

interface TenantKelasProps {
    logo: string;
    nama: string;
}

const TenantKelas = ({logo,nama}: TenantKelasProps) => {

    return (
        <Box w="full">
            <Stack spacing={4}>
                <Text
                fontWeight="bold"
                color="gray.900"
                fontSize={["10px","xl","2xl"]}
                >
                    Partisipan Kelas   
                </Text>
                <HStack>
                    <Text
                    fontWeight="medium"
                    color="gray.900"
                    fontSize={["10px","md","lg"]}
                    >
                        Total :
                    </Text>
                    <Text   
                    fontWeight="medium"
                    color="green.500"
                    fontSize={["10px","md","lg"]}
                    >
                        10 Partisipan
                    </Text>
                    <Spacer/>
                
                    
                    <Input w={40}   
                    type="text" 
                    aria-label="cari-tenant"
                    alignItems=""
                    placeholder="Cari Tenant.."
                    borderColor="gray.400"
                    bg="gray.100"
                    _placeholder={{color: "gray.500"}}
                    _focus={{borderColor: "blue.500"}}
                    _hover={{borderColor: "gray.400"}}
                    />
                
                </HStack>
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
        </Box>
    );
};

export default TenantKelas;