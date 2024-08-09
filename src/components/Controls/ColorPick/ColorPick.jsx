import { Button, Popover } from "@mui/material";
import ColorPicker from "@rc-component/color-picker";
import { useState } from "react";

import "@rc-component/color-picker/assets/index.css";

export const ColorPick = ({ colorChange, color }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <div>
      <Button aria-describedby={id} type="button" onClick={handleClick}>
        <i style={{ fontSize: "30px" }} className="fa-solid fa-palette"></i>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <ColorPicker
          value={color}
          onChange={(e) => colorChange(e.toHexString())}
        />
      </Popover>
    </div>
  );
};
