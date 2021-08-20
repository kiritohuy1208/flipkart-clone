import React from "react";
import NumberFormat from "react-number-format";
import Card from "../UI/Card/Card";
import Price from "../../components/UI/Price";
/**
 * @author
 * @function PriceDetails
 **/

const PriceDetails = (props) => {
  return (
    <Card
      headerLeft="Price details"
      style={{
        maxWidth: "380px",
        position: "fixed",
        top: "110px",
        right: "30px",
        maxHeight: "380px",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "20px", boxSizing: "border-box" }}>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Price ({props.totalItem} items)</div>
          <div>
            <Price
              value={
                <NumberFormat
                  value={props.totalPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={""}
                />
              }
            />
          </div>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Delivery Charges</div>
          <div>FREE</div>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Total Amount</div>
          <div style={{ fontWeight: "bold" }}>
            <NumberFormat
              value={props.totalItem}
              displayType={"text"}
              thousandSeparator={true}
              prefix={""}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PriceDetails;
