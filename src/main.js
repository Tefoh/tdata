import { createApp } from "vue";
import App from "./App.vue";
import TData from "./index";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    Authorization: "Bearer token:)",
  },
});

const app = createApp(App);

app.use(TData, {
  axios: axiosInstance,
});

app.mount("#app");
