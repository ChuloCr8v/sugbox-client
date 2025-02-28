import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import "./App.css";
import Layout from "./pages/Layout";
import { store } from "./redux/store";

function App() {
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
