import { h } from "vue";
import TFetch from "./TFetch";

const AxiosHOC = (component = TFetch, options) => ({
  render() {
    return h(
      component,
      { ...options },
      {
        default: (props) => this.$slots.default(props),
      }
    );
  },
});

export default AxiosHOC;
