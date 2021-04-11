import React from "react";
import "./App.css";
import {
  Adverts,
  Login,
  NewAdvert,
  NotFound,
  SingleAdvert,
} from "./pages/index";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import storage from "./utils/storage";

function App() {
  let isLogged =
    storage.get("Authorization") || storage.sessionGet("Authorization");

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/login">
            {isLogged ? <Redirect push to="/" /> : <Login />}
          </Route>
          <Route exact path="/advert/new">
            {isLogged ? <NewAdvert /> : <Redirect push to="/login" />}
          </Route>
          <Route path="/advert/:id">
            {isLogged ? <SingleAdvert /> : <Redirect push to="/login" />}
          </Route>
          <Route exact path="/adverts">
            {isLogged ? <Adverts /> : <Redirect push to="/login" />}
          </Route>
          <Route exact path="/">
            <Redirect to="/adverts" />
          </Route>
          <Route path="/404">
            {isLogged ? <NotFound /> : <Redirect push to="/login" />}
          </Route>
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
