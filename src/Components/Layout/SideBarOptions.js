
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './SideBarOptions.css';


function SideBarOptions({icon, title, isActive, number}) {
  

  return (
    <>
      <div className={`sidebar_option ${isActive && `sidebar--active`}`}>
          <FontAwesomeIcon icon={icon} className="inbox" size="1x" />
        <h3>{title}</h3>
        <p>{number}</p>
        </div>
        
    </>
  );
}

export default SideBarOptions