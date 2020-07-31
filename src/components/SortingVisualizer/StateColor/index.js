import React from 'react';
import './style.css';

export default function StateColor() {
    return (
        <div className="StateColor">
            <div className="StateColor__item">
                <span className="StateColor__item__color StateColor__item__color--unsorted"></span>
                <span className="StateColor__item__name">Unsorted</span>
            </div>
            <div className="StateColor__item">
                <span className="StateColor__item__color StateColor__item__color--comparing"></span>
                <span className="StateColor__item__name">Comparing</span>
            </div>
            <div className="StateColor__item">
                <span className="StateColor__item__color StateColor__item__color--swapping"></span>
                <span className="StateColor__item__name">Swapping</span>
            </div>

            <div className="StateColor__item">
                <span className="StateColor__item__color StateColor__item__color--sorted"></span>
                <span className="StateColor__item__name">Sorted</span>
            </div>
        </div>
    );
}
