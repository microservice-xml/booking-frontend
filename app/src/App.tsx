import "./App.css";
import Header from "./layouts/header";
import { getRoutes } from "./routes/routes";
import { ToastContainer } from "react-toastify";

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
