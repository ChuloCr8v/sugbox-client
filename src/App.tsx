import { ConfigProvider } from "antd";
import "./App.css";
import Layout from "./pages/Layout";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Axios from "axios";

function App() {
  Axios.defaults.baseURL = "https://sug-server.up.railway.app/api/";
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0275ff",
        },
      }}
    >
      <Provider store={store}>
        <Layout />
      </Provider>
    </ConfigProvider>
  );
}

export default App;
