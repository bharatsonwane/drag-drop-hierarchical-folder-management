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

const TableView = ({
  activeFolderDetails,
  handleSetActiveNode = () => {},
  selectedNodes,
  handleMultiSelectUnselectNode = () => {},
}) => {
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Modified</TableCell>
            <TableCell>
              <MoreVert />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activeFolderDetails?.children?.map((file, index) => (
            <TableRowView
              key={file.id}
              index={index}
              handleSetActiveNode={handleSetActiveNode}
              selectedNodes={selectedNodes}
              handleMultiSelectUnselectNode={handleMultiSelectUnselectNode}
              file={file}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableView;
