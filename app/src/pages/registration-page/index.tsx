import { registerUser } from "../../services/userService";
import React, { useEffect, useState } from "react";
import "./index.scss";

const RegistrationPage = () => {

    const generateRandomId = () => {
        // Generate a random number between 1 and 1000 as the ID
        return Math.floor(Math.random() * 1000) + 1;
    };

    const [formData, setFormData] = useState({
        id: generateRandomId().toString(),
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
        <div className="container">
            <div className="container__inside">
                <div className="container__inside__label">
                    First Name:
                </div>
                <div className="container__inside__text">
                    <input className="container__inside__text__content"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}></input>
                </div>
                <div className="container__inside__label">
                    Last Name:
                </div>
                <div className="container__inside__text">
                    <input className="container__inside__text__content" type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}></input>
                </div>
                <div className="container__inside__label">
                    Email:
                </div>
                <div className="container__inside__text">
                    <input className="container__inside__text__content" type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}></input>
                </div>
                <div className="container__inside__label">
                    Living place:
                </div>
                <div className="container__inside__text">
                    <input className="container__inside__text__content" type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}></input>
                </div>
                <div className="container__inside__label">
                    Username:
                </div>
                <div className="container__inside__text">
                    <input className="container__inside__text__content" type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}></input>
                </div>
                <div className="container__inside__label">
                    Password:
                </div>
                <div className="container__inside__text">
                    <input className="container__inside__text__content" type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}></input>
                </div>
                <div className="container__inside__label">
                    Role:
                </div>
                <div className="container__inside__text">
                    <input className="container__inside__text__content" type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}></input>
                </div>
                <div className="container__inside__button">
                    <button onClick={onSubmit} className="container__inside__button__content">Register</button>
                </div>
            </div>
        </div>
    )
}

export default RegistrationPage;