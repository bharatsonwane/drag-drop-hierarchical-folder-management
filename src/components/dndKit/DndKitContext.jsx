import React, { useEffect, useRef } from "react";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

function DndKitContext(props) {
  const {
    items = [],
    onDragEnd = () => {},
    onDropHold = () => {},
    children,
  } = props;

  const holdTimeoutRef = useRef(null);
  const currentDroppableRef = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = () => {
    // Clear any existing hold timer
    clearTimeout(holdTimeoutRef.current);
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
      onDragEnd={onDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
    >
      <SortableContext items={items}>{children}</SortableContext>
    </DndContext>
  );
}

export default DndKitContext;
