import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import "./App.css";
import Layout from "./pages/Layout";
import { store } from "./redux/store";
import { PopupProvider } from "./context/PopupContext";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ff6600",
        },
      }}
    >
      <Provider store={store}>
        <PopupProvider>
          <Layout />
        </PopupProvider>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
