import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import AlbumIndexPage from "@/pages/albumIndex";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<AlbumIndexPage />} path="/albumIndex" />
    </Routes>
  );
}

export default App;
