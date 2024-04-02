import { padding } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Button from "../Components/Button/Button";
import Footer from "../Components/Footer/Footer";
import OffcanvasExample from "../Components/Nav/OffcanvasExample";

export default function Group() {
  const [data, setData] = useState([]);
  const history = useHistory();

  const fetchGroupData = async () => {
    const response = await fetch("http://localhost:6969/api/yourgroups", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const rData = await response.json();
    if (rData.status == "ok") {
      console.log(rData.data);
      setData(rData.data);
    } else {
      alert("Couldn't fetch Groups");
    }
  };

  const eventsTrigger = (e) => {
    e.preventDefault();
    console.log(e.target);
  };
  useEffect(() => {
    fetchGroupData();
  }, []);

  return (
    <div
      style={{
        marginTop: "-20px",
      }}>
      <OffcanvasExample />
      <h1 style={{ margin: 0, padding: "1rem", "font-size": "3rem" }}>
        You are a part of these Groups
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}>
        {data.map((i) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "1rem",
              }}>
              <div
                style={{
                  padding: "2rem",
                  margin: "5px",
                  width: "600px",
                  height: "550px",
                  borderRadius: "20px",
                  "box-shadow": "0 3px 10px rgb(0 0 0 / 0.2)",
                  "border-radius": "20px",
                  cursor: "pointer",
                }}>
                <div
                  style={{
                    display: "flex",
                    "align-items": "center",
                    "justify-content": "center",
                  }}>
                  <img
                    src="logo1.png"
                    alt="img"
                    style={{
                      width: "200px",
                      height: "200px",
                    }}
                  />
                </div>
                <div style={{ textAlign: "left" }}>
                  <h2 style={{ fontSize: "30px" }}>{i.groupName}</h2>
                  <p>
                    <h3 style={{ fontSize: "20px" }}>
                      Group Location : {i.groupLocation}
                    </h3>
                  </p>
                  <p>
                    {" "}
                    <div
                      style={{
                        width: "450px",
                        "text-align": "justify",
                      }}>
                      <h3 style={{ fontSize: "20px" }}> Group Description :</h3>
                      <p style={{ fontSize: "18px" }}> {i.groupDescription} </p>
                    </div>
                  </p>
                  {/* <p>----------------------------------</p> */}
                  {/* <p>
                    {" "}
                    <strong> SESSION DETAILS </strong>
                  </p>
                  <p>----------------------------------</p>
                  <p>
                    11:00am – 11:30am - Getting started with Azure Cognitive
                    Services
                  </p> */}
                  <h6 style={{ fontSize: "12px" }}> Group Id: {i.groupId}</h6>
                  <div style={{ display: "flex", "flex-direction": "row" }}>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        history.push(`/yourgroups/${i.groupId}`);
                      }}>
                      Events
                    </Button>
                    {/* <Button
                      onClick={() => {
                        history.push(`${i.groupId}/members`);
                      }}>
                      Members
                    </Button> */}
                    <Button
                      onClick={() => {
                        history.push(`/blogs/${i.groupId}`);
                      }}>
                      Blog
                    </Button>
                    <Button
                      onClick={() => {
                        history.push(`/gallery/${i.groupId}`);
                      }}>
                      Gallery
                    </Button>

                    <Button
                      onClick={() => {
                        history.push(`/discussion/${i.groupId}`);
                      }}>
                      Discussion
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
