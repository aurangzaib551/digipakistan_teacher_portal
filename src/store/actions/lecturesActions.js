export const uploadLecture = (collection, topic, subTopic, video) => {
  return (dispatch, getState, { firebase }) => {
    firebase
      .firestore()
      .collection(collection)
      .doc(topic)
      .set({
        topic,
        watch: [
          {
            subTopic,
            video,
          },
        ],
      })
      .then(() => {
        firebase
          .firestore()
          .collection("Notifications")
          .add({
            name: `${collection} lecture has been uploaded`,
            createdAt: new Date(),
          });
      })
      .then(() =>
        dispatch({
          type: "LECTURE_UPLOADED",
          payload: "Lecture uploaded successfully",
        })
      );
  };
};

export const updateLecture = (watch, collection, topic) => {
  return (dispatch, getState, { firebase }) => {
    if (watch) {
      firebase
        .firestore()
        .collection(collection)
        .doc(topic)
        .update({
          watch,
        })
        .then(() => {
          firebase
            .firestore()
            .collection("Notifications")
            .add({
              name: `${collection} lecture has been uploaded`,
              createdAt: new Date(),
            });
        })
        .then(() =>
          dispatch({
            type: "LECTURE_UPDATED",
            payload: "Lecture updated successfully",
          })
        );
    }
  };
};

export const clearAll = () => {
  return (dispatch) =>
    dispatch({
      type: "CLEAR_ALL",
    });
};
