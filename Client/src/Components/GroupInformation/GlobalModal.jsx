import React, { useState } from "react";
import "./Modal.css";
import { Button } from "@mui/material";
import { display } from "@material-ui/system";

export default function GlobalModal(props) {
  const [modal, setModal] = useState(false);
  const [comment, setComment] = useState("");
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  const addComment = async () => {
    const response = await fetch(
      "http://localhost:6969/api/creatediscussioncomment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupId: props.groupId,
          discussionId: props.discussionId,
          commentContent: comment,
          token: localStorage.getItem("token"),
        }),
      }
    );
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.status == "ok") {
      alert(responseData.message);
    }
    if (responseData.status == "error") {
      alert(responseData.message);
    }
    window.location.reload();
  };

  return (
    <>
      <Button variant="outlined" onClick={toggleModal}>
        {props.buttonName}
      </Button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              "line-height": 1.4,
              background: "#f1f1f1",
              padding: "14px 28px",
              "border-radius": "3px",
              "max-width": "700px",
              "min-width": "500px",
              "min-height": "300px",
              "max-height": "500px",
            }}>
            <h2>{props.modalTitle}</h2>
            <br />
            {/* <p>
            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
            ipsam atque a dolores quisquam quisquam adipisci possimus
            laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
            accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
            reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
            deleniti rem!
          </p> */}
            <p>{props.modalDescription}</p>
            <br />

            <h2>Comments</h2>
            <div
              style={{
                overflow: "scroll",
                height: "300px",
              }}>
              {props.comments &&
                props.comments.map((i) => {
                  return (
                    <div
                      style={{
                        overflow: "scroll",
                      }}>
                      {console.log(props.discussionId)}
                      <div
                        style={{
                          "box-shadow": "0 3px 10px rgb(0 0 0 / 0.4)",
                          display: "flex",
                          "flex-direction": "row",
                          alignItems: "center",
                          "justify-content": "space-around",
                          margin: "10px",
                          padding: "5px",
                          "border-radius": "5px",
                        }}>
                        <h3>{i.commentContent}</h3>
                        <h4>{i.commentCreatedBy}</h4>
                        <h4>{i.commentCreatedOn}</h4>
                      </div>
                    </div>
                  );
                })}
            </div>
            <input
              style={{
                width: "70%",
                height: "40px",
              }}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Whats Your take on this?"
            />
            <Button variant="contained" onClick={addComment}>
              Add Comment
            </Button>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
