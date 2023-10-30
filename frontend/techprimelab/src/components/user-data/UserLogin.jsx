import React, { useState } from "react";
import SideNavbar from "../side-navbar/side-navbar";
import { CircularProgress } from "@mui/material";
import {
  Box,
  Button,
  Grid,
  TextField,
  Input,
  colors,
  InputAdornment,
} from "@mui/material";
import loginbackimg from "../../Images/login-bg-1.svg";
import logo from "../../Images/Logo.svg";
import "./UserLoginCss.css";
import "../../index.css";
import axios from "axios";
import hidePasswordImg from "../../Images/hide-password.svg";
import { Visibility } from "@mui/icons-material";
import Loader from "../loader/loader";

function UserLogin({ onLogin }) {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [invalidCredentialsError, setinvalidCredentialsError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onsubmit = () => {
    setUserNameError("");
    setPasswordError("");
    setLoading(true);

    let isValid = true;
    if (!UserName) {
      setUserNameError("Email is required");
      isValid = false;
    }
    if (!Password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (isValid) {
      axios
        .post("http://localhost:8000/user/login", { UserName, Password })
        .then((response) => {
          if (response.status === 200) {
            const token = response.data.token;
            localStorage.setItem("token", token);
            onLogin();
          } else {
            console.log("login failed");
            setinvalidCredentialsError("Invalid credentials");
          }
        })
        .catch((err) => {
          console.error(err);
          setinvalidCredentialsError("Invalid credentials");
        });
    }
  };

  return (
    <div>
      <img src={loginbackimg} className="w-100" alt="backgound img" />
      <div className="logo-img">
        <img src={logo} alt="Logo ige" />
        <h5>online Project Management</h5>
      </div>
      <div className="center-div">
        <div className="login-page-container">
          <h4 className="login-header-text gray-color">Login to get Started</h4>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <label className="gray-color">Email</label>
              <TextField
                variant="outlined"
                required
                fullWidth
                onKeyUp={(e) => setUserName(e.target.value)}
                error={!!userNameError}
                helperText={userNameError}
              />
            </Grid>
            <Grid item xs={12}>
              <label className="gray-color">Password</label>
              <TextField
                fullWidth
                variant="outlined"
                required
                type={showPassword ? "text" : "password"}
                onKeyUp={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {!showPassword ? (
                        <Visibility
                          className="visibility-eye"
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <img
                          className="visibility-eye"
                          src={hidePasswordImg}
                          onClick={togglePasswordVisibility}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid className="grid-item" item xs={12}>
              <label className="blue-color">Forgot Password?</label>
            </Grid>
            <Grid item xs={12}>
              <div className="login-btn-div">
                <Button onClick={onsubmit} variant="contained">
                  Login
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <h5 className="invalidCredential-css">{invalidCredentialsError}</h5>
    </div>
  );
}

export default UserLogin;
