import React, { useEffect, useState } from "react";
import "./style.css";
import flipkartLogo from "../../images/logo/flipkart.png";
import goldenStar from "../../images/logo/golden-star.png";
import { IoIosArrowDown, IoIosCart, IoIosSearch } from "react-icons/io";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from "../MaterialUI";
import Cart from "../UI/Cart";
import { useDispatch, useSelector } from "react-redux";
import { login, signOut, signUp } from "../../actions";
import Login from "../Login";
import SignUp from "../SignUp";
/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false);
    }
  }, [auth.authenticate]);
  useEffect(() => {
    // if user is logging or singnup
    if (!auth.authenticating) {
      setEmail("");
      setPassword("");
      setLastName("");
      setFirstName("");
    }
  }, [auth.authenticating]);
  // ---------- Login------------------
  const userLogin = () => {
    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };
  // ------------Sign up----------------
  const userSignUp = () => {
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      return;
    }
    dispatch(signUp(user));
  };
  // -------------Logout----------------
  const logout = () => {
    dispatch(signOut());
  };
  const renderLoggedIn = () => {
    return (
      <DropdownMenu
        menu={<a className="fullName">{auth.user.fullName}</a>}
        menus={[
          { label: "My Profile", href: "", icon: null },
          // { label: "SuperCoin Zone", href: "", icon: null },
          // { label: "Flipkart Plus Zone", href: "", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
          },
          // { label: "Wishlist", href: "", icon: null },
          // { label: "My Chats", href: "", icon: null },
          { label: "Coupons", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Notifications", href: "", icon: null },
          // { label: "Gift Cards", href: "", icon: null },
          { label: "Logout", href: "", icon: null, onClick: logout },
        ]}
      />
    );
  };
  const renderNonLoggedIn = () => {
    return (
      <DropdownMenu
        menu={
          <a
            className="loginButton"
            onClick={() => {
              setSignUpModal(false);
              setLoginModal(true);
            }}
          >
            Login
          </a>
        }
        // menus={[
        //   { label: 'My Profile', href: '', icon: null },
        //   { label: 'Flipkart Plus Zone', href: '', icon: null },
        //   { label: 'Orders', href: '', icon: null },
        //   { label: 'Wishlist', href: '', icon: null },
        //   { label: 'Rewards', href: '', icon: null },
        //   { label: 'Gift Cards', href: '', icon: null },
        // ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <a
              href="#"
              onClick={() => {
                setSignUpModal(true);
                setLoginModal(false);
              }}
              style={{ color: "#2874f0" }}
            >
              Sign Up
            </a>
          </div>
        }
      />
      // <button onClick={() => setLoginModal(true)}> Login</button>
    );
  };
  //------------login end--------------

  return (
    <div
      className="header"
      style={{ position: "fixed", top: "0px", zIndex: "4" }}
    >
      {/* Modal login */}
      <Login
        email={email}
        onChangeEmail={(e) => setEmail(e.target.value)}
        password={password}
        onChangePassword={(e) => setPassword(e.target.value)}
        onClick={() => {
          setLoginModal(false);
          setSignUpModal(true);
        }}
        onUserLogin={userLogin}
        loginModal={loginModal}
        onClose={() => setLoginModal(false)}
      />

      {/* Modal Sign up */}
      <SignUp
        auth={auth}
        firstName={firstName}
        onChangeFirstName={(e) => setFirstName(e.target.value)}
        lastName={lastName}
        onChangeLastName={(e) => setLastName(e.target.value)}
        email={email}
        onChangeEmail={(e) => setEmail(e.target.value)}
        password={password}
        onChangePassword={(e) => setPassword(e.target.value)}
        onClick={() => {
          setLoginModal(true);
          setSignUpModal(false);
        }}
        onUserSignUp={userSignUp}
        signUpModal={signUpModal}
        onClose={() => setSignUpModal(false)}
      />
      {/* --------------- */}
      <div className="subHeader">
        {/* Logo */}
        <div className="logo">
          <a href="/">
            <img src={flipkartLogo} className="logoimage" alt="" />
          </a>
          <a href="/" style={{ marginTop: "-10px", textDecoration: "none" }}>
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </a>
        </div>

        {/* Search */}
        <div
          style={{
            padding: "0 10px",
          }}
        >
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={"Search for products, brands and more..."}
            />
            <div className="searchIconContainer">
              <IoIosSearch
                style={{
                  color: "#2874f0",
                }}
              />
            </div>
          </div>
        </div>

        {/* right side menu */}

        <div className="rightMenu">
          {auth.authenticate ? renderLoggedIn() : renderNonLoggedIn()}
          <DropdownMenu
            menu={
              <a className="more">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: "Notification Preference", href: "", icon: null },
              { label: "Sell on flipkart", href: "", icon: null },
              { label: "24x7 Customer Care", href: "", icon: null },
              { label: "Advertise", href: "", icon: null },
              { label: "Download App", href: "", icon: null },
            ]}
          />
          <div>
            <a style={{ textDecoration: "none" }} href="/cart" className="cart">
              <Cart count={Object.keys(cart.cartItems).length} />
              <span style={{ margin: "0 10px" }}>Cart</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
