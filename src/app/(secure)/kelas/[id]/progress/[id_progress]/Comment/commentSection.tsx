"use client";
import { axiosCustom } from "@/app/api/axios";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Stack,
  HStack,
  Avatar,
  VStack,
  Button,
  Input,
  Box,
  Text,
  FormControl,
  FormErrorMessage,
  Skeleton,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { BsSendPlusFill } from "react-icons/bs";
import { useForm, SubmitHandler } from "react-hook-form";
import DeleteComment from "./commentDelete";

type Comment = {
  id: string;
  comment: string;
  comment_date: string;
  comment_time: string;
  delete_access: boolean;
  user: {
    id: string;
    fullname: string;
    role: string;
    tenant_name: string | null;
    image_id: string | null;
    image_url: string | null;
  };
};

function CommentSection({ idSesi }: { idSesi: string }) {
  const [dataComment, setDataComment] = useState<Comment[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingComment, setIsLoadingComment] = useState(false);

  useEffect(() => {
    // if (need_updated === true)
    getComment();
  }, []);
  const getComment = async () => {
    try {
      setIsLoading(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(`/course-item/${idSesi}/comment`);
      const timer = setTimeout(() => {
        // setIdTenant(id);
        setDataComment(response.data.data); // Set isLoading to false to stop the spinner
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal memuat data:", error);
      setIsLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ comment: string }>();

  const fields = {
    comment: register("comment", {
      required: "Isi komentar terlebih dahulu!",
      maxLength: {
        value: 255,
        message: "Maksimal 255 karakter.",
      },
    }),
  };

  const handleFormSubmit: SubmitHandler<any> = async (data) => {
    // console.log(data);
    setIsLoadingComment(true);

    try {
      // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
      await axiosCustom
        .post(`/course-item/${idSesi}/add-comment`, data)
        .then((response) => {
        //   console.log(response);
          if (response.status === 201) {
            setIsLoadingComment(false);
          }
        });
      reset();
      getComment();
      // Setelah data disimpan, atur pesan berhasil ke dalam state
    } catch (error: any) {
      // console.error(error);
      setIsLoadingComment(false);
    }
  };
  console.log(dataComment);
  return (
    <div>
      <Skeleton
        isLoaded={!isLoading}
        // display={!isLoading && dataComment.length < 1 ? "none" : "flex"}
      >
        <Stack spacing={3} align="flex-start" w="full">
          <Text fontWeight={"bold"} fontSize={["md", "lg"]}>
            Komentar
          </Text>

          <form onSubmit={handleSubmit(handleFormSubmit)} style={{ width : "100%" }}>
            <FormControl isInvalid={!!errors.comment}>
              <Stack
                // justifyContent={"justify-content"}
                direction={"row"}
                alignItems="center"
              >
                <Input
                  w="full"
                  focusBorderColor="teal.500"
                  placeholder="Tulis komentar disini ..."
                  size={["md", "lg"]}
                  {...fields.comment}
                />
                <Button
                  leftIcon={<BsSendPlusFill />}
                  title="Kirim Komentar"
                  bgColor="teal.500"
                  _hover={{
                    bg: "teal.400",
                  }}
                  color="white"
                  type="submit"
                  key="Kirim"
                  size={["sm", "md"]}
                  isLoading={isLoadingComment}
                >
                  Kirim
                </Button>
              </Stack>
              <FormErrorMessage>
                {errors.comment && errors.comment.message}
              </FormErrorMessage>
            </FormControl>
          </form>

          {dataComment.length > 0 &&
            dataComment.map((data:any) => (
              <Box
                rounded={["md", "lg"]}
                boxShadow={["md", "lg"]}
                p={[2, 4]}
                w="full"
                backgroundColor={"gray.50"}
                mb={2}
                key={data.id}
              >
                <Stack justifyContent={"justify-content"} direction={"row"}>
                  <Stack w="full" spacing={1}>
                    <Text fontSize={["md", "lg"]} mb={1}>
                      {data.comment}
                    </Text>
                    <HStack>
                      <Avatar
                        size={"sm"}
                        src={data.user.image_url || "/img/avatar-default.jpg"}
                        backgroundColor={"white"}
                      />
                      <VStack
                        alignItems="flex-start"
                        spacing={"0px"}
                      >
                        <Text
                          as="b"
                          fontSize="sm"
                          textOverflow="ellipsis"
                          // maxW={{
                          //   base: "auto",
                          //   sm: "340px",
                          //   md: "408px",
                          //   lg: "544px",
                          // }}
                          // w="auto"
                          // whiteSpace="nowrap"
                          flex="1"
                          // cursor={"default"}
                          overflow="hidden"
                          title={"Mr. dsfjskndf"}
                          noOfLines={1}
                        >
                          {data.user.fullname}
                        </Text>
                        <Text fontSize="13px" color="gray.500">
                          {data.user.role}{" "}
                          {data.user.tenant_name &&
                            `- ${data.user.tenant_name}`}
                        </Text>
                      </VStack>
                    </HStack>
                    <Text fontSize="xs" fontWeight={"thin"}>
                      Dikirim {data.comment_date} {data.comment_time}
                    </Text>
                  </Stack>
                  {data.delete_access && (
                    <DeleteComment dataDelete={data} onSubmit={()=>getComment()}/>
                  )}
                </Stack>
              </Box>
            ))}
        </Stack>
      </Skeleton>
    </div>
  );
}

export default CommentSection;
