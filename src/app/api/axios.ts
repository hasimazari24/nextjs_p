import axios from "axios";

export default axios.create({
  baseURL: process.env.API_URL,
});

export const axiosCustom = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": process.env.APP_URL,
  },
});
