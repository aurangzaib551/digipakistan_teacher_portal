import React from "react";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const LogIn = () => {
  return (
    <div className="container my-5">
      <Paper className="p-sm-5 p-4 mx-1" elevation={10}>
        <div className="d-flex flex-column align-items-center">
          <img
            src="https://i.ibb.co/LYC7rpt/logoPNG.png"
            alt="DigiPAKISTAN"
            height="200"
            width="200"
          />
          <h1 className="fw-bold text-center">Teacher Portal Log In</h1>
        </div>

        <form>
          <Input
            label="Email Address"
            id="email"
            name="email"
            variant="filled"
            fullWidth
            className="mt-3"
          />
          <Input
            label="Password"
            id="password"
            name="password"
            variant="filled"
            type="password"
            fullWidth
            className="mt-3"
          />
          <Button variant="contained" className="custom-btn mt-3" fullWidth>
            Log In
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default LogIn;
