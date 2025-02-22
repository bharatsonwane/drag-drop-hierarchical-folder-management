import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/notFound";
import FolderDragAndDrop from "./pages/dragDrop/FolderDragAndDrop";
import DndKitContext from "./components/dndKit/DndKitContext";

const App = () => (
  <DndKitContext>
    <Routes>
      <Route index element={<FolderDragAndDrop />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </DndKitContext>
);

export default App;
