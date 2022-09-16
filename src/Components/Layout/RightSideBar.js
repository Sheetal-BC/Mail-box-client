import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faQuestionCircle} from "@fortawesome/sharp-solid-svg-icons";
import './RightSideBar.css';


function RightSideBar() {
  return (
    <div className="rightBar">
        <div className='right_icon'>
      <FontAwesomeIcon icon={faGear} sixe="1x" />
      <FontAwesomeIcon icon={faQuestionCircle} sixe="1x" />
      </div>
    </div>
  );
}

export default RightSideBar;