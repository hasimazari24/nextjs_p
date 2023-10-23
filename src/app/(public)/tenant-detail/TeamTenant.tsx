'use client'

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Icon,
  Stack,
  Image,
  VStack,
  HStack,
} from '@chakra-ui/react'
import { BsPeopleFill } from 'react-icons/bs';

// const IMAGE =
//   'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'

const TeamTenants = () => {
    return (
        <VStack>
            <HStack justifyContent={"center"}>
        <Box
          w={["20px", "30px"]}
          h={["20px", "30px"]}
          bg={"red.500"}
          borderRadius={"full"}
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
        >
          <Icon
            as={BsPeopleFill}
            w={["15px", "20px"]}
            h={["15px", "20px"]}
            color={"white"}
          />
        </Box>
        <Text fontWeight={"bold"} color={"red.500"} fontSize={["sm", "lg"]}>
          TEAM
        </Text>
      </HStack>
        </VStack>
    );
};

export default TeamTenants;