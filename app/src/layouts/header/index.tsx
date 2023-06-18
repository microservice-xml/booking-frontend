import { useNavigate } from "react-router-dom";
import "./index.scss";
import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import NavButton from "./navbutton";
import FormButton from "../../components/FormComponents/Button";

const Header = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  let role = context.user.role;
  let isLoggedIn = context.isLoggedIn;
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

  const myProfileHandler = () => {
    navigate("/profile/" + context.user.id);
  };

  const getLoggedButtons = () => {
    return (
      <React.Fragment>
        {!isLoggedIn ? (
          <NavButton text="About us" />
        ) : (
          <>
            <NavButton text={"My Profile"} handlerFunction={myProfileHandler} />
            <NavButton
              text={"Inbox"}
              iconPath={require("../../assets/images/icons/inbox.png")}
              handlerFunction={() => navigate("/notifications")}
            />
          </>
        )}
        {isLoggedIn ? getLogoutButton() : getLoginButton()}
        {!isLoggedIn && getRegisterButton()}
      </React.Fragment>
    );
  };

  const getLoginButton = () => {
    return (
      <NavButton
        text="Log in"
        iconPath={require("../../assets/images/icons/user-large1.png")}
        handlerFunction={loginHandler}
      />
    );
  };

  const getRegisterButton = () => {
    return (
      <FormButton
        text="Join us"
        submitHandler={registerHandler}
        styling={"button-dims"}
      />
    );
  };

  const getLogoutButton = () => {
    return (
      <NavButton
        text="Logout"
        iconPath={require("../../assets/images/icons/logout.png")}
        handlerFunction={logoutHandler}
      />
    );
  };

  const getGuestNavbar = () => {
    return (
      <React.Fragment>
        <NavButton
          text={"My Reservations"}
          handlerFunction={() => navigate("/my-reservations")}
        />
        <NavButton
          text={"Rate Host"}
          handlerFunction={() => navigate("/rate-host-page")}
        />
        <NavButton
          text={"Rate Accommodation"}
          handlerFunction={() => navigate("/rate-accommodation-page")}
        />
      </React.Fragment>
    );
  };

  const getHostNavbar = () => {
    return (
      <React.Fragment>
        <NavButton
          text={"New accommodation"}
          handlerFunction={() => navigate("/create-accommodation")}
        />
      </React.Fragment>
    );
  };

  return (
    <div className={"header"}>
      <div className={"header-main"}>
        <div className={"header-main__logo"} onClick={handleClick}>
          <div className={"header-main__logo-logo"}></div>
          <div className={"header-main__logo-text"}>Bookerdealer</div>
        </div>
        <div className={"header-main__options"}>
          {role === "GUEST" && getGuestNavbar()}
          {role === "HOST" && getHostNavbar()}
          {getLoggedButtons()}
        </div>
      </div>
    </div>
  );
};

export default Header;
