import { useNavigate } from "react-router-dom";
import "./index.scss";

const Header = () => {
  //   const navigate = useNavigate();
  const handleClick = () => {
    // navigate("/");
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
