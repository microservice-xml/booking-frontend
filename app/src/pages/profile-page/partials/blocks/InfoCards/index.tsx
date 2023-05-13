import React, { useContext } from 'react'
import classes from './index.module.scss';
import MyProfileCard from '../../components/Card';
import AuthContext from '../../../../../context/AuthContext';

type Props = {
  rating? : number,
  penalties? : number, 
  activeReservations : number
}

function CardList(props: Props) {

  const context = useContext(AuthContext);

  return (
    <div className={classes['status']}>         
        <MyProfileCard image={'/icons/reservation.png'} header={'Total Reservations'} number={25} duration={3}/>
        <MyProfileCard image={'/icons/approve.png'} header={'Active Reservations'} number={props.activeReservations} duration={1}/>
        {context.user.role == 'GUEST' ? 
          <MyProfileCard image={'/icons/renied.png'} header={'Canceled Reservations'} number={props.penalties as any} duration={1.25}/> 
          : 
          <MyProfileCard image={'/icons/rating.png'} header={'My Rating'} number={props?.rating as any} duration={2} decimals={2}/> }
    </div>
  )
}

export default CardList