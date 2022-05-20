import axios from "axios";
import { getCookie } from "cookies-next";

const BASE_URL = "https://datingapp-back.herokuapp.com/notification";

export const getNotifications = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      headers: { token },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const sendFavoriteNotification = async (receiverId: string) => {
  try {
    const token = `bearer ${getCookie("wemewe-token")}` ?? "";
    const response = await axios.post(
      `${BASE_URL}`,
      { receiverId },
      {
        headers: { token },
      }
    );
  } catch (err) {
    console.log(err);
  }
};
