import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { useMediaQuery } from "react-responsive";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import firebase from "../../../config/fbConfig";

const Navbar = () => {
  const [open, setOpen] = useState(true);
  const [no, setno] = useState(1);

  const { push, replace } = useHistory();

  const handleDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  const onCloseDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  const isLaptop = useMediaQuery({
    query: "(max-width: 992px)",
  });

  if (isLaptop === true && no === 1) {
    setno(2);
    setOpen(false);
  } else if (isLaptop === false && no === 2) {
    setno(1);
    setOpen(true);
  }

  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        style={{
          left: open && isLaptop === false ? "300px" : 0,
        }}
      >
        <Toolbar>
          <IconButton
            onClick={handleDrawer}
            style={{ outline: "none" }}
            className="me-2"
          >
            <i className="fas fa-bars"></i>
          </IconButton>
          <h1 className="mb-0 fw-bold">Teacher Portal</h1>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        variant={isLaptop ? "temporary" : "persistent"}
        open={open}
        onClose={onCloseDrawer}
      >
        <div className="bg overflow-hidden">
          <div style={{ width: 300 }}>
            <div className="d-flex bg-white justify-content-center">
              <img
                src="https://i.ibb.co/Sd0qZ7X/dplmslo push.png"
                alt="DigiPAKISTAN"
                height="64"
              />
            </div>

            <List>
              <ListItem
                button
                onClick={() => {
                  push("/dashboard");
                }}
              >
                <ListItemIcon>
                  <i className="fas fa-home text-white fa-2x"></i>
                </ListItemIcon>
                <ListItemText>
                  <span className="fw-bold">Dashboard</span>
                </ListItemText>
              </ListItem>

              <ListItem
                button
                onClick={() => {
                  push("/courseVideos");
                }}
              >
                <ListItemIcon>
                  <i className="fas fa-video text-white fa-2x"></i>
                </ListItemIcon>
                <ListItemText>
                  <span className="fw-bold">Course Videos</span>
                </ListItemText>
              </ListItem>

              <ListItem
                button
                onClick={() => {
                  push("/dashboard");
                }}
              >
                <ListItemIcon>
                  <i className="fas fa-question-circle text-white fa-2x"></i>
                </ListItemIcon>
                <ListItemText>
                  <span className="fw-bold">Upload Quiz</span>
                </ListItemText>
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  push("/dashboard");
                }}
              >
                <ListItemIcon>
                  <i className="fas fa-clipboard-list text-white fa-2x"></i>
                </ListItemIcon>
                <ListItemText>
                  <span className="fw-bold">Assignments</span>
                </ListItemText>
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  push("/uploadLecture");
                }}
              >
                <ListItemIcon>
                  <i className="fas fa-upload text-white fa-2x"></i>
                </ListItemIcon>
                <ListItemText>
                  <span className="fw-bold">Upload Lectures</span>
                </ListItemText>
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  push("/announcements");
                }}
              >
                <ListItemIcon>
                  <i className="fas fa-bullhorn text-white fa-2x"></i>
                </ListItemIcon>
                <ListItemText>
                  <span className="fw-bold">Annoucements</span>
                </ListItemText>
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  push("/sendNotification");
                }}
              >
                <ListItemIcon>
                  <i className="fas fa-bell text-white fa-2x"></i>
                </ListItemIcon>
                <ListItemText>
                  <span className="fw-bold">Send Notification</span>
                </ListItemText>
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  push("/dashboard");
                }}
              >
                <ListItemIcon>
                  <i className="fas fa-hands-helping text-white fa-2x"></i>
                </ListItemIcon>
                <ListItemText>
                  <span className="fw-bold">Help Center</span>
                </ListItemText>
              </ListItem>

              <ListItem
                button
                onClick={() => {
                  firebase
                    .auth()
                    .signOut()
                    .then(() => {
                      replace("/");
                    });
                }}
              >
                <ListItemIcon>
                  <i className="fas fa-sign-out-alt text-white fa-2x"></i>
                </ListItemIcon>
                <ListItemText>
                  <span className="fw-bold">Sign Out</span>
                </ListItemText>
              </ListItem>
            </List>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
