import React, { Fragment, useEffect, useState } from 'react';
import "./Products.css";
import { useSelector, useDispatch} from "react-redux";
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert"
import { Button, Typography } from '@material-ui/core';
import MetaData from "../layout/MetaData";
import axios from 'axios';
// import { getAllCategories } from "../../actions/categoryAction";

// const categories = [ // bạn tạo categroty băng admin nó se nằm ở đâu , cái data bạn tạo nằm ở đâu
//     "Gift Sets",
//     "Candle Accessories",
//     "Scented Candle",
//     "Fragrance oil"
// ];



const Products = () => {
    const dispatch = useDispatch();
    const [categories,setCategories] = useState([])
    const alert = useAlert();
    const [ratingFilter,setRatingFilter] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 2500]); 
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0)
    const [priceFilter,setPriceFilter] = useState([0,2500])
    const {loading, error, products, productsCount, resultPerPage} = useSelector((state)=>state.products);
    console.log(products,'products')
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }

    const {keyword} = useParams();
    const getData = async() => { 
        const res = await axios.get("/api/v1/admin/category");
        return res
      };
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage,  priceFilter, category, ratingFilter));
        
    }, [dispatch,keyword, currentPage,  priceFilter, category, ratingFilter]);
    console.log("xao")
    useEffect(() => {
     const res = getData()
      res.then(response => setCategories(response.data.categories))
    },[]) 
    console.log(categories)
    return (
        <Fragment>
            {loading ? (
                <Loader/>
            ) : (
                <Fragment>
                    <MetaData title="PRODUCTS -- ViTi Candles"/>
                    <h2 className='productsHeading'> Products </h2>
                    <div className="products">

                        {products && products.length !== 0 ? products.map((product) => (
                            <ProductCard key={product._id} product={product}/>
                        )) : <div>EMpty</div>}
                    </div>
                    <div className='filterBox'>
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={2500}
                        />
                        <Button variant='contained' onClick={() => setPriceFilter(price)}>SetPrice</Button>
                        <br/>
                        <Typography>Categories</Typography>
                        <ul className='categoryBox'>
                            {categories && categories.map((category) => (
                                <li
                                    className='category-link'
                                    key={category.name}
                                    onClick={() => setCategory(category._id)}
                                >
                                    {category.name}
                                </li>
                            ))}
                        </ul>
                        <fieldset>
                            <Typography element="legend">Ratings Above</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating);
                                }}
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />
                            <Button onClick={() => setRatingFilter(ratings)}>Set Rating</Button>
                        </fieldset>
                    </div>
                    
                    {resultPerPage < productsCount && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default Products;