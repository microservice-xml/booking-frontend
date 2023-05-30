import React, { useState, useEffect, useContext } from 'react'
import User from '../../model/user';
import FormButton from '../../components/FormComponents/Button';
import { useLocation, useNavigate } from 'react-router';
import { changePersonalInfo } from '../../services/userService';
import { SuccesMessage } from '../../utils/toastService/toastService';
import AuthContext from '../../context/AuthContext';
import useRouteProtector from '../../utils/routeProtector/routeProtector';
import { createTextChangeRange } from 'typescript';

function EditProfile() {

    let _ = useRouteProtector();
    const context = useContext(AuthContext);

    const [formData, setFormData] = useState<User>({
        id: context.user.id,
        firstName: "",
        lastName: "",
        email: "",
        location: "",
        username: "",
        password: "",
        penalties: 0,
        phoneNumber: "",
        role: "",
    });

    const navigate = useNavigate();
    

    const location = useLocation();
    useEffect(() => {
        setFormData(location.state.userData);
    }, [])


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        console.log(formData);
        formData.id = context.user.id;
        let response = await changePersonalInfo(formData) 

        if (!response || !response.data) {
            console.log("ERROR");
        }

        SuccesMessage("You have succesfully changed your personal information");
        context.logout();
        navigate('/authenticate');
    }

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
                    <div className="register-container__inside__button">
                        <FormButton submitHandler={handleSubmit} text={'submit'}/>
                    </div>
                </div>
            </div>
  )
}

export default EditProfile;