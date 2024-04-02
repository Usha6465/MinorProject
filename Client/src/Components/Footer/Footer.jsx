import * as React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import styles from "./footer.module.css";

const styleImg = {
  height: "42px",
  cursor: "pointer",
};

function Footer() {
  return (
    <div className={styles.footer}>
      <hr />
      <div className={styles.container}>
        {/* <div className={styles.items}>
          <p className={styles.heading}>Your Account</p>
          <p>Settings</p>
          <p>Logout</p>
          <p>Help</p>
        </div>
        <div className={styles.items}>
          <p className={styles.heading}>Discover</p>
          <p>Groups</p>
          <p>Calendar</p>
          <p>Topics</p>
          <p>Cities</p>
          <p>Online Events</p>
          <p>Venues</p>
        </div> */}
        <div className={styles.items}>
          <p className={styles.heading}>Hear Me Out</p>
          <p>FAQs : hearmeout@gmail.com</p>
          {/* <p>Blog</p> */}
        </div>
      </div>

      <div className={styles.container1}>
        <div className={styles.division1}>
          <p className={styles.heading}>Follow us</p>
          <FacebookIcon sx={{ cursor: "pointer" }} fontSize="large" />
          <TwitterIcon
            sx={{ marginLeft: "35px", cursor: "pointer" }}
            fontSize="large"
          />
          <YouTubeIcon
            sx={{ marginLeft: "35px", cursor: "pointer" }}
            fontSize="large"
          />
          <InstagramIcon
            sx={{ marginLeft: "35px", cursor: "pointer" }}
            fontSize="large"
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© 2023 Hear Me Out</p>
        <p>Terms of Service</p>
        <p>Privacy Policy</p>
      </div>
    </div>
  );
}

export default Footer;
