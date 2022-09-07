import React, { Fragment } from 'react';
import Auth from './Components/Auth/Auth';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Components/Pages/Home';
import { useSelector } from "react-redux";
import './App.css';
import Navbar from './Components/Layout/Navbar';
import ComposeMail from './Components/ComposeMail/ComposeMail';


function App() {
  const show = useSelector((state) => state.user.isAuthenticated);
   const openComposeMail = useSelector((state) => state.mail.sendMessageIsOpen);
  return (
    <Fragment>
     
    <BrowserRouter>
       {show && <Navbar />}
        <Switch>
            {show && <Route path="/home">
              <Home />
            </Route>}
            {!show && <Route path = '/'>
              <Auth />
            </Route>}

          </Switch>
          <div>
            {openComposeMail && <ComposeMail />}
          </div>
      
    </BrowserRouter>
    </Fragment>
  );
}

export default App;
