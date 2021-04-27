import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Circular from "@material-ui/core/CircularProgress";
import firebase from "../../config/fbConfig";

const LogIn = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { replace } = useHistory();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(state.email, state.password)
      .then(() => {
        setLoading(false);
        replace("/dashboard");
      })
      .catch((err) => {
        setLoading(false);
        setMsg(err.message);
      });
  };

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

        <form onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            id="email"
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            variant="filled"
            fullWidth
            className="mt-3"
            required
          />
          <Input
            label="Password"
            id="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            variant="filled"
            type="password"
            fullWidth
            required
            className="mt-3"
          />

          {msg && (
            <Alert severity="info" variant="outlined">
              {msg}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            className="custom-btn mt-3"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <>
                <Circular color="inherit" size={24} className="me-2" /> Logging
                In
              </>
            ) : (
              "Log In"
            )}
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default LogIn;
