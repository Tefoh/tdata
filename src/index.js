import TFetchHOC from "./components/TFetchHOC";
import TFormHOC from "./components/TFormHOC";

export const TFetch = TFetchHOC;
export const TForm = TFormHOC;

export default {
  install: (app, options) => {
    app.component("TFetch", TFetchHOC(options));
    app.component("TForm", TFormHOC(options));
  },
};
