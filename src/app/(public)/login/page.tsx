"use client";

import {
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Center,
  Spinner,
  Box,
  Img,
  InputRightElement,
  InputGroup,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useAuth } from "../../components/utils/AuthContext";
import { Suspense, useEffect, useState } from "react";
import { RiLoginBoxLine } from "react-icons/ri";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Loading from "../loading";

interface Formlogin {
  usernameoremail: string;
  password: string;
}

const Login = () => {
  const { user, login, loading, loadingValidation } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user !== null && user !== 401) {
      router.push("/dashboard");
    }
  }, [user]);

  const [showPassword, setShowPassword] = useState(false);

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm<Formlogin>();
  const { errors } = formState;

  const fields = {
    usernameoremail: register("usernameoremail", {
      required: "Email / Username harus diisi",
    }),
    password: register("password", { required: "Password harus diisi" }),
  };

  const handleLogin: SubmitHandler<Formlogin> = (data) => {
    // setIsLoading(true);
    login(data.usernameoremail, data.password);
    // setIsLoading(false);
  };

  return (
    <>
      {loadingValidation ? (
        <Center h="100%" m="10" flexDirection={"column"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            mb="3"
          />
          <Text as="i" whiteSpace={"normal"}>
            Sedang melakukan validasi, mohon tunggu sebentar ...
          </Text>
        </Center>
      ) : (
        <Suspense fallback={<Loading />}>
          <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            // bgColor={"red.400"}
            bgGradient="linear(to-br, red.600, red.500, red.600)"
          >
            <Stack
              spacing={4}
              // w={"full"}
              maxW={"4xl"}
              bg={"white"}
              rounded={"xl"}
              boxShadow={"lg"}
              p={6}
              my={12}
              direction={{ base: "column", md: "row" }}
              // direction={["column","row"]}
              // flexWrap={"wrap"}
              // justifyContent={"space-between"}
            >
              <Flex
                bgColor="rgba(231, 231, 231, 0.3)"
                p={{ base: 4, sm: 6, md: 8 }}
                // spacing={{ base: 8 }}
                rounded={"xl"}
                alignItems={"center"}
                maxW="lg"
                flexDirection={"column"}
              >
                <Stack align={"center"} mb="3">
                  {/* <FaRegCircleUser fontSize="3.5rem" /> */}
                  <Img src="/img/logo-primary.png" h="60px" />
                  <Heading
                    fontSize={"4xl"}
                    whiteSpace={"nowrap"}
                    color={"red.500"}
                  >
                    SELAMAT DATANG
                  </Heading>
                  <Text fontSize={"lg"} color={"gray.600"}>
                    Silahkan login terlebih dahulu
                  </Text>
                </Stack>
                <Box
                  rounded={"lg"}
                  w={{ base: "auto", md: "350px" }}
                  bg={"white"}
                  boxShadow={"lg"}
                  p={8}
                >
                  <form onSubmit={handleSubmit(handleLogin)}>
                    <FormControl
                      id="email"
                      isInvalid={!!errors.usernameoremail}
                      mb="3"
                    >
                      <FormLabel>Username</FormLabel>
                      <Input
                        type="text"
                        {...fields.usernameoremail}
                        autoFocus
                      />
                      <FormErrorMessage>
                        {errors.usernameoremail &&
                          errors.usernameoremail.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      id="password"
                      isInvalid={!!errors.password}
                      mb="3"
                    >
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...fields.password}
                        />
                        <InputRightElement h={"full"}>
                          <Button
                            variant={"ghost"}
                            onClick={() =>
                              setShowPassword((showPassword) => !showPassword)
                            }
                          >
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>
                        {errors.password && errors.password.message}
                      </FormErrorMessage>
                    </FormControl>
                    <Stack spacing={10}>
                      <Button
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        type="submit"
                        isLoading={loading}
                        mt="2"
                      >
                        <RiLoginBoxLine />
                        &nbsp; Login
                      </Button>
                    </Stack>
                  </form>
                </Box>
              </Flex>
              <Flex
                align={"center"}
                justify={"center"}
                p={{ base: 1, sm: 2, md: 3 }}
                flexDirection={"column"}
                maxW="md"
              >
                <Img
                  alt={"Login Image"}
                  // objectFit={"fill"}
                  src="img/asset-login.png"
                  w="full"
                  // h={{ base: "auto", sm: "220px", md: "280px", lg: "auto" }}
                  mb={2}
                />
                <Img
                  // objectFit={"cover"}
                  src="img/logo_stp_dan_inkubator.png"
                  w="full"
                  h={"auto"}
                />
              </Flex>
            </Stack>
          </Flex>
        </Suspense>
      )}
    </>
  );
};

export default Login;
