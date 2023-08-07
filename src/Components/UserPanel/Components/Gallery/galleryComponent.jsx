import React from "react";

const GalleryComponent = (props) => {
  const { _id, title, desc, imageUrl, delay } = props.data;
  return (
    <div
      key={_id}
      className="col-lg-3 col-md-6 portfolio-item first wow zoomIn"
      data-wow-delay={delay}
    >
      <div className="position-relative rounded overflow-hidden">
        <img
          className="img-fluid w-100"
          src={imageUrl}
          alt={"photo for " + title}
        />
        <div className="portfolio-overlay">
          <div className="mt-auto">
            <a
              style={{ display: "flex", alignItems: "center" }}
              className="h5 d-block text-white mt-1 mb-0"
            >
              {title}
            </a>
            <div style={{maxHeight:'150px',overflowY:'auto'}}> 
            <small className="text-white">{desc}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryComponent;