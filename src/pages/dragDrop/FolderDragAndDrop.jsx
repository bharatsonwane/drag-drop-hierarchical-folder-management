import UploadButton from "../../components/UploadButton";
import TableView from "../../components/tableView";
import FolderTree from "./components/FolderTree";
import FolderBreadcrumb from "./components/FolderBreadcrumb";
import { useContext } from "react";
import { DndKitCustomContext } from "../../components/dndKit/DndKitContext";

const FolderDragAndDrop = () => {
  const {
    folderStructure,
    activeFolderDetails,
    activeFolderPath,
    activeFolderIdList,
    selectedNodes,
    handleToggleFolder,
    handleSetActiveNode,
    handleMultiSelectUnselectNode
  } = useContext(DndKitCustomContext);

  return (
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
            selectedNodes={selectedNodes}
            handleMultiSelectUnselectNode={handleMultiSelectUnselectNode}
          />
        </div>
      </div>
    </div>
  );
};

export default FolderDragAndDrop;
