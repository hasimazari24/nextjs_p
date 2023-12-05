"use client";
import React from "react";
import ListKelas from "../[id_tenant]/page";
// import crypto from "crypto";

function PenilaianTugasByTenant() {
  const crypto = require("crypto");
  const randomID = crypto.randomUUID();
  return (
    <div>
      <ListKelas params={{ id_tenant: randomID }} />
    </div>
  );
}

export default PenilaianTugasByTenant