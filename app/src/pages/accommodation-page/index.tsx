import { useParams } from "react-router";
import { useEffect, useState } from "react";
import {
  addAccommodationSlot,
  getAllAccommodationSlots,
  updateAccommodationSlot,
} from "../../services/reservationService";
import { formatDate } from "../../utils/toastService/utils";

import "./index.scss";
import { Button, TextField } from "@mui/material";
import PendingReservation from "../../components/PendingReservation";

const AccommodationPage = () => {
  const { id } = useParams();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addModeActive, setAddModeActive] = useState<boolean>(false);
  const [editModeActive, setEditModeActive] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [editedSlotId, setEditedSlotId] = useState();
  const [dateFormatError, setDateFormatError] = useState<boolean>(false);

  const fetchAccommodationSlots = async () => {
    const res = await getAllAccommodationSlots(Number(id || 0));
    if (!res || !res.data) return;
    setSlots(res.data);
    setLoading(false);
  };

  const addAvailabilitySlot = async () => {
    if (!isDateValid(startDate) || !isDateValid(endDate)) {
      setDateFormatError(true);
      return;
    }
    const payload = {
      start: startDate,
      end: endDate,
      price: price,
      accommodationId: id,
    };
    await addAccommodationSlot(payload);
    fetchAccommodationSlots();
  };

  const editAvailabilitySlot = async () => {
    if (!isDateValid(startDate) || !isDateValid(endDate)) {
      setDateFormatError(true);
      return;
    }
    const oldSlot: any = slots.find((s: any) => s.id === editedSlotId);
    console.log(slots);
    const payload = {
      ...oldSlot,
      start: startDate,
      end: endDate,
      price: price,
    };
    await updateAccommodationSlot(payload);
    setDateFormatError(false);
    fetchAccommodationSlots();
  };

  const isDateValid = (date: string) => {
    return date.length === 10 && date[4] === "-" && date[7] === "-";
  };

  const openAddAvailabilitySlotForm = async () => {
    setAddModeActive(true);
    setEditModeActive(false);
    setStartDate("");
    setEndDate("");
    setPrice(0);
    setDateFormatError(false);
  };

  const openEditAvailabilitySlotForm = async (slot: any) => {
    setAddModeActive(false);
    setEditModeActive(true);
    setStartDate(formatDate(slot.start));
    setEndDate(formatDate(slot.end));
    setPrice(slot.price);
    setEditedSlotId(slot.id);
    setDateFormatError(false);
  };

  useEffect(() => {
    console.log("logg");
    fetchAccommodationSlots();
  }, []);

  return (
    <div className="accommodation__wrapper">
      <div className="accommodation">
        <div className="accommodation__left">
          {!loading && (
            <>
              <h1>All accommodations's availability slots: </h1>
              {slots.map((s: any) => {
                return (
                  <div className="accommodation__slot-card" key={s.id}>
                    <p>
                      Period: {formatDate(s.start)} - {formatDate(s.end)}
                    </p>
                    <p>Price: {s.price}</p>
                    <Button
                      onClick={() => openEditAvailabilitySlotForm(s)}
                      sx={{ fontSize: 14 }}
                    >
                      Edit availability slot
                    </Button>
                  </div>
                );
              })}
            </>
          )}
          {!addModeActive && (
            <Button onClick={openAddAvailabilitySlotForm} sx={{ fontSize: 14 }}>
              Add new availability slot
            </Button>
          )}
        </div>
        <div className="accommodation__right">
          {(addModeActive || editModeActive) && (
            <>
              <TextField
                id="startDate"
                label="Start date"
                value={startDate}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setStartDate(event.target.value);
                }}
                sx={{ fontSize: 14 }}
              />
              <TextField
                id="endDate"
                label="End date"
                value={endDate}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setEndDate(event.target.value);
                }}
                sx={{ fontSize: 14 }}
              />
              <TextField
                id="price"
                label="Price"
                value={price}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPrice(Number(event.target.value) || 0);
                }}
                sx={{ fontSize: 14 }}
              />
              {addModeActive && (
                <Button onClick={addAvailabilitySlot} sx={{ fontSize: 14 }}>
                  Add
                </Button>
              )}
              {editModeActive && (
                <Button onClick={editAvailabilitySlot} sx={{ fontSize: 14 }}>
                  Edit
                </Button>
              )}
              {dateFormatError && (
                <p className="accommodation__date-format-error">
                  Date format has to be (yyyy-mm-dd)
                </p>
              )}
            </>
          )}
        </div>
      </div>
      <PendingReservation></PendingReservation>
    </div>
  );
};

export default AccommodationPage;
