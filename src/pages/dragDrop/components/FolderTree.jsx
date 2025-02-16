import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Down arrow
import ArrowRightIcon from "@mui/icons-material/ArrowRight"; // Right arrow
import DroppableContainer from "../../../components/dndKit/DroppableContainer";
import DraggableContainer from "../../../components/dndKit/DraggableContainer";

const FolderTree = ({
  node,
  openFolderIdList,
  handleToggleFolder,
  handleSelectNode,
}) => {
  const isOpen = openFolderIdList.includes(node.id);

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
            <DroppableContainer id={node.id}>
              <DraggableContainer id={node.id}>
                <span
                  onClick={() => {
                    handleSelectNode(node.id);
                  }}
                >
                  {node.type === "folder" ? "📁" : "📄"} {node.name}
                </span>
              </DraggableContainer>
            </DroppableContainer>
          </div>

          {isOpen && node.children && node.children.length > 0 && (
            <div style={{ marginLeft: "20px" }}>
              {node.children.map((child) => (
                <FolderTree
                  key={child.id}
                  node={child}
                  openFolderIdList={openFolderIdList}
                  handleToggleFolder={handleToggleFolder}
                  handleSelectNode={handleSelectNode}
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
