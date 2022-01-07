import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import {
  Brightness7,
  Close,
  Brightness4,
  TuneRounded,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../App";

const DrawerList = () => {
  const [state, setState] = React.useState(false);

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState(open);
    };
  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <div className="d-flex align-items-center w-100 py-3 justify-content-between">
        <h5 className="m-0 me-3">Setting</h5>
        <Button onClick={toggleDrawer(false)} variant="text" color="secondary">
          <Close />
        </Button>
      </div>
      <List className="mx-3 my-2">
        <ListItem
          onClick={colorMode.toggleColorMode}
          button
          className="justify-content-center shadow-lg rounded py-4"
        >
          <span>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </span>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div className="position-fixed start-0 top-50">
      <Drawer anchor="right" open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
      <button
        onClick={toggleDrawer(true)}
        className="btn btn-secondary rounded-pill"
      >
        <TuneRounded />
      </button>
    </div>
  );
};

export default DrawerList;
