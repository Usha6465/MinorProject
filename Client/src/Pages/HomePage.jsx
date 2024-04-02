import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import styles from "./homePage.module.css";
import Button from "@mui/material/Button";
import Footer from "../Components/Footer/Footer";
import Navbar2 from "../Components/Navbar/Navbar2";
import { Link } from "react-router-dom";
import TealButton from "../Components/Main Page/TealButton";
import { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
import NextEvent from "./HomePageComps/NextEvent";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";
import BookmarkCard from "../Components/BookmarkCard/BookmarkCard";
import { removeFromBookmark } from "../redux/bookmark/action";
import Group from "./Group";
import { decodeToken } from "react-jwt";
// import Description from  "../Components/Description/Description"

// import Attending from "../Components/Attending/Attending";

const Home = () => {
  const [value, setValues] = React.useState({ email: "", decodedEmail: "" });

  useEffect(() => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const decoded = decodeToken(token);
    setValues({ ...value, email: email, decodedEmail: decoded.email });
  }, []);

  const { location, setLocation } = useContext(AppContext);
  const { name, setName } = useContext(AppContext);
  const navigate = useHistory();
  const bookmarks = useSelector((state) => state.bookmarks);
  const dispatch = useDispatch();

  const handleclick = (item) => {
    navigate.push("/home");
  };

  // const [name2,setName2] = useState("");
  console.log("hi", name, location);

  const handleclick2 = () => {
    navigate.push("/allgroups");
  };
  const handleclick1 = () => {
    navigate.push("/creategroup");
  };
  const handleclick3 = () => {
    navigate.push("/yourgroups");
  };

  if (value.email === value.decodedEmail) {
    return (
      <div>
        <Navbar2 style={{ color: "black", backgroundColor: "white" }} />

        <div>
          <img src="/photoImg1.svg" alt="img" />
          <h1 style={{ fontWeight: "bold", fontSize: "65px", color: "black" }}>
            Welcome to Here Me Out !
          </h1>
        </div>
        <div style={{ display: "flex", gap: "2rem", padding: "3rem" }}>
          <div
            style={{
              backgroundColor: "white",
              display: "flex",
              padding: "3rem",
              margin: "20px",
              width: "50%",
            }}>
            <div>
              <img src="/photoImg3.svg" alt="img" />
            </div>
            <div style={{ textAlign: "left" }}>
              <h3>ALL GROUPS</h3>
              <p>Find groups of your intersts.</p>
              <Button variant="outlined" onClick={handleclick2}>
                Discover Groups
              </Button>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              display: "flex",
              padding: "3rem",
              margin: "20px",
              width: "50%",
            }}>
            <div>
              <img src="/photoImg2.svg" alt="img" />
            </div>
            <div style={{ textAlign: "left" }}>
              <h3>Fundraiser events</h3>
              <p>
                You'll only find events that create awareness and raise money
                for a good cause.
              </p>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate.push("/fund-raising");
                }}>
                Events
              </Button>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "2rem", padding: "3rem" }}>
          <div
            style={{
              backgroundColor: "white",
              display: "flex",
              padding: "3rem",
              margin: "20px",
              width: "50%",
            }}>
            <div>
              <img src="/photoImg2.svg" alt="img" />
            </div>
            <div style={{ textAlign: "left" }}>
              <h3>Your GROUPS</h3>
              <p>Displays all the groups that you're a part of.</p>
              <Button variant="outlined" onClick={handleclick3}>
                GROUPS
              </Button>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "white",
              display: "flex",
              padding: "3rem",
              margin: "10px",
              width: "50%",
            }}>
            <div>
              <img src="/photoImg3.svg" alt="img" />
            </div>
            <div style={{ textAlign: "left" }}>
              <h3>Create your group</h3>
              <p>Create what you are looking for.</p>
              <Button variant="outlined" onClick={handleclick1}>
                Create Group
              </Button>
            </div>
          </div>
        </div>

        {/* {bookmarks.length > 0 && <h1>Saved Events</h1>}
        {bookmarks.length > 0 &&
          bookmarks.map(
            ({
              id,
              img_url,
              event_mode,
              date,
              event_name,
              event_place,
              attendees,
            }) => (
              <BookmarkCard
                key={id}
                id={id}
                img_url={img_url}
                event_mode={event_mode}
                date={date}
                event_name={event_name}
                event_place={event_place}
                attendees={attendees}
                handelClick={handelClick}
              />
            )
          )} */}

        {/*  <div className={styles.nextSec}>
          <NextEvent />
            <div className={styles.next2}>
            <h1>Check out what’s happening:</h1>

           <div className={styles.tealcont}> 
              <TealButton label="Starting Soon" />

              <TealButton label="Today" />

               <TealButton label="Tommorow" /> 

              <TealButton label="This Week" />

              <TealButton label="Online" />

              <TealButton label="In Person" />

              <TealButton label="Trending Near you" />
            </div> 
            </div>
        </div>  */}
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Log In First</h1>
      </div>
    );
  }
};

export default Home;
