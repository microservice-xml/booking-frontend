import { useNavigate } from "react-router-dom";
import "./index.scss";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const Header = () => {

  const navigate = useNavigate();
  const context = useContext(AuthContext);
  let role = context.user.role;
  let isLoggedIn = context.isLoggedIn;
  //   const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  const loginHandler = () => {
    navigate("/authenticate");
  };

  const logoutHandler = () => {
    context.logout();
    navigate("/");
  };

  const registerHandler = () => {
    navigate("/register");
  };

  return (
    <div className={"header"}>
      <div className={"header-main"}>
        <div className={"header-main__logo"} onClick={handleClick}>
          <div className={"header-main__logo-logo"}></div>
          <div className={"header-main__logo-text"}>Bookerdealer</div>
        </div>
        <div className={"header-main__options"}></div>
      </div>
    </div>
  );
};

export default Header;
