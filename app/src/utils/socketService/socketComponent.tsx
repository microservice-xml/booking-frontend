import io from "socket.io-client";
import { InfoMessage } from "../../utils/toastService/toastService";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";

const SocketComponent = () => {
  const context = useContext(AuthContext);
  const socket = io("http://localhost:9088");
  useEffect(() => {
    socket.on("notifications", (data) => {
      if (context.isLoggedIn && data == context.user.id)
        InfoMessage("You have new message in your inbox.");
    });
  });
  return <></>;
};

export default SocketComponent;
