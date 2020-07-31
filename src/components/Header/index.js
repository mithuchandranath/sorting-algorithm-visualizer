import React from 'react';
import './style.css'
import Button from '../generic/Button';

import { MdMenu as Hamburger, MdClose as Close } from 'react-icons/md';

const Header = ({ drawerOpen, toggleDrawer, children }) => (
  <header className="App__header">
    <nav>
      <div className="App__header__Menu-icon">
        <Button icon={drawerOpen ? Close : Hamburger}
          onClick={() => toggleDrawer(!drawerOpen)}
        />
      </div>
      <div className="App__header__logo"> <a href='/'> Sort Visualizer</a></div>
      <div className="App__header__spacer"></div>
      <div className="App__header__controller-items">
        {children}
      </div>
    </nav>
  </header>
);

export default Header;