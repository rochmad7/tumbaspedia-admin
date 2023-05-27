import axios from "axios";

export const getProduct = async (id) => {
  return await axios.get(`${process.env.REACT_APP_TUMBASPEDIA_API_URL}/products/${id}`);
};

export const getProducts = async (sort, search, limit) => {
  return await axios.get(`${process.env.REACT_APP_TUMBASPEDIA_API_URL}/products`, {
    params: {
      sortBy: sort,
      search,
      limit
    }
  });
};

export const updateProduct = async (id, data) => {
  console.log(id, data);
  return await axios.patch(`${process.env.REACT_APP_TUMBASPEDIA_API_URL}/products/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
};

export const setPromoteProduct = async (id, data) => {
  console.log(id, data);
  return await axios.patch(`${process.env.REACT_APP_TUMBASPEDIA_API_URL}/products/${id}/promote`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    }
  });
};
