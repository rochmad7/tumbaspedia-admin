import axios from "axios";

export const getProduct = async (id) => {
  await axios.get(`${process.env.REACT_APP_TUMBASPEDIA_API_URL}/products/${id}`);
};

export const getProducts = async (sort, search, page) => {
  await axios.get(`${process.env.REACT_APP_TUMBASPEDIA_API_URL}/products`, {
    params: {
      sort,
      search,
      page
    }
  });
};