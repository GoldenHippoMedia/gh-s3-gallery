import React, { useState } from "react";
import styled, { ThemeProvider, css } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyles } from "./globalStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb as faLightbulbReg } from "@fortawesome/free-regular-svg-icons";
import "./App.css";

import Page from "./components/page/page";

const Header = styled.header`
  text-align: right;
  padding: 0px;
`;
const Button = styled.button`
  padding: 10px 70px;
  /* background: #363537; */
  border: none;
  background: none;
  color: #363537;
  &:focus {
    outline: none;
  }
  ${props =>
    props.theme === "dark" &&
    css`
      /* background: #e2e2e2; */
      color: #e3b001;
    `}
`;

const ToggleButton = ({ toggleTheme, theme }) => {
  const icon = theme === "light" ? faLightbulbReg : faLightbulb;
  return (
    <Header>
      <Button onClick={toggleTheme} theme={theme}>
        <FontAwesomeIcon icon={icon} size="3x" />
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
