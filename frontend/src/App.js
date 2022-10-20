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
import ReviewComponent from "./components/ReviewforSpot";
import HostASpot from "./components/CreateSpot";

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
        <ReviewComponent />
        <FooterComp />
        </Route>
        <Route exact path={`/spots`}>
        <Navigation isLoaded={isLoaded} />

        <HostASpot />

        <FooterComp />
        </Route>
      </Switch>

    </>
  );
}

export default App;
