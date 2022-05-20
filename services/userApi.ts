import axios, { AxiosError, AxiosResponse } from "axios";
import { getCookie } from "cookies-next";
import { ServerResponse } from "http";
import { NextRouter } from "next/router";

const BASE_URL = "https://datingapp-back.herokuapp.com/user";

export const getUsers = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      headers: { token },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getMyPage = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/mypage`, {
      headers: { token },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const uploadImage = async (formData: any, router: NextRouter) => {
  try {
    const token = `bearer ${getCookie("wemewe-token")}` ?? "";
    const response = await axios.put(`${BASE_URL}/upload`, formData, {
      headers: { token },
    });
    router.reload();
  } catch (err) {
    console.log(err);
  }
};

export const modifyIntroduction = async (
  data: { introduction: string },
  router: NextRouter
) => {
  try {
    const token = `bearer ${getCookie("wemewe-token")}` ?? "";
    const response = await axios.put(`${BASE_URL}/introduct`, data, {
      headers: { token },
    });
    router.reload();
  } catch (err) {}
};

export const addFavorite = async (userId: string) => {
  try {
    const token = `bearer ${getCookie("wemewe-token")}` ?? "";
    const response = await axios.put(
      `${BASE_URL}/favorite/add/${userId}`,
      null,
      {
        headers: { token },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const deleteFavorite = async (userId: string) => {
  try {
    const token = `bearer ${getCookie("wemewe-token")}` ?? "";
    const response = await axios.put(
      `${BASE_URL}/favorite/delete/${userId}`,
      null,
      {
        headers: { token },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const getChatList = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/chatlist`, {
      headers: { token },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};
