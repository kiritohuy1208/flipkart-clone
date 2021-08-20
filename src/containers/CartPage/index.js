import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, login, signUp } from "../../actions";
import { getCartItems, removeCartItem } from "../../actions/cart.action";

import Layout from "../../components/Layout";
import Login from "../../components/Login";
import { MaterialButton } from "../../components/MaterialUI";
import PriceDetails from "../../components/PriceDetails";
import SignUp from "../../components/SignUp";
import Card from "../../components/UI/Card/Card";
import CartItem from "./CartItem";

import "./style.css";
/**
 * @author
 * @function CartPage
 **/

const CartPage = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState({});
  // state login and sign up:
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  // ------------
  // const { cartItems } = cart;
  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]); // update state cartItems from store
  // update cartItems when user login or not login
  useEffect(() => {
    // if user login
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  //  use effect of login and sign up
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

  //----------- Login-------------
  const userLogin = () => {
    const user = {
      email,
      password,
    };
    dispatch(login(user)).then((result) => setLoginModal(false));
  };

  // -----------------------------
  // sign up:
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
    dispatch(signUp(user)).then((result) => setSignUpModal(false));
  };
  // ------------------------------

  let totalCartQty = 0;
  const onQuantityIncrement = (_id) => {
    dispatch(addToCart(cartItems[_id]));
  };
  const onQuantityDecrement = (_id) => {
    dispatch(addToCart(cartItems[_id], -1));
  };
  const onRemoveItem = (_id) => {
    const payload = {
      productId: _id,
    };
    dispatch(removeCartItem(payload));
  };
  // place older:
  if (props.onlyCartItems) {
    return (
      <>
        {Object.keys(cartItems).map((key, index) => {
          return (
            <CartItem
              key={index}
              cartItem={cartItems[key]}
              onQuantityInc={onQuantityIncrement}
              onQuantityDec={onQuantityDecrement}
              onRemove={onRemoveItem}
            />
          );
        })}
      </>
    );
  }
  return (
    <Layout>
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
      <SignUp
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
      {/* left */}
      <div className="cartContainer">
        {Object.keys(cartItems).map((key) => {
          totalCartQty += cartItems[key].qty;
        })}
        <Card
          headerLeft={`My cart (${totalCartQty} items)`}
          headerRight={<div style={{ fontWeight: "bold" }}>Deliver to</div>}
          style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
        >
          {Object.keys(cartItems).map((key, index) => {
            return (
              <CartItem
                key={index}
                cartItem={cartItems[key]}
                onQuantityInc={onQuantityIncrement}
                onQuantityDec={onQuantityDecrement}
                onRemove={onRemoveItem}
              />
            );
          })}
          <div
            style={{
              width: "100%",
              display: "flex",
              backgrounboxd: "#ffffff",
              justifyContent: "flex-end",
              boxShadow: "0 0 10px 10px #eee",
              padding: "10px 0",
              boxSizing: "border-box",
            }}
          >
            {Object.keys(cartItems).length > 0 ? (
              <div style={{ width: "250px" }}>
                {auth.authenticate ? (
                  <MaterialButton
                    title="PLACE ORDER"
                    onClick={() => props.history.push("/checkout")}
                  />
                ) : (
                  <>
                    <div>
                      <MaterialButton
                        title="Login and checkout"
                        onClick={() => {
                          setSignUpModal(false);
                          setLoginModal(true);
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            ) : null}
          </div>
        </Card>

        {/* right */}
        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (
            totalQty,
            key
          ) {
            return totalQty + cart.cartItems[key].qty;
          },
          0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalprice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalprice + price * qty;
          }, 0)}
        />
      </div>
    </Layout>
  );
};

export default CartPage;
