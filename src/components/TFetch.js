import axios from "axios";

export default {
  name: "TFetch",
  props: {
    url: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      default: "get",
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

  async created() {
    this.loading = true;
    let axiosInstance = null;
    if (this.axios) {
      axiosInstance = this.axios;
    } else {
      axiosInstance = axios.create({ baseURL: this.baseURL });
    }

    axiosInstance[this.method](this.url, this.options)
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
  },

  render() {
    return (
      this.$slots.default &&
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
