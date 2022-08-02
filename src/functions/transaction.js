import axios from "axios";

export const getAllTransactions = async () => {
  return await axios.get(`${process.env.REACT_APP_TUMBASPEDIA_API_URL}/transactions`,  {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
};