export function findPathById(json, targetId) {
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
  for (const item of json) {
    if (traverse(item, [])) {
      break;
    }
  }

  return path;
}

export function findDetailsById(json, targetId) {
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

  for (const item of json) {
    if (traverse(item)) {
      break;
    }
  }

  return result; // Return the found node or null if not found
}

export function getRealNodeId(nodeId) {
  return nodeId.includes("+") ? nodeId.split("+").pop() : nodeId;
}

export function moveNodeByIds(json, activeId, overId) {
  if (!overId) return json; // Check if overId is falsy

  const realActiveId = getRealNodeId(activeId); // Extract last segment if structured
  const realOverId = getRealNodeId(overId); // Extract last segment if structured

  if (realActiveId === realOverId) {
    return json;
  }

  const data = JSON.parse(JSON.stringify(json)); // Deep clone the JSON data

  let nodeToMove = null;
  let isNodeMoved = false;

  const findAndRemoveNode = (nodes, parentId = null) => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === realActiveId) {
        nodeToMove = nodes.splice(i, 1)[0];
        return true;
      }
      if (nodes[i].children) {
        if (findAndRemoveNode(nodes[i].children, nodes[i].id)) {
          return true;
        }
      }
    }
  };

  const findAndAddNode = (nodes) => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === realOverId && nodes[i].type === "folder") {
        if (!nodes[i].children) {
          nodes[i].children = [];
        }
        nodes[i].children.push(nodeToMove);
        isNodeMoved = true;
        return true;
      }
      if (nodes[i].children) {
        if (findAndAddNode(nodes[i].children)) {
          return true;
        }
      }
    }
  };

  findAndRemoveNode(data);
  if (nodeToMove) {
    findAndAddNode(data);
    if (isNodeMoved) {
      return data;
    }
  }
  return json;
}
