/** @format */

import React, { useEffect, useState } from "react";
import "./App.css";
export default function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const PAGE_SIZE = 10;
  const TOTAL_PRODUCT = products.length;
  const NO_OF_PAGES = Math.ceil(TOTAL_PRODUCT / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const dynamicArray = Array(...Array(NO_OF_PAGES).keys());

  const fetchData = async () => {
    try {
      const data = await fetch(`https://dummyjson.com/products?limit=200`);
      console.log("data ===>", data);

      const formatedData = await data.json();
      console.log("formattedData====>", formatedData);

      setProducts(formatedData?.products);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((previous) => previous - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < NO_OF_PAGES - 1) {
      setCurrentPage((previous) => previous + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      <h2>Paginator</h2>
      {/* paginator */}
      <div className="paginator">
        <button
          className="paginator__page__button"
          onClick={() => handlePreviousPage()}
          disabled={currentPage === start}
        >
          ◀
        </button>
        {dynamicArray.map((page) => (
          <button
            key={page}
            className={`paginator__page__button ${
              page === currentPage ? "active" : ""
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="paginator__page__button"
          onClick={() => handleNextPage()}
          disabled={currentPage === NO_OF_PAGES - 1}
        >
          ▶
        </button>
      </div>

      {/* product Display */}
      <div className="product__list">
        {products.slice(start, end).map((product) => (
          <div key={product.id} className="individual__product__style">
            <img src={product.thumbnail} alt="" className="image__style" />
            <span>{product.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
