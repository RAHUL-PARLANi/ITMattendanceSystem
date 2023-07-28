import "./page-auth.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/user";
import useAxiosInstance from "../../axiosInstance";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const axiosInstance = useAxiosInstance();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passHide,setPassHide]=useState(true);
  const dispatch = useDispatch();
  const history = useNavigate();
 useEffect(() => {
   if (localStorage.getItem("ITM-Admin-User")) {
     const data = JSON.parse(localStorage.getItem("ITM-Admin-User"));
     //console.log(data)
     setEmail(data.email)
     setPassword(data.password)
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
        dispatch(
          login({
            username: res.data.user.name,
            tokin: res.data.token,
            role: res.data.user.role,
            id: res.data.user._id,
            isSuccessFullyRegistered:res.data.user.isSuccessFullyRegistered,
            verified:res.data.user.verified
          })
        );
        localStorage.setItem("ITM-Admin-User",JSON.stringify({email:email,password:password}))
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
              height:'100vh',
              width:'100%'
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
                      <span
                        style={{ textTransform: "uppercase" }}
                        className="app-brand-text demo menu-text fw-bolder text-primary ms-2"
                      >
                        ITM
                      </span>
                    </a>
                  </div>
                  {/* /Logo */}
                  <h4 className="mb-2">Welcome to Admin Panel</h4>
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
                          type={passHide==true?"password":"text"}
                          id="password"
                          className="form-control"
                          name="password"
                          placeholder="············"
                          aria-describedby="password"
                        />
                        <span className="input-group-text cursor-pointer">
                          <i className="bx bx-hide" onClick={()=>{
                            passHide==true?setPassHide(false):setPassHide(true)
                          }} />
                        </span>
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
                  <div style={{display:'flex',width:'100%',justifyContent:'center'}}>
                  <button onClick={()=>{
                    localStorage.removeItem("ITM-Admin-User")
                  }} className="btn btn-outline-dark btn-sm">Remove Saved Passwword</button>
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

export default LoginPage;
