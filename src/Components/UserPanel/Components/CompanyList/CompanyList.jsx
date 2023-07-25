import React from "react";
import { CompanyListData } from "./CompanyListData";
import CompanyComponent from "./CompanyComponent";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const CompanyList = () => {
  console.log(CompanyListData.length);
  return (
    <div>
      <Carousel
        autoPlay
        infiniteLoop
        interval={2500}
        showArrows={false}
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        swipeable
      >
        <div className="row g-4 py-2" style={{ justifyContent: "center" }}>
          {CompanyListData.slice(0, 5).map((elem) => {
            return <CompanyComponent data={elem} />;
          })}
        </div>
        <div className="row g-4 py-2" style={{ justifyContent: "center" }}>
          {CompanyListData.slice(5, 10).map((elem) => {
            return <CompanyComponent data={elem} />;
          })}
        </div>
        <div className="row g-4 py-2" style={{ justifyContent: "center" }}>
          {CompanyListData.slice(10, 15).map((elem) => {
            return <CompanyComponent data={elem} />;
          })}
        </div>
        <div className="row g-4 py-2" style={{ justifyContent: "center" }}>
          {CompanyListData.slice(15, 20).map((elem) => {
            return <CompanyComponent data={elem} />;
          })}
        </div>
        
        <div className="row g-4 py-2" style={{ justifyContent: "center" }}>
          {CompanyListData.slice(20, 25).map((elem) => {
            return <CompanyComponent data={elem} />;
          })}
        </div>
      </Carousel>

      <Carousel
        autoPlay
        infiniteLoop
        interval={2500}
        showArrows={false}
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        swipeable
      >
        <div className="row g-4 py-2" style={{ justifyContent: "center" }}>
          {CompanyListData.slice(25, 30).map((elem) => {
            return <CompanyComponent data={elem} />;
          })}
        </div>
        <div className="row g-4 py-2" style={{ justifyContent: "center" }}>
          {CompanyListData.slice(30, 35).map((elem) => {
            return <CompanyComponent data={elem} />;
          })}
        </div>
        
        <div className="row g-4 py-2" style={{ justifyContent: "center" }}>
          {CompanyListData.slice(35, 40).map((elem) => {
            return <CompanyComponent data={elem} />;
          })}
        </div>
        
        <div className="row g-4 py-2" style={{ justifyContent: "center" }}>
          {CompanyListData.slice(40, 45).map((elem) => {
            return <CompanyComponent data={elem} />;
          })}
        </div>

        
        <div className="row g-4 py-2" style={{ justifyContent: "center" }}>
          {CompanyListData.slice(45, 49).map((elem) => {
            return <CompanyComponent data={elem} />;
          })}
        </div>
      </Carousel>
    </div>
  );
};

export default CompanyList;
