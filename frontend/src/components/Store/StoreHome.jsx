import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StoreProductSingle from "./StoreProductSingle";
import Navigator from "../Navigator/Navigator";
import "./Store.css";
import WeatherSeason from "../Seasonal/WeatherSeason";

const StoreHome = () => {
  const [products, setProducts] = useState([]);
  const [seasonalproducts, setSeasonalProducts] = useState([]);
  // const [season, setSeason] = useState("summer");

  useEffect(() => {
    axios.get(`https://4kdjc9fyz8.execute-api.us-east-1.amazonaws.com/prod/api/store/products`).then((res) => {
      setProducts(res.data.products);
    });

    axios.get(`https://4kdjc9fyz8.execute-api.us-east-1.amazonaws.com/prod/api/seasonal/season/${getCurrentSeason()}`).then((res) => {
      setSeasonalProducts(res.data.vegetables);
    });
  }, []);

  const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1; // 1–12

    if ([3, 4, 5].includes(month)) return "Summer";
    if ([6, 7, 8, 9].includes(month)) return "Monsoon";
    if ([10, 11, 12, 1, 2].includes(month)) return "Winter";
  }

  return (
    <>
      <Navigator />
      <WeatherSeason/>
      <div className="vw-100 min-vh-100" style={{ backgroundColor: "#F5F5F5" }}>
        {/* Upper Images */}


        {/* Categories */}

        <div className="categories p-4">
          <h1 className="my-4 display-6 px-5">
            {" "}
            <b>Categories</b>{" "}
          </h1>

          <div className="category-list row gy-4 px-5 justify-center">
            <div className="category col-3">
              <Link to="/store/products/vegetables">
                <img
                  src="https://i.ibb.co/jLFzMwR/Cat1.jpg"
                  style={{
                    width: "300px",
                    height: "500px",
                    cursor: "pointer",
                  }}
                  alt=""
                />
              </Link>
            </div>

            <div className="category col-3">
              <Link to="/store/products/fruits">
                <img
                  src="https://i.ibb.co/jJqxM2X/Cat2.jpg"
                  style={{
                    width: "300px",
                    height: "500px",
                    cursor: "pointer",
                  }}
                  alt=""
                />
              </Link>
            </div>

          </div>
        </div>

        <div className="latest-store-items p-4">
          <h1 className="display-6 px-5">
            <p>
              {" "}
              <b> Seasonal produces </b>{" "}
            </p>
          </h1>
          <div className="products-list row p-5">
            {seasonalproducts &&
              seasonalproducts.map((prod) => (
                <div className="col mt-4">
                  <StoreProductSingle
                    key={prod._id}
                    img={prod.image}
                    title={prod.name}
                    price={prod.price}
                    id={prod._id}
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="latest-store-items p-4">
          <h1 className="display-6 px-5">
            <p>
              {" "}
              <b> Latest Products </b>{" "}
            </p>
          </h1>
          <div className="products-list row p-5">
            {products &&
              products.map((prod) => (
                <div className="col mt-4">
                  <StoreProductSingle
                    key={prod._id}
                    img={prod.image}
                    title={prod.name}
                    price={prod.price}
                    id={prod._id}
                  />
                </div>
              ))}
          </div>

          {/* <div className="latest-store-cover my-4">
            <img className="w-100" src="https://i.ibb.co/Tqz0hW4/banner3sjndjs.jpg" alt="" />
          </div> */}
          <div className="latest-store-cover my-4">
          <img src="https://i.ibb.co/XJSwxr6/Cover1.jpg" alt="" style={{ width: " -webkit-fill-available" }} />
        </div>
        </div>
      </div>
    </>

  );
};

export default StoreHome;
