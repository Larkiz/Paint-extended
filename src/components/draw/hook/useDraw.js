import { useRef, useState } from "react";

export const useDraw = (width, color, drawInLayer, createLine) => {
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  let lastLine = lines[lines.length - 1];
  // console.log(lines);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    createLine({
      width: width,
      color: color,
      points: [pos.x, pos.y],
      id: lines.length + 1,
    });
    setLines([
      ...lines,
      {
        width: width,
        color: color,
        points: [pos.x, pos.y],
        id: lines.length + 1,
      },
    ]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);

    drawInLayer(lastLine);
    setLines([...lines]);
  };

  const handleMouseClick = (e) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines([...lines]);
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
      lines,
      setLines,
    },
    lines,
  };
};
