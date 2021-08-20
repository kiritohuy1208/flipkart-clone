import React from "react";
import { useSelector } from "react-redux";
import { MaterialButton, MaterialInput, Modal } from "../MaterialUI";

/**
 * @author
 * @function SignUp
 **/

const SignUp = (props) => {
  const auth = useSelector((state) => state.auth);
  return (
    <Modal visible={props.signUpModal} onClose={props.onClose}>
      <div className="authContainer">
        <div className="row">
          <div className="leftspace">
            <h2>Sign up</h2>
            <p>Get access to your Orders, Wishlist and Recommendations</p>
          </div>
          <div className="rightspace">
            <div className="loginInputContainer">
              {auth.error && (
                <div style={{ color: "red", fontSize: 12 }}>{auth.error}</div>
              )}
              <MaterialInput
                type="text"
                label="First name"
                value={props.firstName}
                onChange={props.onChangeFirstName}
              />
              <MaterialInput
                type="text"
                label="Last name"
                value={props.lastName}
                onChange={props.onChangeLastName}
              />
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
              />
              <div className="text-privacy">
                <span style={{ fontSize: "12px" }}>
                  By continuing, you agree to Flipkart's{" "}
                  <span style={{ color: "#2874f0" }}> Terms of Use </span> and{" "}
                  <span style={{ color: "#2874f0" }}> Privacy Policy</span>.
                </span>
              </div>
              <MaterialButton
                title="Sign up"
                bgColor="#fb641b"
                textColor="#ffffff"
                onClick={props.onUserSignUp}
                style={{ margin: "20px 10px 5px  10px" }}
              />

              <div className="footer-login">
                <a href="#" onClick={props.onClick}>
                  <p>Have been account Flipkart? Login Here</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SignUp;
