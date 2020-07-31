import React from 'react';
import './style.css';

const Backdrop = ({show, className, onClick, children}) => {


    return (
        <div className={`Backdrop ${className}`} onClick={onClick}/>
    )

}

export default Backdrop;