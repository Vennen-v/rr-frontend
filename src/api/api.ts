import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true,
});

async function currentUserInfo() {
  try {
    const { data } = await api.get(`/user`);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export default api;
