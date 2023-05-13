import React from 'react'
import classes from './index.module.scss';
import RoleMarker from '../../components/RoleMarker';

type Props = {
    firstName : string,
    lastName: string,
    username: string,
    email: string,
    phoneNumber: string,
    role : string,
    location: string,
    rating?: number,
    penalties?: number
}

function UserInformation(props: Props) {
  return (
    <div className={classes['profile__info']}>
            <div className={classes['profile__info-main']}>
                <div className={classes['profile__info-main--image']}>
                    <img src={'/icons/user.png'} alt={'UserImage'} />
                </div>
                <div className={classes['profile__info-main--header']}>
                    {props.firstName + " " + props.lastName}
                </div>
                <div className={classes['profile__info-main--role']}>
                    <RoleMarker role={props.role} />
                </div>
            </div>
            <div className={classes['profile__info-details']}>
                <div className={classes['profile__info-details--information']}>
                    <div className={classes['label']}>
                        Email
                    </div>
                    <div className={classes['value']}>
                        {props.email}
                    </div>
                </div>
                <div className={classes['profile__info-details--information']}>
                    <div className={classes['label']}>
                        Username
                    </div>
                    <div className={classes['value']}>
                        {props.username}
                    </div>
                </div>
                <div className={classes['profile__info-details--information']}>
                    <div className={classes['label']}>
                        Address
                    </div>
                    <div className={classes['value']}>
                        {props.location}
                    </div>
                </div>
                <div className={classes['profile__info-details--information']}>
                    <div className={classes['label']}>
                        Phone Number
                    </div>
                    <div className={classes['value']}>
                        {props.phoneNumber}
                    </div>
                </div>
            </div>
            <div className={classes['profile__info-manipulation']}>
                <div className={classes['edit-profile']}>
                    Edit profile
                </div>
                <div className={classes['delete-profile']}>
                    Delete Profile
                </div>
            </div>
        </div>
  )
}

export default UserInformation