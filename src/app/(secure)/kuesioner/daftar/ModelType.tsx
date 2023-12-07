"use client";
import React from "react";

function ModelType(type: string) {
  let title = "";
  switch (type) {
    case "checkbox":
      title = "Checkbox";
      break;
    case "radio":
      title = "Opsi Pilihan";
      break;
    case "short_text":
      title = "Teks Pendek";
      break;
    case "long_text":
      title = "Teks Panjang";
      break;
  }
  return title;
}

export default ModelType;
