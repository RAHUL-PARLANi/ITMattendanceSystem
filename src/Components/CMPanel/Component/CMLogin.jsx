import "./style.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../features/user";
import useAxiosInstance from "../../../axiosInstance";
import { toast } from "react-toastify";

const CMLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const axiosInstance = useAxiosInstance();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passHide, setPassHide] = useState(true);
  const dispatch = useDispatch();
  const history = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("ITM-CM-User")) {
      const data = JSON.parse(localStorage.getItem("ITM-CM-User"));
      //console.log(data)
      setEmail(data.email);
      setPassword(data.password);
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axiosInstance
      .post("/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.user.verified) {
          if (res.data.user.role === "CM") {
            dispatch(
              login({
                username: res.data.user.name,
                tokin: res.data.token,
                role: res.data.user.role,
                id: res.data.user._id,
                isSuccessFullyRegistered:
                  res.data.user.isSuccessFullyRegistered,
                verified: res.data.user.verified,
                picUrl: res.data.user.picUrl,
              })
            );
            localStorage.setItem(
              "ITM-CM-User",
              JSON.stringify({ email: email, password: password })
            );
            toast.success("Signned Sucessfully");
          } else {
            toast.warning(
              "Sorry, we can not Signin you. you are not a Content Manager"
            );
          }
        } else {
          toast.warning("You Have Been Blocked from this portal");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              width: "100%",
            }}
          >
            <div
              className="spinner-border spinner-border-lg text-primary"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="container-xxl">
              <div className="authentication-wrapper authentication-basic container-p-y">
                <div className="authentication-inner">
                  {/* Register */}
                  <div className="card shadow-sm w-100">
                    <div className="card-body">
                      {/* Logo */}
                      <div className="app-brand justify-content-center">
                        <a className="app-brand-link gap-2">
                          <img src={"ITM_LOGO.png"} height={"100px"} />
                        </a>
                      </div>
                      {/* /Logo */}
                      <h5 className="mb-2">
                        Welcome to Content Mangement Panel
                      </h5>
                      <p className="mb-4">Please sign-in to your account</p>
                      <form className="mb-4" onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email-username"
                            value={email}
                            required
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            placeholder="Enter your email"
                            autoFocus="true"
                          />
                        </div>
                        <div className="mb-3 form-password-toggle">
                          <div className="d-flex justify-content-between">
                            <label className="form-label" htmlFor="password">
                              Password
                            </label>
                          </div>
                          <div className="input-group input-group-merge">
                            <input
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              type={passHide == true ? "password" : "text"}
                              id="password"
                              className="form-control"
                              name="password"
                              placeholder="············"
                              aria-describedby="password"
                            />
                            {passHide ? (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setPassHide(false);
                                }}
                                className="btn btn-primary"
                              >
                                <i className="bx bx-show"></i>
                              </button>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setPassHide(true);
                                }}
                                className="btn btn-primary"
                              >
                                <i className="bx bx-hide"></i>
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="mb-3">
                          <button
                            className="btn btn-primary d-grid w-100"
                            type="submit"
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
                      <div>
                        <button
                          onClick={() => {
                            localStorage.removeItem("ITM-CM-User");
                          }}
                          className="btn btn-outline-primary btn-sm"
                        >
                          Remove Saved Password
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* /Register */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CMLoginPage;
