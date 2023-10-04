"use client";

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Center,
  Spinner,
  Box,
  useColorModeValue,
  Container,
  SimpleGrid,
  VStack,
  Img,
  InputRightElement,
  InputGroup,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useAuth } from "../../components/utils/AuthContext";
import { useState } from "react";
import { RiLoginBoxLine } from "react-icons/ri";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

interface Formlogin {
  usernameoremail: string;
  password: string;
}

export default function Login() {
  const { user, login, loading, loadingValidation } = useAuth();
  const router = useRouter();

  // const [loadingValidation, setLoadingValidation] = useState<boolean>(false);

  if (user !== null && user !== 401) {
    router.push("/dashboard");
  }

  const [showPassword, setShowPassword] = useState(false);

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, reset } = useForm<Formlogin>();
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
        <Center h="100%" m="10">
          <Spinner className="spinner" size="xl" color="blue.500" />
        </Center>
      ) : (
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bgColor={"red.400"}
        >
          <Stack
            spacing={4}
            // w={"full"}
            maxW={"4xl"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
            direction={["column", "row"]}
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
                <Img src="/img/siteman-primary.png" h="60px" />
                <Heading
                  fontSize={"4xl"}
                  whiteSpace={"nowrap"}
                  color={"red.400"}
                >
                  SELAMAT DATANG
                </Heading>
                <Text fontSize={"lg"} color={"gray.600"}>
                  Silahkan login terlebih dahulu
                </Text>
              </Stack>
              <Box
                rounded={"lg"}
                w={{ base: "auto", md: "300px", lg: "350px" }}
                bg={useColorModeValue("white", "gray.700")}
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
                    <Input type="text" {...fields.usernameoremail} />
                    <FormErrorMessage>
                      {errors.usernameoremail && errors.usernameoremail.message}
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
            >
              <Img
                alt={"Login Image"}
                objectFit={"cover"}
                src="img/asset-login.png"
                w="full"
                h={{ base: "auto", sm: "220px", md: "280px", lg: "auto" }}
              />
            </Flex>
          </Stack>
        </Flex>
      )}
    </>
  );
}
