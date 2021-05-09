import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Redirect } from "react-router";
import Loader from "../../Loader";
import Navbar from "../common/navbar/Navbar";
import Button from "@material-ui/core/Button";
import Circular from "@material-ui/core/CircularProgress";
import firebase from "../../config/fbConfig";
import { v4 } from "uuid";

const Announcements = ({ profile, user }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({});

  const isLaptop = useMediaQuery({
    query: "(max-width: 992px)",
  });

  if (user === null) return <Redirect to="/" />;

  const validate = () => {
    const errors = {};

    if (title.trim() === "") {
      errors.title = "Title mustn't be empty";
    }

    if (message.trim() === "") {
      errors.message = "Message mustn't be empty";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    setLoading(true);
    setMsg(false);

    firebase
      .database()
      .ref("Announcements/" + v4())
      .set({
        title,
        message,
      })
      .then(() => {
        setMsg("Successfully announced");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

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
        <h2 className="fw-bold text-center">Announcements</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-bold">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Enter your announcement title here"
            />
            {errors.title && <p className="text-danger">{errors.title}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label fw-bold">
              Message
            </label>
            <textarea
              className="form-control"
              id="message"
              rows="10"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="Enter your announcement here"
            ></textarea>
            {errors.message && <p className="text-danger">{errors.message}</p>}
          </div>

          <Button
            type="submit"
            variant="contained"
            className="custom-btn mt-3"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <>
                <Circular color="inherit" size={24} className="me-2" />{" "}
                Submitting
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Announcements;
