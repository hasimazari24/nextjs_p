"use client";
import React from "react";
import ListKelas from "../[id_tenant]/page";

function PenilaianTugasByTenant() {
  return (
    <div>
      <ListKelas params={{ id_tenant : crypto.randomUUID() }} />
    </div>
  )
}

export default PenilaianTugasByTenant