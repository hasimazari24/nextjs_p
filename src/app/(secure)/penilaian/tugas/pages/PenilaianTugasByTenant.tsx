"use client";
import React from "react";
import ListKelas from "../[id_tenant]/page";
import { v4 as uuidv4 } from "uuid";

function PenilaianTugasByTenant() {
  const randomID = uuidv4();
  return (
    <div>
      <ListKelas params={{ id_tenant: randomID }} />
    </div>
  );
}

export default PenilaianTugasByTenant