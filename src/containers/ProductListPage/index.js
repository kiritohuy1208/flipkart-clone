import React from "react";
import Layout from "../../components/Layout";
import getParams from "../../utils/getParams";
import ClothingAndAccessories from "./ClothingAndAccessories";
import ProductPage from "./ProductPage";
import ProductStore from "./ProductStore";

import "./style.css";
/**
 * @author
 * @function ProductListPage
 **/

const ProductListPage = (props) => {
  console.log("propslistpage" + props.location.search);
  const renderProduct = () => {
    //location:
    // hash: ""
    // pathname: "/Nokia"
    // search: "?cid=60fe20721bacc91a581dfb36&&type=product"
    // state: undefined
    const params = getParams(props.location.search);
    console.log("props.location.search", params);
    let content = null;
    switch (params.type) {
      case "store":
        content = <ProductStore {...props} />;
        break;
      case "page":
        content = <ProductPage {...props} />;
        break;
      default:
        content = <ClothingAndAccessories {...props} />;
    }
    return content;
  };
  return <Layout>{renderProduct()}</Layout>;
};

export default ProductListPage;
