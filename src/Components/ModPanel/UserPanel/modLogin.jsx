import "./page-auth.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../features/user";
import useAxiosInstance from "../../../axiosInstance";
import { toast } from "react-toastify";

const ModLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const axiosInstance = useAxiosInstance();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passHide, setPassHide] = useState(true);
  const dispatch = useDispatch();
  const history = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem("ITM-Mod-User")) {
      const data = JSON.parse(localStorage.getItem("ITM-Mod-User"));
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
          if (res.data.user.role === "MOD") {
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
              "ITM-Mod-User",
              JSON.stringify({ email: email, password: password })
            );
            toast.success("Sign-in Sucessfully");
          } else {
            toast.warning(
              "Sorry, we can not Signin you. you are not a Moderator"
            );
          }
        } else {
          toast.warning("You Have Been Blocked from this portal");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.errors.msg)
        setIsLoading(false);
      });
  };

  const [passwordMessage,setPasswordMessage] = useState("");
  const [emailMessage,setEmailMassage] = useState("");

  useEffect(() => {
    if(password.length<5){
      setPasswordMessage("Password length must be 5!");
    }
    else{
      setPasswordMessage("");
    }
    if(password.length===0){
      setPasswordMessage("");
    }

    if(isValidGmailAddress(email)===false){
      setEmailMassage('Email must have @gmail.com');
    }else{
      setEmailMassage("");
    }
    if(email.length===0){
      setEmailMassage("");
    }
  }, [email,password])

  function isValidGmailAddress(email) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
    return gmailRegex.test(email);
  }

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
                      <h4 className="mb-2">Welcome to Moderator Panel</h4>
                      <p className="mb-4">Please sign-in to your account</p>
                      <form className="mb-4" onSubmit={handleSubmit}>
                        <div className="mb-3">
                        {emailMessage!=""&&<div className="text-primary mb-1"><i className='bx bx-error-circle me-2'></i>{emailMessage}</div>}            
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
                        {passwordMessage!=""&&<div className="text-primary mb-1"><i className='bx bx-error-circle me-2'></i>{passwordMessage}</div>}
                          <div className="d-flex justify-content-between">
                            <label className="form-label" htmlFor="password">
                              Password
                            </label>
                          </div>
                          <div className="input-group input-group-merge">
                            <input
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              type={passHide == true ? "password" : "text"}
                              id="password"
                              className="form-control"
                              name="password"
                              placeholder="············"
                              aria-describedby="password"
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <button
                            className="btn btn-primary d-grid w-100"
                            type="submit"
                            disabled={emailMessage!="" || passwordMessage!=""}
            
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          onClick={() => {
                            localStorage.removeItem("ITM-Mod-User");
                          }}
                          className="btn btn-outline-dark btn-sm"
                        >
                          Remove Saved Passwword
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

export default ModLoginPage;
