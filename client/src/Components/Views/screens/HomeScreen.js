import "./HomeScreen.css";
import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";

// Components
import Product from "../components/Product";

//Actions
import { getProducts as listProducts } from "../redux/actions/productActions";
import Footer from "../../Common/footer/footer";
import Header from "../../Common/Header/header";
import CartHeader from "../Cart/cartHeader"

const HomeScreen = () => {
    const dispatch = useDispatch();

    const getProducts = useSelector((state) => state.getProducts);
    const { products, loading, error } = getProducts;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
<>
    <Header2/>
    <div className="aa">
        <br/>

        <div className="container">

            <CartHeader/>

            <br/>

            <div className="row">


                         {loading ? (
                            <h2>Loading...</h2>
                        ) : error ? (
                            <h2>{error}</h2>
                        ) : (
                            products.map((product) => (
                                <Product
                                    key={product._id}
                                    name={product.itemName}
                                    description={product.itemDescription}
                                    price={product.itemAmount}
                                    imageUrl={product.itemImage}
                                    productId={product._id}
                                />
                            ))
                        )}







            </div>


        </div>
    </div>
    <Footer/>
</>
    );
};

export default HomeScreen;
