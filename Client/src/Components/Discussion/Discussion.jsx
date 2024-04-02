import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styles from "./Discussion.module.css";
import Modal from "../GroupInformation/Modal";
import GlobalModal from "../GroupInformation/GlobalModal";
import { Button } from "@mui/material";
import OffcanvasExample from "../Nav/OffcanvasExample";
import Footer from "../Footer/Footer";
import image from "../../assets/discussion.png";
import discussionImage from "../../assets/box (1).png";
const Discussion = () => {
  useEffect(() => {
    getAlldiscussion();
  }, []);
  const [discussion, setDiscussion] = useState();
  const { groupId } = useParams();
  const history = useHistory();

  const postDiscussion = () => {};

  const getAlldiscussion = async () => {
    const response = await fetch(
      "http://localhost:6969/api/getalldiscussions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupId: groupId,
        }),
      }
    );
    const responseData = await response.json();
    setDiscussion(responseData.message);
    console.log(responseData.message);
  };
  return (
    <div
      style={{
        height: "100vh",
        marginTop: "-20px",
      }}>
      <OffcanvasExample />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <img
            style={{
              width: "200px",
              height: "200px",
            }}
            src={image}
          />
          <h1
            style={{
              fontSize: "40px",
            }}>
            Discussion
          </h1>
        </div>

        <Button
          variant={"contained"}
          onClick={() => {
            history.push(`/creatediscussion/${groupId}`);
          }}>
          Create Discussion
        </Button>
      </div>
      {discussion &&
        discussion.map((item) => {
          return item.map((i) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: "20px",
                  marginLeft: "100px",
                  marginRight: "100px",
                  justifyContent: "space-around",
                  "box-shadow": "0 3px 10px rgb(0 0 0 / 0.4)",
                  padding: "10px",
                }}>
                <img
                  style={{
                    width: "70px",
                    height: "70px",
                  }}
                  src={discussionImage}
                />
                <h2>{i.discussionTitle}</h2>
                <h2>{i.discussionDescription}</h2>
                <p>{i.discussionCreatedBy}</p>
                <GlobalModal
                  buttonName={"View Discussion"}
                  modalTitle={i.discussionTitle}
                  modalDescription={i.discussionDescription}
                  comments={i.discussionComments}
                  discussionId={i.discussionId}
                  groupId={groupId}
                />
              </div>
            );
          });
        })}
      <br />
      <Footer />
    </div>
  );
};

export default Discussion;
