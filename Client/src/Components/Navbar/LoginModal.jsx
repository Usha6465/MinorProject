import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./navbar.module.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import GoogleIcon from "@mui/icons-material/Google";
import { fetchUserData } from "./fetchUserData";
import { ClipLoader, BeatLoader } from "react-spinners";
import { useRef } from "react";
import { css } from "@emotion/react";
import { useHistory } from "react-router-dom";

const style = {
  position: "absolute",
  top: "42%",

  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,

  overflowY: "scroll",
  height: "570px",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "45px",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [state, handleState] = React.useState(false);

  const [values, setValues] = React.useState({
    password: "",
    email: "",
  });

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(values.password);
    const response = await fetch("http://localhost:6969/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", values.email);
      alert("Login Success");
      history.push("/home");
    } else {
      alert("Check Your Email or Password");
    }
  };

  return (
    <div>
      <Button sx={{ color: "black" }} onClick={handleOpen}>
        Log in
      </Button>
      <Modal
        sx={{ marginTop: "100px" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            
          </Typography> */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className={styles.logincont}>
              <div className={styles.loginimgcont}>
                <img src="logo1.png" alt="img" />
              </div>
              <h2 className={styles.loginh1}>Log in</h2>
            </div>
            <Typography
              sx={{ marginLeft: "40px", fontWeight: "550", fontSize: "16px" }}
              variant="h6">
              Email
            </Typography>
            <TextField
              onChange={(e) => {
                e.preventDefault();
                setValues({ ...values, email: e.target.value });
              }}
              sx={{ width: "80%", m: 1, marginLeft: "40px" }}
              id="outlined-basic"
              size="small"
              variant="outlined"
            />
            <Typography
              sx={{ marginLeft: "40px", fontWeight: "550", fontSize: "16px" }}
              variant="h6">
              Password
            </Typography>
            <TextField
              onChange={(e) => {
                e.preventDefault();
                setValues({ ...values, password: e.target.value });
              }}
              sx={{ width: "80%", m: 1, marginLeft: "40px" }}
              id="outlined-basic"
              size="small"
              variant="outlined"
              type={values.showPassword ? "text" : "password"}
            />
            <Button
              sx={{
                backgroundColor: "#F28C28",
                width: "320px",
                padding: "10px",
                m: 2,
                borderRadius: "15px",
                marginLeft: "40px",
              }}
              variant="contained"
              onClick={handleLogin}>
              Log in
            </Button>
          </Typography>

          {/* <div className={styles.loginhr}>
            <hr />
            Or
            <hr />
          </div> */}
          {/* <div className={styles.loginsocial}>
            <GoogleIcon />
            Login With Google
          </div> */}
        </Box>
      </Modal>
    </div>
  );
}
