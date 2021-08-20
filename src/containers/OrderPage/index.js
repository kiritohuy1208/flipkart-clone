import React, { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions";
import Layout from "../../components/Layout";
import { Breed } from "../../components/MaterialUI";
import Card from "../../components/UI/Card/Card";

import NumberFormat from "react-number-format";

import "./style.css";
import { Link } from "react-router-dom";
import { generatePublicUrl } from "../../urlConfig";
import Price from "../../components/UI/Price";

/**
 * @author
 * @function OrderPage
 **/

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <Layout>
      <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
        <Breed
          breed={[
            { name: "Home", href: "/" },
            { name: "My account", href: "/account" },
            { name: "My orders", href: "/account/orders" },
          ]}
          breedIcon={<IoIosArrowForward />}
        />
        {user.orders.map((order) => {
          return order.items.map((item, key) => {
            return (
              <Card key={key} style={{ margin: "5px 0" }}>
                {item.productId ? (
                  <Link
                    to={`/order_details/${order._id}`}
                    className="orderItemContainer"
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    <div className="orderImgContainer">
                      <img
                        className="orderImg"
                        alt=""
                        src={item.productId.productPictures[0].img}
                      />
                    </div>
                    <div className="orderRow">
                      <div className="orderName">{item.productId.name}</div>
                      <div className="orderPrice">
                        <Price
                          value={
                            <NumberFormat
                              value={item.payablePrice}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={""}
                            />
                          }
                        />
                      </div>
                      <div className="statusOrder">{order.paymentStatus}</div>
                    </div>
                  </Link>
                ) : (
                  <div>
                    <p>The product has no longer in business</p>
                  </div>
                )}
              </Card>
            );
          });
        })}
      </div>
    </Layout>
  );
};

export default OrderPage;
