import { useContext, useEffect, useRef } from "react";
import { Rect, Transformer } from "react-konva";
import { shapesCont } from "../../context/shapesContext";

export function Square({ shape }) {
  const {
    setDragging,
    posUpdate,
    setSelected,
    selectedShape,
    sizeUpdate,
    changingElement,
  } = useContext(shapesCont);

  const shapeRef = useRef(null);
  const trRef = useRef(null);

  const isSelected = shape.id === selectedShape.id;

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
    }
  }, [isSelected]);

  return (
    <>
      <Rect
        ref={shapeRef}
        x={shape.x}
        y={shape.y}
        rotation={shape.rotation}
        onDragMove={(e) => {
          setDragging(e.target.x());
          posUpdate(shape.id, e);
        }}
        onDragEnd={() => {
          setTimeout(() => setDragging(false));
        }}
        draggable
        onClick={() => {
          setSelected(shape);
        }}
        onTransform={() => {
          changingElement.current = true;

          const node = shapeRef.current;
          const x = node.x();
          const y = node.y();
          const width = Math.round(Math.max(5, node.width() * node.scaleX()));
          const height = Math.round(Math.max(node.height() * node.scaleY()));
          const rotation = node.rotation();

          sizeUpdate(shape.id, width, height, rotation, x, y);
        }}
        width={shape.width}
        height={shape.height}
        fill={shape.color}
      />
      {isSelected ? <Transformer ref={trRef} flipEnabled={false} /> : null}
    </>
  );
}
