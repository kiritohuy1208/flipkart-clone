import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getComment,
  getProductDetailsById,
  login,
  signUp,
} from "../../actions";
import { addToCart } from "../../actions/cart.action";
import { generatePublicUrl } from "../../urlConfig";
import Layout from "../../components/Layout";

import {
  IoIosAdd,
  IoIosArrowForward,
  IoIosStar,
  IoMdCart,
} from "react-icons/io";
import { AiFillThunderbolt, AiFillPayCircle } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { MaterialButton } from "../../components/MaterialUI";

import "./style.css";
import NumberFormat from "react-number-format";
import CardComment from "../../components/UI/CardComment/CardComment";
import Login from "../../components/Login";
import SignUp from "../../components/SignUp";

/**
 * @author
 * @function ProductDetailsPage
 **/

const ProductDetailsPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const auth = useSelector((state) => state.auth);
  const { comments } = product;

  //---------State
  const [toggleAddComment, setToggleAddComment] = useState(false);
  const [comment, setComment] = useState("");
  const [imageState, setimageState] = useState(
    product ? product.productDetails.productPictures : ""
  );
  // product.productDetails.productPictures[0].img
  // login sign up
  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
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
  useEffect(() => {
    const { productId } = props.match.params;
    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProductDetailsById(payload));
    dispatch(getComment(payload));
  }, []);

  // check use Object.keys because the property productdetails is object what has existed
  if (Object.keys(product.productDetails).length === 0) return null;
  const handleSubmitComment = () => {
    if (auth.authenticate) {
      if (comment) {
        const { productId } = props.match.params;
        const payload = {
          productId,
          comment,
        };
        dispatch(addComment(payload)).then(() => {
          setToggleAddComment(false);
          setComment("");
        });
      } else {
        return;
      }
    } else {
      setSignUpModal(false);
      setLoginModal(true);
    }
  };
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

      <div className="productDescriptionContainer">
        <div className="flexRow">
          {/* left part */}
          <div className="verticalImageStack">
            {product.productDetails.productPictures &&
              product.productDetails.productPictures.map((picture, index) => (
                <div className="thumbnail active">
                  <img key={index} src={picture.img} alt={picture.img} />
                </div>
              ))}
          </div>
          {/* left part end */}
          {/* center part */}
          <div className="productDescContainer">
            <div className="productDescImgContainer">
              <img
                src={product.productDetails.productPictures[0].img}
                alt={`${product.productDetails.productPictures[0].img}`}
              />
            </div>
            <div className="flexRow" style={{ marginTop: "10px" }}>
              <MaterialButton
                title="ADD TO CART"
                bgColor="#ff9f00"
                textColor="#ffffff"
                style={{ marginRight: "5px" }}
                icon={
                  <IoMdCart
                    style={{
                      marginRight: "10px",
                      fontSize: "15px",
                      marginBottom: "-2px",
                    }}
                  />
                }
                onClick={() => {
                  const { _id, price, name, slug } = product.productDetails;
                  const img = product.productDetails.productPictures[0].img;
                  dispatch(addToCart({ _id, name, price, img, slug }));
                  props.history.push(`/cart`);
                }}
              />

              <MaterialButton
                title="BUY NOW"
                bgColor="fb641b"
                textColor="#ffffff"
                style={{ marginLeft: "5px" }}
                icon={
                  <AiFillThunderbolt
                    style={{
                      marginRight: "10px",
                      fontSize: "15px",
                      marginBottom: "-2px",
                    }}
                  />
                }
              />
            </div>
          </div>
          {/* center part end */}
        </div>
        {/* rigth part */}
        <div style={{ marginLeft: "85vh" }}>
          {/* breadcum */}
          <div className="breed">
            <ul>
              <li>
                <a href="#">Home</a>
                <IoIosArrowForward style={{ color: "#777" }} />
              </li>
              <li>
                <a href="#">Mobile</a>
                <IoIosArrowForward style={{ color: "#777" }} />
              </li>
              <li>
                <a href="#">Samsung</a>
                <IoIosArrowForward style={{ color: "#777" }} />
              </li>
              <li>
                <a href="#"> {product.productDetails.name}</a>
              </li>
            </ul>
          </div>
          {/* breadcum end */}
          {/* product description */}
          <div className="productDetails">
            <div className="productTitle">{product.productDetails.name}</div>
            <div>
              <span className="ratingCount">
                4.3 <IoIosStar style={{ marginBottom: "-1px" }} />
              </span>
              <span className="ratingNumbersReviews">
                72,234 Ratings & 8,140 Reviews
              </span>
            </div>
            <div className="extraOffer">
              Extra <AiFillPayCircle style={{ marginBottom: "-3px" }} />
              4500 off{" "}
            </div>
            <div className="flewRow priceContainer">
              <span className="price">
                {/* <AiFillPayCircle style={{marginBottom:"-4px"}}/> */}
                <NumberFormat
                  value={product.productDetails.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={""}
                />{" "}
                VNĐ
              </span>
              <span className="discount" style={{ margin: "0 10px" }}>
                22% off
              </span>
            </div>

            <div>
              <p
                style={{
                  color: "#212121",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Available Offers
              </p>
              <div className="offerContainer">
                <p>
                  <FaRegBookmark /> Bank Offer5% Unlimited Cashback on Flipkart
                  Axis Bank Credit CardT&C
                </p>
                <p>
                  <FaRegBookmark /> Bank OfferAdditional ₹500 off on Debit and
                  Credit cardsT&C
                </p>
                <p>
                  <FaRegBookmark /> Bank Offer20% off on 1st txn with Amex
                  Network Cards issued by ICICI Bank,IndusInd Bank,SBI Cards and
                  MobikwikT&C
                </p>
                <p>
                  <FaRegBookmark /> Special PriceExtra ₹1000 off(price inclusive
                  of discount)T&C
                </p>
              </div>
              <p style={{ display: "flex" }}>
                <span
                  style={{
                    color: "#878787",
                    fontWeight: "600",
                    marginRight: "20px",
                    width: "100px",
                  }}
                >
                  Description
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#212121",
                  }}
                >
                  {product.productDetails.description}
                </span>
              </p>
            </div>
            <div className="Comments">
              <h1>Ratings and Reviews</h1>
              {toggleAddComment ? null : (
                <button onClick={() => setToggleAddComment(!toggleAddComment)}>
                  Add Review of you at here
                </button>
              )}

              {toggleAddComment && (
                <div className="AddCommentCtn">
                  <textarea
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add comment here"
                  ></textarea>
                  <div className="ButtonCtn">
                    <button onClick={handleSubmitComment}>Submit</button>
                    <button
                      style={{ backgroundColor: "red", marginLeft: "10px" }}
                      onClick={() => setToggleAddComment(!toggleAddComment)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              {comments.review &&
                comments.review.map((r) => (
                  <CardComment
                    comment={r.review}
                    userName={r.userId.firstName + " " + r.userId.lastName}
                  ></CardComment>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
