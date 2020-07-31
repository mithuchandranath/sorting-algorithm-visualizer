import React from 'react';
import './style.css';


const renderIcon = (icon, iconClass, iconAtrr) => {
  const ICON = icon;
  return <ICON {...iconAtrr} className={`Button__Icon ${iconClass}`} />;
}

const Button = ({
  className,
  icon,
  iconClass,
  onClick,
  disabled,
  children,
  iconAtrr
}) => {
  
  const classNames = `Button ${icon ? 'Button--icon':'' } ${className ? className : ''}`;

  return (
    <button disabled={disabled} className={classNames}
      onClick={onClick}>
        {icon ? renderIcon(icon, iconClass, iconAtrr) : null}
        {children && <span className="Button__Label">{children}</span>}
      </button>
  )
}

export default Button;