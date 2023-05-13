import React from 'react'
import { useNavigate } from 'react-router-dom';
import './index.scss';

type Props = {
  text: string,
  code: string 
}


function ErrorPageComponent(props : Props) {

    const navigate = useNavigate();

    const homepageHandler = () => {
        navigate('/');
    }

    return (
        <div className='error'>
        <div className='error__content'>
            <div className='error__content-title'>
            <div className='error__content-title--letter'>
                4
            </div>
            <div className='error__content-title--icon'>
                
            </div>
            <div className='error__content-title--letter'>
                {props.code}
            </div>
            </div>
            <div className='error__content-text'>
                {props.text}
            </div>
            <div className='error__content-home'>
            <button className='home-button' onClick={homepageHandler}>Homepage</button>
            </div>
        </div>
        </div>
    )
}

export default ErrorPageComponent;