import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import TableRowView from "./TableRowView";

const TableView = ({ selectFolderDetails, handleSelectNode }) => {
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Modified</TableCell>
            <TableCell>Project list</TableCell>
            <TableCell>
              <MoreVert />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectFolderDetails?.children?.map((file, index) => (
            <TableRowView
              key={file.id}
              index={index}
              handleSelectNode={handleSelectNode}
              file={file}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableView;
