import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
`;
const LogoCont = styled.div``;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
  // button: {
  //   // marginRight: theme.spacing(1)
  // },
  // instructions: {
  //   marginTop: theme.spacing(1),
  //   marginBottom: theme.spacing(1)
  // }
}));

function getSteps() {
  return [
    "Enter Your Blog Details",
    "Enter The Content For Your Blog",
    "Almost done! Just take a minute to review our guidelines",
  ];
}

export default function CreateBlog() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const { id } = useParams();
  const [values, setValues] = useState({
    blogTitle: "",
    blogContent: "",
    blogImageUrl: "",
  });

  const steps = getSteps();
  const { location, setLocation } = useContext(AppContext);
  const { name, setName } = useContext(AppContext);
  // const [name2, setName2] = useState("");
  // console.log("Hi", name, location);

  const checkAbusive = async () => {
    const response = await fetch("http://localhost:6969/api/checkabusive", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blogContent: values.blogContent,
      }),
    });
    const responseData = await response.json();
    if (responseData.status == "ok") {
      alert(responseData.message);
    } else {
      alert(responseData.message);
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div style={{ width: "70%", margin: "auto", textAlign: "left" }}>
            <h1>First, Enter Your Blog Title</h1>
            {/* <p>
              Hear ME Out groups meet locally, in person and online. We'll
              connect you with people in your area, and more can join you
              online.
            </p> */}
            <p>
              Getting back out there is exciting, but it’s understandable to
              feel a bit nervous. Reduce stress, improve your mood, and connect
              with others by pursuing your new artistic hobby through Hear Me
              Out.
            </p>
            <div style={{ display: "flex", gap: "3rem" }}>
              <p>Enter Blog Title </p>
              <TextField
                id="outlined-basic"
                label="Enter Blog Title "
                variant="outlined"
                onChange={(e) => {
                  setValues({ ...values, blogTitle: e.target.value });
                }}
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div style={{ width: "70%", margin: "auto", textAlign: "left" }}>
            <h1>Enter your Blog Title</h1>
            <p>
              Choose a suitable title for your Blog. Feel free to get creative!
              You can edit this later if you change your mind.
            </p>
            <p>
              Getting back out there is exciting, but it’s understandable to
              feel a bit nervous. Here are three fun ways you can get to know
              your people. Reduce stress, improve your mood, and connect with
              others by pursuing your new artistic hobby through Hear Me Out.
            </p>

            {/* <div
              style={{
                display: "flex",
                gap: "20px",
              }}>
              <p>Upload Blog Image URL</p>
              <TextField
                id="outlined-basic"
                label="Upload Blog Image URL"
                variant="outlined"
                onChange={(e) => {
                  // console.log("Name", e.target.value);
                  setValues({ ...values, blogImageUrl: e.target.value });
                }}
              />
            </div> */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}>
              <TextField
                id="outlined-basic"
                label="Enter Blog Content"
                variant="outlined"
                multiline
                rows={10}
                onChange={(e) => {
                  // console.log("Name", e.target.value);
                  setValues({ ...values, blogContent: e.target.value });
                }}
                style={{
                  width: "50%",
                }}
              />
              <Button
                onClick={checkAbusive}
                style={{
                  margin: "1rem",
                }}
                variant="contained">
                Check for abusive words
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div style={{ width: "70%", margin: "auto", textAlign: "left" }}>
            <h1>Almost done! Just take a minute to review our guidelines</h1>
            <p>
              Hear Me Out is all about helping people live fuller, happier
              lives—with the help of strong communities. This means that all
              groups should:
            </p>
            <ul>
              <li>Provide growth opportunities for members</li>
              <li>Encourage real human interactions in person or online</li>
              <li>Have a host present at all events</li>
              <li>Be transparent about the group’s intentions</li>
            </ul>
            <p>
              You can read more about all of this in our{" "}
              <strong>community guidelines.</strong>
            </p>
            <p>
              Once you submit your group, a human at Hear Me Out will review it
              based on these guidelines and make sure it gets promoted to the
              right people.
            </p>
          </div>
        );
      default:
        return "Unknown step";
    }
  }

  // const history = React.useHistory();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    // history.push('./home')
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  const sendGroupData = async () => {
    console.log(values);
    const response = await fetch("http://localhost:6969/api/createblog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: id,
        blogTitle: values.blogTitle,
        blogContent: values.blogContent,
        blogImageUrl: values.blogImageUrl,
        token: localStorage.getItem("token"),
        blogId: Math.floor(Math.random() * 100000000000000),
      }),
    });
    const data = await response.json();
    if (data.status == 200) {
      alert("Blog Created Successfully");
    }
    if (data.status == 400) {
      alert("Blog Creation Failed");
    }
  };

  return (
    <div className={classes.root}>
      <Nav style={{ "margin-bottom": "0rem" }}>
        <h1
          style={{
            "font-size": "3rem",
            padding: "1rem",
          }}>
          Create Blog
        </h1>
        <LogoCont
          onClick={sendGroupData}
          style={{
            marginRight: "30px",
            backgroundColor: "#FF8C00",
            borderRadius: "10px",
            padding: "10px",
            color: "white",
            margin: "3.4rem",
            cursor: "pointer",
          }}>
          Save and exit
        </LogoCont>
      </Nav>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography
              style={{ textAlign: "center", marginTop: "30px" }}
              className={classes.instructions}>
              All steps completed - you&apos;re finished. The Group is created.
              Go back to Home Page <Link to="/home">Back to Home</Link>
            </Typography>
            {/* <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button> */}
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                marginRight: "100px",
              }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}>
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}>
                  Skip
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                style={{ textAlign: "right" }}
                className={classes.button}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
