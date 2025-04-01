import { createBrowserRouter } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import AlbumIndexPage from "@/pages/albumIndex";

export const router = createBrowserRouter([
  {
    path:"/", element:<IndexPage />
  },
  {
    path:"/docs", element:<DocsPage />
  },
  {
    path:"/albumIndex", element:<AlbumIndexPage />
  },

]);
