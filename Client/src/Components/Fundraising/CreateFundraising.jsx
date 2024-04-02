import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import OffcanvasExample from "../Nav/OffcanvasExample";


const CreateFundraising = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState();
  const [fundRaisingEventName, setFundRaisingEventName] = useState();
  const [fundRaisingEventDescription, setFundRaisingEventDescription] =
    useState();
  const [fundRaisingEventFundGoal, setFundRaisingEventFundGoal] = useState();

  const send = async (e) => {
    if (!file || !fundRaisingEventName || !fundRaisingEventDescription || !fundRaisingEventFundGoal) {
      alert("Please fill in all fields and select a file");
      return;
    }
  
    const data = new FormData();
    data.append("file", file);
  
    try {
      const response = await fetch("http://localhost:6969/upload", {
        method: "POST",
        body: data,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const res = await response.json();
      console.log(res);
  
      if (res.message === "File uploaded successfully") {
        imageUploader(res.fileId); // Pass fileId directly
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An error occurred while uploading the file");
    }
  };
    
  const imageUploader = async (cid) => {
    const response = await fetch(
      "http://localhost:6969/api/create-fundraising-event",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fundRaisingEventName: fundRaisingEventName,
          fundRaisingEventDescription: fundRaisingEventDescription,
          fundRaisingEventFundGoal: fundRaisingEventFundGoal,
          fundRaisingDocument: cid,
          token: localStorage.getItem("token"),
        }),
      }
    );
    const res = await response.json();
    console.log(res);
    if (res.status == "ok") {
      alert(res.message);
      window.location.reload();
    }
    if (res.status == "error") {
      alert(res.message);
    }
  };
  return (
    <div
      style={{
        marginTop: "-20px",
        height: "100vh",
      }}>
          <OffcanvasExample />
      <h1>Fundraising creation form</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "1rem",
        }}>
        <div>
          <TextField
            id="outlined-basic"
            label="Enter Fundraising Event Name"
            variant="outlined"
            style={{
              width: "30%",
            }}
            onChange={(e) => {
              setFundRaisingEventName(e.target.value);
            }}
          />
        </div>
        <br />
        <div>
          <TextField
            id="outlined-basic"
            label="Enter Fundraising Event Description"
            variant="outlined"
            style={{
              width: "30%",
            }}
            onChange={(e) => {
              setFundRaisingEventDescription(e.target.value);
            }}
          />
        </div>
        <br />
        <div>
          <TextField
            type="number"
            id="outlined-basic"
            label="Enter Event Fundraising Goal"
            variant="outlined"
            style={{
              width: "30%",
            }}
            onChange={(e) => {
              setFundRaisingEventFundGoal(e.target.value);
            }}
          />
        </div>
        <br />
        <label>
          Please upload the Original Documents so that users can view
        </label>
        <br />
        <div>
          <TextField
            type="file"
            id="outlined-basic"
            variant="outlined"
            style={{
              width: "30%",
            }}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        </div>
        <br />
      </div>
      <Button onClick={send} variant="contained">
        Submit Form
      </Button>
    </div>
  );
};

export default CreateFundraising;
