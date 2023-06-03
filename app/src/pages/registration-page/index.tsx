import { registerUser } from "../../services/userService";
import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import "./index.scss";
import FormButton from "../../components/FormComponents/Button";
import { ErrorMessage, SuccesMessage } from "../../utils/toastService/toastService";

const RegistrationPage = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        location: "",
        username: "",
        password: "",
        numberOfCancelation: "",
        phoneNumber: "",
        role: "",
    });

    const onSubmit = async () => {
        console.log(formData);
        let response = await registerUser(formData);

        if(!response || !response.data) {
            ErrorMessage("Something went wrong, please try again")
            return;
        }
        SuccesMessage("Welcome to our family!")
        navigate('/authenticate')
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <div className="register-container">
            <div className="register-container__inside">
                <div className="register-container__inside__label">
                    First Name:
                </div>
                <div className="register-container__inside__text">
                    <input className="register-container__inside__text__content"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}></input>
                </div>
                <div className="register-container__inside__label">
                    Last Name:
                </div>
                <div className="register-container__inside__text">
                    <input className="register-container__inside__text__content" type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}></input>
                </div>
                <div className="register-container__inside__label">
                    Email:
                </div>
                <div className="register-container__inside__text">
                    <input className="register-container__inside__text__content" type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}></input>
                </div>
                <div className="register-container__inside__label">
                    Living place:
                </div>
                <div className="register-container__inside__text">
                    <input className="register-container__inside__text__content" type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}></input>
                </div>
                <div className="register-container__inside__label">
                    Username:
                </div>
                <div className="register-container__inside__text">
                    <input className="register-container__inside__text__content" type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}></input>
                </div>
                <div className="register-container__inside__label">
                    Password:
                </div>
                <div className="register-container__inside__text">
                    <input className="register-container__inside__text__content"
                        name="password"
                        type={'password'}
                        value={formData.password}
                        onChange={handleChange}></input>
                </div>
                <div className="register-container__inside__label">
                    Phone Number:
                </div>
                <div className="register-container__inside__text">
                    <input className="register-container__inside__text__content"
                        name="phoneNumber"
                        type={'text'}
                        value={formData.phoneNumber}
                        onChange={handleChange}></input>
                </div>
                <div className="register-container__inside__label">Role:</div>
                <div className="register-container__inside__text">
                    <select
                        className="register-container__inside__text__content"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="">Select Role</option>
                        <option value="HOST">HOST</option>
                        <option value="GUEST">GUEST</option>
                    </select>
                </div>
                <div className="register-container__inside__button">
                    <FormButton submitHandler={onSubmit} text={'submit'}/>
                </div>
            </div>
        </div>
    )
}

export default RegistrationPage;