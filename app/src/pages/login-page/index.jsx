import React from 'react'
import LoginForm from '../../components/Forms/LoginForm'
import classes from './index.module.scss';

function LoginPage() {
  return(<div className={classes["login-page"]}>
        <div className={classes["login-page__form-container"]}>
            <LoginForm />
        </div>
    </div>)
}

export default LoginPage