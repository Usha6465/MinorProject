import React, { useEffect, useState } from "react";
import styles from "./Members.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const Members = () => {
  const { id } = useParams();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getMembersList();
  }, []);

  const getMembersList = async () => {
    const response = await fetch(`http://localhost:6969/api/getgroupmembers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: id,
      }),
    });
    const rData = await response.json();
    if (rData.status == "ok") {
      console.log(rData.data);
      setMembers(rData.data);
    } else {
      alert("Couldn't fetch Groups");
    }
  };
  return (
    <div>
      <button onClick={getMembersList}>click</button>
      <div>
        {members.map((i) => {
          return (
            <div>
              {i.map((j) => {
                return (
                  <div>
                    <h2>{j.memberEmail}</h2>
                    <h2>{j.memberUserName}</h2>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Members;
