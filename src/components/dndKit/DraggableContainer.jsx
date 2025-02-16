import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";

function DraggableContainer({ id, children, style = {} }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({
      id: id,
    });

  const combineStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    // padding: "2px",
    // border: "1px solid #ccc",
    // margin: "5px 0",
    // background: node.type === "folder" ? "#f9f9f9" : "#fff",
    cursor: "grab",
    display: "flex",
    alignItems: "center",
    ...style,
  };

  return (
    <div ref={setNodeRef} style={combineStyle} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

export default DraggableContainer;
