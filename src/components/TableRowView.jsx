import { Folder } from "@mui/icons-material";
import { TableCell, TableRow } from "@mui/material";
import LongMenu from "./MenuItem";
import DraggableItem from "./dndKit/DraggableItem";

function TableRowView({
  index,
  handleSetActiveNode,
  selectedNodes = [],
  handleMultiSelectUnselectNode,
  file,
}) {
  const isNodeSelected = selectedNodes.some(
    (selectedNode) => selectedNode.id === file.id
  );

  return (
    <DraggableItem id={`table!^|${file.id}`} data={file} hasDragOverlay={true}>
      <TableRow
        key={index}
        // style={{ overflowX: "auto" }}
        onClick={(event) => {
          if (event.ctrlKey || event.metaKey) {
            handleMultiSelectUnselectNode(file);
          } else if (file.type === "folder") {
            handleSetActiveNode(file.id);
          }
        }}
        sx={{
          backgroundColor: isNodeSelected ? "#c2e7ff" : "inherit",
        }}
      >
        {/* <div onAuxClick={}></div> */}
        <TableCell>
          {file.type === "folder" ? (
            <Folder style={{ marginRight: 10 }} />
          ) : (
            <></>
          )}{" "}
          <span>{file.name}</span>
        </TableCell>
        <TableCell>{file.size}</TableCell>
        <TableCell>{file.owner}</TableCell>
        <TableCell>{file.created}</TableCell>
        <TableCell>{file.modified}</TableCell>
        <TableCell>{file.projectList?.join(", ")}</TableCell>
        <TableCell>
          <LongMenu />
        </TableCell>
      </TableRow>
    </DraggableItem>
  );
}

export default TableRowView;
