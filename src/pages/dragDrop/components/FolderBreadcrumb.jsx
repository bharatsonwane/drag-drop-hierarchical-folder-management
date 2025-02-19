import { Breadcrumbs, Link, Typography } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import DraggableAndDroppableItem from "../../../components/dndKit/DraggableAndDroppableItem";

function FolderBreadcrumb({
  selectedFolderPath = [],
  handleSelectNode = () => {},
}) {
  const FolderBreadcrumbItem = ({ folderItem, index }) => {
    return (
      <div
        key={folderItem.id}
        onClick={() => {
          handleSelectNode(folderItem.id);
        }}
      >
        <DraggableAndDroppableItem id={`breadcrumb+${folderItem.id}`}>
          {index !== selectedFolderPath.length - 1 ? (
            <Link
              component="button"
              variant="body2"
              onClick={() => {}}
              underline="hover"
              sx={{ cursor: "pointer" }}
            >
              {folderItem.name}
            </Link>
          ) : (
            <Typography color="text.primary">{folderItem.name}</Typography>
          )}
        </DraggableAndDroppableItem>
      </div>
    );
  };

  return (
    <div>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          padding: "8px",
          backgroundColor: "#f9fafc",
          borderRadius: "4px",
        }}
      >
        {selectedFolderPath.map((folderItem, index) => (
          <FolderBreadcrumbItem
            key={folderItem.id}
            index={index}
            folderItem={folderItem}
          />
        ))}
      </Breadcrumbs>
    </div>
  );
}

export default FolderBreadcrumb;
