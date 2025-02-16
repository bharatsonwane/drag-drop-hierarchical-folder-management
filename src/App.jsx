import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/notFound";
import FolderDragAndDrop from "./pages/dragDrop/FolderDragAndDrop";

const App = () => (
  <Routes>
      <Route index element={<FolderDragAndDrop />} />
      <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
