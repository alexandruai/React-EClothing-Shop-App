import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import OurServices from "../components/home/OurServices";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

const Home = () => {
  return (
    <>
      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron text={["Best Car Service In Town",
         "Get Back on the Road with Confidence", 
         "Get it"]} />
      </div>

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Our Services
      </h4>
      <OurServices />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Our Products
      </h4>
      <NewArrivals />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Categories
      </h4>
      <CategoryList />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Sub Categories
      </h4>
      <SubList />

      <br />
      <br />
    </>
  );
};

export default Home;
