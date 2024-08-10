import { useRef } from "react";

export const useDraw = (
  width,
  color,
  drawInLayer,
  createShape,
  currentLayer
) => {
  const isDrawing = useRef(false);

  const currentShapes = currentLayer ? currentLayer.shapes : null;
  let lastLine = currentLayer ? currentShapes[currentShapes.length - 1] : null;

  const handleMouseDown = (e) => {
    if (!currentLayer) {
      return;
    }
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();

    createShape({
      width: width,
      color: color,
      points: [pos.x, pos.y],
      id: currentShapes.length + 1,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    drawInLayer(lastLine);
  };

  const handleMouseClick = (e) => {
    if (!currentLayer) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    lastLine.points = lastLine.points.concat([point.x, point.y]);

    drawInLayer(lastLine);
  };

  const handleMouseUp = (e) => {
    isDrawing.current = false;
  };

  return {
    actions: {
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      handleMouseClick,
    },
  };
};
