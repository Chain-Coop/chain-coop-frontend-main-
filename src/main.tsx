import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./shared/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import ToastContainerWrapper from "./toastcontainer/ToastContainerWrapper";
import GlobalPinSetupManager from "./components/common/GlobalPinSetUpManager";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
let persistor = persistStore(store);
root.render(
  
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ToastContainerWrapper />
      </PersistGate>
    </Provider>
);
