import * as React from "react";
import { Box, Stack, Text } from "@chakra-ui/react";

const AwardsTenant=() => {
  return (
    <Box w="100%">
      <Stack py={{ base: "4", md: "6" }}>
        <Text
        fontWeight="bold"
        color="gray.900"
        fontSize={["xl", "2xl", "3xl"]}>
          Prestasi
        </Text>
      </Stack>
    </Box>
  );
} ;

export default AwardsTenant;