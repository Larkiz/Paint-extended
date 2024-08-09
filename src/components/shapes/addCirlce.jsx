import { useContext, useEffect, useRef } from "react";
import { Circle, Transformer } from "react-konva";
import { shapesCont } from "../../context/shapesContext";

export function CircleCont({ shape }) {
  const {
    setDragging,
    posUpdate,
    setSelected,
    selectedShape,
    changingElement,
    scaleUpdate,
  } = useContext(shapesCont);

  const shapeRef = useRef();
  const trRef = useRef();
  console.log(selectedShape);
  const isSelected = shape.id === selectedShape.id;

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
    }
  }, [isSelected]);
  return (
    <>
      <Circle
        x={shape.x}
        y={shape.y}
        rotation={shape.rotation}
        radius={shape.radius}
        scaleX={shape.scaleX}
        scaleY={shape.scaleY}
        onDragMove={(e) => {
          setDragging(e.target.x());
          posUpdate(shape.id, e);
        }}
        onDragEnd={() => {
          setTimeout(() => setDragging(false));
        }}
        ref={shapeRef}
        draggable
        onClick={() => {
          setSelected(shape);
        }}
        onTransform={() => {
          changingElement.current = true;
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          const x = node.x();
          const y = node.y();
          const rotation = node.rotation();
          scaleUpdate(shape.id, scaleY, scaleX, x, y, rotation);
        }}
        fill={shape.color}
      />
      {isSelected ? <Transformer ref={trRef} flipEnabled={false} /> : null}
    </>
  );
}

