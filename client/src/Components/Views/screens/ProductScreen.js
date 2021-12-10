import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { getProductDetails } from "../../../redux/actions/productActions";
import { addToCart } from "../../../redux/actions/cartActions";

//Common
import Footer from "../../Common/footer/footer";
import Header from "../../Common/Header/header";
import CartHeader from "../Cart/cartHeader";

//Css
import "./ProductScreen.css";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (product && match.params.id !== product._id) {
      dispatch(getProductDetails(match.params.id));
    }
  }, [dispatch, match, product]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    history.push(`/cart`);
  };

  return (
      <>
        <Header/>
      <div className="container">
        <br/>


    <div className="productsceen">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>

          <div className="container">
            <CartHeader/>
            <div className="row">
              <div className="col-md-6">
                <div className="left__image">
                  <img src={product.itemImage} alt={product.itemName} />
                </div>
              </div>
              <div className="col-md-6">

<br/><br/><br/>
                <div className="left__info">
                  <p className="left__name">{product.itemName}</p>
                  <p className="left__name2">Description: {product.itemDescription}</p>
                  <p className="left__name2">Price: LKR:{product.itemAmount}</p>

                </div>
                <div className="productscreen__right">
                  <div className="right__info">
                 <div className="row">
                   <div className="col-md-6 ss">
                     <p>
                       Status: <h3 className="ava"> {product.itemQTY > 0 ? "In Stock" : "Out of Stock"}</h3>

                     </p>
                   </div>
                   <div className="col-md-6">
                     <p>
                       Qty
                       <select value={qty} onChange={(e) => setQty(e.target.value)}>
                         {[...Array(product.itemQTY).keys()].map((x) => (
                             <option key={x + 1} value={x + 1}>
                               {x + 1}
                             </option>
                         ))}
                       </select>
                     </p>
                   </div>
                 </div>


                    <p>
                      <button type="button" className="add" onClick={addToCartHandler}>
                        Add To Cart
                      </button>
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </>
      )}
    </div>

      </div>

  <Footer/>
</>

      
  );
};

export default ProductScreen;
