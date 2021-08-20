import React, { useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { addOrder, getAddress, getCartItems } from "../../actions";
import Layout from "../../components/Layout";
import {
  Anchor,
  MaterialButton,
  MaterialInput,
} from "../../components/MaterialUI";
import AddressForm from "./AddressForm";
import PriceDetails from "../../components/PriceDetails";
import CartPage from "../CartPage";
import Card from "../../components/UI/Card/Card";
import { Link, Redirect } from "react-router-dom";
/**
 * @author
 * @function Checkout
 **/

const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};
const Address = ({
  adr,
  selectAddress,
  enableAddressEditForm,
  confirmDeliveryAddress,
  onAddressSubmit,
}) => {
  return (
    <div className="flexRow addressContainer">
      <div>
        <input onClick={() => selectAddress(adr)} name="address" type="radio" />
      </div>
      <div className="flexRow sb addressinfo">
        {/* if edit false => user not yet push button edit  */}
        {!adr.edit ? (
          <div style={{ width: "100%" }}>
            <div className="addressDetail">
              <div>
                <span className="addressName">{adr.name}</span>
                <span className="addressType">{adr.addressType}</span>
                <span className="addressMobileNumber">{adr.mobileNumber}</span>
              </div>
              {adr.selected && (
                <Anchor
                  name="EDIT"
                  onClick={() => enableAddressEditForm(adr)}
                  style={{
                    fontWeight: "500",
                    color: "#2674f0",
                  }}
                />
              )}
            </div>

            <div className="fullAddress">{adr.address}</div>
            {adr.selected && (
              <MaterialButton
                title="DELIVERY HERE"
                style={{ width: "250px" }}
                onClick={() => confirmDeliveryAddress(adr)}
              />
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            onCancel={() => {}}
            initialData={adr}
          />
        )}
      </div>
    </div>
  );
};
const Checkout = (props) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // toggle:
  const [newAddress, setNewAddress] = useState(false);
  const [confirmAddress, setConfirmAddress] = useState(false);

  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);

  const [paymentOption, setPaymentOption] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);

  // state:
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    // if user login, then dispatch(getAddress())
    auth.authenticate && dispatch(getAddress());
    auth.authenticate && dispatch(getCartItems());
  }, [auth.authenticate]);

  // create address array with property is address and add select , edit property
  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
  }, [user.address]);
  const selectAddress = (adr) => {
    const updateAddress = address.map((addr) =>
      addr._id === adr._id
        ? { ...addr, selected: true }
        : { ...addr, selected: false }
    );
    setAddress(updateAddress);
  };
  // -------------------------------------------------------------------
  // Confirm delivery address:
  const confirmDeliveryAddress = (adr) => {
    setConfirmAddress(true);
    setSelectedAddress(adr);
    setOrderSummary(true);
  };
  // -----------------------------
  // --------Edit address---------
  const enableAddressEditForm = (adr) => {
    const updateAddress = address.map((addr) =>
      addr._id === adr._id ? { ...addr, edit: true } : { ...addr, edit: false }
    );
    setAddress(updateAddress);
  };
  // -----------------------------
  // when submit address => set this is address confirm
  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
  };
  // Onclick user order confirmation
  const userOrderConfirmation = () => {
    setOrderConfirmation(true);
    setOrderSummary(false);
    setPaymentOption(true);
  };
  // onclick confirm order method => create order:
  const totalPrice = () => {
    return Object.keys(cart.cartItems).reduce((totalprice, key) => {
      const { price, qty } = cart.cartItems[key];
      return totalprice + price * qty;
    }, 0);
  };
  const itemsArray = () => {
    return Object.keys(cart.cartItems).map((index) => ({
      productId: cart.cartItems[index]._id,
      payablePrice: cart.cartItems[index].price,
      purchasedQty: cart.cartItems[index].qty,
    }));
  };
  const onConfirmOrder = () => {
    const payload = {
      addressId: selectedAddress._id,
      totalAmount: totalPrice(),
      items: itemsArray(),
      paymentStatus: "pending",
      paymentType: "cod",
    };
    console.log(payload);
    dispatch(addOrder(payload));
    setConfirmOrder(true);
  };

  useEffect(() => {
    if (confirmOrder && user.placedOrderId) {
      props.history.push(`/order_details/${user.placedOrderId}`);
    }
  }, [user.placedOrderId]);
  // if (confirmOrder && user.placedOrderId) {
  //   return <Redirect to={`order_details/${user.placedOrderId}`} />;
  // }

  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <div className="checkoutContainer">
          {/* ----------------------------- */}
          <CheckoutStep
            stepNumber="1"
            title="LOGIN"
            active={!auth.authenticate}
            body={
              auth.authenticate ? (
                <div className="loggedInId">
                  <span style={{ fontWeight: "500" }}>
                    {auth.user.fullName}
                  </span>
                  <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
                </div>
              ) : (
                <div>
                  <MaterialInput label="Email" />
                </div>
              )
            }
          />
          {/* ----------------------------- */}
          <CheckoutStep
            stepNumber="2"
            title="DELIVERY ADDRESS"
            active={!confirmAddress && auth.authenticate} // active when user confirm address and user is logged in
            body={
              <>
                {confirmAddress ? (
                  <div className="stepCompleted">{`${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
                ) : (
                  address.map((adr, index) => (
                    <Address
                      key={index}
                      selectAddress={selectAddress}
                      enableAddressEditForm={enableAddressEditForm}
                      confirmDeliveryAddress={confirmDeliveryAddress}
                      onAddressSubmit={onAddressSubmit}
                      adr={adr}
                    />
                  ))
                )}
              </>
            }
          />
          {confirmAddress ? null : newAddress ? (
            <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
          ) : (
            <CheckoutStep
              stepNumber="+"
              title="ADD NEW ADDRESS"
              active={false}
              onClick={() => setNewAddress(!newAddress)}
            />
          )}
          {/* ----------------------------- */}
          <CheckoutStep
            active={orderSummary}
            stepNumber="3"
            title={"ORDER SUMMARY"}
            body={
              orderSummary ? (
                <CartPage onlyCartItems={true} />
              ) : orderConfirmation ? (
                <div className="stepCompleted">
                  {Object.keys(cart.cartItems).length} items
                </div>
              ) : null
            }
          />
          {orderSummary ? (
            <Card
              style={{
                margin: "10px 0",
              }}
            >
              {Object.keys(cart.cartItems).length > 0 ? (
                <div
                  className="flexRow sb"
                  style={{ padding: "20px", alignItems: "center" }}
                >
                  <p>
                    Order confirmation email will be sent to
                    <strong> {auth.user.email}</strong>
                  </p>
                  <MaterialButton
                    onClick={() => userOrderConfirmation()}
                    title="Continue"
                    style={{ width: "200px" }}
                  />
                </div>
              ) : (
                <div
                  className="flexRow sb"
                  style={{ padding: "20px", alignItems: "center" }}
                >
                  <p style={{ color: "red" }}>
                    Not items in the cart. Please buy
                    <strong style={{ color: "black" }}>
                      another things to checkout
                    </strong>
                  </p>
                  <Link to={"/"}>
                    <MaterialButton
                      onClick={() => userOrderConfirmation()}
                      title="Back Store"
                      style={{ width: "200px" }}
                      // bgColor="#549ac3"
                      // textColor="#ffffff"
                    />
                  </Link>
                </div>
              )}
            </Card>
          ) : null}
          {/* ----------------------------- */}
          <CheckoutStep
            active={paymentOption}
            stepNumber="4"
            title={"PAYMENT OPTIONS"}
            body={
              paymentOption && (
                <div>
                  <div
                    className="flexRow"
                    style={{ alignItems: "center", padding: "20px" }}
                  >
                    <input type="radio" name="paymentOption" value="cod" />
                    <div>Cash on delivery</div>
                  </div>
                  <MaterialButton
                    title="Confirm Order"
                    style={{ width: "200px", margin: "0 0 20px 20px" }}
                    onClick={() => onConfirmOrder()}
                  />
                </div>
              )
            }
          />
        </div>
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

export default Checkout;
