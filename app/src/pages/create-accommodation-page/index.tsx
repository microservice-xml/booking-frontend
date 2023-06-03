import "./index.scss";
import React, { useEffect, useState, useContext } from "react";
import { createAccommodation } from "../../services/accommodationService";
import AuthContext from "../../context/AuthContext";
import { ErrorMessage, SuccesMessage } from "../../utils/toastService/toastService";
import { useNavigate } from "react-router-dom";

enum Facility {
    WIFI = "WIFI",
    INTERNET = "INTERNET",
    KITCHEN = "KITCHEN",
    BATHROOM = "BATHROOM",
    TV = "TV",
    SAFETY = "SAFETY",
    GARDEN = "GARDEN",
    POOL = "POOL",
    FITNESS = "FITNESS",
    PARKING = "PARKING",
}

const facilitiesOptions: Facility[] = Object.values(Facility);

const CreateAccommodation = () => {

    const context = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        facilities: "",
        photo: "",
        minGuests: "",
        maxGuests: "",
        availableBeds: "",
        accommodationGradeId: 1,
        isAuto: false,
        userId: context.user.id,
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const onSubmit = async () => {
        console.log(formData);
        let response = await createAccommodation(formData);
        
        if(!response || !response.data) {
            ErrorMessage("Something went wrong, please try again")
        }
        SuccesMessage("Welcome to our family!")
        navigate('/profile/' + context.user.id)
    };

    const handleCheckboxChange = (facility: any) => {

        setFormData((prevFormData) => ({
            ...prevFormData,
        }));
    };
    return (
        <div className="container">
            <div className="container__inside">
                <div className="container__inside__label">
                    Name:
                </div>
                <div className="container__inside__text">
                    <input className="container__inside__text__content"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}></input>
                </div>
                <div className="container__inside__label">
                    Location:
                </div>
                <div className="container__inside__text">
                    <input className="container__inside__text__content" type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}></input>
                </div>
                <div className="container__inside__label">
                    Facilities:
                </div>
                <div className="container__inside__text">
                    <input className="container__inside__text__content" type="text"
                        name="facilities"
                        value={formData.facilities}
                        onChange={handleChange}></input>
                </div>
                <div className="container__inside__label">
                    Photo:
                </div>
                <div className="container__inside__text">
                    <input
                        className="container__inside__text__photo"
                        type="file"
                        name="photo"
                        onChange={handleChange}
                    />
                </div>
                <div className="container__inside__label">
                    Minimum Guests:
                </div>
                <div className="container__inside__text">
                    <input className="container__inside__text__content" type="text"
                        name="minGuests"
                        value={formData.minGuests}
                        onChange={handleChange}></input>
                </div>
                <div className="container__inside__label">
                    Maximum guests:
                </div>
                <div className="container__inside__text">
                    <input className="container__inside__text__content" type="text"
                        name="maxGuests"
                        value={formData.maxGuests}
                        onChange={handleChange}></input>
                </div>
                <div className="container__inside__label">
                    Available beds:
                </div>
                <div className="container__inside__text">
                    <input className="container__inside__text__content" type="text"
                        name="availableBeds"
                        value={formData.availableBeds}
                        onChange={handleChange}></input>
                </div>
                <div className="container__inside__text">
                    <div className="radio-group">
                        <div className="radio-group__label">
                            Is Auto:
                        </div>
                        <div className="radio-group__options">
                            <label className="radio-group__option">
                                <input
                                    className="container__inside__text__content"
                                    type="radio"
                                    name="isAuto"
                                    value="true"
                                    checked={formData.isAuto === true}
                                    onChange={handleChange}
                                />
                                True
                            </label>
                            <label className="radio-group__option">
                                <input
                                    className="container__inside__text__content"
                                    type="radio"
                                    name="isAuto"
                                    value="false"
                                    checked={formData.isAuto === false}
                                    onChange={handleChange}
                                />
                                False
                            </label>
                        </div>
                    </div>
                </div>

                <div className="container__inside__button">
                    <button onClick={onSubmit} className="container__inside__button__content">Create accommodation</button>
                </div>
            </div>
        </div>
    )
}

export default CreateAccommodation;