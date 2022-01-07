import React from "react";
import "./App.css";
import ManagePath from "./components/ManagePath";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { Button, Paper } from "@mui/material";
import DrawerList from "./components/DrawerList";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

declare module "@mui/material/styles" {
  interface Theme {
    direction?: string;
  }
  interface ThemeOptions {
    direction?: string;
  }
}

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function App() {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        direction: "rtl",
      }),
    [mode]
  );

  React.useLayoutEffect(() => {
    document.body.setAttribute("dir", "rtl");
  }, []);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Item elevation={0}>
            <div className="position-relative">
              <div className="container py-5">
                <ManagePath />
              </div>
              <DrawerList />
            </div>
          </Item>
        </ThemeProvider>
      </CacheProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
