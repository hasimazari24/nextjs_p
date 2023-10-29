"use client";

import { Spinner, Center, Box } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box rounded="md">
      <Center h="100%" m="10">
        <Spinner className="spinner" size="xl" color="green.500" />
      </Center>
    </Box>
  );
};

export default Loading;
