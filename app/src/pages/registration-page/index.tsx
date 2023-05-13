import { registerUser } from "../../services/userService";
import React, { useEffect, useState } from "react";
import "./index.scss";
import FormButton from "../../components/FormComponents/Button";

const RegistrationPage = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        location: "",
        username: "",
        password: "",
        numberOfCancelation: "",
        role: "",
    });

    const onSubmit = async () => {
        console.log(formData);
        let response = await registerUser(formData);
        console.log(response);
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
                    <input className="register-container__inside__text__content" type="text"
                        name="password"
                        value={formData.password}
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