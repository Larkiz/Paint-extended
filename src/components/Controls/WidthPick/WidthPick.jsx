import { Box, Grid, Input, Slider } from "@mui/material";

export default function WIdthPick({ widthChange, width }) {
  const handleSliderChange = (event, newValue) => {
    widthChange(newValue);
  };

  const handleInputChange = (event) => {
    widthChange(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (width < 0) {
      widthChange(0);
    } else if (width > 100) {
      widthChange(100);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof width === "number" ? width : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            max={1000}
          />
        </Grid>
        <Grid item>
          <Input
            value={width}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 0,
              max: 1000,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
