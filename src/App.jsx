import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/notFound";
import FolderDragAndDrop from "./pages/dragDrop/FolderDragAndDrop";
import DndKitWrapper from "./components/dndKit/DndKitWrapper";

const App = () => {
  return (
    <DndKitWrapper>
      <Routes>
        <Route index element={<FolderDragAndDrop />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </DndKitWrapper>
  );
};

export default App;
