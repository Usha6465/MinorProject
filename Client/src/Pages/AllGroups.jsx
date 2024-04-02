// import { padding } from "@mui/system";
// import React, { useEffect, useState } from "react";
// import { useContext } from "react";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import Button from "../Components/Button/Button";

// export default function AllGroups() {
//   const [data, setData] = useState([]);
//   const history = useHistory();

//   const fetchGroupData = async () => {
//     const response = await fetch("http://localhost:6969/api/getallGroups", {
//       method: "GET",
//       headers: {
//         "x-access-token": localStorage.getItem("token"),
//       },
//     });
//     const rData = await response.json();
//     if (rData.status == "ok") {
//       console.log(rData.message);
//       setData(rData.message);
//     } else {
//       alert("Couldn't fetch Groups");
//     }
//   };

//   const eventsTrigger = (e) => {
//     e.preventDefault();
//     console.log(e.target);
//   };
//   useEffect(() => {
//     fetchGroupData();
//   }, []);
//   console.log(
//     data.map((i) => {
//       return (
//         i.group.groupInformation.groupName,
//         i.group.groupInformation.groupLocation,
//         i.group.groupInformation.groupDescription
//       );
//     })
//   );

//   return (
//     <div>
//       <h1 style={{ margin: 0, padding: "1rem", "font-size": "3rem" }}>
//         Join Groups
//       </h1>
//       <Button
//         onClick={() => {
//           history.push("/home");
//         }}>
//         Home
//       </Button>
//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           alignItems: "center",
//           justifyContent: "center",
//         }}>
//         {data
//           .map((i) => {
//             return (
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   margin: "1rem",
//                 }}>
//                 <div
//                   style={{
//                     padding: "2rem",
//                     margin: "5px",
//                     width: "500px",
//                     height: "250px",
//                     borderRadius: "20px",
//                     "box-shadow": "0 3px 10px rgb(0 0 0 / 0.5)",
//                     "border-radius": "10px",
//                     cursor: "pointer",
//                   }}>
//                   <div
//                     style={{
//                       display: "flex",
//                       "align-items": "center",
//                       "justify-content": "center",
//                     }}>
//                     <img
//                       src="logo1.png"
//                       alt="img"
//                       style={{
//                         width: "100px",
//                         height: "100px",
//                       }}
//                     />
//                   </div>
//                   <div style={{ textAlign: "left" }}>
//                     <h2>Group Name : {i.group.groupInformation.groupName}</h2>
//                     <p>
//                       <h2>City : {i.group.groupInformation.groupLocation}</h2>
//                     </p>
//                     {/* <p>----------------------------------</p> */}
//                     {/* <p>
//                     {" "}
//                     <strong> SESSION DETAILS </strong>
//                   </p>
//                   <p>----------------------------------</p>
//                   <p>
//                     11:00am – 11:30am - Getting started with Azure Cognitive
//                     Services
//                   </p> */}
//                     <div style={{ display: "flex", "flex-direction": "row" }}>
//                       {/* <Button
//                       onClick={() => {
//                         history.push(
//                           `${i.group.groupInformation.groupId}/members`
//                         );
//                       }}>
//                       Members
//                     </Button> */}
//                       <div>
//                         <Button
//                           style={{
//                             display: "flex",
//                             "align-items": "center",
//                             "justify-content": "center",
//                           }}
//                           onClick={() => {
//                             history.push(
//                               `/joingroup/${i.group.groupInformation.groupId}`
//                             );
//                           }}>
//                           View Group
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//           }
//       </div>
//     </div>
//   );
// }
import { Button as A, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Button from "../Components/Button/Button";
import OffcanvasExample from "../Components/Nav/OffcanvasExample";


export default function AllGroups() {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [location, setLocation] = useState(null);
  const fetchGroupData = async () => {
    const response = await fetch("http://localhost:6969/api/getallGroups", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const rData = await response.json();
    if (rData.status == "ok") {
      console.log(rData.message);
      setData(rData.message);
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
  console.log(
    data.map((i) => {
      return (
        i.group.groupInformation.groupName,
        i.group.groupInformation.groupLocation,
        i.group.groupInformation.groupDescription
      );
    })
  );

  return (
    <div>
      <div>
      <OffcanvasExample />
        <h1 style={{ margin: 0, padding: "1rem", "font-size": "3rem" }}>
          Join Groups
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "1rem",
          }}>
          <TextField
            onKeyPress={(e) => {
              setLocation(e.target.value);
            }}
            label="Search By Location"></TextField>
          <A
          style={{
            margin: "1rem",
          }}
            variant="contained"
            onClick={(e) => {
              setLocation(null);
            }}>
            Reset
          </A>
        </div>
      </div>

      {/* <Button
        onClick={() => {
          history.push("/home");
        }}>
        Home
      </Button> */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}>
        {!location
          ? data.map((i) => {
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
                      width: "500px",
                      height: "250px",
                      borderRadius: "20px",
                      "box-shadow": "0 3px 10px rgb(0 0 0 / 0.5)",
                      "border-radius": "10px",
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
                          width: "100px",
                          height: "100px",
                        }}
                      />
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <h2>Group Name : {i.group.groupInformation.groupName}</h2>
                      <p>
                        <h2>City : {i.group.groupInformation.groupLocation}</h2>
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
                      <div style={{ display: "flex", "flex-direction": "row" }}>
                        {/* <Button
                      onClick={() => {
                        history.push(
                          `${i.group.groupInformation.groupId}/members`
                        );
                      }}>
                      Members
                    </Button> */}
                        <div>
                          <Button
                            style={{
                              display: "flex",
                              "align-items": "center",
                              "justify-content": "center",
                            }}
                            onClick={() => {
                              history.push(
                                `/joingroup/${i.group.groupInformation.groupId}`
                              );
                            }}>
                            View Group
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : data
              .filter((j) =>
                j.group.groupInformation.groupLocation.includes(location)
              )
              .map((i) => {
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
                        width: "500px",
                        height: "250px",
                        borderRadius: "20px",
                        "box-shadow": "0 3px 10px rgb(0 0 0 / 0.5)",
                        "border-radius": "10px",
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
                            width: "100px",
                            height: "100px",
                          }}
                        />
                      </div>
                      <div style={{ textAlign: "left" }}>
                        <h2>
                          Group Name : {i.group.groupInformation.groupName}
                        </h2>
                        <p>
                          <h2>
                            City : {i.group.groupInformation.groupLocation}
                          </h2>
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
                        <div
                          style={{ display: "flex", "flex-direction": "row" }}>
                          {/* <Button
                      onClick={() => {
                        history.push(
                          `${i.group.groupInformation.groupId}/members`
                        );
                      }}>
                      Members
                    </Button> */}
                          <div>
                            <Button
                              style={{
                                display: "flex",
                                "align-items": "center",
                                "justify-content": "center",
                              }}
                              onClick={() => {
                                history.push(
                                  `/joingroup/${i.group.groupInformation.groupId}`
                                );
                              }}>
                              View Group
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
      </div>
    </div>
  );
}
