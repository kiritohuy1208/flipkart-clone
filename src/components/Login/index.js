import React from "react";
import { MaterialButton, MaterialInput, Modal } from "../MaterialUI";
import { useSelector } from "react-redux";
import { popperOffsets } from "../../../../admin-app/node_modules/@popperjs/core";
/**
 * @author
 * @function Login
 **/

const Login = (props) => {
  const auth = useSelector((state) => state.auth);
  return (
    <Modal visible={props.loginModal} onClose={props.onClose}>
      <div className="authContainer">
        <div className="row">
          <div className="leftspace">
            <h2>Login</h2>
            <p>Get access to your Orders, Wishlist and Recommendations</p>
          </div>
          <div className="rightspace">
            <div className="loginInputContainer">
              {auth.error && (
                <div style={{ color: "red", fontSize: 12 }}>{auth.error}</div>
              )}
              <MaterialInput
                type="text"
                label="Email/Enter Mobile Number"
                value={props.email}
                onChange={props.onChangeEmail}
              />

              <MaterialInput
                type="password"
                label="Password"
                value={props.password}
                onChange={props.onChangePassword}
                rightElement={
                  <a
                    style={{
                      textDecoration: "none",
                      fontSize: "15px",
                      fontWeight: "bold",
                      color: "#2874f0",
                      marginRight: "0px",
                    }}
                    href="#"
                  >
                    Forgot?
                  </a>
                }
              />
              <div className="text-privacy">
                <span style={{ fontSize: "12px" }}>
                  By continuing, you agree to Flipkart's{" "}
                  <span style={{ color: "#2874f0" }}> Terms of Use </span> and{" "}
                  <span style={{ color: "#2874f0" }}> Privacy Policy</span>.
                </span>
              </div>
              <MaterialButton
                title="Login"
                bgColor="#fb641b"
                textColor="#ffffff"
                onClick={props.onUserLogin}
                style={{ margin: "20px 10px 5px  10px" }}
              />

              <p style={{ textAlign: "center", color: "rgb(100, 103, 103)" }}>
                OR
              </p>
              <MaterialButton
                title="Request OTP"
                bgColor="white"
                textColor="#2874f0"
                style={{ margin: "10px 10px" }}
              />
              <div className="footer-login">
                <a href="#" onClick={props.onClick}>
                  <p>New to Flipkart? Create an account</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
