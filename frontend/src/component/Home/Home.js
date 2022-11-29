import React, { Fragment, useEffect } from "react";
import {BsMouse} from "react-icons/bs";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import {useSelector, useDispatch} from "react-redux";
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert";
import candlep from "../../images/candlep.png";
import oil from "../../images/fragrance oil.jpeg";


const Home = () => {
    const alert= useAlert()
    const dispatch = useDispatch();
    const {loading, error, products} = useSelector((state) => state.products)

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct()) 
    }, [dispatch, alert])

    return (
        <Fragment>
            {loading ? (<Loader />) : (
                <Fragment>
                    <MetaData title = "ViTi Candles"/>
                    <div className="banner">
                            <h1>Welcome to ViTi Candles</h1>
                            <p>Relax your mind with scented candles and fragrance oils</p>
                            {/* <div className="line"></div> */}
                            <a href="#container" className="scroll">
                                <button>
                                    Scroll <BsMouse/>
                                </button>
                            </a>
                    </div>

                    <div className="intro-container">
                        <div className="See_more">
                            <div className="content">
                                <h1> Natural Scented Candles</h1>
                                <p>
                                    Scented candles are aromatherapy that will bring a relaxing, stress-relieving experience 
                                    to you and your loved one. With materials from 100% natural wax and high quality essential oils, 
                                    ViTi Candles scented candle wick will bring you a whole new experience.
                                </p>
                                <a href="/products">Buy Now</a>
                            </div>
                            <div className="images">
                                <img src={candlep} alt="candle"/>
                                <div></div>
                            </div>
                        </div>
                        <div className="See_more_01">
                            <div className="images">
                                <img src={oil} alt="candle"/>
                                <div></div>
                            </div>
                            <div className="content">
                                <h1> Fragrance oil</h1>
                                <p>
                                    Fragrance oil is used mainly in the production of perfumes, cosmetics and aromatherapy. 
                                    Synthetic fragrances are created with many different uses such as: used to produce perfumes, 
                                    lotions, cosmetics or cosmetic chemicals such as fabric softener, shampoo, shower gel, room 
                                    spray perfume. , deodorant…
                                </p>
                                <a href="/products">Buy Now</a>
                            </div>
                        </div>
                    </div>

                    <div className="homeHeading">
                        <h2>Latest products</h2>
                    </div>

                    <div className="container" id="container">
                        {products && 
                            products.map((product) => (
                            <ProductCard key={product._id} product={product}/>
                        ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Home;
