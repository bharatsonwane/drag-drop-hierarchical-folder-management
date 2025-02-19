import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Down arrow
import ArrowRightIcon from "@mui/icons-material/ArrowRight"; // Right arrow
import DraggableAndDroppableItem from "../../../components/dndKit/DraggableAndDroppableItem";

const FolderTree = ({
  node,
  activeFolderIdList,
  handleToggleFolder,
  handleSetActiveNode,
}) => {
  const isOpen = activeFolderIdList.includes(node.id);

  return (
    <>
      {node.type === "folder" && (
        <>
          <div
            style={{
              cursor: "grab",
              display: "flex",
              alignItems: "center",
            }}
          >
            {node.type === "folder" && (
              <span
                style={{ marginRight: "10px", cursor: "pointer" }}
                onClick={() => handleToggleFolder(node.id)}
              >
                {isOpen ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
              </span>
            )}

            <DraggableAndDroppableItem id={node.id}>
              <span
                onClick={() => {
                  handleSetActiveNode(node.id);
                }}
              >
                {node.type === "folder" ? "📁" : "📄"} {node.name}
              </span>
            </DraggableAndDroppableItem>
          </div>

          {isOpen && node.children && node.children.length > 0 && (
            <div style={{ marginLeft: "20px" }}>
              {node.children.map((child) => (
                <FolderTree
                  key={child.id}
                  node={child}
                  activeFolderIdList={activeFolderIdList}
                  handleToggleFolder={handleToggleFolder}
                  handleSetActiveNode={handleSetActiveNode}
                />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default FolderTree;
