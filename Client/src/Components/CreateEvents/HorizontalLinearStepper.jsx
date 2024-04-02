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
    "Enter Event's Information",
    "Brief Details About your Information",
    "Almost done! Just take a minute to review our guidelines",
  ];
}

export default function HorizontalLinearStepper() {
  const [file, setFile] = useState(null);
  const { id } = useParams();
  console.log("id", id);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [values, setValues] = useState({
    eventName: "",
    eventLocation: "",
    eventDate: "",
    eventUrl: "",
    eventMode: "",
    eventCategory: "",
    eventPublicDetails: "",
    eventPresentationDetails: "",
    eventWorkshopDetails: "",
  });
  const send = async (e) => {
    console.log(file);
    const data = new FormData();
    // data.append('name', fileName)
    data.append("file", file);

    const response = await fetch("http://localhost:6969/upload", {
      method: "POST",
      body: data,
    });
    const res = await response.json();
    console.log(res);
    if (res.message == "success") {
      sendGroupData(res.CID);
    } else {
      alert(res.message);
    }
  };

  const steps = getSteps();
  const { location, setLocation } = useContext(AppContext);
  const { name, setName } = useContext(AppContext);
  // const [name2, setName2] = useState("");
  // console.log("Hi", name, location);

  const handleChange = (e) => {
    setLocation(e.target.value);
    console.log("Location", e.target.value);
    setValues({ ...values, location: e.target.value });
  };

  const handleChange1 = (e) => {
    setName(e.target.value);
    setValues({ ...values, name: e.target.value });
  };
  const handleChange2 = (e) => {
    setValues({ ...values, description: e.target.value });
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div style={{ width: "70%", margin: "auto", textAlign: "left" }}>
            <h1>First, Enter Your Event Details.</h1>
            <p>
              Here at Hear ME Out you can create events inorder to meet locally, in person and online. We'll
              connect you with the people so that more can join you.
            </p>
            <p>
              Getting back out there is exciting, but it’s understandable to
              Here are three fun ways you can get to know your
              people. Reduce stress, improve your mood, and connect with
              others by pursuing your new artistic hobby through Hear Me Out.
            </p>
            <div
              styles={{
                display: "none",
                "align-items": "center",
                "justify-content": "center",
              }}>
              <div style={{}}>
                <p>Enter Event Name: </p>
                <TextField
                  id="outlined-basic"
                  label="Enter Event Name"
                  variant="outlined"
                  onChange={(e) => {
                    e.preventDefault();
                    setValues({
                      ...values,
                      eventName: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <p>Enter Event Location: </p>
                <TextField
                  id="outlined-basic"
                  label="Enter Event Location"
                  variant="outlined"
                  onChange={(e) => {
                    e.preventDefault();
                    setValues({
                      ...values,
                      eventLocation: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <p>Choose Event Date: </p>
                <TextField
                  type={"date"}
                  id="outlined-basic"
                  variant="outlined"
                  style={{}}
                  onChange={(e) => {
                    e.preventDefault();
                    setValues({
                      ...values,
                      eventDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <p>Upload Event Image</p>
                {/* <TextField
                  id="outlined-basic"
                  label="Add Event Image Url"
                  variant="outlined"
                  onChange={(e) => {
                    e.preventDefault();
                    setValues({
                      ...values,
                      eventUrl: e.target.value,
                    });
                  }}
                /> */}
                <input
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              </div>
              <div>
                <p>Event Mode: </p>
                <TextField
                  id="outlined-basic"
                  label="Online or Offline"
                  variant="outlined"
                  onChange={(e) => {
                    e.preventDefault();
                    setValues({
                      ...values,
                      eventMode: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div style={{ width: "70%", margin: "auto", textAlign: "left" }}>
            <h1>Some More Information About Your Event</h1>
            <p>
              Choose a name that will give people a clear idea of what the group
              is about. Feel free to get creative!
            </p>
            <p>
              Getting back out there is exciting, but it’s understandable to
              feel a bit nervous. Here are three fun ways you can get to know your
              people. Reduce stress, improve your mood, and connect with
              others by pursuing your new artistic hobby through Hear Me Out.
            </p>

            <div>
              <p>Public Details : </p>
              <TextField
                id="outlined-basic"
                label="Please Enter Public Details"
                variant="outlined"
                onChange={(e) => {
                  e.preventDefault();
                  setValues({
                    ...values,
                    eventPublicDetails: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <p>Presentation Details : </p>
              <TextField
                id="outlined-basic"
                label="Please Enter Presentation Details"
                variant="outlined"
                onChange={(e) => {
                  e.preventDefault();
                  setValues({
                    ...values,
                    eventPresentationDetails: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <p>Workshop Details : </p>
              <TextField
                id="outlined-basic"
                label="Please Enter Public Details"
                variant="outlined"
                onChange={(e) => {
                  e.preventDefault();
                  setValues({
                    ...values,
                    eventWorkshopDetails: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <p>Event Category : </p>
              <TextField
                id="outlined-basic"
                label="Please Enter Event Category"
                variant="outlined"
                onChange={(e) => {
                  e.preventDefault();
                  setValues({
                    ...values,
                    eventCategory: e.target.value,
                  });
                }}
              />
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

  const sendGroupData = async (cid) => {
    const response = await fetch("http://localhost:6969/api/createEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: id,
        eventId: Math.floor(Math.random() * 100000000000000),
        eventName: values.eventName,
        eventPublicDetails: values.eventPublicDetails,
        eventPresentationDetails: values.eventPresentationDetails,
        eventWorkshopDetails: values.eventWorkshopDetails,
        eventCategory: values.eventCategory,
        eventLocation: values.eventLocation,
        eventDate: values.eventDate,
        eventUrl: cid,
        eventMode: values.eventMode,
        token: localStorage.getItem("token"),
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status == "ok") {
      alert("Event Created Successfully");
    } else {
      alert("Event Creation Failed");
    }
    window.location.href = "/home";
  };

  return (
    <div className={classes.root}>
      <Nav style={{ "margin-bottom": "0rem" }}>
        {/* <LogoCont>
          <img
            style={{ margin: "1rem", width: "120px", height: "120px" }}
            src="logo1.png"
            alt="logo-img"
          />
        </LogoCont> */}
        <h1
          style={{
            "font-size": "3rem",
          }}>
          Create Events Within Your Group
        </h1>
        <LogoCont
          style={{
            marginRight: "30px",
            backgroundColor: "#FF8C00",
            borderRadius: "10px",
            padding: "10px",
            color: "white",
            margin: "3.4rem",
            cursor: "pointer",
          }}
          onClick={send}>
          Save and exit
        </LogoCont>
      </Nav>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

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
              style={{
                textAlign: "center",
                marginTop: "30px",
                height: "90vh",
                fontSize: "20px",
              }}
              className={classes.instructions}>
              All steps are completed - you&apos;re finished. The Group is
              created. Please click on save and exit to save the group.
              {/* Go back to Home Page <Link to="/home">Back to Home</Link> */}
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
              {/* {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}>
                  Skip
                </Button>
              )} */}

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
