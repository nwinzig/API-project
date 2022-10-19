import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotCards from '../src/components/Spots'
import SpotDetails from "./components/IndividualSpot";
import FooterComp from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Switch>
        <Route exact path={'/'}>
          <Navigation isLoaded={isLoaded} />

          <SpotCards />
          <FooterComp />
        </Route>
        <Route exact path={`/spots/:spotId`}>
        <Navigation isLoaded={isLoaded} />

        <SpotDetails />
        <FooterComp />
        </Route>
      </Switch>

    </>
  );
}

export default App;
