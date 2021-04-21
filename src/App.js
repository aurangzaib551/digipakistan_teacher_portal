import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Loader from "./Loader";
const LogIn = lazy(() => import("./components/logIn/LogIn"));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path="/">
          <LogIn />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default App;
