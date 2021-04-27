import React, { Suspense, lazy, useLayoutEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Loader from "./Loader";
import firebase from "./config/fbConfig";
const LogIn = lazy(() => import("./components/logIn/LogIn"));
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const UploadLecture = lazy(() =>
  import("./components/upload_lectures/UploadLecture")
);

const App = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [profile, setProfile] = useState({});

  const { replace } = useHistory();

  useLayoutEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(user);
        replace("/dashboard");
      }
    });
  }, [replace]);
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path="/">
          <LogIn />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard
            user={loggedIn}
            setProfile={setProfile}
            profile={profile}
          />
        </Route>
        <Route path="/uploadLecture">
          <UploadLecture
            user={loggedIn}
            setProfile={setProfile}
            profile={profile}
          />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default App;
