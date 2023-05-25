import axios from "axios";

export const getTransactionsReport = async (date) => {
  return await axios.get(`${process.env.REACT_APP_TUMBASPEDIA_API_URL}/admins/transactions-report?date=${date}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
};

export const getUsersReport = async (date) => {
  return await axios.get(`${process.env.REACT_APP_TUMBASPEDIA_API_URL}/admins/users-report?date=${date}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
};
