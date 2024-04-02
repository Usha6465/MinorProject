import * as React from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import EventComponent from "./EventComponent";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { addToBookmark, removeFromBookmark } from "../../redux/bookmark/action";
import { AppContext } from "../../context/AppContextProvider";
import { Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import image from "../../../src/assets/clock.png";
// import eventlog from "../../eventsdata.json";
import { Link } from "react-router-dom";
import OffcanvasExample from "../Nav/OffcanvasExample";
import Footer from "../Footer/Footer";
import { LogoDev } from "@mui/icons-material";
const styleContainer = {
  width: "640px",
  marginLeft: "12vw",
};

function Event() {
  const history = useHistory();
  const { id } = useParams();
  const [eventlog, setEventlog] = React.useState([]);
  const [location, setLocation] = React.useState(null);
  const [mode, setMode] = React.useState("Online");
  const getEvents = async () => {
    const response = await fetch("http://localhost:6969/api/allevents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: id,
      }),
    });

    const responseData = await response.json();
    console.log("responseData", responseData.data);
    setEventlog(
      responseData.data.map((items) => {
        return {
          eventDetails: items.eventDetails.map((item) => {
            return {
              event_name: item.event_name,
              event_mode: item.event_mode,
              date: item.date,
              event_place: item.event_place,
              id: item.id,
              img_url: item.img_url,
              attendees: item.attendees,
            };
          }),
        };
      })
    );
  };
  React.useEffect(() => {
    getEvents();
  }, []);
  console.log("eventlog", eventlog);

  return (
    <div
      style={{
        "margin-top": "-20px",
      }}>
      <OffcanvasExample />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "20px",
          }}>
          <img
            style={{
              width: "100px",
              height: "100px",
            }}
            src={image}
          />
          <h1
            style={{
              "font-size": "40px",
            }}>
            Events
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "-85px",
          }}>
          <TextField
            onKeyPress={(e) => {
              setLocation(e.target.value);
            }}
            style={{
              width: "300px",
            }}
            label="Search based on location"></TextField>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}>
            <Button
              onClick={(e) => {
                setLocation(null);
                setMode("Online");
              }}
              style={{
                margin: "10px",
              }}
              variant="contained">
              Reset
            </Button>
            <Button
              onClick={(e) => {
                setMode("Online");
              }}
              style={{
                margin: "10px",
              }}
              variant="contained">
              Online
            </Button>
            <Button
              onClick={(e) => {
                setMode("Offline");
              }}
              style={{
                margin: "10px",
              }}
              variant="contained">
              offline
            </Button>
          </div>
        </div>
        <Button
          variant="contained"
          onClick={() => {
            history.push(`/createevent/${id}`);
          }}>
          Create Event
        </Button>
      </div>

      <div></div>

      <div
        style={{
          "margin-top": "20px",
        }}>
        <div>
          {eventlog.map((event) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  "text-align": "center",
                  "align-items": "center",
                  "justify-content": "center",
                }}>
                {!location
                  ? event.eventDetails
                      .filter(
                        (j) =>
                          j.event_place.includes("") && j.event_mode == mode
                      )
                      .map((eventDetail) => {
                        return (
                          <div>
                            <div
                              style={{
                                marginLeft: "13px",
                                display: "flex",
                                flexDirection: "column",
                                "text-align": "center",
                                "align-items": "center",
                                "justify-content": "center",
                                "box-shadow": "0 3px 10px rgb(0 0 0 / 0.2)",
                                "border-radius": "10px",
                                padding: "20px",
                                width: "600px",
                                margin: "25px",
                              }}>
                              <img
                                style={{
                                  borderRadius: "10px",
                                  height: "200px",
                                  width: "300px",
                              
                                }}
                                src={`https://ipfs.io/ipfs/${eventDetail.img_url}`}
                              />
                              <div
                                style={{
                                  paddingLeft: "10px",
                                }}>
                                <h2
                                  style={{
                                    fontFamily: "serif",
                                    fontSize: "30px",
                                  }}>
                                  {eventDetail.event_name}
                                </h2>
                                <h4
                                  style={{
                                    fontSize: "20px",
                                    fontFamily: "serif",
                                  }}>
                                  Mode of event: {eventDetail.event_mode}
                                </h4>
                                <p
                                  style={{
                                    fontSize: "20px",
                                    fontFamily: "serif",
                                  }}>
                                  Location:{eventDetail.event_place}
                                </p>
                                <p
                                  style={{
                                    fontSize: "20px",
                                    fontFamily: "serif",
                                  }}>
                                  Number of Attendees: {eventDetail.attendees}
                                </p>
                                <p
                                  style={{
                                    fontSize: "20px",
                                    fontFamily: "serif",
                                  }}>
                                  Event Id:{eventDetail.id}
                                </p>

                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    history.push(
                                      `/eventinformation/${id}/${eventDetail.id}`
                                    );
                                  }}>
                                  View Event
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                  : event.eventDetails
                      .filter(
                        (j) =>
                          j.event_place.includes(location) &&
                          j.event_mode == mode
                      )
                      .map((eventDetail) => {
                        return (
                          <div>
                            <div
                              style={{
                                marginLeft: "13px",
                                display: "flex",
                                flexDirection: "row",
                                "text-align": "center",
                                "align-items": "center",
                                "justify-content": "center",
                                "box-shadow": "0 3px 10px rgb(0 0 0 / 0.2)",
                                "border-radius": "10px",
                                padding: "20px",
                                width: "600px",
                              }}>
                              <img
                                style={{
                                  borderRadius: "10px",
                                  height: "200px",
                                  width: "300px",
                                }}
                                src={`https://ipfs.io/ipfs/${eventDetail.img_url}`}
                              />
                              <div
                                style={{
                                  paddingLeft: "10px",
                                }}>
                                <h2
                                  style={{
                                    fontFamily: "serif",
                                    fontSize: "30px",
                                  }}>
                                  {eventDetail.event_name}
                                </h2>
                                <h4
                                  style={{
                                    fontSize: "20px",
                                    fontFamily: "serif",
                                  }}>
                                  Mode of event: {eventDetail.event_mode}
                                </h4>
                                <p
                                  style={{
                                    fontSize: "20px",
                                    fontFamily: "serif",
                                  }}>
                                  Location:{eventDetail.event_place}
                                </p>
                                <p
                                  style={{
                                    fontSize: "20px",
                                    fontFamily: "serif",
                                  }}>
                                  Number of Attendees: {eventDetail.attendees}
                                </p>
                                <p
                                  style={{
                                    fontSize: "20px",
                                    fontFamily: "serif",
                                  }}>
                                  Event Id:{eventDetail.id}
                                </p>

                                <Button
                                  onClick={() => {
                                    history.push(
                                      `/eventinformation/${id}/${eventDetail.id}`
                                    );
                                  }}>
                                  View Event
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Event;
