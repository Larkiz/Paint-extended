import { Stack } from "@mui/material";
import { ColorPick } from "./ColorPick/ColorPick";
import WIdthPick from "./WidthPick/WidthPick";

export const Controls = ({ colorChange, color, width, widthChange }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <ColorPick color={color} colorChange={colorChange} />
      <WIdthPick width={width} widthChange={widthChange} />
    </Stack>
  );
};
