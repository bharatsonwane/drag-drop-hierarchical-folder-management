import { useState, useRef, createContext, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  findDetailsById,
  findPathById,
  moveNodeByIds,
} from "../../helper/file";

import folderStructureData from "../../data/data";

export const DndKitCustomContext = createContext();

function DndKitContext({ children }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const holdTimeoutRef = useRef(null);
  const currentDroppableRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  const [folderStructure, setFolderStructure] = useState([
    ...folderStructureData,
  ]);
  const [activeFolderDetails, setActiveFolderDetails] = useState({});
  const [activeFolderPath, setActiveFolderPath] = useState([]);
  const [activeFolderIdList, setActiveFolderIdList] = useState([]); // Tracks open folders by their IDs
  const [selectedNodes, setSelectedNodes] = useState([]);

  useEffect(() => {
    handleInitialRendering();
    return () => {};
  }, []);

  const handleInitialRendering = () => {
    const initialId = folderStructure?.[0]?.id;
    handleSetActiveNode(initialId);
    handleToggleFolder(initialId);
  };

  const handleToggleFolder = (id, isOpenMandatory) => {
    let newOpenFolderIdList = [];

    if (isOpenMandatory) {
      newOpenFolderIdList = activeFolderIdList.includes(id)
        ? [...activeFolderIdList]
        : [...activeFolderIdList, id];
    } else {
      newOpenFolderIdList = activeFolderIdList.includes(id)
        ? activeFolderIdList.filter((folderId) => folderId !== id)
        : [...activeFolderIdList, id];
    }

    setActiveFolderIdList(newOpenFolderIdList);
  };

  const handleMultiSelectUnselectNode = (node) => {
    const isNodeSelected = selectedNodes.some(
      (selectedNode) => selectedNode.id === node.id
    );
    if (isNodeSelected) {
      setSelectedNodes(
        selectedNodes.filter((selectedNode) => selectedNode.id !== node.id)
      );
    } else {
      setSelectedNodes([...selectedNodes, node]);
    }
  };

  const handleSetActiveNode = (id, folderStructureJson = folderStructure) => {
    const path = findPathById(folderStructureJson, id);
    setActiveFolderPath(path);

    const details = findDetailsById(folderStructureJson, id);
    setActiveFolderDetails(details);

    handleToggleFolder(id, true);
  };

  const handleDropHold = (event) => {
    if (event?.over?.id) {
      handleToggleFolder(event.over.id, true);
    }
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (over) {
      const newDroppableId = over.id;
      if (currentDroppableRef.current !== newDroppableId) {
        clearTimeout(holdTimeoutRef.current);

        currentDroppableRef.current = newDroppableId;
        holdTimeoutRef.current = setTimeout(() => {
          /** @description call handleDropHold function */
          handleDropHold(event);
        }, 500);
      }
    } else {
      /** Clear hold timer if no longer over a droppable area */
      clearTimeout(holdTimeoutRef.current);
      currentDroppableRef.current = null;
    }
  };

  const handleDragStart = (event) => {
    console.log("dragStartEvent", event);
    if (selectedNodes.length === 0) {
      handleMultiSelectUnselectNode(event.active.data.current);
    }
    setIsDragging(event.active.id);
    // Clear any existing hold timer
    clearTimeout(holdTimeoutRef.current);
  };

  const handleDragEnd = (event) => {
    console.log("selectedNodes", selectedNodes);
    const { active, over } = event;
    if (!over) {
      return;
    }
    // const activeId = active.id;
    const overId = over.id;
    const selectedNodesIds = selectedNodes.map((nodeItem) => nodeItem.id);

    const updatedStructure = moveNodeByIds(
      folderStructure,
      overId,
      selectedNodesIds
    );

    setFolderStructure(updatedStructure);
    handleSetActiveNode(activeFolderDetails.id, updatedStructure);

    setSelectedNodes([]);

    // Clear any existing hold timer
    setIsDragging(false);
  };

  const contextValue = {
    folderStructure,
    activeFolderDetails,
    activeFolderPath,
    activeFolderIdList,
    selectedNodes,
    handleToggleFolder,
    handleSetActiveNode,
    handleMultiSelectUnselectNode,
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
    >
      <DndKitCustomContext.Provider value={contextValue}>
        {children}
        {isDragging && (
          <DragOverlay>
            <div>
              {" "}
              {selectedNodes.map((nodeItem) => nodeItem.name).join(", ")}
            </div>
          </DragOverlay>
        )}
      </DndKitCustomContext.Provider>
    </DndContext>
  );
}

export default DndKitContext;
