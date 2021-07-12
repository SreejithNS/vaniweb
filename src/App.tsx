import React from "react";
import "./index.css";
import { CssBaseline, ThemeProvider, createMuiTheme } from "@material-ui/core";
import Routes from "./routes";

import SunPic from "./components/UI/images/sun.svg";
import Sun from "./components/UI/Sun";
import CloudPic from "./components/UI/images/clouds.svg";
import Cloud from "./components/UI/Cloud";

const theme = createMuiTheme({
  overrides: {
    MuiTextField:{
      root:{

      }
    },
    MuiButton: {
      root: {
        position: "relative",
        padding: "10px 40px",
        cssFloat: "left",
        borderRadius: "10px",
        fontSize: "25px",
        color: "#FFF",
        textDecoration: "none",
        transition: "all 0.1s",
        "&:active": {
          transform: "translate(0px,5px)",
          borderBottom: "1px solid #2980B9",
        },
      },
      containedPrimary: {
        backgroundColor: "#3498DB",
        borderBottom: "5px solid #2980B9",
        textShadow: "0px -2px #2980B9",
        "&:hover": {
          backgroundColor: "#3498DB",
        },
      },
      containedSizeSmall:{
        fontSize:"18px"
      }
    },
    MuiIconButton: {
      root: {
        backgroundColor: "#82BF56!important",
        borderRadius: "40%",
        borderBottom: "5px solid #669644",
        textShadow: "0px -2px #669644",
        transition: "all 0.1s",
        "&:active": {
          transform: "translate(0px,5px)",
          borderBottom: "1px solid #669644",
        },
      },
      label: {
        color: "#fff",
      },
      disabled: {
        transform: "translate(0px,5px)",
        borderBottom: "1px solid #669644",
      },
    },
  },
});

function App() {
  return (
    <>
      <CssBaseline />
      <Sun img={SunPic} />
      <Cloud img={CloudPic} />   
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </>
  );
}

export default App;
