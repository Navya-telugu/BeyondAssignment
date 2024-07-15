// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = 'https://devapi.beyondchats.com/api';

export const getChats = async (page = 1) => {
  const response = await axios.get(`${API_BASE_URL}/get_all_chats?page=${page}`);
  return response.data;
};

export const getChatMessages = async (chatId) => {
  const response = await axios.get(`${API_BASE_URL}/get_chat_messages?chat_id=${chatId}`);
  return response.data;
};
