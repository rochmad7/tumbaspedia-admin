import axios from "axios";

export const login = async (email, password) => {
  const response = await axios.post(`${process.env.REACT_APP_TUMBASPEDIA_API_URL}/auth/admin/login`, {
    email,
    password
  });


  return response.data;
}