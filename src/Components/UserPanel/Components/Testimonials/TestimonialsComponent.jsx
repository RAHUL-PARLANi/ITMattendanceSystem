import React from "react";

const TestimonialsComponent = (props) => {
  const { _id, name, designation, review, imageUrl } = props.data;
  const primary = props.colour;
  return (
    <div className="card" key={_id}>
      <div className="card-body ">
        <h4 className="card-title">
          <i
            style={{ fontSize: "45px", color: primary }}
            class="bx bxs-quote-left"
          ></i>
        </h4>
        <div className="template-demo">
          <p style={{ color: "black" }}>{review}</p>
        </div>

        <hr />

        <div style={{ display: "flex" }} className="row">
          <div style={{ width: "20%" }} className="">
            <img
              style={{
                borderRadius: "50%",
                height: "50px",
                width: "50px",
              }}
              className="profile-pic"
              src={imageUrl}
            />
          </div>
          <div style={{ width: "80%" }} className="">
            <div className="profile">
              <h4 className="cust-name text-dark">{name}</h4>
              <p className="cust-profession text-dark">{designation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsComponent;
