import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://app.roothq.africa/api", 
  withCredentials: true,
});

export default newRequest;
