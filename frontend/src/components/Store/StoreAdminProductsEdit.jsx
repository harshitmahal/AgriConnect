import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import swal from "sweetalert";
import { handleFileChange } from "../../utils/UploadImage";

const StoreAdminProductsEdit = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [smallDes, setSmallDes] = useState("");
  const [longDes, setLongDes] = useState("");
  const [openBrowse, setopenBrowse] = useState(false);
  const navigate = useNavigate();

  const { pid } = useParams();

  const saveProduct = async (e) => {
    e.preventDefault();
    const product = {
      name,
      category,
      price,
      image: img,
      smallDes,
      longDes,
    };

    axios
      .put(`https://4kdjc9fyz8.execute-api.us-east-1.amazonaws.com/prod/api/store/products/${pid}`, product)
      .then((response) => {
        swal({
          title: "Product Updated Successfully!",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#12af39",
          className: "store-swal-button",
        }).then(() => {
          navigate(-1);
        });
      });
  };

  useEffect(() => {
    axios.get(`https://4kdjc9fyz8.execute-api.us-east-1.amazonaws.com/prod/api/store/product/${pid}`).then((res) => {
      setName(res.data.product.name);
      setImg(res.data.product.image);
      setPrice(res.data.product.price);
      setSmallDes(res.data.product.smallDes);
      setLongDes(res.data.product.longDes);
      setCategory(res.data.product.category);
    });
  }, [pid]);

  const handleImage = async (e) => {
      const up = await handleFileChange(e);
      setImg(up);
    }

  return (
    <div className="store-add-product py-4 d-flex align-items-center flex-column justify-content-center">
      <div className="store-admin-edit-form p-4">
        <h2 className="display-6"> Edit Product on Store </h2>
        <small id="emailHelp" className="form-text text-muted">
          Enter thenew details that you need to edit
        </small>

        <div className="store-add-product-form-inner  py-4">
          <form>
            <div className="form-group my-2">
              <label className="my-1">Name</label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="form-group mt-4">
              <label className="my-1">Category</label>
              <select
                className="form-control mb-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">-- Select Category --</option>
                <option value="fruits">Fruits</option>
                <option value="vegetables">Vegetables</option>
              </select>
            </div>

            <div className="form-group my-4">
              <label className="my-1">Unit Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Unit Price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>

            <div className="form-group my-4">
              <label className="my-1">Image</label>
              <img src={img} width="20" height="20" />
              <button onClick={() => setopenBrowse(!openBrowse)}>Edit</button>
              { openBrowse &&
              <input
                type="file"
                className="form-control"
                placeholder="Image"
                // value={img}
                onChange={(e) => {
                  handleImage(e);
                }}
              />
              }

            </div>

            <div className="form-group my-4">
              <label className="my-1">Small Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Small Description"
                value={smallDes}
                onChange={(e) => {
                  setSmallDes(e.target.value);
                }}
              />
            </div>

            <div className="form-group my-4">
              <label className="my-1">Long Description</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Long Description"
                value={longDes}
                onChange={(e) => {
                  setLongDes(e.target.value);
                }}
              />
            </div>

            <button
              type="submit"
              className="btn w-100"
              onClick={saveProduct}
              style={{ background: "rgb(18, 175, 57)", color: "white" }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StoreAdminProductsEdit;
