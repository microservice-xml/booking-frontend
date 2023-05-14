import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import AutocompleteControl from "../FormComponents/AutocompleteControl";
import DatePickerControl from "../FormComponents/DatePickerControl";
import { useForm, FormProvider } from "react-hook-form";
import cities from "../../constants/Cities";
import TextFieldControl from "../FormComponents/TextFieldControl";
import { searchAccommodations } from "../../services/accommodationService";

const SearchComponent = () => {
  const form = useForm();
  const navigate = useNavigate();

  const {
    setValue,
    watch,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (dto: any) => {
    const payload = {
      location: dto.city.label,
      start: dto.start.toISOString().slice(0, 10),
      end: dto.end.toISOString().slice(0, 10),
      guestCount: Number(dto.numOfGuests) || 0,
    };

    const res = await searchAccommodations(payload);
    navigate("/search-accommodations", {
      state: {
        accommodations: res.data,
        start: dto.start.toISOString().slice(0, 10),
        end: dto.end.toISOString().slice(0, 10),
        guestCount: Number(dto.numOfGuests) || 0,
      },
    });
  };

  return (
    <div className="search-container">
      <div className="search">
        <div className="search__title">
          <h1> Quickly scan all your favourite locations </h1>
        </div>
        <FormProvider {...form}>
          <div className="search__container">
            <div className="search__container-inputs">
              <AutocompleteControl
                name={"city"}
                control={control}
                options={cities}
                label={"From"}
                customClass={
                  "search__container-inputs--textbox input-rounded-left grow"
                }
                iconPath={require("../../assets/images/icons/airport-location.png")}
                popperWidth={"30rem"}
                defaultValue={"Novi Sad"}
              />
              <DatePickerControl
                label={"Start"}
                helperText={"DD/MM/YYYY"}
                control={control}
                name={"start"}
                customClass={"search__container-inputs--date-picker grow"}
              />
              <DatePickerControl
                label={"End"}
                helperText={"DD/MM/YYYY"}
                control={control}
                name={"end"}
                customClass={"search__container-inputs--date-picker grow"}
              />
              <TextFieldControl
                label={"Number of people"}
                name={"numOfGuests"}
                control={control}
                type={"number"}
                customClass={
                  "search__container-inputs--textbox input-rounded-right grow"
                }
                defaultValue={""}
              />
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

export default SearchComponent;
