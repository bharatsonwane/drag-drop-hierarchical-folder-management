import React from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

function DndKitWrapper(props) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  return <DndContext sensors={sensors}>{props.children}</DndContext>;
}

export default DndKitWrapper;
