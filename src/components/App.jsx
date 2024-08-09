import { Layer, Stage } from "react-konva";
import "../assets/styles/App.css";
import { useDraw } from "./draw/hook/useDraw";
import { renderDraw } from "./shapes/renderDraw";

import { useReducer, useState } from "react";
import { paramReducer } from "../utils/reducers/paramsReducer";
import { Controls } from "./Controls/Controls";
import { Button, Grid, Stack } from "@mui/material";

function App() {
  const [params, paramsDispatch] = useReducer(paramReducer, {
    color: "#000",
    width: 5,
    selectedLayerId: null,
  });
  const { actions, lines } = useDraw(
    params.width,
    params.color,
    drawInLayer,
    createLine
  );

  const [layers, setLayers] = useState([]);

  function createLine(line) {
    setLayers(
      layers.map((layer) => {
        if (layer.id === params.selectedLayerId) {
          layer.shapes.push(line);
        }

        return layer;
      })
    );
  }

  function addLayer() {
    const name = "Новый слой " + (layers.length + 1);
    setLayers([...layers, { id: layers.length, name: name, shapes: [] }]);
  }
  function deleteLayer() {
    if (window.confirm("Удалить слой?")) {
      setLayers(layers.filter((item) => item.id !== params.selectedLayerId));
    }
  }

  function drawInLayer(line) {
    setLayers(
      layers.map((layer) => {
        if (layer.id === params.selectedLayerId) {
          layer.shapes.splice(layer.shapes.length - 1, 1, line);
          console.log(layer);
        }

        return layer;
      })
    );
  }

  function selectLayer(id) {
    paramsDispatch({ type: "selectLayer", id: id });
  }

  return (
    <Grid container>
      <Grid
        style={{ borderBottom: "1px solid #dbdbdb", padding: "10px" }}
        item
        xs={12}
      >
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
      <Grid style={{ borderRight: "1px solid #dbdbdb" }} item xs={1.5}>
        <Stack>
          <Grid container>
            <Grid item xs={6}>
              <Button
                style={{ fontSize: "13px", width: "100%" }}
                variant="contained"
                onClick={addLayer}
              >
                +
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                style={{
                  fontSize: "13px",
                  width: "100%",
                  backgroundColor: "#db2727",
                }}
                variant="contained"
                onClick={deleteLayer}
              >
                -
              </Button>
            </Grid>
          </Grid>

          {layers &&
            layers.map((layer) => (
              <Button
                key={layer.id}
                onClick={() => selectLayer(layer.id)}
                component="section"
                style={{
                  backgroundColor:
                    params.selectedLayerId === layer.id ? "#007FFF" : "#fff",
                  color: params.selectedLayerId === layer.id ? "#fff" : "#000",
                }}
                sx={{
                  p: 2,
                  borderBottom: "2px solid #007FFF",
                }}
              >
                {layer.name}
              </Button>
            ))}
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
          // onClick={actions.handleMouseClick}
        >
          {layers.length
            ? layers.map((layer) => {
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
