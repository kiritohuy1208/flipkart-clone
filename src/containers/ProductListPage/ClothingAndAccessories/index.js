import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProductsBySlug } from "../../../actions";
// import { generatePublicUrl } from "../../../urlConfig";
import Price from "../../../components/UI/Price";
import Card from "../../../components/UI/Card/Card";
import NumberFormat from "react-number-format";
import "./style.css";
import Rating from "../../../components/UI/Rating";
/**
 * @author
 * @function ClothingAndAccessories
 **/

const ClothingAndAccessories = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  const { slug } = props.match.params;
  console.log("props.match", props.match);
  useEffect(() => {
    dispatch(getProductsBySlug(slug));
  }, []);

  return (
    <>
      <div style={{ padding: "10px" }}>
        <Card
          style={{
            boxSizing: "border-box",
            padding: "15px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {product.products.map((product) => [
            <div className="caContainer">
              <Link
                className="caImgContainer"
                to={`/${product.slug}/${product._id}/p`}
              >
                <img alt="" src={product.productPictures[0].img} />
              </Link>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",

                  textAlign: "center",
                }}
              >
                <div className="caProductName">{product.name}</div>
                <div>
                  <Rating value="4.3" />
                  &nbsp;&nbsp;
                  <span
                    style={{
                      color: "#777",
                      fontWeight: "500",
                      fontSize: "12px",
                    }}
                  >
                    (3353)
                  </span>
                </div>
                <div className="caProductPrice">
                  <Price
                    value={
                      <NumberFormat
                        value={product.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={""}
                      />
                    }
                  />
                </div>
              </div>
            </div>,
          ])}
        </Card>
      </div>
    </>
  );
};

export default ClothingAndAccessories;
