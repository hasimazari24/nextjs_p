"use client";
import {
  HStack,
  Icon,
  Stack,
  Text,
  Box,
  Center,
  Radio,
  Checkbox,
  Textarea,
  RadioGroup,
} from "@chakra-ui/react";
import React from "react";
import { HiFolderOpen } from "react-icons/hi";

interface ValueJawaban {
  id: string;
  title: string;
}

interface FormProps {
  id: string;
  heading: string;
  type: string;
  value?: ValueJawaban[];
}

function FormKuesioner({ data }: { data: FormProps[] | [] }) {
  return (
    // <div>
    <Stack w="full" spacing={3}>
      {/* <Box display="flex" w="full"> */}
      <Center bgColor={"blue.500"} p={3} w="full">
        <HStack color={"white"}>
          {/* <FaRegFileAlt fontSize="18px" fontWeight={"bold"} /> */}
          <Icon
            as={HiFolderOpen}
            fontSize={["18px", "20px"]}
            fontWeight={"bold"}
          />
          <Text
            fontWeight={"semibold"}
            fontSize={["md", "lg"]}
            mr={2}
            textAlign="center"
          >
            JUDUL GROUP PERTANYAAN
          </Text>
        </HStack>
      </Center>

      {/* </Box> */}
      {data.map((d) => (
        <Box
          p={{ base: 3, md: 6 }}
          rounded={["md", "lg"]}
          borderWidth={"4px"}
          borderColor={"blue.500"}
          w="full"
          key={d.id}
        >
          <Stack spacing={2}>
            <Text fontWeight={"bold"} fontSize={["15px", "16px"]}>
              {d.heading}
            </Text>
            {d.type === "radio" && (
              <RadioGroup>
                <Stack>
                  {d.value &&
                    d.value.map((val) => (
                      <Radio key={val.id} value={val.id}>{val.title}</Radio>
                    ))}
                </Stack>
              </RadioGroup>
            )}
            {d.type === "checkbox" &&
              d.value &&
              d.value.map((val) => <Checkbox key={val.id}>{val.title}</Checkbox>)}
            {d.type === "short_text" && <Textarea />}
          </Stack>
        </Box>
      ))}
    </Stack>
    // </div>
  );
}

export default FormKuesioner;
