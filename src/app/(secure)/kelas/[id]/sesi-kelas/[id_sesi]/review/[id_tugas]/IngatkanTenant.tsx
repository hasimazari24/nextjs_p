"use client";
import { axiosCustom } from "@/app/api/axios";
import ModalNotif from "@/app/components/modal/modal-notif";
import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdAlarm } from "react-icons/md";

function IngatkanTenant({
  Url,
}: {
  Url: string;
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
  const [isLoadingIngatkan, setLoadingIngatkan] = useState(false);

  const sendIngatkanTenant = async () => {
    try {
      setLoadingIngatkan(true);
      // Panggil API menggunakan Axios dengan async/await
      const response = await axiosCustom.get(Url);
      const timer = setTimeout(() => {
        handleShowMessage(response.data?.message, false);
        setLoadingIngatkan(false);
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error: any) {
      console.error("Gagal mengingatkan Tenant :", error);
      setLoadingIngatkan(false);
    }
  };
  return (
    <div>
      <Button
        leftIcon={<MdAlarm />}
        colorScheme="gray"
        variant="outline"
        aria-label="btn-remain"
        fontWeight={"Thin"}
        size={"md"}
        isLoading={isLoadingIngatkan}
        onClick={() => sendIngatkanTenant()}
      >
        Ingatkan Tenant
      </Button>

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

export default IngatkanTenant;
