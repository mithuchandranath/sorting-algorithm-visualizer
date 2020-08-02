import React from 'react';
import './style.css';

const Bar = ({
    val,
    stateA,
    stateB,
    stateC,
    stateD,
    sorted,
    style

}) => {
    //console.log(style);

    let classNames = 'Bar';
    if (stateA) classNames += ' Bart_stateA'
    if (stateB) classNames += ' Bart_stateB'
    if (stateC) classNames += ' Bart_stateC'
    if (stateD) classNames += ' Bart_stateD'
    if (sorted) classNames += ' Bart_sorted'

    return (
        <div className={classNames} style={style}>
            <span className="Bar__text">{val}</span>
        </div>

    )

}

export default Bar;