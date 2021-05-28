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
  const [notification, setNotification] = useState("");
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
          props.updateLecture(watch, courseName, topic, notification);
        });
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    // uploading new lecture
    props.uploadLecture(courseName, topic, subTopic, videoURL, notification);
  };

  if (props.lectureUploaded) {
    setTimeout(() => {
      setCourseName("");
      setCategoryOfLecture("");
      setTopic("");
      setSubTopic("");
      setNotification("");
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
            value={notification}
            onChange={(event) => setNotification(event.target.value)}
            id="notification"
            select
            label="Select Notification Category"
            variant="outlined"
          >
            {props.profile.firstCourseName === "CompTIA It Fundamentals" && (
              <MenuItem value="CompTIA It Fundamentals">
                CompTIA It Fundamentals
              </MenuItem>
            )}
            {props.profile.firstCourseName ===
              "Microsoft Front End Development" && (
              <MenuItem value="Microsoft Front End Development">
                Microsoft Front End Development
              </MenuItem>
            )}
            {props.profile.firstCourseName === "ASP.NET Web Applications" && (
              <MenuItem value="ASPNET Web Applications">
                ASP.NET Web Applications
              </MenuItem>
            )}
            {props.profile.firstCourseName === "PHP Laravel" && (
              <MenuItem value="PHP Laravel">PHP Laravel</MenuItem>
            )}
            {props.profile.firstCourseName === "MERN Stack" && (
              <MenuItem value="MERN Stack">MERN Stack</MenuItem>
            )}
            {props.profile.firstCourseName === "SQL Server Specialist" && (
              <MenuItem value="SQL Server Specialist">
                SQL Server Specialist
              </MenuItem>
            )}
            {props.profile.firstCourseName ===
              "Oracle Database Administrator (OCP : 12C DBA)" && (
              <MenuItem value="Oracle Database Administrator">
                Oracle Database Administrator (OCP : 12C DBA)
              </MenuItem>
            )}
            {props.profile.firstCourseName === "Android Apps Development" && (
              <MenuItem value="Android Apps Development">
                Android Apps Development
              </MenuItem>
            )}
            {props.profile.firstCourseName ===
              "Kotlin Mobile Apps Development" && (
              <MenuItem value="Kotlin Mobile Apps Development">
                Kotlin Mobile Apps Development
              </MenuItem>
            )}
            {props.profile.firstCourseName === "IOS Apps Development" && (
              <MenuItem value="IOS Apps Development">
                IOS Apps Development
              </MenuItem>
            )}
            {props.profile.firstCourseName ===
              "Xamarin Mobile Apps Development" && (
              <MenuItem value="Xamarin Mobile Apps Development">
                Xamarin Mobile Apps Development
              </MenuItem>
            )}
            {props.profile.firstCourseName ===
              "React Native Web & Apps Development" && (
              <MenuItem value="React Native Web and Apps Development">
                React Native Web &amp; Apps Development
              </MenuItem>
            )}
            {props.profile.firstCourseName === "Game Development" && (
              <MenuItem value="Game Development">Game Development</MenuItem>
            )}
            {props.profile.firstCourseName === "Cisco CCNA Networking" && (
              <MenuItem value="Cisco CCNA Networking">
                Cisco CCNA Networking
              </MenuItem>
            )}
            {props.profile.firstCourseName ===
              "CompTIA Security + (SYO - 601)" && (
              <MenuItem value="CompTIA Security">
                CompTIA Security + (SYO - 601)
              </MenuItem>
            )}
            {props.profile.firstCourseName === "Certified Ethical Hacking" && (
              <MenuItem value="Certified Ethical Hacking">
                Certified Ethical Hacking
              </MenuItem>
            )}
            {props.profile.firstCourseName ===
              "Certified Hacking Forensic Investigator" && (
              <MenuItem value="Certified Hacking Forensic Investigator">
                Certified Hacking Forensic Investigator
              </MenuItem>
            )}
            {props.profile.firstCourseName ===
              "Penetration Testing Security Analyst" && (
              <MenuItem value="Penetration Testing Security Analyst">
                Penetration Testing Security Analyst
              </MenuItem>
            )}
            {props.profile.firstCourseName ===
              "Certified Information System Auditor" && (
              <MenuItem value="Certified Information System Auditor">
                Certified Information System Auditor
              </MenuItem>
            )}
            {props.profile.firstCourseName ===
              "Certified Information Security Manager" && (
              <MenuItem value="Certified Information Security Manager">
                Certified Information Security Manager
              </MenuItem>
            )}
            {props.profile.firstCourseName === "" && (
              <MenuItem value="AWS Practitioner">AWS Practitioner</MenuItem>
            )}
            {props.profile.firstCourseName === "AWS Solution Architect" && (
              <MenuItem value="AWS Solution Architect">
                AWS Solution Architect
              </MenuItem>
            )}
            {props.profile.firstCourseName === "AWS SysOps Administrator" && (
              <MenuItem value="AWS SysOps Administrator">
                AWS SysOps Administrator
              </MenuItem>
            )}
            {props.profile.firstCourseName === "AWS Developer Associate" && (
              <MenuItem value="AWS Developer Associate">
                AWS Developer Associate
              </MenuItem>
            )}
            {props.profile.firstCourseName ===
              "Microsoft Azure Cloud Fundamentals" && (
              <MenuItem value="Microsoft Azure Cloud Fundamentals">
                Microsoft Azure Cloud Fundamentals
              </MenuItem>
            )}
            {props.profile.firstCourseName ===
              "Microsoft Cloud Administrator 103 - 104" && (
              <MenuItem value="Microsoft Cloud Administrator">
                Microsoft Cloud Administrator 103 - 104
              </MenuItem>
            )}
            {props.profile.firstCourseName === "Google Cloud Engineer" && (
              <MenuItem value="Google Cloud Engineer">
                Google Cloud Engineer
              </MenuItem>
            )}
            {props.profile.firstCourseName === "Python for Everyone" && (
              <MenuItem value="Python For Everyone">
                Python for Everyone
              </MenuItem>
            )}
            {props.profile.firstCourseName === "Machine Learning & AI" && (
              <MenuItem value="Machine Learning and AI">
                Machine Learning &amp; AI
              </MenuItem>
            )}
            {props.profile.firstCourseName === "" && (
              <MenuItem value="Data Science">Data Science</MenuItem>
            )}
            {props.profile.firstCourseName ===
              "Big Data & Headoop Ecosystem" && (
              <MenuItem value="Big Data and Headoop Ecosystem">
                Big Data &amp; Headoop Ecosystem
              </MenuItem>
            )}
            {props.profile.firstCourseName === "" && (
              <MenuItem value="QuickBooks ERP">QuickBooks ERP</MenuItem>
            )}
            {props.profile.firstCourseName === "" && (
              <MenuItem value="SAP ERP">SAP ERP</MenuItem>
            )}
            {props.profile.firstCourseName ===
              "Project Management Professional (PMP)" && (
              <MenuItem value="Project Management Professional">
                Project Management Professional (PMP)
              </MenuItem>
            )}
            {props.profile.firstCourseName === "Amazon FBA Business" && (
              <MenuItem value="Amazon FBA Business">
                Amazon FBA Business
              </MenuItem>
            )}
            {props.profile.firstCourseName ===
              "Search Engine Optimization (SEO)" && (
              <MenuItem value="Search Engine Optimization">
                Search Engine Optimization (SEO)
              </MenuItem>
            )}
            {props.profile.firstCourseName === "Digital Marketing" && (
              <MenuItem value="Digital Marketing">Digital Marketing</MenuItem>
            )}
            {props.profile.firstCourseName === "Social Media Marketing" && (
              <MenuItem value="Social Media Marketing">
                Social Media Marketing
              </MenuItem>
            )}
            {props.profile.firstCourseName === "Graphic Design" && (
              <MenuItem value="Graphics Design">Graphic Design</MenuItem>
            )}
            {props.profile.firstCourseName === "UI / UX Design" && (
              <MenuItem value="UIUX Design">UI / UX Design</MenuItem>
            )}
            {props.profile.firstCourseName === "Interior Design" && (
              <MenuItem value="Interior Design">Interior Design</MenuItem>
            )}
            {props.profile.firstCourseName === "3D Maya Max Animation" && (
              <MenuItem value="3D Maya Max Animation">
                3D Maya Max Animation
              </MenuItem>
            )}
            {props.profile.firstCourseName === "Video Editing" && (
              <MenuItem value="Video Editing">Video Editing</MenuItem>
            )}
            {props.profile.firstCourseName === "AutoCad" && (
              <MenuItem value="AutoCad">AutoCad</MenuItem>
            )}
            {props.profile.firstCourseName === "Microsoft Office 365" && (
              <MenuItem value="Microsoft Office 365">
                Microsoft Office 365
              </MenuItem>
            )}
            {props.profile.firstCourseName === "Enterpreneurship" && (
              <MenuItem value="Enterpreneurship">Enterpreneurship</MenuItem>
            )}
            {props.profile.firstCourseName ===
              "Digital Forensic Cyber Security" && (
              <MenuItem value="Digital Forensic Cyber Security">
                Digital Forensic Cyber Security
              </MenuItem>
            )}
            {props.profile.firstCourseName ===
              "Penetration Testing Cyber Security" && (
              <MenuItem value="Penetration Testing Cyber Security">
                Penetration Testing Cyber Security
              </MenuItem>
            )}
            {props.profile.firstCourseName ===
              "CISSP Cyber Security Professional" && (
              <MenuItem value="CISSP Cyber Security Professional">
                CISSP Cyber Security Professional
              </MenuItem>
            )}
            {props.profile.firstCourseName === "Artificial Intelligence" && (
              <MenuItem value="Artificial Intelligence">
                Artificial Intelligence
              </MenuItem>
            )}
            {props.profile.firstCourseName === "AWS Cloud Computing" && (
              <MenuItem value="AWS Cloud Computing">
                AWS Cloud Computing
              </MenuItem>
            )}
            {props.profile.firstCourseName === "Internet of Things" && (
              <MenuItem value="Internet of Things (IoT)">
                Internet of Things (IoT)
              </MenuItem>
            )}
            {props.profile.firstCourseName === "BlockChain Technology" && (
              <MenuItem value="BlockChain Technology">
                BlockChain Technology
              </MenuItem>
            )}
            {props.profile.firstCourseName ===
              "Full Stack Web Development (MCSA)" && (
              <MenuItem value="Full Stack Web Development">
                Full Stack Web Development (MCSA)
              </MenuItem>
            )}
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
