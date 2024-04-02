// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// import Button from "../Button/Button";
// import { useHistory } from "react-router-dom";
// const SpecificEvent = () => {
//   const [event, setEvent] = useState();
//   const { groupid, eventid } = useParams();
//   const history = useHistory();
//   console.log(groupid, eventid);

//   const fetchspecificEvent = async () => {
//     const response = await fetch(`http://localhost:6969/api/specificevent`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         groupId: groupid,
//         eventId: eventid,
//       }),
//     });
//     const responseData = await response.json();
//     setEvent(responseData.data);
//   };
//   const joinEvent = async () => {
//     const response = await fetch("http://localhost:6969/api/joinevent", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         groupId: groupid,
//         eventId: eventid,
//         token: localStorage.getItem("token"),
//       }),
//     });
//     const responseData = await response.json();
//     console.log(responseData.message);
//     if (responseData.status == "ok") {
//       alert(responseData.message);
//     } else {
//       alert(responseData.message);
//     }
//   };
//   return (
//     <div>
//       <h1>Event Details</h1>
//       {!event && (
//         <Button
//           onClick={() => {
//             fetchspecificEvent();
//           }}>
//           Click To View Event Details
//         </Button>
//       )}
//       {event &&
//         event.map((item) => {
//           return (
//             <div>
//               <Button
//                 onClick={(e) => {
//                   history.push("/yourgroups");
//                 }}>
//                 Go Back To Your Groups
//               </Button>
//               {item.eventDetails.map((i) => {
//                 return (
//                   <div>
//                     <h1>ID:{i.eventId}</h1>
//                     <h1>Name:{i.eventName}</h1>
//                     <h1>Mode:{i.eventMode}</h1>
//                     <h1>Date:{i.eventDate}</h1>
//                     <h1>Location:{i.eventLocation}</h1>
//                     <h1>Image: {i.eventUrl}</h1>
//                     <h1>Description:{i.eventPresentationDetails}</h1>
//                     <h1>{i.eventWorkshopDetails}</h1>
//                     <h1>{i.eventPublicDetails}</h1>
//                     <Button onClick={joinEvent}>Join Event</Button>
//                   </div>
//                 );
//               })}
//             </div>
//           );
//         })}
//       <div></div>
//     </div>
//   );
// };

// export default SpecificEvent;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import OffcanvasExample from "../Nav/OffcanvasExample";
import image from "../../assets/up-chevron.png";
import Footer from "../Footer/Footer";
import { green } from "@mui/material/colors";

const SpecificEvent = () => {
  useEffect(() => {
    fetchspecificEvent();
  }, []);

  const [event, setEvent] = useState();
  const { groupid, eventid } = useParams();
  const history = useHistory();
  console.log(groupid, eventid);

  const fetchspecificEvent = async () => {
    const response = await fetch(`http://localhost:6969/api/specificevent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: groupid,
        eventId: eventid,
      }),
    });
    const responseData = await response.json();
    setEvent(responseData.data);
    console.log(responseData.data);
  };
  const joinEvent = async () => {
    const response = await fetch("http://localhost:6969/api/joinevent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: groupid,
        eventId: eventid,
        token: localStorage.getItem("token"),
      }),
    });
    const responseData = await response.json();
    console.log(responseData.message);
    if (responseData.status == "ok") {
      alert(responseData.message);
    } else {
      alert(responseData.message);
    }
  };

  return (
    <div
      style={{
        marginTop: "-20px",
        height: "110vh",
      }}>
      <OffcanvasExample />
      <div>
        <img
          style={{
            width: "150px",
            height: "150px",
          }}
          src={image}
        />
        <h1
          style={{
            fontSize: "40px",
            marginTop: "-30px",
          }}>
          Event Details
        </h1>
      </div>

      {!event && (
        <Button
          variant="contained"
          onClick={() => {
            fetchspecificEvent();
          }}>
          Click To View Event Details
        </Button>
      )}
      {event &&
        event.map((item) => {
          return (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "margin-top": "3rem",
                }}>
                {item.eventDetails.map((i) => {
                  return (
                    <div
                      style={{
                        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        width: "700px",
                        textAlign: "left",
                        borderRadius: "10px",
                      }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "10px",
                          margin: "10px",
                        }}>
                        <h1
                          style={{
                            fontSize: "30px",
                            fontFamily: "serif",
                          }}>
                          {i.eventName}
                        </h1>
                        <h2
                          style={{
                            fontSize: "20px",
                            fontFamily: "serif",
                          }}>
                          Mode:{i.eventMode}
                        </h2>
                        <h2
                          style={{
                            fontSize: "20px",
                            fontFamily: "serif",
                          }}>
                          Date:{i.eventDate}
                        </h2>
                        <h2
                          style={{
                            fontSize: "20px",
                            fontFamily: "serif",
                          }}>
                          Location:{i.eventLocation}
                        </h2>
                        <p
                          style={{
                            fontSize: "15px",
                            fontFamily: "serif",
                          }}>
                          ID:{i.eventId}
                        </p>
                      </div>
                      <div
                        style={{
                          padding: "10px",
                          margin: "10px",

                          fontSize: "20px",
                          fontFamily: "serif",
                        }}>
                        <img
                          style={{
                            borderRadius: "20px",
                            height: "200px",
                            width: "300px",
                          }}
                          src={`https://ipfs.io/ipfs/${i.eventUrl}`}
                        />
                        <h2>Details of the event</h2>
                        <p>{i.eventPresentationDetails}</p>
                        <p>{i.eventWorkshopDetails}</p>
                        <p>{i.eventPublicDetails}</p>
                      </div>

                      {/* <h1>Image: {i.eventUrl}</h1> */}
                    </div>
                  );
                })}
              </div>
              <div
                style={{
                  "margin-top": "3rem",
                }}>
                <Button variant="contained" onClick={joinEvent}>
                  Join Event
                </Button>
              </div>
            </div>
          );
        })}
      <br />
      <Footer />
    </div>
  );
};

export default SpecificEvent;
