import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import { Provider as ReduxProvider } from "react-redux";
import "@/styles/globals.css";
import { store } from './store'

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <Provider>
          <App />
        </Provider>
      </ReduxProvider>
    </BrowserRouter>
  // </React.StrictMode>,
);
