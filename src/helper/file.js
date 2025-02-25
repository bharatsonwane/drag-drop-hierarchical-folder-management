export function findNodePathById(schema, targetId) {
  const path = [];

  function traverse(node, currentPath) {
    // Add the current node to the path
    currentPath.push({ id: node.id, type: node.type, name: node.name });

    // Check if the current node is the target
    if (node.id === targetId) {
      path.push(...currentPath); // Store the path when target is found
      return true;
    }

    // If the node has children, traverse them
    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        if (traverse(child, [...currentPath])) {
          return true;
        }
      }
    }

    return false; // Return false if target not found in this branch
  }

  // Iterate over the top-level nodes in the JSON array
  for (const item of schema) {
    if (traverse(item, [])) {
      break;
    }
  }

  return path;
}

export function findNodeDetailsById(schema, targetId) {
  let result = null;

  function traverse(node) {
    if (node.id === targetId) {
      result = node; // Store the node details when target is found
      return true;
    }

    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        if (traverse(child)) {
          return true;
        }
      }
    }

    return false;
  }

  for (const item of schema) {
    if (traverse(item)) {
      break;
    }
  }

  return result; // Return the found node or null if not found
}

export function getRealNodeId(nodeId) {
  return nodeId.includes("!^|") ? nodeId.split("!^|").pop() : nodeId;
}

export const removeNodeById = (schema, targetId) => {
  const updatedSchema = JSON.parse(JSON.stringify(schema)); // Deep clone the JSON data

  let removedNode = null;

  const removeNodeRecursion = (nodes) => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === targetId) {
        removedNode = nodes.splice(i, 1)[0];
        return true;
      }
      if (nodes[i].children && removeNodeRecursion(nodes[i].children)) {
        return true;
      }
    }
  };

  removeNodeRecursion(updatedSchema);
  return { updatedSchema, removedNode };
};

export const addNodeById = (schema, targetId, nodeToAdd) => {
  const updatedSchema = JSON.parse(JSON.stringify(schema)); // Deep clone the JSON data
  let errorMessage = "";

  const addNodeRecursion = (nodes) => {
    for (let node of nodes) {
      if (node.id === targetId && node.type === "folder") {
        node.children = node.children || [];

        const isDuplicate = node.children.some(
          (child) =>
            (child.type === nodeToAdd.type && child.name === nodeToAdd.name) ||
            child.id === nodeToAdd.id
        );

        if (isDuplicate) {
          errorMessage = `${
            nodeToAdd.type === "folder" ? "Folder" : "File"
          } already exists with the name "${nodeToAdd.name}"`;
          return false;
        }

        node.children.push(nodeToAdd);
        return true;
      }

      if (node.children && addNodeRecursion(node.children)) {
        return true;
      }
    }
    return false;
  };

  const isNodeAdded = addNodeRecursion(updatedSchema);

  return { updatedSchema, isNodeAdded, errorMessage };
};

export function moveNodeByIds(schema, overId, activeIds = []) {
  if (!schema || !overId || !activeIds?.[0]) return schema; // Check if overId is falsy
  const realOverId = getRealNodeId(overId); // Extract last segment if structured

  let updatedSchema = schema;

  for (const activeId of activeIds) {
    const realActiveId = getRealNodeId(activeId); // Extract last segment if structured

    if (realActiveId === realOverId) {
      continue;
    }

    // remove the node from the original position
    const { updatedSchema: updatedSchemaAfterNodeRemoved, removedNode } =
      removeNodeById(updatedSchema, realActiveId);

    if (!removedNode) {
      continue;
    }

    // add the node to the new position
    const { updatedSchema: updatedSchemaAfterNodeAdded, isNodeAdded } =
      addNodeById(updatedSchemaAfterNodeRemoved, realOverId, removedNode);

    // Update the schema if the node was successfully moved
    if (isNodeAdded) {
      updatedSchema = updatedSchemaAfterNodeAdded;
    }
  }

  return updatedSchema;
}
