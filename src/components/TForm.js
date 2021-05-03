import { h } from "@vue/runtime-core";
import axios from "axios";

export default {
  name: "TForm",
  props: {
    url: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      default: "post",
    },
    form: {
      type: Object,
      default: () => ({}),
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    baseURL: {
      type: String,
      required: false,
    },
    axios: {
      type: [Function, Object],
      required: false,
    },
  },

  data: () => ({
    json: [],
    loading: false,
    response: {},
    error: null,
    errorMessage: "",
  }),

  render() {
    const handleSubmit = async () => {
      this.loading = true;
      let axiosInstance = null;
      if (this.axios) {
        axiosInstance = this.axios;
      } else {
        axiosInstance = axios.create({ baseURL: this.baseURL });
      }

      axiosInstance[this.method](this.url, this.form, this.options)
        .then((res) => {
          this.response = res;
          this.json = res.data;
        })
        .catch((error) => {
          this.error = error;
          this.response = error.response;
          this.errorMessage = error.message;
        })
        .finally(() => {
          this.loading = false;
        });
    };
    return h(
      "form",
      {
        onSubmit: (event) => {
          event.preventDefault();
          handleSubmit();
        },
      },
      this.$slots.default({
        json: this.json,
        loading: this.loading,
        response: this.response,
        error: this.error,
        errorMessage: this.errorMessage,
      })
    );
  },
};
