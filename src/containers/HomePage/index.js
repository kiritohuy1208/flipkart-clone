import React from "react";
import Layout from "../../components/Layout";
import Newsletter from "../../components/UI/NewsLetter/Newsletter";
import Slider from "../../components/UI/Slide/Slide";

/**
 * @author
 * @function HomePage
 **/

const HomePage = (props) => {
  return (
    <Layout>
      <Slider />
      <Newsletter />
    </Layout>
  );
};

export default HomePage;
