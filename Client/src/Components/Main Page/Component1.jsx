import { Grid } from "@mui/material";
import React from "react";
import styles from "../Navbar/navbar.module.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
export default function Component1() {
  return (
    <Grid
      className={styles.comp1}
      container
      spacing={3}
      sx={{ marginTop: "30px" }}>
      <Grid item sm="12" md="4">
        <img src="image1.jpg" alt="img" />
        <div className={styles.adiv}>
          <a className={styles.comp1link} href="">
            Make New Friends{" "}
          </a>
        </div>
      </Grid>
      <Grid item sm="12" md="4">
        <img src="image2.jpg" alt="img" />
        <div className={styles.adiv}>
          <a className={styles.comp1link} href="">
            Explore the outdoors{" "}
          </a>
        </div>
      </Grid>
      <Grid item sm="12" md="4">
        <img src="image3.jpg" alt="img" />
        <div className={styles.adiv}>
          <a className={styles.comp1link} href="">
            Connect over tech{" "}
          </a>
        </div>
      </Grid>
    </Grid>
  );
}
