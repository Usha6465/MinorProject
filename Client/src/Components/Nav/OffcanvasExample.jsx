import React from "react";
import logo from "../../assets/hearMeOut.png";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const OffcanvasExample = () => {
  return (
    <>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "box-shadow": "0 3px 10px rgb(0 0 0 / 0.3)",
        
      }}>
      <div>
        <img
          style={{
            width: "60px",
            height: "60px",
            marginTop: "15px",
            padding: "5px",
          }}
          src={logo}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "10px",
        }}>
        <Link
          style={{
            textDecoration: "none",
            padding: "10px",
          }}
          to="/home">
          <Button variant="outlined">Home</Button>
        </Link>
        <Link
          style={{
            textDecoration: "none",
            padding: "10px",
          }}
          to="/yourgroups">
          <Button variant="outlined">Your Groups</Button>
        </Link>
        <Link
          style={{
            textDecoration: "none",
            padding: "10px",
          }}
          to="/fund-raising">
          <Button variant="outlined">Fundraising</Button>
        </Link>
        <Link
          style={{
            textDecoration: "none",
            padding: "10px",
          }}
          to="/profile">
          <Button variant="outlined">Profile</Button>
        </Link>
        {/* <Link
          style={{
            textDecoration: "none",
            padding: "10px",
          }}
          to="/logout">
          <Button variant="outlined">Logout</Button>
        </Link> */}
      </div>
    </div>
    </>
  );
};

export default OffcanvasExample;
