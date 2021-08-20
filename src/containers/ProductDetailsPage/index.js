import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../actions";
import { addToCart } from "../../actions/cart.action";
import { generatePublicUrl } from "../../urlConfig";
import Layout from "../../components/Layout";

import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { AiFillThunderbolt, AiFillPayCircle } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { MaterialButton } from "../../components/MaterialUI";

import "./style.css";
import NumberFormat from "react-number-format";

/**
 * @author
 * @function ProductDetailsPage
 **/

const ProductDetailsPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  useEffect(() => {
    const { productId } = props.match.params;
    console.log("props.match.params", props.match.params);
    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProductDetailsById(payload));
  }, []);
  // check use Object.keys because the property productdetails is object what has existed
  if (Object.keys(product.productDetails).length === 0) return null;
  console.log("props.history", props.history);
  return (
    <Layout>
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
        <div>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
