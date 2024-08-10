import { Layer, Stage } from "react-konva";
import "../assets/styles/App.css";
import { useDraw } from "./draw/hook/useDraw";
import { renderDraw } from "./shapes/renderDraw";

import { useReducer } from "react";
import { paramReducer } from "../utils/reducers/paramsReducer";
import { Controls } from "./Controls/Controls";
import { Box, Button, Grid, Stack } from "@mui/material";
import { layersReducer } from "../utils/reducers/layersReducer";

const borderStyle = "1px solid #e8e8e8";

const textLayerStyles = {
  p: 0.5,
  textAlign: "center",
  fontFamily: "Roboto",
  letterSpacing: 0.5,
  textTransform: "uppercase",
  cursor: "default",
};

function App() {
  const [params, paramsDispatch] = useReducer(paramReducer, {
    color: "#000",
    width: 5,
  });
  const [layers, layersDispatch] = useReducer(layersReducer, {
    selectedLayerId: null,
    layers: [],
  });

  const { actions } = useDraw(
    params.width,
    params.color,
    drawInLayer,
    createShape,
    layers.layers[layers.selectedLayerId]
  );

  function createShape(shape) {
    layersDispatch({ type: "createShape", shape });
  }

  function addLayer() {
    layersDispatch({ type: "addLayer" });
  }
  function deleteLayer() {
    if (window.confirm("Удалить слой?")) {
      layersDispatch({ type: "deleteLayer" });
    }
  }

  function drawInLayer(shape) {
    layersDispatch({ type: "draw", shape });
  }

  function selectLayer(id) {
    layersDispatch({ type: "selectLayer", id: id });
  }

  return (
    <Grid container>
      <Grid style={{ borderBottom: borderStyle, padding: "10px" }} item xs={12}>
        <Controls
          color={params.color}
          colorChange={(color) =>
            paramsDispatch({ type: "colorChange", color: color })
          }
          width={params.width}
          widthChange={(width) =>
            paramsDispatch({ type: "widthChange", width: width })
          }
        />
      </Grid>
      <Grid style={{ borderRight: borderStyle }} item xs={1.5}>
        <Stack>
          <Grid container>
            <Grid item xs={12}>
              <Box
                component="section"
                sx={{
                  ...textLayerStyles,
                }}
              >
                Layers
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Button
                style={{ fontSize: "13px", width: "100%" }}
                variant="contained"
                onClick={addLayer}
              >
                <i className="fa-solid fa-plus"></i>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                style={{
                  fontSize: "13px",
                  width: "100%",
                  backgroundColor: layers.layers.length ? "#db2727" : "#808080",
                  pointerEvents: layers.layers.length ? "auto" : "none",
                }}
                variant="contained"
                onClick={deleteLayer}
              >
                <i className="fa-solid fa-trash"></i>
              </Button>
            </Grid>
          </Grid>

          {layers.layers.length
            ? layers.layers.map((layer) => (
                <Button
                  key={layer.id}
                  onClick={() => selectLayer(layer.id)}
                  component="section"
                  style={{
                    backgroundColor:
                      layers.selectedLayerId === layer.id ? "#007FFF" : "#fff",
                    color:
                      layers.selectedLayerId === layer.id ? "#fff" : "#000",
                  }}
                  sx={{
                    p: 2,
                    borderBottom: "2px solid #007FFF",
                  }}
                >
                  {layer.name}
                </Button>
              ))
            : null}
        </Stack>
      </Grid>
      <Grid item xs={10.5}>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseUp={actions.handleMouseUp}
          onMouseMove={actions.handleMouseMove}
          onMouseDown={actions.handleMouseDown}
          onMouseLeave={actions.handleMouseUp}
          onClick={actions.handleMouseClick}
        >
          {layers.layers.length
            ? layers.layers.map((layer) => {
                return (
                  <Layer key={layer.id}>
                    {layer.shapes.map((line) => {
                      return renderDraw(line);
                    })}
                  </Layer>
                );
              })
            : null}
        </Stage>
      </Grid>
    </Grid>
  );
}

export default App;
