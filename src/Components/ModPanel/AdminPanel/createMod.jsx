import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../../axiosInstance";

const CreateMod = () => {
  const axiosInstance = useAxiosInstance();
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passHide,setPassHide]=useState(true);  
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    const data = {
      role: "MOD",
      name: name,
      email: email,
      password: password,
    };
    axiosInstance
      .post("/register/", data)
      .then((response) => {
        alert(`${response.data.user.name} (MOD) created successfully!`);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("Something Went Wrong");
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
          <h4 className="py-2 text-primary">Create Attendance Moderator</h4>
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
              placeholder="Enter your name"
              autoFocus="true"
            />
          </div>
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
            className="btn btn-primary"
            value={"Create Moderator"}
          />
        </form>
      </div>
    </>
  );
};
export default CreateMod;
