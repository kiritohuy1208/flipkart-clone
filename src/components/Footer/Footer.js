import React from "react";
import "./style.css";
import {
  IoIosMail,
  IoIosShareAlt,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoMdPhonePortrait,
} from "react-icons/io";

const Footer = () => {
  return (
    <div>
      <div className="FooterCtn">
        <div className="LeftCtn">
          <div className="Logo">FlipKart</div>
          <div className="Desc">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly
            believable.
          </div>
          <div className="IconsSocial">
            <div className="IconCtn">
              <IoLogoFacebook
                style={{
                  color: "blue",
                }}
              />
            </div>
            <div className="IconCtn">
              <IoLogoTwitter
                style={{
                  color: "#55ACEE",
                }}
              />
            </div>
            <div className="IconCtn">
              <IoLogoInstagram
                style={{
                  color: "#E4405F",
                }}
              />
            </div>
          </div>
        </div>
        <div className="CenterCtn">
          <h1>Usefull Link</h1>
          <ul>
            <li>Home</li>
            <li>Cart</li>
            <li>Clothes</li>
            <li>Mobile</li>
            <li>Laptops</li>
            <li>My Account</li>
          </ul>
        </div>
        <div className="rightCtn">
          <h1>Contact</h1>
          <div className="ContactItem">
            <IoIosShareAlt />
            346/AQ, Ba Tri, Bến Tre
          </div>
          <div className="ContactItem">
            <IoMdPhonePortrait />
            (+84) 382452583
          </div>
          <div className="ContactItem">
            <IoIosMail />
            quanghuybtre2@gmail.com
          </div>
          <img src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
