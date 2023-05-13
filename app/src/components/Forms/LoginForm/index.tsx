import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import TextFieldControl from "../../FormComponents/TextFieldControl";
import { login } from "../../../services/auth/authenticationService";
import { useNavigate } from "react-router-dom";
import FormRules from "../Rules/FormRules";
import AuthContext from "../../../context/AuthContext";
import {
  ErrorMessage,
  SuccesMessage,
} from "../../../utils/toastService/toastService";
import FormButton from "../../FormComponents/Button";
import classes from '../../../pages/login-page/index.module.scss';

const LoginForm = () => {
  const form = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const context = useContext(AuthContext);

  const {
    setValue,
    watch,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const handleClick = () => {
    navigate("/register");
  };

  const onSubmit = async (dto: any) => {
    let response: any;
    response = await login(dto);
    if (!response || !response.ok) {
      ErrorMessage("Invalid credentials");
      return;
    }

    context.login(response.data.token);
    SuccesMessage("Welcome back!");
    navigate("/");
  };

  return (
    <div className={classes["form-wrapper"]}>
      <div className={classes["form-wrapper__header"]}>Glad to have you back!</div>
      <FormProvider {...form}>
        <div className={classes["form-wrapper__item"]}>
          <TextFieldControl
            label={"Username"}
            name={"username"}
            control={control}
            defaultValue={""}
            rules={FormRules["name"]}
            error={Boolean(errors.username)}
            helperText={errors.username && (errors.username.message as string)}
          />
        </div>
        <div className={classes["form-wrapper__item"]}>
          <TextFieldControl
            label={"Password"}
            name={"password"}
            control={control}
            type={"password"}
            defaultValue={""}
            rules={FormRules["password"]}
            error={Boolean(errors.password)}
            helperText={errors.password && (errors.password.message as string)}
          />
        </div>
        <div className={classes["form-wrapper__button"]}>
          <FormButton submitHandler={handleSubmit(onSubmit)} text={'submit'}/>
        </div>
        {errorMessage && (
          <span className={classes["form-wrapper__link"]}>{errorMessage}</span>
        )}
        <span className={classes["form-wrapper__link"]} onClick={handleClick}>
          {"Still not our member? Make sure to join us!"}
        </span>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
