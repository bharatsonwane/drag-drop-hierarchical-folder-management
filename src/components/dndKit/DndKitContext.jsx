import React, { useState, useRef } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

function DndKitContext(props) {
  const {
    onDragEnd = () => {},
    onDropHold = () => {},
    children,
    selectedNodes = [],
    handleMultiSelectUnselectNode = () => {},
  } = props;

  const holdTimeoutRef = useRef(null);
  const currentDroppableRef = useRef(null);

  const [dragging, isDragging] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event) => {
    console.log("dragStartEvent", event);
    if (selectedNodes.length === 0) {
      handleMultiSelectUnselectNode(event.active.data.current);
    }
    isDragging(event.active.id);
    // Clear any existing hold timer
    clearTimeout(holdTimeoutRef.current);
  };

  const handleDragEnd = (event) => {
    onDragEnd(event);
    // Clear any existing hold timer
    isDragging(false);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (over) {
      const newDroppableId = over.id;
      if (currentDroppableRef.current !== newDroppableId) {
        clearTimeout(holdTimeoutRef.current);

        currentDroppableRef.current = newDroppableId;
        holdTimeoutRef.current = setTimeout(() => {
          /** @description call onDropHold function */
          onDropHold(event);
        }, 500);
      }
    } else {
      /** Clear hold timer if no longer over a droppable area */
      clearTimeout(holdTimeoutRef.current);
      currentDroppableRef.current = null;
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
    >
      {children}

      {dragging && (
        <DragOverlay>
          <div>
            {" "}
            {selectedNodes.map((nodeItem) => nodeItem.name).join(", ")}
          </div>
        </DragOverlay>
      )}
    </DndContext>
  );
}

export default DndKitContext;
