import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getAllAccommodationSlots } from '../../services/reservationService';
import { formatDate } from '../../utils/toastService/utils';

import "./index.scss";
import { Button, TextField } from '@mui/material';

const AccommodationPage = () => {
  const { id } = useParams();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addModeActive, setAddModeActive] = useState<boolean>(false);
  const [editModeActive, setEditModeActive] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  // const [editedSlotId, setEditedAppointmentId] = useState<>

  const fetchAccommodationSlots = async () => {
    const res = await getAllAccommodationSlots(Number(id || 0));
    if (!res || !res.data) return;
    setSlots(res.data);
    setLoading(false);
  };

  const addAvailabilitySlot = async () => {
    // await addAccommodationSlot();
    window.location.reload();
  };

  const editAvailabilitySlot = async () => {

  };

  const openAddAvailabilitySlotForm = async () => {
    setAddModeActive(true);
    setEditModeActive(false);
  };

  const openEditAvailabilitySlotForm = async (slot: any) => {
    setAddModeActive(true);
    setEditModeActive(false);
    setStartDate(slot.start);
    setEndDate(slot.end);
  };

  useEffect(() => {
    console.log("logg")
    fetchAccommodationSlots();
  }, []);

  return (
    <div className='accommodation'>
      <div className='accommodation__left'>
        {!loading &&
          <>
            <h1>All accommodations's availability slots: </h1>
            {slots.map((s: any) => {
              return (
                <div className='accommodation__slot-card'>
                  <p>Period: {formatDate(s.start)} - {formatDate(s.end)}</p>
                  <p>Price: {s.price}</p>
                  <Button onClick={() => openEditAvailabilitySlotForm(s)}>Edit availability slot</Button>
                </div>
              );
            })}
            {!addModeActive && <Button onClick={openAddAvailabilitySlotForm}>Add new availability slot</Button>}
          </>}
      </div>
      <div className='accommodation__right'>
        {addModeActive || editModeActive &&
          <>
            <TextField
              id="startDate"
              label="Start date"
              value={startDate}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setStartDate(event.target.value);
              }}
            />
            <TextField
              id="endDate"
              label="End date"
              value={endDate}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEndDate(event.target.value);
              }}
            />
            {addModeActive && <Button onClick={addAvailabilitySlot}>Add</Button>}
            {editModeActive && <Button onClick={editAvailabilitySlot}>Edit</Button>}
          </>
        }
      </div>
    </div>
  );
};

export default AccommodationPage;