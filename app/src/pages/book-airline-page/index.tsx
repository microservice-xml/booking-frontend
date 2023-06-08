import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from "../../utils/toastService/toastService";
import { getDate } from "../../utils/timeConverter/timeConverter";

const BookAirlinePage = () => {
    const location = useLocation();
    const reservationDetails = location.state;
    const form = useForm();
    const navigate = useNavigate();
    const [cities, setData] = useState([]);

    const {
        setValue,
        watch,
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = form;

    const onSubmit = async (dto: any) => {
        let departureCity = dto.from || "";
        let arrivalCity = dto.to || "";

        setValue("departureCity", departureCity);
        setValue("arrivalCity", arrivalCity);

        let obj = {
            departureCity,
            arrivalCity,
            departure: reservationDetails?.startDate || "",
            arrival: reservationDetails?.endDate || "",
            desiredSeats: reservationDetails?.numberOfGuests || 0,
        };

        console.log(obj);

        navigate("/choose-flight", {
            state: {
                data: obj,
            },
        });
    };

    return (
        <div className="search-container">
            <div className="search">
                <div className="search__title">
                    <h1> Quickly scan all your favourite travel sites </h1>
                </div>
                <FormProvider {...form}>
                    <div className="search__container">
                        <div className="search__container-inputs">
                            <div className="search__container-inputs--textbox grow">
                                <label htmlFor="from">From</label>
                                <input
                                    type="text"
                                    id="from"
                                    defaultValue={"Belgrade"}
                                    {...register("from")}
                                />
                            </div>
                            <div className="search__container-inputs--textbox grow">
                                <label htmlFor="to">To</label>
                                <input
                                    type="text"
                                    id="to"
                                    defaultValue={"Barcelona"}
                                    {...register("to")}
                                />
                            </div>
                            <div className="search__container-inputs--textbox grow">
                                <label htmlFor="departure">Depart</label>
                                <input
                                    type="text"
                                    id="departure"
                                    defaultValue={reservationDetails?.startDate}
                                    {...register("departure")}
                                />
                            </div>
                            <div className="search__container-inputs--textbox grow">
                                <label htmlFor="arrival">Return</label>
                                <input
                                    type="text"
                                    id="arrival"
                                    defaultValue={reservationDetails?.endDate}
                                    {...register("arrival")}
                                />
                            </div>
                        </div>
                        <button
                            className="search__container-button"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Search
                        </button>
                    </div>
                </FormProvider>
            </div>
        </div>
    );
};

export default BookAirlinePage;
