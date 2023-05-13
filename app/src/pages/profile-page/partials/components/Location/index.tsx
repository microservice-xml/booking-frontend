import React from 'react'
import classes from './index.module.scss';

type Props = {
    name: string,
    address: string,
}

function LocationCard(props : Props) {
  return (
    <div className={classes['location']}>
        <div className={classes['location__header']}>
            <div className={classes['location__header-name']}>
                {props.name}
            </div>
        </div>
        <div className={classes['location__location']}>
            {props.address}
        </div>
        <div className={classes['location__cancel']}>
            <img src={'/icons/delete.svg'} alt={'My SVG'} className={classes['svg']}/>
            <img src={'/icons/info.png'} alt={'My SVG'} className={classes['svg']}/>
        </div>
    </div>
  )
}

export default LocationCard;