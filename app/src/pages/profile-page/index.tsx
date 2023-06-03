import React, { useContext, useEffect, useState } from 'react'
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
import { getById } from '../../services/userService';
import User from '../../model/user';

function ProfilePage() {

    const {id} = useParams();
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const [user, setUser] = useState<User>({
        location: " ",
        firstName: " ",
        lastName: " ",
        username: " ",
        email: " ",
        penalties: 0,
        role: " ",
        phoneNumber: " "
    });

    const routeProtector = useRouteProtector();
    
    useEffect(() => {
        checkUserAuthorities();
        fetchData();
    }, [id])

    const checkUserAuthorities = () => {
        if (context.user.id != id) {
            WarningMessage("You don't have permissions for this page");
            navigate("/");
        }
    }

    const fetchData = async () => {
        let response = await getById(+context.user.id)
        let user : User = {
            location: response.data.location,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            username: response.data.username,
            email: response.data.email,
            penalties: response.data.penalties,
            role: response.data.role,
            phoneNumber: response.data.phoneNumber
        };
        setUser(user);
    }

    return (
    <div className={classes["profile"]}>
        <UserInformation 
            firstName={user.firstName}
            lastName={user.lastName} 
            username={user.username} 
            email={user.email} 
            location={user.location}
            role={context.user.role}
            phoneNumber={user.phoneNumber}
            penalties={user.penalties}
            rating={9.70}
        />
        <div className={classes['profile__bookings']}>
            <CardList rating={9.70} activeReservations={2} penalties={user.penalties}/>
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