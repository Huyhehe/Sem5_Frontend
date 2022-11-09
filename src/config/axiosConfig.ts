import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
    common: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  },
})

export default axiosInstance
