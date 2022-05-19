import axios from "axios";
import { getLocalStorage } from "../utils/handleLocalStorage";

const BASE_URL = "http://localhost:5000/chat";

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
    console.log(err);
  }
};
export const sendChat = async (data: {
  conversationid: string;
  senderId: string;
  receiverId: string;
  content: string;
}) => {
  try {
    const TOKEN = getLocalStorage("wemewe-token");

    const response = await axios.post(`${BASE_URL}`, data, {
      headers: { token: TOKEN },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
