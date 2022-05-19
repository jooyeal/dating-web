import axios from "axios";
import { getLocalStorage } from "../utils/handleLocalStorage";

const BASE_URL = "http://localhost:5000/notification";

export const getNotifications = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      headers: { token },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

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
