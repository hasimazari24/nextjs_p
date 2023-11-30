"use client";
import { axiosCustom } from "@/app/api/axios";
import ModalNotif from "@/app/components/modal/modal-notif";
import { BsFiletypeXlsx } from "react-icons/bs";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";

function DownloadExcel({
  Url,
  onSubmit,
  popOver,
}: {
  Url: string;
  onSubmit?: () => void;
  popOver?: string[];
}) {
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
  const [isLoadingDownload, setLoadingDownload] = useState(false);

  const sendDownloadExcel = async (newUrl: string) => {
    setLoadingDownload(true);
    try {
      const response = await axiosCustom.get(newUrl, {
        responseType: "blob", // Penting: responseType 'blob' untuk file
      });

      // Mendapatkan header 'Content-Disposition' dari respons
      const contentDisposition = response.headers["content-disposition"];

      // Mendapatkan nama file dari header 'Content-Disposition'
      const fileName = contentDisposition
        ? contentDisposition.split("filename=")[1]
        : "file";

      // Membuat URL untuk file blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Membuat elemen <a> untuk menginisiasi unduhan
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);

      // Klik pada link untuk memulai unduhan
      link.click();

      // Menghapus elemen <a> setelah selesai
      document.body.removeChild(link);
      setLoadingDownload(false);
    } catch (error: any) {
      handleShowMessage(`Gagal Download Excel : ${error}`, true);
      setLoadingDownload(false);
    }
  };
  return (
    <div>
      {popOver && popOver.length > 0 ? (
        <Popover placement="bottom" isLazy>
          <PopoverTrigger>
            <Button
              leftIcon={
                <PiMicrosoftExcelLogoFill
                  fontSize={"18px"}
                  style={{ color: "green.400" }}
                />
              }
              colorScheme="gray"
              variant="outline"
              aria-label="btn-remain"
              size={"md"}
              isLoading={isLoadingDownload}
            >
              Download Excel
            </Button>
          </PopoverTrigger>
          <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
            <PopoverArrow />
            <PopoverBody>
              <Stack>
                {popOver.map((data, index) => (
                  <Button
                    leftIcon={
                      <BsFiletypeXlsx
                        fontSize={"18px"}
                        style={{ color: "green.400" }}
                      />
                    }
                    justifyContent="start"
                    colorScheme="gray"
                    fontWeight={"thin"}
                    variant="outline"
                    aria-label="btn-remain"
                    size={"md"}
                    key={index}
                    onClick={() => sendDownloadExcel(data)}
                  >
                    {data}
                  </Button>
                ))}
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : (
        <Button
          leftIcon={
            <PiMicrosoftExcelLogoFill
              fontSize={"18px"}
              style={{ color: "green.400" }}
            />
          }
          colorScheme="gray"
          variant="outline"
          aria-label="btn-remain"
          size={"md"}
          isLoading={isLoadingDownload}
          onClick={() => sendDownloadExcel(Url)}
        >
          Download Excel
        </Button>
      )}

      {/* </Link> */}
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
        // onSubmit={() => onSubmit()}
      />
    </div>
  );
}

export default DownloadExcel;