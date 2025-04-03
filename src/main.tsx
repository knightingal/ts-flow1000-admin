import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { Provider as ReduxProvider } from "react-redux";
import "@/styles/globals.css";
import { store } from './store'
import { router } from "./Index";

ReactDOM.createRoot(document.getElementById("root")!).render(
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
);
