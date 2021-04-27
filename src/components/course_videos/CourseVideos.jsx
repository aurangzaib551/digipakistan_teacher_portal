import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Navbar from "../common/navbar/Navbar";
import Loader from "../../Loader";
import { Redirect } from "react-router";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router-dom";

const CourseVideos = ({ profile, user }) => {
  const isLaptop = useMediaQuery({
    query: "(max-width: 992px)",
  });

  const { push } = useHistory();

  if (user === null) return <Redirect to="/" />;

  return profile.teacher ? (
    <>
      <Navbar />
      <div
        className="container mt-5"
        style={{
          position: "relative",
          left: isLaptop ? 0 : 150,
          top: 50,
          width: isLaptop ? "100%" : "71vw",
        }}
      >
        <Paper elevation={10} className="p-3">
          <h1 className="fw-bold">{profile.firstCourseTitle}</h1>
          <p className="fw-light text-secondary">{profile.firstCourseName}</p>
          <Button
            onClick={() => push(profile.firstCourseLink)}
            variant="contained"
            className="custom-btn"
          >
            Open Portal
          </Button>
        </Paper>
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default CourseVideos;
