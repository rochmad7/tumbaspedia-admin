import axios from "axios";

export const getCountTransactions = async (date) => {
  return await axios.get(`${process.env.REACT_APP_TUMBASPEDIA_API_URL}/admins/count-transactions?date=${date}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
};

export const getTotalTransactions = async (date) => {
  return await axios.get(`${process.env.REACT_APP_TUMBASPEDIA_API_URL}/admins/total-transactions?date=${date}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
};

export const getCountUsers = async () => {
  return await axios.get(`${process.env.REACT_APP_TUMBASPEDIA_API_URL}/admins/count-users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
};