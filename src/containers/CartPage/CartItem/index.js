import React, { useState } from "react";
import { generatePublicUrl } from "../../../urlConfig";
import NumberFormat from "react-number-format";
import "./style.css";
import { Link } from "react-router-dom";
import Price from "../../../components/UI/Price";
/**
 * @author
 * @function
 **/

const CartItem = (props) => {
  const [qty, setQty] = useState(props.cartItem.qty);
  const { index, _id, price, name, img, slug } = props.cartItem;

  const onQuantityIncrement = () => {
    setQty(qty + 1);
    // transfer props from child cart Item to parent item
    props.onQuantityInc(_id);
  };
  const onQuantityDecrement = () => {
    if (qty <= 1) return;
    setQty(qty - 1);
    props.onQuantityDec(_id);
  };
  const onRemoveItem = () => {
    props.onRemove(_id);
  };
  return (
    <div className="cartItemContainer">
      <div key={index} className="flexRow">
        <div className="cartProductImgContainer">
          <Link to={`/${slug}/${_id}/p`}>
            <img src={img} alt="" />
          </Link>
        </div>
        <div className="cartItemDetails">
          <div style={{ paddingLeft: "25px" }}>
            <p>{name}</p>
            <div>
              <Price
                value={
                  <NumberFormat
                    value={price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={""}
                  />
                }
              />
              <p></p>
            </div>
          </div>

          <div>Delivery 3 -5 days</div>
        </div>
      </div>
      <div style={{ display: "flex", margin: " 10px 0" }}>
        <div className="quantityControl">
          <button onClick={onQuantityDecrement}>-</button>
          <input value={qty} readOnly />
          <button onClick={onQuantityIncrement}>+</button>
        </div>
        <button className="cartActionBtn">SAVE FOR LATER</button>
        <button onClick={onRemoveItem} className="cartActionBtn">
          REMOVE
        </button>
      </div>
    </div>
  );
};

export default CartItem;
