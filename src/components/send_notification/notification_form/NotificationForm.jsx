import React, { useState } from "react";
import firebase from "../../../config/fbConfig";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import CircularLoader from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "react-responsive";

const useStyles = makeStyles(() => ({
  textfieldOutline: {
    borderColor: "#02a39b !important",
  },

  label: {
    color: "#02a39b !important",
  },
}));

const NoticationForm = ({ profile }) => {
  const [courseName, setCourseName] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // materialize css initialising
  const classes = useStyles();

  const handleClick = () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("Notifications")
      .add({
        name: notificationMessage,
        createdAt: new Date(),
        course: courseName,
      })
      .then(() => {
        setLoading(false);
        setCourseName("");
        setNotificationMessage("");
      })
      .catch(() => setLoading(false));
  };

  const isLaptop = useMediaQuery({
    query: "(max-width: 992px)",
  });

  console.log(profile);

  return (
    <div
      className="container mt-lms"
      style={{
        position: "relative",
        left: isLaptop ? 0 : 150,
        width: isLaptop ? "100%" : "71vw",
      }}
    >
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
        <MenuItem value={profile.firstCourseName}>
          {profile.firstCourseName}
        </MenuItem>
      </TextField>

      <TextField
        id="msg"
        label="Notification Message"
        multiline
        rows={6}
        style={{ width: "100%", marginTop: 30 }}
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
        value={notificationMessage}
        onChange={(event) => setNotificationMessage(event.target.value)}
        variant="outlined"
      />

      <Button
        onClick={handleClick}
        className="outline custom-btn mt-3"
        color="primary"
        fullWidth
        disabled={loading}
        variant="contained"
      >
        {loading && <CircularLoader className="loader me-2" />}
        {loading ? "Sending..." : "Send"}
      </Button>
    </div>
  );
};

export default NoticationForm;
