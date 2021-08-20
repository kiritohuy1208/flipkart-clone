import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProductsBySlug } from "../../../actions";
import { generatePublicUrl } from "../../../urlConfig";

import Card from "../../../components/UI/Card/Card";
import { MaterialButton } from "../../../components/MaterialUI";
import NumberFormat from "react-number-format";
import Rating from "../../../components/UI/Rating";
import Price from "../../../components/UI/Price";

/**
 * @author
 * @function ProductStore
 **/

const ProductStore = (props) => {
  // get params on url: props=>match=>params match:
  // isExact: true
  // params: {slug: "SamSung"}
  // path: "/:slug"
  // url: "/SamSung
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const priceRanger = product.priceRanger;
  const { slug } = props.match.params;
  useEffect(() => {
    // const { slug } = props.match.params;
    dispatch(getProductsBySlug(slug));
  }, []);

  return (
    <>
      {
        //object.keys return Object's property name as an array
        // ex:const obj = { 0: 'a', 1: 'b', 2: 'c' };
        //console.log(Object.keys(obj)); // console: ['0', '1', '2']
        // productByPrice is a object so, we convert to array width object.keys

        Object.keys(product.productsByPrice).map((key, index) => {
          return (
            <Card
              key={index}
              headerLeft={`${slug} under ${priceRanger[key]}`}
              headerRight={
                <MaterialButton
                  title="View all"
                  bgColor="#2874f0"
                  fontSize="12px"
                  style={{ width: "96px" }}
                />
              }
              style={{
                width: "calc(100% - 40px)",
                margin: "20px",
              }}
            >
              <div style={{ display: "flex" }}>
                {product.productsByPrice[key].map((product, index) =>
                  index <= 5 ? (
                    <Link
                      key={index}
                      className="productContainer"
                      to={`/${product.slug}/${product._id}/p`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="productImgContainer">
                        <img alt="" src={product.productPictures[0].img} />
                      </div>
                      <div className="productInfo">
                        <div style={{ margin: "10px 0px", color: "black" }}>
                          {product.name}
                        </div>
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
                    </Link>
                  ) : null
                )}
              </div>
            </Card>
          );
        })
      }
    </>
  );
};

export default ProductStore;
