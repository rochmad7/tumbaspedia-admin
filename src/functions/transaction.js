import axios from "axios";

export const getAllTransactions = async (search, status) => {
  return await axios.get(`${process.env.REACT_APP_TUMBASPEDIA_API_URL}/transactions?search=${search}&status=${status}`,  {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
};