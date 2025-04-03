import { createBrowserRouter } from "react-router-dom";
import IndexPage from "./pages";
import Flow1000 from "./layouts/flow1000";
import SectionContentFun from './pages/albumIndex';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage></IndexPage>
  },
  {
    path: "/flow1000",
    element: <Flow1000 />,
    children: [
      {
        path: "/flow1000/sectionListFun",
        element: <SectionContentFun />
      },
    ]
  }
]);