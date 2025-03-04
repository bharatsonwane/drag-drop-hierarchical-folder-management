import { useEffect, useMemo, useRef, useState } from "react";
import { DragOverlay, useDndMonitor } from "@dnd-kit/core";
import UploadButton from "../../components/UploadButton";
import TableView from "../../components/tableView";
import FolderTree from "./components/FolderTree";
import FolderBreadcrumb from "./components/FolderBreadcrumb";
import {
  addNodeById,
  findNodeDetailsById,
  findNodePathById,
  moveNodeByIds,
} from "../../helper/file";
import folderStructureData from "../../data/data";

const FolderDragAndDrop = () => {
  const holdTimeoutRef = useRef(null);
  const currentDroppableRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  const [folderStructure, setFolderStructure] = useState([]);
  const [activeFolderId, setActiveFolderId] = useState(null);
  const [expandedFolderIdList, setExpandedFolderIdList] = useState([]); // Tracks open folders by their IDs

  const [selectedNodes, setSelectedNodes] = useState([]);

  const activeFolderDetails = (() => {
    const details = findNodeDetailsById(folderStructure, activeFolderId) || {};
    return details;
  })();

  const activeFolderPath = (() => {
    const path = findNodePathById(folderStructure, activeFolderDetails.id);
    return path;
  })();

  useDndMonitor({
    onDragStart(event) {
      handleDragStart(event);
    },
    onDragOver(event) {
      const activeType = event.active?.data.current.dndType;
      const allowedDndTypes = event.over?.data.current.allowedDndTypes;
      if (allowedDndTypes?.includes(activeType)) {
        handleDragOver(event);
      }
    },
    onDragEnd(event) {
      const activeType = event.active?.data.current.dndType;
      const allowedDndTypes = event.over?.data.current.allowedDndTypes;
      if (allowedDndTypes?.includes(activeType)) {
        handleDragEnd(event);
      }
    },
  });

  useEffect(() => {
    handleInitialRendering();
    return () => {};
  }, []);

  const handleInitialRendering = () => {
    const initialId = folderStructureData[0].id;
    setFolderStructure(folderStructureData);
    handleSetActiveNode(initialId, folderStructureData);
  };

  const handleToggleFolder = (id, isOpenMandatory) => {
    let newOpenFolderIdList = [];

    if (isOpenMandatory) {
      newOpenFolderIdList = expandedFolderIdList.includes(id)
        ? [...expandedFolderIdList]
        : [...expandedFolderIdList, id];
    } else {
      newOpenFolderIdList = expandedFolderIdList.includes(id)
        ? expandedFolderIdList.filter((folderId) => folderId !== id)
        : [...expandedFolderIdList, id];
    }

    setExpandedFolderIdList(newOpenFolderIdList);
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
    setActiveFolderId(id);

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
    if (selectedNodes.length === 0) {
      handleMultiSelectUnselectNode(event.active.data.current);
    }
    setIsDragging(event.active.id);
    // Clear any existing hold timer
    clearTimeout(holdTimeoutRef.current);
  };

  const handleDragEnd = (event) => {
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

  /**@description handleCreateFolder */
  const handleCreateNewFolder = (folderName) => {
    const newFolder = {
      id: `folder_${folderName}`,
      name: folderName,
      type: "folder",
      createdBy: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      children: [],
    };

    const { updatedSchema, isNodeAdded } = addNodeById(
      folderStructure,
      activeFolderDetails.id,
      newFolder
    );

    if (isNodeAdded) {
      setFolderStructure(updatedSchema);
    }
  };

  return (
    <div style={{ display: "flex", gap: 30 }}>
      <div style={{ minWidth: 200 }}>
        <UploadButton handleCreateFolder={handleCreateNewFolder} />
        <div>
          {folderStructure.map((node) => (
            <FolderTree
              key={node.id}
              node={node}
              expandedFolderIdList={expandedFolderIdList}
              activeFolderPath={activeFolderPath}
              handleToggleFolder={handleToggleFolder}
              handleSetActiveNode={handleSetActiveNode}
            />
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <FolderBreadcrumb
          activeFolderPath={activeFolderPath}
          handleSetActiveNode={handleSetActiveNode}
        />
        <div>
          <TableView
            activeFolderDetails={activeFolderDetails}
            handleSetActiveNode={handleSetActiveNode}
            selectedNodes={selectedNodes}
            handleMultiSelectUnselectNode={handleMultiSelectUnselectNode}
          />
        </div>
      </div>
      {isDragging && (
        <DragOverlay>
          <div>
            {" "}
            {selectedNodes.map((nodeItem) => nodeItem.name).join(", ")}
          </div>
        </DragOverlay>
      )}
    </div>
  );
};

export default FolderDragAndDrop;
