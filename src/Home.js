import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <img
        className="home__image"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
        alt=""
      />

      {/* Product,id,title,rating,image */}
      <div className="home__row">
        <Product
          id="12321341"
          title="Laptop Acessories: Case Cover"
          price={11.96}
          rating={5}
          image="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/July/amazonbasics_520x520._SY304_CB442725065_.jpg"
        />
        <Product
          id="12321341"
          title="Laptop Acessories:Office Desk "
          price={25.56}
          rating={5}
          image="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        />
      </div>
      <div className="home__row">
        <Product
          id="12321341"
          title="Canon Camera : Tripod Stand"
          price={75.0}
          rating={5}
          image="https://images.pexels.com/photos/3536270/pexels-photo-3536270.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        />
        <Product
          id="12321341"
          title="Shoes: Fancy Footwear"
          price={17.45}
          rating={5}
          image="https://images.pexels.com/photos/2300334/pexels-photo-2300334.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        />
        <Product
          id="12321341"
          title="Footwear: Nike Air"
          price={87.96}
          rating={5}
          image="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        />
      </div>
      <div className="home__row">
        <Product
          id="12321341"
          title="Drone: Quad Propeller"
          price={11.96}
          rating={5}
          image="https://images.pexels.com/photos/1034812/pexels-photo-1034812.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        />
      </div>

      {/* Product */}
    </div>
  );
}

export default Home;
