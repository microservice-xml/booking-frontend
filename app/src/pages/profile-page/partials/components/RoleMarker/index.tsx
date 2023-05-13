import React from 'react'
import classes from './index.module.scss';

type Props = {
    role : string;
}

function RoleMarker(props : Props) {

  const getColor = () => {
    return props.role === 'GUEST' ? '#006A4E' : ' #FF6347'
  }

  return (
    <div className={classes['marker']}
         style={{color : getColor(), borderColor : getColor() }}>
        {props.role}
    </div>
  )
}

export default RoleMarker