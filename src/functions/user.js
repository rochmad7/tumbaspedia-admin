import axios from "axios";

export const getUsers = async (sort, search, page) => {
  await axios.get(`${process.env.REACT_APP_TUMBASPEDIA_API_URL}/users`, {
    params: {
      sort,
      search,
      page
    }
  });
};