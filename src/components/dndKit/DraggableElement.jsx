import React, { forwardRef } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";

const DraggableElement = (
  { id, dndType = "type1", elementData = {}, children, hasDragOverlay },
  ref
) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({ id: id, data: { dndType: dndType, ...elementData } });

  const itemStyle = {
    transform: hasDragOverlay ? "unset" : CSS.Transform.toString(transform),
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

export default forwardRef(DraggableElement);
