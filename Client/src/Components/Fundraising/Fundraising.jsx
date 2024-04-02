import { Button } from "@mui/material";
import React from "react";
import image from "../../../src/assets/fund.png";
import Footer from "../Footer/Footer";
import FundraisingModal from "../GroupInformation/FundraisingModal";
import OffcanvasExample from "../Nav/OffcanvasExample";
const Fundraising = () => {
  const [fundraising, setFundraising] = React.useState();
  React.useEffect(() => {
    getAllFundRaisingEvents();
  }, []);
  const getAllFundRaisingEvents = async () => {
    const response = await fetch(
      "http://localhost:6969/api/getfundraisingevents",
      {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
    const responseData = await response.json();
    if (responseData.status == "ok") {
      setFundraising(responseData.data);
    } else {
      alert(responseData.message);
    }
  };
  console.log(fundraising);
  return (
    <div
      style={{
        marginTop: "-20px",
      }}>
    <OffcanvasExample />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
        }}>
        <h1
          style={{
            fontSize: "40px",
          }}>
          Public Fundraising
        </h1>
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/create-fundraising";
          }}>
          Create Fundraising
        </Button>
      </div>
      <div>
        {fundraising &&
          fundraising.map((i) => {
            return i.map((j) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}>
                  <div
                    style={{
                      "box-shadow": "0 3px 10px rgb(0 0 0 / 0.4)",
                      borderRadius: "15px",
                      padding: "20px",
                      width: "60%",
                      margin: "20px",
                    }}>
                    <img
                      style={{
                        width: "150px",
                        height: "150px",
                      }}
                      src={image}
                    />
                    <h1>{j.fundRaisingEventName}</h1>
                    <p
                      style={{
                        textAlign: "justify",
                      }}>
                      {j.fundRaisingEventDescription}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                      <h4>
                        Fundraising Goal:{j.fundRaisingEventFundGoal}&#8377;
                      </h4>
                      <h4>
                        Funds Raised:{j.fundRaisingEventFundRaised}&#8377;
                      </h4>
                      <p>Created By : {j.createdBy}</p>
                      <p>Create at : {j.createdAt}</p>
                      <p
                        style={{
                          color: "green",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          window.open(
                            `https://ipfs.io/ipfs/${j.fundRaisingDocument}`
                          );
                        }}>
                        View Document
                      </p>
                      {/* <div
                    style={{
                      width: "40%",
                      backgroundColor: "grey",
                      borderRadius: "10px",
                    }}>
                    <ProgressBar
                      variant="success"
                      style={{
                        width: "30%",
                        backgroundColor: "blue",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      now={80}
                      label={"Suii"}
                    />
                  </div> */}
                      <FundraisingModal
                        fundRaisingEventId={j.fundRaisingEventId}
                        buttonName={"Add Funds to this Event"}
                        modalTitle={"Add Funds to this Event"}
                        title={j.fundRaisingEventName}
                      />
                    </div>
                  </div>
                </div>
              );
            });
          })}
      </div>
      <Footer />
    </div>
  );
};

export default Fundraising;
