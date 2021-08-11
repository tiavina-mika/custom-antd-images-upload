import React from "react";
import { ThemeProvider } from "@emotion/react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

import Upload from "./components/Upload";
import theme from "./styles/theme";
import { globalStyles } from "./styles/styles";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      {globalStyles}
      <Upload />
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("container"));
