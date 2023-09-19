"use client";
import "regenerator-runtime/runtime";
import { InputProps, Input } from "@chakra-ui/input";
import { useAsyncDebounce } from "react-table";
import { InputLeftElement, InputGroup, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

type TextFieldProps = InputProps & {
  onChangeDebounce?: (value: string) => void;
};

const TextField = (props: TextFieldProps) => {
  const debounced = useAsyncDebounce(
    (value) => props.onChangeDebounce && props.onChangeDebounce(value),
    500
  );

  const newProps = { ...props };
  delete newProps.onChangeDebounce;

  return (
    <div>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Button leftIcon={<SearchIcon/>}></Button>
        </InputLeftElement>
        <Input pl="3rem" onChange={(e) => debounced(e.target.value)} {...props} />
      </InputGroup>
    </div>
  );
  {/* <Input onChange={(e) => debounced(e.target.value)} {...props} />; */}
};

export default TextField;
