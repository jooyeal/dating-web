import axios, { AxiosResponse } from "axios";
import { getCookie } from "cookies-next";

const BASE_URL = "https://datingapp-back.herokuapp.com/chat";

export const getChat = async (
  token: string,
  conversationid: string | string[]
) => {
  try {
    const response = await axios.get(`${BASE_URL}/${conversationid}`, {
      headers: { token },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};
export const sendChat = async (data: {
  conversationid: string;
  senderId: string;
  receiverId: string;
  content: string;
}) => {
  try {
    const token = `bearer ${getCookie("wemewe-token")}` ?? "";
    const response = await axios.post(`${BASE_URL}`, data, {
      headers: { token },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
