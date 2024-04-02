import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import OffcanvasExample from "../Nav/OffcanvasExample";
import Footer from "../Footer/Footer";
const CreateDiscussion = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const { groupId } = useParams();

  const send = async () => {
    const response = await fetch("http://localhost:6969/api/creatediscussion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        discussionTitle: title,
        discussionDescription: description,
        token: localStorage.getItem("token"),
        groupId: groupId,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status == "okay") {
      alert(data.message);
    } else {
      alert(data.message);
    }
  };
  return (
    <div
      style={{
        marginTop: "-20px",
        height: "80vh",
      }}>
      <OffcanvasExample />
      <h1>Discussion creation form</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "1rem",
        }}>
        <div>
          <TextField
            id="outlined-basic"
            label="Enter Discussion Title"
            variant="outlined"
            style={{
              width: "30%",
            }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <br />
        <div>
          <TextField
            id="outlined-basic"
            label="Enter Discussion Description"
            variant="outlined"
            style={{
              width: "30%",
            }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <br />
        <label>
          Please be gentle with words and do not create any nuisance
        </label>
        <br />
      </div>
      <Button onClick={send} variant="contained">
        Submit Form
      </Button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
};
export default CreateDiscussion;
