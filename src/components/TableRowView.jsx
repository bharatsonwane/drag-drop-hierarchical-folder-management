import { Folder } from "@mui/icons-material";
import { TableCell, TableRow } from "@mui/material";
import LongMenu from "./MenuItem";
import DraggableItem from "./dndKit/DraggableItem";

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
        {file.type === "folder" ? (
          <Folder style={{ marginRight: 10 }} />
        ) : (
          <></>
        )}{" "}
        <DraggableItem id={`table+${file.id}`}>
          <span style={{ cursor: "pointer", background:'red' }}>{file.name}</span>
        </DraggableItem>
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
