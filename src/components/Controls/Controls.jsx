import { Divider, Stack } from "@mui/material";
import { ColorPick } from "./ColorPick/ColorPick";
import WIdthPick from "./WidthPick/WidthPick";

export const Controls = ({ colorChange, color, width, widthChange }) => {
  return (
    <Stack
      gap={2}
      divider={
        <Divider
          style={{ borderColor: "#72b5f7" }}
          orientation="vertical"
          variant="middle"
          flexItem
        />
      }
      direction="row"
      alignItems="center"
      spacing={2}
    >
      <ColorPick color={color} colorChange={colorChange} />

      <WIdthPick width={width} widthChange={widthChange} />
    </Stack>
  );
};
