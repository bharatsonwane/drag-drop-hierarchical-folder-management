import React, { useState } from "react";

const FileUpload = () => {
  const [directoryStructure, setDirectoryStructure] = useState([]);

  const handleDropFolder = async (event) => {
    event.preventDefault();
    const items = Array.from(event.dataTransfer.items || []);

    const traverseFileTree = async (item, path = "") => {
      if (item.isFile) {
        const file = await new Promise((resolve) => item.file(resolve));
        return file;
      } else if (item.isDirectory) {
        const dirReader = item.createReader();
        const entries = await new Promise((resolve) =>
          dirReader.readEntries(resolve)
        );
        if (entries.length === 0) {
          return {
            name: item.name,
            type: "folder",
            relativePath: `${path}${item.name}/`,
            children: [],
          };
        } else {
          const children = await Promise.all(
            entries.map((entry) =>
              traverseFileTree(entry, `${path}${item.name}/`)
            )
          );
          return {
            name: item.name,
            type: "folder",
            relativePath: `${path}${item.name}/`,
            children: children || [],
          };
        }
      }
    };

    const structure = await Promise.all(
      items.map((item) => traverseFileTree(item.webkitGetAsEntry()))
    );

    console.log("structure", structure);

    setDirectoryStructure(structure);
  };

  const handleSelectFolder = (event) => {
    const fileobject = event.target.files;
    const files = Array.from(fileobject || []);

    console.log("files", files);
    const root = [];
    // Helper function to find or create folder
    function findOrCreateFolder(children, folderName) {
      let folder = children.find(
        (item) => item.name === folderName && item.type === "folder"
      );
      if (!folder) {
        folder = { name: folderName, type: "folder", children: [] };
        children.push(folder);
      }
      return folder;
    }

    // Iterate through each file and build the tree
    files.forEach((file) => {
      const parts = file.webkitRelativePath.split("/"); // Split path into parts
      let currentLevel = root;

      parts.forEach((part, index) => {
        if (index !== parts.length - 1) {
          /* It's a folder */
          currentLevel = findOrCreateFolder(currentLevel, part).children;
        } else {
          /* It's a file */
          currentLevel.push(file);
        }
      });
    });

    console.log("root", root);

    return root;
  };

  return (
    <div
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDropFolder}
      style={{
        border: "2px dashed #ccc",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="file"
        webkitdirectory="true"
        directory="true"
        multiple
        onChange={handleSelectFolder}
        style={{ display: "none" }}
        id="fileInput"
      />
      <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
        Click to select folders or drag and drop here
      </label>
      <pre>{JSON.stringify(directoryStructure, null, 2)}</pre>
    </div>
  );
};

export default FileUpload;
