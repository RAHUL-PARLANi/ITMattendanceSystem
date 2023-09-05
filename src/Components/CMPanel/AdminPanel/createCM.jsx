import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../../axiosInstance";
import { toast } from "react-toastify";

const CreateCM = () => {
  const axiosInstance = useAxiosInstance();
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passHide,setPassHide]=useState(true);  
  const [isLoading, setIsLoading] = useState(false);

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
  

  const handleSubmit = () => {
    setIsLoading(true);
    const data = {
      role: "CM",
      name: name,
      email: email,
      password: password,
    };
    axiosInstance
      .post("/register/", data)
      .then((response) => {
        toast.success(`${response.data.user.name} (CM) created successfully!`);
        setIsLoading(false);
      })
      .catch((err) => {
        if(err.response.data.errors.msg){
          toast.warning(err.response.data.errors.msg);
        }else{
          toast.error("Something Went Wrong");
        }
        setIsLoading(false);
      });
  };
 
  if(isLoading){
    return <div
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
  }
  return (
    <>
      <div className="container-fluid mt-4">
        <form
          className="bg-white px-3 mt-4 py-3 mb-4 shadow-sm rounded"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h4 className="py-2 text-primary">Create Content Moderators</h4>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="username"
              value={name}
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter Content Moderator Name"
              autoFocus="true"
            />
          </div>
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
              placeholder="Enter Content Moderator Email"
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
              <span className="input-group-text cursor-pointer">
                <i
                  className="bx bx-hide"
                  onClick={() => {
                    passHide == true ? setPassHide(false) : setPassHide(true);
                  }}
                />
              </span>
            </div>
          </div>
          <input
            type="submit"
            disabled={emailMessage!="" || passwordMessage!=""}
            className="btn btn-primary"
            value={"Create Content Moderator"}
          />
        </form>
      </div>
    </>
  );
};
export default CreateCM;