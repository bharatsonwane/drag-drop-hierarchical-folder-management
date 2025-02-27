import React, { forwardRef } from "react";
import { useDroppable } from "@dnd-kit/core";

const DroppableElement = (
  { id, allowedDndTypes = ["type1"], elementData = {}, children },
  ref
) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
    data: {
      allowedDndTypes: allowedDndTypes,
      ...elementData,
    },
  });

  const itemStyle = {
    padding: "1px",
    border: isOver ? "2px dashed #007bff" : "1px solid transparent",
    borderRadius: "4px",
    backgroundColor: isOver ? "#e7f5ff" : "transparent",
  };

  return (
    <>
      {React.isValidElement(children) ? (
        React.cloneElement(children, {
          ref: (node) => {
            setNodeRef(node);
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          },
          style: { ...itemStyle, ...children.props.style },
        })
      ) : !!children ? (
        <div ref={setNodeRef} style={itemStyle}>
          {children}
        </div>
      ) : null}
    </>
  );
};

export default forwardRef(DroppableElement);
