import { h } from "vue";
import TForm from "./TForm";

const TFormHOC = (options) => ({
  render() {
    return h(
      TForm,
      { ...options },
      {
        default: (props) => this.$slots.default(props),
      }
    );
  },
});

export default TFormHOC;
