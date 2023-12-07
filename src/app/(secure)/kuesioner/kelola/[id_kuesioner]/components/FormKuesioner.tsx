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
  Input,
  Image
} from "@chakra-ui/react";
import React from "react";
import { HiFolderOpen } from "react-icons/hi";

interface PertanyaanProps {
  id: string;
  pertanyaan: string;
  type: string;
  is_required: boolean;
  note: string;
  is_active: boolean;
  opsi: OpsiProps;
}

interface OpsiProps {
  id: string;
  value: string;
}

function FormKuesioner({
  data,
  title,
}: {
  data: PertanyaanProps[] | [];
  title: string;
}) {
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
            {title}
          </Text>
        </HStack>
      </Center>

      {/* </Box> */}
      {Array.isArray(data) && data.length > 0 ? (
        data.map((d) => (
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
                {d.pertanyaan}
              </Text>
              {d.type === "radio" && (
                <RadioGroup>
                  <Stack>
                    {d.opsi &&
                      Array.isArray(d.opsi) &&
                      d.opsi.map((val) => (
                        <Radio key={val.id} value={val.id}>
                          {val.value}
                        </Radio>
                      ))}
                  </Stack>
                </RadioGroup>
              )}
              {d.type === "checkbox" &&
                d.opsi &&
                Array.isArray(d.opsi) &&
                d.opsi.map((val) => (
                  <Checkbox key={val.id}>{val.value}</Checkbox>
                ))}
              {d.type === "short_text" && <Input type="text" w="full" />}
              {d.type === "long_text" && <Textarea w="full" />}
            </Stack>
          </Box>
        ))
      ) : (
        <Stack justifyContent={"center"} spacing={0} alignItems={"center"}>
          <Image
            src="/img/kuesioner-notfound.png"
            h={{ base: "200px", sm: "250px", md: "350px" }}
            w="auto"
            // w="auto"
            // objectFit={"cover"}
          />
          <Text
            as="b"
            fontWeight={"bold"}
            fontSize={{ base: "16px", md: "17px" }}
            textAlign={"center"}
          >
            Daftar Pertanyaan dalam Grup Kuesioner Kosong
          </Text>
          <Text
            fontSize={{ base: "15.5px", md: "16.5px" }}
            textAlign={"center"}
          >
            Silahkan buat terlebih dahulu.
          </Text>
        </Stack>
      )}
    </Stack>
    // </div>
  );
}

export default FormKuesioner;
