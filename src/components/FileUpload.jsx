import React, { useState } from 'react';

const FileUpload = () => {
  const [directoryStructure, setDirectoryStructure] = useState(null);

  const handleDirectoryPicker = async () => {
    try {
      const directoryHandle = await window.showDirectoryPicker();
      const root = {
        id: `folder_${Date.now()}`,
        name: directoryHandle.name,
        type: 'folder',
        children: [],
        folderId: Date.now(),
      };

      const traverseDirectory = async (dirHandle, parent) => {
        for await (const entry of dirHandle.values()) {
          const entryId = `folder_${Date.now()}`;
          const entryNode = {
            id: entryId,
            name: entry.name,
            type: entry.kind,
            children: [],
            folderId: Date.now(),
          };

          if (entry.kind === 'file') {
            const file = await entry.getFile();
            entryNode.file = file;
          } else if (entry.kind === 'directory') {
            await traverseDirectory(entry, entryNode);
          }

          parent.children.push(entryNode);
        }
      };

      await traverseDirectory(directoryHandle, root);
      setDirectoryStructure(root);
    } catch (error) {
      console.error('Error accessing directory:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDirectoryPicker}>Select Folder</button>
      <pre>{JSON.stringify(directoryStructure, null, 2)}</pre>
    </div>
  );
};

export default FileUpload;