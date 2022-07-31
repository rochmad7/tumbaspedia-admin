import axios from "axios";

export const getShops = async () => {
  return await axios.get(`${process.env.REACT_APP_TUMBASPEDIA_API_URL}/shops`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
};

export const getShopById = async (id) => {
  return await axios.get(`${process.env.REACT_APP_TUMBASPEDIA_API_URL}/shops/${id}`);
};

export const verifyShop = async (id) => {

  return await axios.patch(`${process.env.REACT_APP_TUMBASPEDIA_API_URL}/shops/verify/${id}`, {
    is_verified: true
  }, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
};