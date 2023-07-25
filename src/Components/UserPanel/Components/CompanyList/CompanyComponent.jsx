import React from "react";

const CompanyComponent = (props) => {
  const imgUrl = props.data;
  return (
    <div
      className="col-lg-2 col-3 rounded me-2 shadow text-center wow zoomIn"
      data-wow-delay={"0.1s"}
    >
      <img height={"80"}   src={imgUrl} alt="dd" />
    </div>
  );
};

export default CompanyComponent;
