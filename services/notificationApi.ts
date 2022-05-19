import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getLocalStorage } from "../utils/handleLocalStorage";

const BASE_URL = "https://datingapp-back.herokuapp.com/notification";

export const getNotifications = createAsyncThunk("notifications", async () => {
  try {
    const TOKEN = getLocalStorage("wemewe-token");

    const response = await axios.get(`${BASE_URL}`, {
      headers: { token: TOKEN },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const sendFavoriteNotification = async (receiverId: string) => {
  try {
    const TOKEN = getLocalStorage("wemewe-token");
    const response = await axios.post(
      `${BASE_URL}`,
      { receiverId },
      {
        headers: { token: TOKEN },
      }
    );
  } catch (err) {
    console.log(err);
  }
};
