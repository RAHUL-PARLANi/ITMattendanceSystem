import React from "react";

const TeamComponent = (props) => {
  const { _id, delay, name, position, email, phone, linkedIn, image } =
    props.data;
  const primary = props.colour;
  return (
    <div
      key={_id}
      className="col-lg-4 col-md-6 wow fadeInUp"
      data-wow-delay={delay}
    >
      <div className="team-item">
        <div className="d-flex">
          <div
            className="flex-shrink-0 d-flex flex-column align-items-center mt-4 pt-5"
            style={{ width: 75 }}
          >
            <a
              style={{ color: primary }}
              className="btn btn-square bg-white my-1"
              href={`mailto:${email}`}
            >
              <i className="bx bxs-envelope"></i>
            </a>
            <a
              style={{ color: primary }}
              className="btn btn-square bg-white my-1"
              href={`tel:${phone}`}
            >
              <i className="bx bxs-phone-call"></i>
            </a>
            <a
              style={{ color: primary }}
              className="btn btn-square bg-white my-1"
              href={linkedIn}
            >
              <i className="bx bxl-linkedin-square"></i>
            </a>
          </div>
          <div className="col-xs-6">
            <img className="img-fluid rounded" src={image} alt="" />
          </div>
        </div>
        <div className="px-4 py-3">
          <h5 className="fw-bold m-0" style={{ color: "black" }}>
            {name}
          </h5>
          <small>{position}</small>
        </div>
      </div>
    </div>
  );
};

export default TeamComponent;
