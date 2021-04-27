import React, { useState, useLayoutEffect } from "react";
import { Button, makeStyles, MenuItem, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import {
  clearAll,
  updateLecture,
  uploadLecture,
} from "../../store/actions/lecturesActions";
import firebase from "../../config/fbConfig";
import Navbar from "../common/navbar/Navbar";
import { useMediaQuery } from "react-responsive";
import { Redirect } from "react-router-dom";
import Loader from "../../Loader";

const useStyles = makeStyles(() => ({
  textfieldOutline: {
    borderColor: "#02a39b !important",
  },

  label: {
    color: "#02a39b !important",
  },
}));

const Upload = (props) => {
  // state
  const [courseName, setCourseName] = useState("");
  const [categoryOfLecture, setCategoryOfLecture] = useState("");
  const [topic, setTopic] = useState("");
  const [subTopic, setSubTopic] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [existingTopics, setExistingTopics] = useState([]);

  // materialize css initialising
  const classes = useStyles();

  const handleUpdate = (event) => {
    event.preventDefault();

    if (courseName && topic) {
      // getting all watch array
      firebase
        .firestore()
        .collection(courseName)
        .doc(topic)
        .get()
        .then((doc) => {
          const watch = [];
          // setting new and previous data in watch array
          watch.push(...doc.data().watch, {
            subTopic,
            video: videoURL,
          });
          // updating the lecture
          props.updateLecture(watch, courseName, topic);
        });
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    // uploading new lecture
    props.uploadLecture(courseName, topic, subTopic, videoURL);
  };

  if (props.lectureUploaded) {
    setTimeout(() => {
      setCourseName("");
      setCategoryOfLecture("");
      setTopic("");
      setSubTopic("");
      setVideoURL("");
      props.clearAll();
      // window.location.reload();
    }, 1500);
  }

  const id = sessionStorage.getItem("auth");

  useLayoutEffect(() => {
    if (categoryOfLecture === "New") {
      setTopic("");
    }

    if (categoryOfLecture === "Existing") {
      if (courseName.trim() === "") {
        alert("Course name shouldn't be empty");
        setCategoryOfLecture("");
        return;
      } else if (courseName) {
        firebase
          .firestore()
          .collection(courseName)
          .onSnapshot((querySnapshot) => {
            const existingData = [];
            querySnapshot.forEach((doc) => {
              existingData.push({ topic: doc.id });
            });
            setExistingTopics(existingData);
          });
      }
    }
  }, [id, categoryOfLecture]);

  const isLaptop = useMediaQuery({
    query: "(max-width: 992px)",
  });

  if (props.user === null) return <Redirect to="/" />;

  return props.profile.teacher ? (
    <React.Fragment>
      <Navbar />
      <div
        className="container my-5 px-md-0"
        style={{
          position: "relative",
          left: isLaptop ? 0 : 150,
          top: 50,
          width: isLaptop ? "100%" : "71vw",
        }}
      >
        <div className="upload-lectures rounded d-flex flex-column align-items-center">
          <h1 className="display-4 mb-4 fw-bold text-center font-weight-bold title">
            Upload Lecture
          </h1>

          <TextField
            style={{ width: "100%" }}
            InputProps={{
              classes: {
                notchedOutline: classes.textfieldOutline,
                focused: classes.textfieldOutline,
              },
            }}
            InputLabelProps={{
              classes: {
                focused: classes.label,
              },
            }}
            fullWidth
            value={courseName}
            onChange={(event) => setCourseName(event.target.value)}
            id="course name"
            select
            label="Select Course Name"
            variant="outlined"
          >
            <MenuItem value={props.profile.firstCourseName}>
              {props.profile.firstCourseName}
            </MenuItem>
          </TextField>

          <TextField
            style={{ width: "100%", marginTop: 20 }}
            InputProps={{
              classes: {
                notchedOutline: classes.textfieldOutline,
                focused: classes.textfieldOutline,
              },
            }}
            InputLabelProps={{
              classes: {
                focused: classes.label,
              },
            }}
            fullWidth
            id="category of lecture"
            value={categoryOfLecture}
            onChange={(event) => setCategoryOfLecture(event.target.value)}
            select
            label="Select Category of Lecture"
            variant="outlined"
          >
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Existing">Existing</MenuItem>
          </TextField>

          {categoryOfLecture === "New" && (
            <TextField
              style={{ width: "100%", marginTop: 20 }}
              InputProps={{
                classes: {
                  notchedOutline: classes.textfieldOutline,
                  focused: classes.textfieldOutline,
                },
              }}
              InputLabelProps={{
                classes: {
                  focused: classes.label,
                },
              }}
              fullWidth
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              id="topic name"
              label="Topic Name"
              variant="outlined"
            />
          )}

          {categoryOfLecture === "Existing" && (
            <TextField
              style={{ width: "100%", marginTop: 20 }}
              InputProps={{
                classes: {
                  notchedOutline: classes.textfieldOutline,
                  focused: classes.textfieldOutline,
                },
              }}
              InputLabelProps={{
                classes: {
                  focused: classes.label,
                },
              }}
              fullWidth
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              id="topic nam 2"
              label="Topic Name"
              select
              variant="outlined"
            >
              {existingTopics[0] ? (
                existingTopics.map((val, ind) => (
                  <MenuItem key={ind} value={val.topic}>
                    {val.topic ? val.topic : "loading..."}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">
                  No Data, Choose &nbsp;<strong>New</strong>&nbsp; option
                  instead of &nbsp;<strong>Existing</strong>&nbsp;
                </MenuItem>
              )}
            </TextField>
          )}

          <TextField
            style={{ width: "100%", marginTop: 20 }}
            InputProps={{
              classes: {
                notchedOutline: classes.textfieldOutline,
                focused: classes.textfieldOutline,
              },
            }}
            InputLabelProps={{
              classes: {
                focused: classes.label,
              },
            }}
            fullWidth
            value={subTopic}
            onChange={(event) => setSubTopic(event.target.value)}
            id="sub topic"
            label="Sub Topic Name"
            variant="outlined"
          />

          <TextField
            style={{ width: "100%", marginTop: 20 }}
            InputProps={{
              classes: {
                notchedOutline: classes.textfieldOutline,
                focused: classes.textfieldOutline,
              },
            }}
            InputLabelProps={{
              classes: {
                focused: classes.label,
              },
            }}
            fullWidth
            value={videoURL}
            onChange={(event) => setVideoURL(event.target.value)}
            id="video url"
            label="Video URL"
            variant="outlined"
          />

          {/* Success msg  */}
          {props.lectureUploaded && (
            <p className="mb-0 p-3 mt-3 bg-success text-white rounded font-weight-bold">
              {props.lectureUploaded}
            </p>
          )}

          {categoryOfLecture === "New" && (
            <Button
              onClick={handleClick}
              className="outline mt-3"
              color="primary"
              fullWidth
              variant="contained"
            >
              Upload
            </Button>
          )}

          {categoryOfLecture === "Existing" && (
            <Button
              onClick={handleUpdate}
              className="outline mt-3"
              color="primary"
              fullWidth
              variant="contained"
            >
              Add In Existing Topic
            </Button>
          )}
        </div>
      </div>
    </React.Fragment>
  ) : (
    <Loader />
  );
};

const mapStateToProps = (state) => {
  return {
    lectureUploaded: state.lectures.lectureUploaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadLecture: (collection, topic, subTopic, video) =>
      dispatch(uploadLecture(collection, topic, subTopic, video)),
    updateLecture: (watchData, collection, topic) =>
      dispatch(updateLecture(watchData, collection, topic)),
    clearAll: () => dispatch(clearAll()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
