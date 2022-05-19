import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NextRouter } from "next/router";
import { getLocalStorage } from "../utils/handleLocalStorage";

const BASE_URL = "https://datingapp-back.herokuapp.com/user";

export const getUsers = createAsyncThunk("users", async () => {
  const TOKEN = getLocalStorage("wemewe-token");
  const response = await axios.get(`${BASE_URL}`, {
    headers: { token: TOKEN },
  });
  return response.data;
});

export const getMyPage = createAsyncThunk("mypage", async () => {
  const TOKEN = getLocalStorage("wemewe-token");
  const response = await axios.get(`${BASE_URL}/mypage`, {
    headers: { token: TOKEN },
  });
  return response.data;
});

export const uploadImage = async (formData: any, router: NextRouter) => {
  try {
    const TOKEN = getLocalStorage("wemewe-token");
    const response = await axios.put(`${BASE_URL}/upload`, formData, {
      headers: { token: TOKEN },
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
    const TOKEN = getLocalStorage("wemewe-token");
    const response = await axios.put(`${BASE_URL}/introduct`, data, {
      headers: { token: TOKEN },
    });
    router.reload();
  } catch (err) {}
};

export const addFavorite = async (userId: string) => {
  try {
    const TOKEN = getLocalStorage("wemewe-token");
    const response = await axios.put(
      `${BASE_URL}/favorite/add/${userId}`,
      null,
      {
        headers: { token: TOKEN },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const deleteFavorite = async (userId: string) => {
  try {
    const TOKEN = getLocalStorage("wemewe-token");
    const response = await axios.put(
      `${BASE_URL}/favorite/delete/${userId}`,
      null,
      {
        headers: { token: TOKEN },
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
    console.log(err);
  }
};
