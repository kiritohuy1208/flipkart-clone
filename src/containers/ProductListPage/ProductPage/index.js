import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductPage } from '../../../actions'
import getParams from "../../../utils/getParams";

import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import "./style.css";
import Card from "../../../components/UI/Card/Card";
/**
 * @author
 * @function ProductPage
 **/

const ProductPage = (props) => {
  const dispatch = useDispatch()
  const product = useSelector(state => state.product)
  const {page} = product
  useEffect(()=>{
    const params = getParams(props.location.search)
    const payload = {
        params
    }
    dispatch(getProductPage(payload))
  },[])
  const renderCarousel = () =>(
            <Carousel
                renderThumbs={()=>{}}
            >
                {
                    page.banners && page.banners.map((banner,index)=>
                    <a 
                        style={{display: 'block'}}
                        key={index}
                        href={banner.navigateTo}
                    >
                    <img alt="" src={banner.img} />
                    </a>
                )
                  
                }
              
            </Carousel>      
  )
  return (
    <div style={{margin:"0px 10px"}}>
       <h3>{page.title}</h3>
           {renderCarousel()}
           <div style={{display: 'flex', justifyContent:"center",margin:"5px",flexWrap: "wrap" }}>
               {
                  page.products && page.products.map((product,index)=>
                    <Card 
                        key={index} 
                        style={{display:"flex",width:"250px", height: "150px", margin:"0 5px"}}
    
                    >
                        <img  style={{
                                width: '100%',
                                height: '100%',
                                objectFit: "contain"
                            }}  src={product.img} alt=''/>
                    </Card>
                  )
               }
           </div>
      
    </div>
  );
};

export default ProductPage;
