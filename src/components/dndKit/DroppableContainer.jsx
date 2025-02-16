import { useDroppable } from "@dnd-kit/core";

function DroppableContainer({ id, children, style = {} }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  const combineStyle = {
    padding: "1px",
    border: isOver ? "2px dashed #007bff" : "1px solid transparent",
    borderRadius: "4px",
    backgroundColor: isOver ? "#e7f5ff" : "transparent",
    ...style,
  };

  return (
    <div ref={setNodeRef} style={combineStyle}>
      {children}
    </div>
  );
}

export default DroppableContainer;
