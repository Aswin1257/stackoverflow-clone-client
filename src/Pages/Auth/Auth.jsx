import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Auth.css";
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import { signup, login } from "../../actions/auth";
import axios from "axios";
const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const detectOs = () => {
    let operatingSystem = "Unknown OS";
    if (navigator.userAgent.indexOf("Win") !== -1) {
      operatingSystem = "Windows";
    } else if (navigator.userAgent.indexOf("Mac") !== -1) {
      operatingSystem = "MacOS";
    } else if (navigator.userAgent.indexOf("Android") !== -1) {
      operatingSystem = "Android";
    } else if (navigator.userAgent.indexOf("iOS") !== -1) {
      operatingSystem = "iOS";
    } else if (navigator.userAgent.indexOf("Linux") !== -1 || navigator.userAgent.indexOf("X11") !== -1) {
      if (navigator.userAgent.indexOf("Android") === -1) {
        operatingSystem = "Linux";
      }
    }
    return operatingSystem
  }
  const detectBrowser = () => {
    let browser = "Unknown Browser";
    if (navigator.userAgent.indexOf("Edge") !== -1) {
      browser = "Edge";
    } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
      if (navigator.userAgent.indexOf("Edg") !== -1) {
        browser = "Edge";
      } else {
        browser = "Chrome";
      }
    } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
      browser = "Firefox";
    } else if (navigator.userAgent.indexOf("Opera") !== -1 || navigator.userAgent.indexOf("OPR") !== -1) {
      browser = "Opera";
    } else if (navigator.userAgent.indexOf("Safari") !== -1) {
      browser = "Safari";
    } else if (navigator.userAgent.indexOf("MSIE") !== -1 || navigator.userAgent.indexOf("Trident") !== -1) {
      browser = "Internet Explorer";
    }
    return browser
  }
  const getUserIp=async()=>{
    try {
      const ip =await axios.get('https://ipinfo.io/json?token=61c243dc9af9e0') 
      return ip.data.ip
    } catch (error) {
      console.log(error)
      return 'unknown'
    }
  }

  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
  const handleSwitch = () => {
    setIsSignup(!isSignup);
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const deviceInfo = {
      deviceType: isMobileDevice() ? 'Mobile' : 'Desktop or Laptop',
      os: detectOs(),
      browser: detectBrowser(),
      ip:await getUserIp()
    }

    if (!email && !password) {
      alert("Enter email and password");
    }
    if (isSignup) {
      if (!name) {
        alert("Enter a name to continue");
      }
      dispatch(signup({ name, email, password }, navigate));
    } else {
      dispatch(login({ email, password, deviceInfo }, navigate));
    }
  };

  return (
    <section className="auth-section">
      {isSignup && <AboutAuth />}
      <div className="auth-container-2">
        <img src={icon} alt="stack overflow" className="login-logo" />
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label htmlFor="name">
              <h4>Display Name</h4>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
              {!isSignup && (
                <p onClick={() => navigate('/forgotPassword')} style={{ color: "#007ac6", fontSize: "13px", cursor: "pointer" }}>
                  forgot password?
                </p>
              )}
            </div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <button type="submit" className="auth-btn">
            {isSignup ? "Sign up" : "Log in"}
          </button>
        </form>
        <p>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignup ? "Log in" : "sign up"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;
