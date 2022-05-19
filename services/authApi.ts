import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NextRouter } from "next/router";
import { setLocalStorage } from "../utils/handleLocalStorage";
const BASE_URL = "https://datingapp-back.herokuapp.com/auth";

let axiosConfig = {
  withCredentials: true,
};

export const excuteLogin = createAsyncThunk(
  "login",
  async (userInfo: { email: string; password: string }) => {
    const response = await axios.post(
      `${BASE_URL}/login`,
      userInfo,
      axiosConfig
    );
    if (response.data) {
      setLocalStorage("wemewe-userId", response.data.userInfo._id);
      setLocalStorage("wemewe-token", `bearer ${response.data.accessToken}`);
    }
    return response.data.userInfo;
  }
);

export const registUser = async (
  registInfo: RegistInfo,
  router: NextRouter
) => {
  try {
    const { passwordConfirm, ...info } = registInfo;
    const response = await axios.post(`${BASE_URL}/regist`, info);
    router.push("/login");
  } catch (err) {
    console.log(err);
  }
};
