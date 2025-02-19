import React, { forwardRef } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const DraggableAndDroppableItem = ({ id, data, children }, ref) => {
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableNodeRef,
    transform,
    transition,
  } = useDraggable({ id, data });

  const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
    id,
    data,
  });

  const combinedRef = (node) => {
    setDraggableNodeRef(node);
    setDroppableNodeRef(node);
    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "1px",
    border: isOver ? "2px dashed #007bff" : "1px solid transparent",
    borderRadius: "4px",
    backgroundColor: isOver ? "#e7f5ff" : "transparent",
    cursor: "grab",
    display: "flex",
    alignItems: "center",
  };

  return (
    <>
      {React.isValidElement(children) ? (
        React.cloneElement(children, {
          ref: combinedRef,
          style: { ...itemStyle, ...children.props.style },
          ...attributes,
          ...listeners,
        })
      ) : (
        <div ref={combinedRef} style={itemStyle} {...attributes} {...listeners}>
          {children}
        </div>
      )}
    </>
  );
};

export default forwardRef(DraggableAndDroppableItem);
