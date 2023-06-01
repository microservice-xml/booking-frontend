import { getAllRegisteredUsers, getById, registerUser } from "../../services/userService";
import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import FormButton from "../../components/FormComponents/Button";
import AuthContext from "../../context/AuthContext";
import { changeRateHost, rateHost } from "../../services/rateHostService";
import { useLocation, useNavigate } from "react-router-dom";

const EditRateHostPage = () => {

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
    const location = useLocation();
    const hostId = new URLSearchParams(location.search).get('hostId');
    const id = new URLSearchParams(location.search).get('id');
    const [hostLastName, setHostLastName] = useState<string>('');
    const [hostFirstName, setHostFirstName] = useState<string>('');

    const [formData, setFormData] = useState({
        id: id,
        hostId: hostId,
        guestId: context.user.id,
        rateValue: "",
        rateDate: initialRateDate,
    });

    const getHostName = async () => {
        let response = await getById(Number(hostId));
        setHostLastName(response.data.lastName);
        setHostFirstName(response.data.firstName);
    };

    useEffect(() => {
        getHostName();
    }, [])

    const onSubmit = async () => {
        console.log(formData);
        let response = await changeRateHost(formData);
        console.log(response);
        navigate(`/host-ratings-page?id=${formData.hostId}`);
    }

    return (
        <div className="register-container">
            <div className="register-container__inside">
                <div className="register-container__inside__label">
                    Host Name:
                    <div className="register-container__inside__hostLastName">
                        {hostLastName} {hostFirstName}
                    </div>
                </div>
                <div className="register-container__inside__label">
                    Grade:
                </div>
                <div className="register-container__inside__text">
                    <select
                        className="register-container__inside__text__content"
                        name="rateValue"
                        value={formData.rateValue}
                        onChange={(e) =>
                            setFormData({ ...formData, rateValue: e.target.value })
                        }
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

export default EditRateHostPage;