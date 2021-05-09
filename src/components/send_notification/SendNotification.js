import React from "react";
import Navbar from "../common/navbar/Navbar";
import Loader from "../../Loader";
import { Redirect } from "react-router-dom";
import NotificationForm from "./notification_form/NotificationForm";

const SendNotification = ({ user, profile }) => {
  if (user === null) return <Redirect to="/" />;

  return profile.teacher ? (
    <>
      <Navbar />
      <NotificationForm profile={profile} />
    </>
  ) : (
    <Loader />
  );
};

export default SendNotification;
