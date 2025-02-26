import { Breadcrumbs, Link, Typography } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import DraggableAndDroppableElement from "../../../components/dndKit/DraggableAndDroppableElement";

function FolderBreadcrumb({
  activeFolderPath = [],
  handleSetActiveNode = () => {},
}) {
  const FolderBreadcrumbItem = ({ folderItem, index }) => {
    return (
      <div
        key={folderItem.id}
        onClick={() => {
          handleSetActiveNode(folderItem.id);
        }}
      >
        <DraggableAndDroppableElement
          id={`breadcrumb!^|${folderItem.id}`}
          info={folderItem}
        >
          {index !== activeFolderPath.length - 1 ? (
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
        </DraggableAndDroppableElement>
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
        {activeFolderPath.map((folderItem, index) => (
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
