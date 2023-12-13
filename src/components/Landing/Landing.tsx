import React from "react";
import "./Landing.scss";
import logo from "../../assets/images/velvette-logo.svg";
import whatsapp from "../../assets/images/whatsapp.svg";
import linkedin from "../../assets/images/linkedin.svg";
import twitter from "../../assets/images/twitter.svg";
import instagram from "../../assets/images/instagram.svg";
import Card from "../card/Card";
import bannerImage from '../../assets/images/banner.svg'
function Home() {
  return (
    <div className="hero-section">
      <header>
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <img className="h-12 w-auto" src={logo} alt="celvette" />
            </a>
          </div>
        </nav>
      </header>
      <section className="carousel-section"></section>
      <section className="products-section">
        <div className="flex justify-between w-[80%]  my-0 mx-auto ">
          <div className="top-deals">Top Deals</div>
          <button
            type="button"
            className="explore-all-button text-sm  focus:outline-none  hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 flex justify-center items-center"
          >
            Explore All
            <span className="pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="20"
                viewBox="0 0 13 20"
                fill="none"
              >
                <path
                  d="M0.838438 18.8185C0.556172 18.5716 0.415039 18.2792 0.415039 17.9414C0.415039 17.6037 0.556172 17.3117 0.838438 17.0654L9.10883 9.83088L0.810211 2.57168C0.546763 2.34123 0.415039 2.05317 0.415039 1.70749C0.415039 1.36182 0.556172 1.06552 0.838438 0.81861C1.1207 0.571698 1.45491 0.448242 1.84105 0.448242C2.22719 0.448242 2.56101 0.571698 2.84253 0.81861L12.3267 9.13953C12.4396 9.2383 12.5197 9.34529 12.5671 9.46052C12.6146 9.57574 12.6379 9.6992 12.6371 9.83088C12.6371 9.96257 12.6134 10.086 12.566 10.2013C12.5186 10.3165 12.4388 10.4235 12.3267 10.5222L2.8143 18.8432C2.55085 19.0736 2.22606 19.1888 1.83992 19.1888C1.45378 19.1888 1.11995 19.0654 0.838438 18.8185Z"
                  fill="#333B52"
                  fill-opacity="0.76"
                />
              </svg>
            </span>
          </button>
        </div>
        <div className=" flex justify-evenly w-[65%] my-0 mx-auto flex-wrap ">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </section>
      <section className="banner-section">
        <div className="banner">
          <div className="banner-left"><img src={bannerImage} alt="banner_image" /></div>
          <div className="banner-right">
            <div className="banner-description">
              <h3>Fashion Hoodie</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur. Orci morbi netus sociis
                ut ultricies at faucibus eu.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="footer-wrapper">
          <div className="footer-section">
            <div className="footer-logo-section">
              <div className="footer-logo">
                <img src={logo} alt="velvette_logo" />
              </div>
              <div className="company-name">Velvettee</div>
              <div className="company-address">
                Address: lorem ipsum lorem ipsum 2045,3 54 lorem ipsum.
              </div>
            </div>
            <nav className="flex justify-center items-center  footer-nav">
              <ul className="flex justify-between items-center w-[50%] footer-nav-items">
                <li>HOME</li>
                <li>SUPPORT</li>
                <li>PRIVACY POLICY</li>
                <li>ABOUT US</li>
              </ul>
            </nav>
            <div className="social-icons">
              <div>
                <img src={twitter} alt="twitter" />
              </div>
              <div>
                <img src={linkedin} alt="linkedin" />
              </div>
              <div>
                <img src={whatsapp} alt="whatsapp" />
              </div>
              <div>
                <img src={instagram} alt="instagram" />
              </div>
            </div>
          </div>
          <div className="copy-right-section">
            Copyright &#169; Velvettee 2023 All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
