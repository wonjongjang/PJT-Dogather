/*
index.html의 body에서 id="root"를 가진 div와 연결
*/

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { LightTheme } from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={LightTheme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
