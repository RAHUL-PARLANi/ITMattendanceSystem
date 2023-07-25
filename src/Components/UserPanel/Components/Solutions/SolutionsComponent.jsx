import React from "react";

const SolutionsComponent = (props) => {
  const { title, delayTime, desc, icon } = props.data;
  return (
    <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay={delayTime}>
      <div className="service-item d-flex flex-column justify-content-center text-center rounded">
        <div className="service-icon flex-shrink-0">
          <i style={{ fontSize: "40px" }} className={icon} />
        </div>
        <h5 style={{ color: "black", fontWeight: 700 }} className="mb-3">
          {title}
        </h5>
        <p className="h6">{desc}</p>
      </div>
    </div>
  );
};

export default SolutionsComponent;
