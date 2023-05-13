import React from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'

const InfoCard : React.FC<{title: string, imgUrl: string, routerUrl: string}> = (props) => {

    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate(props.routerUrl)
    }

    return (<div className='info-card' onClick={handleClick}>
        <div className='info-card__icon'>
            <img src={props.imgUrl} className='info-card__icon--icon'/>
        </div>
        <div className='info-card__title'>
            {props.title}
        </div>
    </div>)
}

export default InfoCard;