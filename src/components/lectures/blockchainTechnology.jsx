import React, { useState, useLayoutEffect } from "react";

import { Redirect } from "react-router-dom";
import Loader from "../../Loader";
import Nav from "../../components/common/navbar/Navbar";
import Button from "@material-ui/core/Button";
import firebase from "../../config/fbConfig";
import { useMediaQuery } from "react-responsive";
import ReactStars from "react-rating-stars-component";
import Modal from "react-bootstrap/Modal";
import Input from "@material-ui/core/TextField";
import { CircularProgress } from "@material-ui/core";

const BlockchainTechnology = ({ profile, user }) => {
  // State
  const [subTopic, setSubTopic] = useState(false);
  const [dataloading, setDataLoading] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [subLectures, setSubLectures] = useState([]);
  const [video, setVideo] = useState("");
  const [msg, setMsg] = useState("");
  const [topic, setTopic] = useState("");
  const [availableRatings, setAvailableRatings] = useState([]);
  const [rating, setRating] = useState(0);
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isLaptop = useMediaQuery({
    query: "(max-width: 992px)",
  });

  useLayoutEffect(() => {
    setDataLoading(true);
    firebase
      .firestore()
      .collection("BlockChain Technology")
      .onSnapshot(function (querySnapshot) {
        var data = [];

        querySnapshot.forEach(function (doc) {
          data.push(doc.data());
        });
        if (data.length === 0) {
          setMsg("Lectures will be uploaded soon");
          setDataLoading(false);
        } else if (data.length > 0) {
          setMsg("");
          setDataLoading(false);
        }
        setLectures(data);
      });

    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .onSnapshot((query) => {
        if (query.exists) {
          if (query.data().ratings) {
            setAvailableRatings([...query.data().ratings]);
          }
        }
      });
  }, [user.uid]);

  const ratingChanged = (newRating) => {
    handleShow();
    setRating(newRating);
  };

  const firstRating = () => {
    if (comment.trim() === "") {
      return alert("Comment mustn't be emppty");
    } else {
      setLoading(true);
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .update({
          ratings: [
            {
              courseName: topic,
              stars: rating,
              comment,
            },
          ],
        })
        .then(() => {
          setLoading(false);
          handleClose();
        });
    }
  };

  const updateRatings = () => {
    if (comment.trim() === "") {
      return alert("Comment mustn't be empty");
    } else {
      setLoading(true);
      const updateRat = [
        ...availableRatings,
        { courseName: topic, stars: rating, comment },
      ];
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .update({
          ratings: updateRat,
        })
        .then(() => {
          setLoading(false);
          handleClose();
        });
    }
  };

  const stars = availableRatings.filter((val) => val.courseName === topic);

  if (user === null) return <Redirect to="/" />;

  return profile.teacher ? (
    <>
      <Nav />
      <div
        className="container lectures my-5 mt-lms"
        style={{
          position: "relative",
          left: isLaptop ? 0 : 150,
          width: isLaptop ? "100%" : "71vw",
        }}
      >
        {dataloading && (
          <div className="d-flex justify-content-center my-4">
            <CircularProgress style={{ color: "#02a39b" }} />
          </div>
        )}
        {msg && <h1 className="fw-bold text-center">{msg + "..."}</h1>}
        <div className="d-flex flex-column flex-sm-row h-100">
          {!subTopic && (
            <div className="topics pe-2">
              {lectures[0] && (
                <>
                  <div>
                    {lectures.map((lecture, index) => {
                      return (
                        <>
                          <div key={index}>
                            <Button
                              onClick={() =>
                                setTimeout(() => {
                                  setSubTopic(true);
                                  setSubLectures(lecture.watch);
                                }, 400)
                              }
                              variant="contained"
                              fullWidth
                              className="outline mt-2 custom-btn"
                              color="primary"
                            >
                              {lecture.topic}
                            </Button>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}

          {subTopic && (
            <div className="topics pe-2">
              <Button
                variant="text"
                onClick={() =>
                  setTimeout(() => {
                    setSubTopic(false);
                    setVideo("");
                  }, 400)
                }
                className="outline"
              >
                <i className="fas fa-arrow-left"></i>&nbsp;&nbsp;Go Back
              </Button>
              {subLectures[0] && (
                <div>
                  {subLectures.map((subLecture, index) => {
                    return (
                      <>
                        <div key={index}>
                          <Button
                            variant="contained"
                            fullWidth
                            onClick={() => {
                              setVideo("");
                              setVideo(subLecture.video);
                              setTopic("a");
                              setTimeout(() => {
                                setTopic(subLecture.subTopic);
                              }, 100);
                            }}
                            className="outline mt-2 custom-btn"
                            color="primary"
                          >
                            {subLecture.subTopic}
                          </Button>
                        </div>
                      </>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          {video ? (
            <div className="video">
              <iframe
                title={Math.random()}
                width="100%"
                height="100%"
                src={`${video ? video + "?rel=0" : ""}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              {stars.map((val, ind) => {
                return (
                  <>
                    <h6 className="mb-0 mt-3 fw-bold">Rate this Video</h6>
                    <p className="small mb-0">
                      (Kindly rate this video content, it ll help us to
                      improve/standardise the Quality Education)
                    </p>
                    <ReactStars
                      count={5}
                      key={ind}
                      onChange={ratingChanged}
                      size={30}
                      value={val.courseName === topic ? val.stars : 0}
                      isHalf={true}
                      edit={val.stars ? false : true}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#ffd700"
                      classNames="outline"
                    />
                  </>
                );
              })}

              {stars.length === 0 && (
                <>
                  <h6 className="mb-0 mt-3 fw-bold">Rate this Video</h6>
                  <p className="small mb-0">
                    (Kindly rate this video content, it ll help us to{" "}
                    <strong>improve / standardise</strong> the Quality
                    Education)
                  </p>
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={30}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                    classNames="outline"
                  />
                </>
              )}
            </div>
          ) : (
            <img
              src="https://i.ibb.co/Sd0qZ7X/dplmslogo.png"
              alt="DigiPAKISTAN"
              width="400"
              height="100"
            />
          )}
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        className="modalLeft"
      >
        <Modal.Header>
          <Modal.Title className="fw-bold">
            You are giving {rating} star rating to this video Content.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <span className="fw-bold">Happy:</span> {rating}
          </p>
          <Input
            id="comment"
            variant="standard"
            fullWidth
            multiline
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            label="Suggestions Box"
            helperText="Please share your suggestions if you are facing any problem so we may improve"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            disabled={loading}
            onClick={availableRatings.length > 0 ? updateRatings : firstRating}
            className="custom-btn"
          >
            {loading && <CircularProgress className="loader me-2" />}{" "}
            {loading ? "Submitting" : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  ) : (
    <Loader />
  );
};

export default BlockchainTechnology;
