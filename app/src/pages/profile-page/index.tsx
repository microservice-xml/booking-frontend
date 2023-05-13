import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router';
import AuthContext from '../../context/AuthContext';
import { WarningMessage } from '../../utils/toastService/toastService';
import useRouteProtector from '../../utils/routeProtector/routeProtector';
import classes from './index.module.scss';
import CountUp from 'react-countup';
import CardList from './partials/blocks/InfoCards';
import UserInformation from './partials/blocks/UserInfomation';
import Moment from 'react-moment';
import moment from 'moment';
import ReservationCard from './partials/components/Reservation';
import GuestReservations from './partials/blocks/GuestReservations';
import HostLocations from './partials/blocks/HostLocations';

function ProfilePage() {

    const {id} = useParams();
    const navigate = useNavigate();
    const context = useContext(AuthContext);

    const routeProtector = useRouteProtector();
    
    useEffect(() => {
        checkUserAuthorities();
    }, [id])

    const checkUserAuthorities = () => {
        if (context.user.id != id) {
            WarningMessage("You don't have permissions for this page");
            navigate("/");
        }
    }

    return (
    <div className={classes["profile"]}>
        <UserInformation 
            firstName='Milos'
            lastName='Gravara' 
            username='gravarica' 
            email='milos.gravara@gmail.com' 
            location='Milana Savica12'
            role={context.user.role}
            phoneNumber='+381637437123'
            rating={9.70}
        />
        <div className={classes['profile__bookings']}>
            <CardList rating={9.70} activeReservations={2}/>
            <div className={classes['profile__bookings-list']}>
                <div className={classes['profile__bookings-list--header']}>
                    {context.user.role === 'GUEST' ? "My Reservations" : "My Locations"}
                </div>
                {context.user.role === 'GUEST' ? <GuestReservations /> : <HostLocations />}
            </div>
        </div>
    </div>
    )
}

export default ProfilePage