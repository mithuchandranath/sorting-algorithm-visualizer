import React, { Fragment } from 'react';
import './style.css';
import Backdrop from '../Backdrop';


const AppSlideDrawer = ({ open, closeDrawer, children }) => {

  const className = `AppSlideDrawer ${open ? 'AppSlideDrawer--open' : 'AppSlideDrawer--closed'}`;

  return (
    <Fragment>
      { open && <Backdrop className="Backdrop--dark" onClick={ () => closeDrawer(!open) } /> }
      <div className={className}>
        
        <div className="AppSlideDrawer__controller-items">
          {children}
        </div>
      </div>
    </Fragment>
  )

}

export default AppSlideDrawer;