import React, { Fragment } from 'react';
import Auth from './Components/Auth/Auth';
import { BrowserRouter , Switch, Route } from 'react-router-dom';
import Home from './Components/Pages/Home';
import { useSelector } from "react-redux";
import './App.css';
import Navbar from './Components/Layout/Navbar';


function App() {
  const show = useSelector((state) => state.user.isAuthenticated);
  return (
    <BrowserRouter>
      {show && <Navbar />}
      <Fragment>
        <Switch>
            {show && <Route exact path="/home">
              <Home />
            </Route>}
            {!show && <Route path = '/'>
              <Auth />
            </Route>}

          </Switch>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
