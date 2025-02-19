import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id, data, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isOver } =
    useSortable({ id: id, data: data });

  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "1px",
    border: isOver ? "2px dashed #007bff" : "1px solid transparent",
    borderRadius: "4px",
    backgroundColor: isOver ? "#e7f5ff" : "transparent",
    width: "fit-content",
  };

  return (
    <>
      {React.isValidElement(children) ? (
        React.cloneElement(children, {
          ref: setNodeRef,
          style: { ...itemStyle, ...children.props.style },
          ...attributes,
          ...listeners,
        })
      ) : (
        <span ref={setNodeRef} style={itemStyle} {...attributes} {...listeners}>
          {children}
        </span>
      )}
    </>
  );
};

export default SortableItem;
