import { getAllRegisteredUsers, registerUser } from "../../services/userService";
import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import FormButton from "../../components/FormComponents/Button";
import AuthContext from "../../context/AuthContext";
import { rateHost } from "../../services/rateHostService";
import { useNavigate } from "react-router-dom";
import { getAllAccommodation } from "../../services/accommodationService";
import { rateAccommodation } from "../../services/rateAccommodationService";

const RateAccommodationPage = () => {

    const currentDate = new Date().toISOString().split("T")[0];
    const currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
    const initialRateDate = `${currentDate}T${currentTime}`;
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [isAccommodation, setIsAccommodation] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        accommodationId: "",
        hostId: "10",
        guestId: context.user.id,
        rateValue: "",
        rateDate: initialRateDate,
    });

    useEffect(() => {
        getAllAccommodations();
    }, []);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };

    const getAllAccommodations = async () => {
        let response = await getAllAccommodation();
        const accommodations = response.data;
        const accommodationsArray = [];

        for (let i = 0; i < accommodations.length; i++) {
            const acc = accommodations[i];
            accommodationsArray.push(acc);

        }
        setIsAccommodation(accommodationsArray);
    };

    const onSubmit = async () => {
        console.log(formData);
        let response = await rateAccommodation(formData);
        navigate(`/accommodation-ratings-page?id=${formData.accommodationId}&userId=${formData.hostId}`);
    }

    return (
        <div className="rateacc-container">
            <div className="rateacc-container__inside">
                <div className="rateacc-container__inside__label">
                    Host Name:
                </div>
                <div className="rateacc-container__inside__text">
                    <select
                        className="rateacc-container__inside__text__content"
                        name="accommodationId" // Update the name attribute to "accommodationId"
                        value={formData.accommodationId}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Accommodation</option>
                        {isAccommodation.map((acco) => (
                            <option key={acco.id} value={acco.id}> {/* Change value to acco.id */}
                                {acco.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="rateacc-container__inside__label">
                    Grade:
                </div>
                <div className="rateacc-container__inside__text">
                    <select
                        className="rateacc-container__inside__text__content"
                        name="rateValue"
                        value={formData.rateValue}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Grade</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="rateacc-container__inside__button">
                    <FormButton submitHandler={onSubmit} text={'submit'} />
                </div>
            </div>
        </div>
    );
};

export default RateAccommodationPage;
