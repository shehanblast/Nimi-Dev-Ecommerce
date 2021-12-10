import "./Product.css";
import { Link } from "react-router-dom";
import React from "react";

const Product = ({name,description,price,imageUrl,productId}) => {

  return (
          <div className="col-md-3">
                <div className="card">
                    <img className="card-img-top"  alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <h6 className="card-text">{description}</h6>
                        <hr/>
                        <h6 className="card-text">LKR : {price}</h6>
                        <hr/>
                         <Link to={`/product/${productId}`} className="info__button">
                           View
                         </Link>
                    </div>
                </div>
          </div>
  );
};

export default Product;
