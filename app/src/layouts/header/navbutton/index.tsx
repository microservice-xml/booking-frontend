import React, {MouseEventHandler} from 'react'

interface Props {
    text: string,
    iconPath?: string,
    handlerFunction?: MouseEventHandler
}

const NavButton = (props:Props) => {
  return (<div className={'header-main__options-login hover'} onClick={props.handlerFunction}>
                    {props.iconPath && <div className={'header-main__options-login__logo'} style={{backgroundImage: `url(${props.iconPath})`}}>

                    </div>}
                    <div className={'header-main__options-login__text'} >
                        {props.text}
                    </div>
                </div>)
}

export default NavButton