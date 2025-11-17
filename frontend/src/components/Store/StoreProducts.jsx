import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "./Store.css";
import StoreProductSingle from "./StoreProductSingle";

const StoreProducts = () => {
  let params = useParams();
  const [products, setProducts] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://4kdjc9fyz8.execute-api.us-east-1.amazonaws.com/prod/api/store/products/${params.category}`)
      .then((res) => {
        setProducts(res.data.products);
      });
  }, [params.category]);

  const onSearch = (e) => {
    const pName = e.target.value;

    if (pName === "") {
      axios
        .get(`https://4kdjc9fyz8.execute-api.us-east-1.amazonaws.com/prod/api/store/products/${params.category}`)
        .then((res) => {
          setProducts(res.data.products);
        });
    } else {
      const newProducts = products?.filter((p) =>
        p.name.toLowerCase().startsWith(pName)
      );

      setProducts(newProducts);
    }
  };

  return (
    <div className="store-container min-vh-100">
      <div
        id="carouselExampleCaptions"
        class="carousel slide store-carousel"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://i.ibb.co/277NHWS/Cover1.jpg"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              <h5></h5>
              <p>

              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://i.ibb.co/2cdLp79/Untitled-1.jpg"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>l</h5>
              <p>

              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://i.ibb.co/T1Qwh9K/fresh-stole.jpg"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              <h5></h5>
              <p>

              </p>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>


      <div className="mt-4 store-search-bar45645461212 col-5 px-5">
        <input
          type="text"
          class="form-control mb-2 mr-sm-2"
          id="inlineFormInputName2"
          placeholder=
          {params.category.replace(/\w\S*/g, function (txt) {
            return `Search for your favorite ${txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()}`;
          })}

          onChange={onSearch}
        />
      </div>

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
    </div>
  );
};

export default StoreProducts;
