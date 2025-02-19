import React, { forwardRef } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";

const DraggableItem = ({ id, data, children }, ref) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({ id: id, data: data });

  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
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
          ...attributes,
          ...listeners,
        })
      ) : !!children ? (
        <div ref={setNodeRef} style={itemStyle} {...attributes} {...listeners}>
          {children}
        </div>
      ) : null}
    </>
  );
};

export default forwardRef(DraggableItem);
