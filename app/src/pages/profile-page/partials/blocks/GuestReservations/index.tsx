import React from 'react'
import classes from './index.module.scss';
import ReservationCard from '../../components/Reservation';

function GuestReservations() {
  return (
    <div className={classes['reservation-list']}>
        <ReservationCard name='Sunny Home' address='Vojvode Stepe 22, Beograd' startDate='20-01-2023' endDate='23-01-2023'/>
        <ReservationCard name='Vila Impresija' address='Zlatna Ulica, Rakovac' startDate='20-01-2023' endDate='23-01-2023'/>
        <ReservationCard name='Kuca na Drini' address='Drinska 22, Bajina Basta' startDate='20-01-2023' endDate='23-01-2023'/>
        <ReservationCard name='Vikendica' address='Fruska Gora' startDate='20-01-2023' endDate='23-01-2023'/>
    </div>
  )
}

export default GuestReservations