import React, { useState } from "react";
import { Menu, MenuItem, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const ITEM_HEIGHT = 52;

const optionKey = {
  NEW_FOLDER: "NEW_FOLDER",
  FILE_UPLOAD: "FILE_UPLOAD",
  FOLDER_UPLOAD: "FOLDER_UPLOAD",
};

const options = [
  { label: "New folder", value: optionKey.NEW_FOLDER },
  { label: "File upload", value: optionKey.FILE_UPLOAD },
  { label: "Folder upload", value: optionKey.FOLDER_UPLOAD },
];

function UploadButton({
  handleCreateFolder = () => {},
  handleFileUpload = () => {},
  handleFolderUpload = () => {},
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openModalName, setOpenModalName] = useState("");

  const [folderName, setFolderName] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectOption = (option) => {
    setOpenModalName(option.value);
    setAnchorEl(null);
  };

  const handleCancelCreateFolder = () => {
    setOpenModalName("");
    setFolderName("");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            padding: "8px",
            border: "2px dashed #ccc",
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          <span>+</span>
          <span>New</span>
        </button>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          slotProps={{
            paper: {
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "30ch",
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              selected={option === "Pyxis"}
              onClick={() => handleSelectOption(option)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </div>

      <Modal
        open={openModalName === optionKey.NEW_FOLDER}
        onClose={() => setOpenModalName("")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h5" component="h2">
            New folder
          </Typography>

          <TextField
            id="folderName"
            name="folderName"
            label="Folder Name"
            variant="standard"
            value={folderName}
            onChange={(e) => {
              setFolderName(e.target.value);
            }}
          />
          <Box sx={{ mt: 2 }}>
            <Button onClick={() => handleCancelCreateFolder()}>Cancel</Button>
            <Button
              onClick={() => {
                handleCreateFolder(folderName);
              }}
              autoFocus
            >
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default UploadButton;
