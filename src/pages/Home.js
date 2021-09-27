/* eslint-disable no-unused-vars */
import React from "react";

// COMPONENT IMPORT
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

// FUNCTIONS IMPORT

const Home = () => {
  return (
    <>
      <div className="jumbotron text-danger display-2 font-weight-bold text-center">
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>

      <div className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        New Arrivals
      </div>
      <NewArrivals />

      <div className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Best Sellers
      </div>
      <BestSellers />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Categories
      </h4>
      <CategoryList />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Sub-Categories
      </h4>
      <SubList />

      <br />
      <br />
    </>
  );
};

export default Home;
