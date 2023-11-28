"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Flex,
  Box,
  Text,
  SimpleGrid,
  PinInputDescendantsProvider,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import {
  useForm,
  SubmitHandler,
  useController,
  Controller,
} from "react-hook-form";
import { AddIcon, CalendarIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import ModalNotif from "@/app/components/modal/modal-notif";
import { axiosCustom } from "@/app/api/axios";
import initRichTextProps from "@/app/type/inital-rich-text";
import { Editor } from "@tinymce/tinymce-react";
import * as ClassInfo from "@/app/type/class-type.d";
import DatePicker from "react-datepicker";
import "@/app/components/template/date-picker.css";
// import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

interface editProps {
  isOpen: boolean;
  onClose: () => void;
  idSesi: string;
  onSubmit: () => void;
}

const AddTugas: React.FC<editProps> = ({
  isOpen,
  onClose,
  onSubmit,
  idSesi,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<ClassInfo.Tugas>();

  const fields = {
    title: register("title", {
      required: "Judul Tugas harus diisi!",
      maxLength: {
        value: 255,
        message: "Maksimal 255 karakter.",
      },
    }),
    // open_date: register("open_date",
    // {
    // //   required: "Open Date Tidak boleh kosong!",
    // }),
    // due_date: register("close_date", {
    //   required: "Due Date Tidak boleh kosong!",
    // }),
  };

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const {
    field: {
      onChange: onChangeDescription,
      ref: refDescription,
      ...fieldDescription
    },
    // fieldState: { invalid: isDescriptionInvalid, error: descriptionError },
  } = useController({
    control,
    name: "description",
    // rules: { required: "Deskripsi Sesi harus diisi!" },
  });

  const {
    field: {
      onChange: onChangeOpenDate,
      ref: refOpenDate,
      value: valOpenDate,
      ...fieldOpenDate
    },
    // fieldState: { invalid: isOpenDateInvalid, error: openDateError },
  } = useController({
    control,
    name: "open_date",
    rules: { required: "Open Date harus diisi!" },
    // defaultValue: startDate ? `${startDate}` : "",
  });

  const {
    field: {
      onChange: onChangeDueDate,
      ref: refDueDate,
      value: valDueDate,
      ...fieldDueDate
    },
  } = useController({
    control,
    name: "close_date",
    rules: { required: "Due Date harus diisi!" },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [stateNotif, setStateNotif] = useState({
    msg: "",
    isError: false,
    isNotifShow: false,
  });
  const handleShowMessage = (msg: string, err: boolean) => {
    setStateNotif({
      msg: msg,
      isError: err,
      isNotifShow: true,
    });
  };

  const handleFormSubmit: SubmitHandler<any> = async (data) => {
    // console.log(format(data.open_date, "yyyy-MM-dd HH:mm"));
    setIsLoading(true);
    const dataBaru = {
      title: data.title,
      description: data.description,
      open_date: format(data.open_date, "yyyy-MM-dd HH:mm"),
      close_date: format(data.close_date, "yyyy-MM-dd HH:mm"),
    };

    try {
      // Simpan data menggunakan Axios POST atau PUT request, tergantung pada mode tambah/edit
      await axiosCustom
        .post(`/course-item/${idSesi}/add-assigment`, dataBaru)
        .then((response) => {
          // console.log(response);
          if (response.status === 201) {
            handleShowMessage("Data berhasil disimpan.", false);
            setIsLoading(false);
          }
        });
      //   onSubmit(); // Panggil fungsi penyimpanan data (misalnya, untuk memperbarui tampilan tabel)
      onClose(); // Tutup modal
      resetAll();
      // Setelah data disimpan, atur pesan berhasil ke dalam state
    } catch (error: any) {
      // console.error(error);
      if (error?.response) {
        handleShowMessage(
          `Terjadi Kesalahan: ${error.response.data.message}`,
          true,
        );
      } else handleShowMessage(`Terjadi Kesalahan: ${error.message}`, true);
      setIsLoading(false);
    }
  };

  const resetAll = () => {
    reset(); // Reset formulir
    reset({ description: "", open_date: "" });
    clearErrors("description");
    setIsLoading(false);
    setEndDate(null);
    setStartDate(null);
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          resetAll();
          onClose();
        }}
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <ModalHeader>Tambah Tugas</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="data-form">
                <FormControl isInvalid={!!errors.title} mb="3">
                  <Flex flexDirection={["column", "row"]}>
                    <Box minWidth={["100%", "110px"]} marginRight={["0", "2"]}>
                      <FormLabel>
                        Judul Tugas&nbsp;
                        <Text as={"span"} color={"red"}>
                          *
                        </Text>
                      </FormLabel>
                    </Box>
                    <Box w="full">
                      <Input
                        type="text"
                        {...fields.title}
                        // className={`form-control ${errors.name ? "is-invalid"}`}
                      />
                      <FormErrorMessage>
                        {errors.title && errors.title.message}
                      </FormErrorMessage>
                    </Box>
                  </Flex>
                </FormControl>
                <FormControl isInvalid={!!errors.description} mb="3">
                  <FormLabel>Deskripsi Tugas</FormLabel>
                  <Editor
                    {...fieldDescription}
                    apiKey={process.env.API_TINYMCE}
                    initialValue=""
                    init={{
                      ...initRichTextProps,
                      toolbar_mode: "sliding",
                      height: 180,
                    }}
                    onEditorChange={onChangeDescription}
                  />
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  spacing={{ base: "0", md: "4" }}
                  w="auto"
                >
                  <FormControl isInvalid={!!errors.open_date} mb="3">
                    <Flex
                      flexDir={{ base: "column", md: "row" }}
                      align={{ base: "start", md: "center" }}
                    >
                      <Box
                        minWidth={["100%", "110px"]}
                        marginRight={["0", "2"]}
                      >
                        <FormLabel>
                          Open Date&nbsp;
                          <Text as={"span"} color={"red"}>
                            *
                          </Text>
                        </FormLabel>
                      </Box>
                      <Box w="full">
                        {/* <Input
                          placeholder="Select Date and Time"
                          size="md"
                          type="datetime-local"
                          min="2023-11-13"
                          //   {...fieldOpenDate}
                          {...register("open_date")}
                        /> */}
                        <DatePicker
                          {...fieldOpenDate}
                          showIcon
                          icon={
                            <CalendarIcon fontSize="18px" color={"gray.600"} />
                          }
                          selected={
                            valOpenDate
                              ? new Date(Date.parse(valOpenDate))
                              : null
                          }
                          onChange={(date: Date) => {
                            onChangeOpenDate(date);
                            setStartDate(date);
                          }}
                          showTimeSelect
                          // timeFormat="p"
                          dateFormat="d MMMM yyyy, HH:mm"
                          timeFormat="HH:mm"
                          isClearable={false} // Prevent clearing the input
                          customInput={<Input ref={refOpenDate} />}
                          placeholderText={`Masukkan Tanggal Buka`}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                        />
                        {/* <Controller
                          name="open_date"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <DatePicker
                              id="date"
                              {...field}
                              selected={
                                field.value
                                  ? new Date(Date.parse(field.value))
                                  : null
                              }
                              onChange={(date) => field.onChange(date)}
                            />
                          )}
                        /> */}
                        <FormErrorMessage>
                          {errors.open_date && errors.open_date.message}
                        </FormErrorMessage>
                      </Box>
                    </Flex>
                  </FormControl>
                  <FormControl isInvalid={!!errors.close_date} mb="3">
                    <Flex
                      flexDir={{ base: "column", md: "row" }}
                      align={{ base: "start", md: "center" }}
                    >
                      <Box
                        minWidth={["100%", "110px"]}
                        marginRight={["0", "2"]}
                      >
                        <FormLabel>
                          Due Date&nbsp;
                          <Text as={"span"} color={"red"}>
                            *
                          </Text>
                        </FormLabel>
                      </Box>
                      <Box w="full">
                        <DatePicker
                          {...fieldDueDate}
                          showIcon
                          icon={
                            <CalendarIcon fontSize="18px" color={"gray.600"} />
                          }
                          selected={
                            valDueDate ? new Date(Date.parse(valDueDate)) : null
                          }
                          onChange={(date: Date) => {
                            onChangeDueDate(date);
                            setEndDate(date);
                          }}
                          showTimeSelect
                          dateFormat="d MMMM yyyy, HH:mm"
                          // timeFormat="p"
                          // dateFormat="Pp"
                          timeFormat="HH:mm"
                          isClearable={false} // Prevent clearing the input
                          customInput={
                            <Input
                              ref={refDueDate}
                              defaultValue={valDueDate} // Memastikan bahwa nilai value diatur
                              onChange={() => {}}
                            />
                          }
                          placeholderText={`Masukkan Tanggal Berakhir`}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          minDate={startDate}
                        />
                        <FormErrorMessage>
                          {errors.close_date && errors.close_date.message}
                        </FormErrorMessage>
                      </Box>
                    </Flex>
                  </FormControl>
                </SimpleGrid>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                leftIcon={<CheckIcon />}
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={isLoading}
                size="sm"
              >
                {"Tambah"}
              </Button>
              <Button
                leftIcon={<CloseIcon />}
                color={"red.400"}
                bgColor="red.50"
                _hover={{
                  bg: "red.50",
                }}
                onClick={() => {
                  resetAll();
                  onClose();
                }}
                boxShadow="md"
                size="sm"
              >
                Tutup
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <ModalNotif
        isOpen={stateNotif.isNotifShow}
        onClose={() =>
          setStateNotif({
            msg: "",
            isError: false,
            isNotifShow: false,
          })
        }
        message={stateNotif.msg}
        isError={stateNotif.isError}
        onSubmit={() => onSubmit()}
      />
    </div>
  );
};

export default AddTugas;
