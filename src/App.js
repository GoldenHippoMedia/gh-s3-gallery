import React, { useState } from "react";
import styled, { ThemeProvider, css } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyles } from "./globalStyle";
import "./App.css";

import Page from "./components/page/page";

const Header = styled.header`
  text-align: right;
  padding: 10px 50px 0px;
`;
const Button = styled.button`
  padding: 10px 20px;
  background: #363537;
  color: #e2e2e2;
  ${props =>
    props.theme === "dark" &&
    css`
      background: #e2e2e2;
      color: #363537;
    `}
`;

const ToggleButton = ({ toggleTheme, theme }) => {
  return (
    <Header>
      <Button onClick={toggleTheme} theme={theme}>
        {theme === "light" ? "dark" : "light"} mode
      </Button>
    </Header>
  );
};

function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <ToggleButton toggleTheme={toggleTheme} theme={theme} />
      <main className="App">
        <GlobalStyles />
        <Page />
      </main>
    </ThemeProvider>
  );
}

export default App;
