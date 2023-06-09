import React, { useState, useEffect, useContext } from "react";
import classes from "./index.module.scss";
import RoleMarker from "../../components/RoleMarker";
import { useNavigate } from "react-router";
import DialogComponent from "../../../../../components/Dialog";
import { deleteUserAccount } from "../../../../../services/userService";
import AuthContext from "../../../../../context/AuthContext";
import {
  SuccesMessage,
  WarningMessage,
} from "../../../../../utils/toastService/toastService";

type Props = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
  location: string;
  rating?: number;
  penalties?: number;
  highlighted: boolean;
};

function UserInformation(props: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const context = useContext(AuthContext);

  const deleteUserHandler = async () => {
    let response = await deleteUserAccount(Number(context.user.id));
    if (!response || !response.data) {
      WarningMessage("There has been an error, please try again later.");
    }

    if (response.data.includes("due")) {
      WarningMessage(response.data);
    } else {
      SuccesMessage(response.data);
      context.logout();
      navigate("/authenticate");
    }

    setOpen(false);
  };

  const goToEditProfile = () => {
    navigate("/edit-profile", { state: { userData: { ...props } } });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  return (
    <div className={classes["profile__info"]}>
      <div className={classes["profile__info-main"]}>
        <div className={classes["profile__info-main--image"]}>
          <img src={"/icons/user.png"} alt={"UserImage"} />
          {props.highlighted && (
            <div className={classes["profile__info-main--image--highlighted"]}>
              <img
                src={"/icons/highlighted-icon.png"}
                alt={"HighlightedImage"}
              />
            </div>
          )}
        </div>
        <div className={classes["profile__info-main--header"]}>
          {props.firstName + " " + props.lastName}
        </div>
        <div className={classes["profile__info-main--role"]}>
          <RoleMarker role={props.role} />
          {/* {props.highlighted && <RoleMarker role={"HIGHLIGHTED"}></RoleMarker>} */}
        </div>
      </div>
      <div className={classes["profile__info-details"]}>
        <div className={classes["profile__info-details--information"]}>
          <div className={classes["label"]}>Email</div>
          <div className={classes["value"]}>{props.email}</div>
        </div>
        <div className={classes["profile__info-details--information"]}>
          <div className={classes["label"]}>Username</div>
          <div className={classes["value"]}>{props.username}</div>
        </div>
        <div className={classes["profile__info-details--information"]}>
          <div className={classes["label"]}>Address</div>
          <div className={classes["value"]}>{props.location}</div>
        </div>
        <div className={classes["profile__info-details--information"]}>
          <div className={classes["label"]}>Phone Number</div>
          <div className={classes["value"]}>{props.phoneNumber}</div>
        </div>
      </div>
      <div className={classes["profile__info-manipulation"]}>
        <div className={classes["edit-profile"]} onClick={goToEditProfile}>
          Edit profile
        </div>
        <div className={classes["delete-profile"]} onClick={openDialog}>
          Delete Profile
        </div>
      </div>
      <DialogComponent
        open={open}
        handleAgree={deleteUserHandler}
        handleCancel={handleCancel}
        title={"Delete account"}
        text={
          "Are you sure you want to delete your account?. This action is permanent."
        }
      />
    </div>
  );
}

export default UserInformation;
