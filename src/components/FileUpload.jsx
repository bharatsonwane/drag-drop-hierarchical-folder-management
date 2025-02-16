import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Button, Input } from "@mui/material";

const FileUpload = ({ folderId, onFileUpload }) => {
  const [files, setFiles] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "FILE", // Accept files
    drop: (item) => handleDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleDrop = (item) => {
    onFileUpload(item.file, folderId);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFiles([file]);
    onFileUpload(file, folderId); // Upload the file to the folder
  };

  return (
    <div
      ref={drop}
      style={{
        padding: "10px",
        border: isOver ? "2px dashed #007bff" : "2px dashed #ccc",
      }}
    >
      <h3>Upload a File</h3>
      <Input type="file" onChange={handleFileChange} />
      <div>{files.length > 0 && <span>{files[0].name}</span>}</div>
    </div>
  );
};

export default FileUpload;
