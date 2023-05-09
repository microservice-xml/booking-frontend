import "./index.scss";
import React, { useEffect, useState } from "react";
import { createAccommodation } from "../../services/accommodationService";

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

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        facilities: [] as Facility[],
        photo: "",
        minGuests: "",
        maxGuests: "",
        availableBeds: "",
        accommodationGradeId: "",
        isAuto: false,
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
        console.log(response);
    };

    const handleCheckboxChange = (facility: any) => {
        const { facilities } = formData;
        const updatedFacilities = [...facilities];

        // Check if the facility is already selected
        const facilityIndex = facilities.indexOf(facility);

        if (facilityIndex === -1) {
            // Facility not selected, add it to the selected facilities array
            updatedFacilities.push(facility);
        } else {
            // Facility already selected, remove it from the selected facilities array
            updatedFacilities.splice(facilityIndex, 1);
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            facilities: updatedFacilities,
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
                <div className="container__inside__text__facilities">
                    {facilitiesOptions.map((facility) => (
                        <div key={facility}>
                            <label>
                                <input
                                    type="checkbox"
                                    name={facility}
                                    checked={formData.facilities.includes(facility)}
                                    onChange={() => handleCheckboxChange(facility)}
                                />
                                {facility}
                            </label>
                        </div>
                    ))}
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