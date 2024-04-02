import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import "./Card.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Button from "../Button/Button";
const GroupInformation = () => {
  useEffect(() => {
    fetchGroupData();
  }, []);

  const history = useHistory();
  const [data, setData] = useState();
  const [memberJoined, setMemberJoined] = useState();
  const [members, setMembers] = useState();
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const fetchGroupData = async () => {
    const response = await fetch("http://localhost:6969/api/specificgroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: id,
        token: localStorage.getItem("token"),
      }),
    });
    const responseData = await response.json();
    if (responseData.status == "ok") {
      setMemberJoined(responseData.memberJoined);
      setData(responseData.message);
      setMembers(responseData.message.group.groupInformation.groupMembers);
    } else {
      alert("Couldn't fetch Groups");
    }
  };
  const joinGroup = async () => {
    const response = await fetch("http://localhost:6969/api/joingroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: id,
        token: localStorage.getItem("token"),
      }),
    });
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.status == "ok") {
      alert(responseData.message);
    } else {
      alert(responseData.message);
    }

    window.location.reload();
  };

  return (
    <div>
      {!data && (
        <Button
          onClick={() => {
            fetchGroupData();
          }}>
          View Group Information
        </Button>
      )}
      {data && (
        <div>
          <div className="xOneTwo">
            <div className="upperkjhasc">
              <div className="jshifudsafb">
                <img
                  className="sakdjbasfas"
                  src="https://picsum.photos/600"
                  alt=""
                  height="100px"
                  width="100px"
                />
              </div>
              <div className="maxFlex">
                {!memberJoined ? (
                  <button className="xButtonOne" onClick={joinGroup}>
                    Join
                  </button>
                ) : (
                  <button
                    className="xButtonOne"
                    onClick={() => {
                      alert("Already Joined");
                    }}>
                    Joined
                  </button>
                )}
                <button
                  className="xButtonOne"
                  onClick={() => {
                    history.push("/allgroups");
                  }}>
                  All Groups{" "}
                </button>
              </div>
            </div>
          </div>

          <div 
           style={{
            fontFamily:"serif",
            marginTop: "60px",
            height: "50%",
            width: "70%",
            marginLeft: "15%",
            marginRight: "15%",
            display:"flex",
            flexDirection:"column",
            padding: "2rem",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            "box-shadow": "0 3px 10px rgb(0 0 0 / 0.5)",
            "border-radius": "10px",
          }}>
            <h2 style={{color : "DarkOliveGreen", fontSize:"40px"}}>{data.group.groupInformation.groupName}</h2>
            <div style={{height:"150px", width:"60%", textAlign:"justify"}}><h3 style={{fontSize:"40px", color: "DarkOliveGreen", textAlign:"center"}}>Bio</h3> <p style={{fontSize:"30px", textAlign:"center"}}>{data.group.groupInformation.groupDescription}</p></div>
            <h3 style={{fontSize:"25px", color: "DarkOliveGreen", textAlign:"center"}} >Group Creater : {data.group.groupInformation.groupCreater}</h3>
            <h3 style={{fontSize:"25px", color: "DarkOliveGreen", textAlign:"center"}}>
              Total Group Members:
              {data.group.groupInformation.groupMembers.length}
            </h3>
            
            <h3 style={{fontSize:"25px", color: "DarkOliveGreen", textAlign:"center"}}>
              Total Group Events:{" "}
              {data.group.groupInformation.groupEvents.length}
            </h3>
            
            {memberJoined ? (
              <Modal members={members} />
            ) : (
              <h3>Please Join The Group to View Members</h3>
            )}
            {/* <button className="buttonOneTwo">Events</button>
            <button className="buttonOneTwo">Blog</button>
            <button className="buttonOneTwo">Gallery</button> */}

<p style={{fontSize:"16px", color: "black", textAlign:"center"}}>Group Id:{data.group.groupInformation.groupId}</p>
            <br />
            <br />
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupInformation;
