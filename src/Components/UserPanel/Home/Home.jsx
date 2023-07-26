import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  let userData = useSelector((state) => state.users.value);
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-lg-12 mb-4 order-0">
          <div className="card rounded shadow-sm w-100">
            <div className="d-flex align-items-end row">
              <div className="col-sm-7">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    Welcome <span>{userData.username}</span>! 🎉
                  </h5>
                  <p className="mb-4 h6">To ITM TAP Cell's Student Portal.</p>
                </div>
              </div>
              <div className="col-sm-5 text-center text-sm-left">
                <div className="card-body pb-0 px-0 px-md-4">
                  <img
                    src="../assets/img/illustrations/man-with-laptop-light.png"
                    height={140}
                    alt="View Badge User"
                    data-app-dark-img="illustrations/man-with-laptop-dark.png"
                    data-app-light-img="illustrations/man-with-laptop-light.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {userData.isSuccessFullyRegistered === false && (
        <div className="card rounded w-100 shadow-sm h6 py-2 px-3">
         <span> Please Complete Your Profile <Link to={'/user/profile'}>here</Link> to continue further. 
         </span></div>
      )}
    </div>
  );
};

export default Home;
