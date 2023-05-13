import React from 'react'
import classes from './index.module.scss';
import CountUp from 'react-countup';

type Props = {
    image : string,
    header : string,
    number : number
    duration: number
    decimals?: number
}

function MyProfileCard(props: Props) {
  return (
    <div className={classes['card']}>
        <div className={classes['card-header']}>
            <div className={classes['card-header--icon']}>
                <img className={classes['icon-img']} src={props.image} alt={'totalRes'}/>
            </div>
            <div className={classes['card-header--text']}>
                {props.header}
            </div>
        </div>
        <div className={classes['card-main']}>
            <CountUp end={props.number} duration={props.duration} decimals={props.decimals}/>
        </div>
    </div>
  )
}

export default MyProfileCard