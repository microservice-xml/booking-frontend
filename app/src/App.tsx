import React, { useEffect } from "react";
import "./App.css";
import Header from "./layouts/header";
import { getRoutes } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/scss/main.scss";
import SocketComponent from "./utils/socketService/socketComponent";

function App() {
  return (
    <div className="App">
      <Header />
      {getRoutes()}
      <SocketComponent />
      <ToastContainer />
    </div>
  );
}

export default App;
