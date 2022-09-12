import React, { Fragment } from 'react';
import Auth from './Components/Auth/Auth';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Components/Pages/Home';
import { useSelector } from "react-redux";
import './App.css';
import Navbar from './Components/Layout/Navbar';
import ComposeMail from './Components/ComposeMail/ComposeMail';
import Inbox from './Components/Pages/Inbox';
import SideBar from './Components/Layout/SideBar';
import EmailList from './Components/Email/EmailList';




function App() {
  const show = useSelector((state) => state.user.isAuthenticated);
   const openComposeMail = useSelector((state) => state.mail.sendMessageIsOpen);
  return (
    <Fragment>
      <BrowserRouter>
        {show && <Navbar />}
        <div className='app_body'>
         {show && <SideBar />} 
     
       
        
        <Switch>
          {show && (
            <Route path="/home">
              <Home />
            </Route>
          )}
          {show && (
            <Route path="/inbox">
              <Inbox />
            </Route>
          )}
          {!show && (
            <Route path="/">
              <Auth />
            </Route>
          )}
        </Switch>
        <div>{openComposeMail && <ComposeMail />}</div>
      </div>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
