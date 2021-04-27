import React, { useLayoutEffect } from "react";
import Navbar from "../common/navbar/Navbar";
import firebase from "../../config/fbConfig";
import Loader from "../../Loader";
import { Redirect, useHistory } from "react-router-dom";

const Dashboard = ({ user, setProfile, profile }) => {
  const { push } = useHistory();

  useLayoutEffect(() => {
    if (user !== null) {
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get()
        .then((user) => {
          setProfile(user.data());
          if (user.data().applicationSubmitted) {
            firebase
              .auth()
              .signOut()
              .then(() => {
                push("/");
                setProfile({});
                window.location.reload();
              });
          }
        });
    }
  }, [user, push, setProfile]);

  if (user === null) return <Redirect to="/" />;

  return profile.teacher ? (
    <>
      <Navbar setProfile={setProfile} />
    </>
  ) : (
    <Loader />
  );
};

export default Dashboard;
