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
  const [selectFolderDetails, setSelectFolderDetails] = useState({});
  const [selectedFolderPath, setSelectedFolderPath] = useState([]);
  const [openFolderIdList, setOpenFolderIdList] = useState([]); // Tracks open folders by their IDs

  useEffect(() => {
    handleInitialRendering();
    return () => {};
  }, []);

  const handleInitialRendering = () => {
    const initialId = folderStructure?.[0]?.id;
    handleSelectNode(initialId);
    handleToggleFolder(initialId);
  };

  const handleToggleFolder = (id, isOpenMandatory) => {
    let newOpenFolderIdList = [];

    if (isOpenMandatory) {
      newOpenFolderIdList = openFolderIdList.includes(id)
        ? [...openFolderIdList]
        : [...openFolderIdList, id];
    } else {
      newOpenFolderIdList = openFolderIdList.includes(id)
        ? openFolderIdList.filter((folderId) => folderId !== id)
        : [...openFolderIdList, id];
    }

    setOpenFolderIdList(newOpenFolderIdList);
  };

  const handleSelectNode = (id, folderStructureJson = folderStructure) => {
    const path = findPathById(folderStructureJson, id);
    setSelectedFolderPath(path);

    const details = findDetailsById(folderStructureJson, id);
    setSelectFolderDetails(details);

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
    handleSelectNode(selectFolderDetails.id, updatedStructure);
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
                openFolderIdList={openFolderIdList}
                selectedFolderPath={selectedFolderPath}
                handleToggleFolder={handleToggleFolder}
                handleSelectNode={handleSelectNode}
              />
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <FolderBreadcrumb
            selectedFolderPath={selectedFolderPath}
            handleSelectNode={handleSelectNode}
          />
          <div>
            <TableView
              selectFolderDetails={selectFolderDetails}
              handleSelectNode={handleSelectNode}
            />
          </div>
        </div>
      </div>
    </DndKitContext>
  );
};

export default FolderDragAndDrop;
