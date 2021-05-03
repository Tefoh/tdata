import { h } from "vue";
import TFetch from "./TFetch";

const TFetchHOC = (options) => ({
  render() {
    return h(
      TFetch,
      { ...options },
      {
        default: (props) => this.$slots.default(props),
      }
    );
  },
});

export default TFetchHOC;
