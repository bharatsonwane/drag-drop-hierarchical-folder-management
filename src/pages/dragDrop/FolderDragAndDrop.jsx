import { useEffect, useState } from "react";
import DndKitContext from "../../components/dndKit/DndKitContext";
import folderStructureData from "../../data/data";
import {
  findDetailsById,
  findPathById,
  moveNodeByIds,
} from "../../helper/file";
import UploadButton from "../../components/UploadButton";
import TableView from "../../components/tableView";
import FolderTree from "./components/FolderTree";
import FolderBreadcrumb from "./components/FolderBreadcrumb";

const FolderDragAndDrop = () => {
  const [folderStructure, setFolderStructure] = useState([
    ...folderStructureData,
  ]);
  const [activeFolderDetails, setActiveFolderDetails] = useState({});
  const [activeFolderPath, setActiveFolderPath] = useState([]);
  const [activeFolderIdList, setActiveFolderIdList] = useState([]); // Tracks open folders by their IDs

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

  const handleSetActiveNode = (id, folderStructureJson = folderStructure) => {
    const path = findPathById(folderStructureJson, id);
    setActiveFolderPath(path);

    const details = findDetailsById(folderStructureJson, id);
    setActiveFolderDetails(details);

    handleToggleFolder(id, true);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) {
      return;
    }
    const activeId = active.id;
    const overId = over.id;
    const updatedStructure = moveNodeByIds(folderStructure, activeId, overId);
    setFolderStructure(updatedStructure);
    handleSetActiveNode(activeFolderDetails.id, updatedStructure);
  };

  const handleDropHold = (event) => {
    if (event?.over?.id) {
      handleToggleFolder(event.over.id, true);
    }
  };

  return (
    <DndKitContext
      onDragEnd={handleDragEnd}
      onDropHold={handleDropHold}
    >
      <div style={{ display: "flex", gap: 30 }}>
        <div style={{ minWidth: 200 }}>
          <UploadButton />
          <div>
            {folderStructure.map((node) => (
              <FolderTree
                key={node.id}
                node={node}
                activeFolderIdList={activeFolderIdList}
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
            />
          </div>
        </div>
      </div>
    </DndKitContext>
  );
};

export default FolderDragAndDrop;
