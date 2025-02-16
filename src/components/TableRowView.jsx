import { Folder } from "@mui/icons-material";
import { TableCell, TableRow } from "@mui/material";
import LongMenu from "./MenuItem";
import DraggableContainer from "./dndKit/DraggableContainer";

function TableRowView({ index, handleSelectNode, file }) {
  return (
    <TableRow
      key={index}
      // style={{ overflowX: "auto" }}
      onClick={() => {
        if (file.type === "folder") {
          handleSelectNode(file.id);
        }
      }}
    >
      {/* <div onAuxClick={}></div> */}
      <TableCell>
        <DraggableContainer
          id={`table+${file.id}`}
          style={{ display: "flex", alignItems: "center" }}
        >
          {file.type === "folder" ? (
            <Folder style={{ marginRight: 10 }} />
          ) : (
            <></>
          )}{" "}
          {file.name}
        </DraggableContainer>
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
  );
}

export default TableRowView;
