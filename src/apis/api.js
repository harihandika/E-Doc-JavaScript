import axios from "axios";
import { config } from "@/configs";
import { getAccessToken } from "@/utils";

export const axiosInstance = (queryParams) =>
  axios.create({
    baseURL: `${config.apiUrl}/api`,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": config.xAccessToken,
      Authorization: `Bearer ${getAccessToken()}`,
    },
    params: queryParams,
  });
