import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/notFound";
import FolderDragAndDrop from "./pages/dragDrop/FolderDragAndDrop";
import DndKitContextProvider from "./components/dndKit/DndKitContextProvider";

const App = () => (
  <DndKitContextProvider>
    <Routes>
      <Route index element={<FolderDragAndDrop />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </DndKitContextProvider>
);

export default App;
