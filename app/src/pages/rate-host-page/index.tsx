import { getAllRegisteredUsers, registerUser } from "../../services/userService";
import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import FormButton from "../../components/FormComponents/Button";
import AuthContext from "../../context/AuthContext";
import { rateHost } from "../../services/rateHostService";
import { useNavigate } from "react-router-dom";

const RateHostPage = () => {

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
    const [isHost, setIsHost] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        hostId: "",
        guestId: context.user.id,
        rateValue: "",
        rateDate: initialRateDate,
    });

    useEffect(() => {
        getAllHosts();
    }, [])

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const getAllHosts = async () => {
        let response = await getAllRegisteredUsers();
        const users = response.data; // Assuming response.data is an array of users
        const hostUsers = []; // Array to store host users

        for (let i = 0; i < users.length; i++) {
            const user = users[i];

            if (user.role === "HOST") {
                hostUsers.push(user);
            }
        }
        setIsHost(hostUsers);
    };

    const onSubmit = async () => {
        let response = await rateHost(formData);
        navigate(`/host-ratings-page?id=${formData.hostId}`);
    }

    return (
        <div className="register-container">
            <div className="register-container__inside">
                <div className="register-container__inside__label">
                    Host Name:
                </div>
                <div className="register-container__inside__text">
                    <select
                        className="register-container__inside__text__content"
                        name="hostId"
                        value={formData.hostId}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Host</option>
                        {isHost.map((host) => (
                            <option key={host.id} value={host.id}>
                                {host.username}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="register-container__inside__label">
                    Grade:
                </div>
                <div className="register-container__inside__text">
                    <select
                        className="register-container__inside__text__content"
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
                <div className="register-container__inside__button">
                    <FormButton submitHandler={onSubmit} text={'submit'} />
                </div>
            </div>
        </div>
    );
};

export default RateHostPage;