"use client";

import {
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
  Stack,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../components/AuthContext";

interface Formlogin {
  usernameoremail: string;
  password: string;
}

export default function Login() {
  const { login, loading } = useAuth();

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
      <form onSubmit={handleSubmit(handleLogin)}>
        <FormControl id="email" isInvalid={!!errors.usernameoremail} mb="3">
          <FormLabel>Email / Username</FormLabel>
          <Input type="text" {...fields.usernameoremail} />
          <FormErrorMessage>
            {errors.usernameoremail && errors.usernameoremail.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="password" isInvalid={!!errors.password} mb="3">
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              {...fields.password}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
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
            Login
          </Button>
        </Stack>
      </form>
    </>
  );
}
