import React from 'react'
import classes from './index.module.scss';
import LocationCard from '../../components/Location';

function HostLocations() {
  return (
    <div className={classes['reservation-list']}>
        <LocationCard name='Sunny Home' address='Vojvode Stepe 22, Beograd' />
        <LocationCard name='Vila Impresija' address='Zlatna Ulica, Rakovac' />
        <LocationCard name='Kuca na Drini' address='Drinska 22, Bajina Basta' />
        <LocationCard name='Vikendica' address='Fruska Gora' />
    </div>
  )
}

export default HostLocations