import "./App.css";
import Header from "./layouts/header";
import { getRoutes } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/scss/main.scss";

function App() {
  return (
    <div className="App">
      <Header />
      {getRoutes()}
      <ToastContainer />
    </div>
  );
}

export default App;
