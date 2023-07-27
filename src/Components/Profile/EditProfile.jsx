import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxiosInstance from "../../axiosInstance";
import { CollegeData } from "./CollegeData";

const EditProfile = () => {
  const axiosInstance = useAxiosInstance();
  const [page, setPage] = useState(0);
  const userID=window.location.href.split('/').pop();
  const [formData, setFormData] = useState({});
  const [univercityType, setUnivercityType] = useState("");
  const [univercityName, setUnivercityName] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const userData= useSelector(
    (state) => state.users.value
  );
   
  const [isLoading,setIsLoading] = useState(true); 

  const Page1Data = [
    {
      name: "name",
      label: "Name(Block Letter)",
      type: "text",
      required: "true",
    },
    {
      name: "fatherName",
      label: "Father Name(Block Letter)",
      type: "text",
      required: "true",
    },
    {
      name: "rollNo",
      label: "Roll Number",
      type: "text",
      required: "true",
    },
    {
      name: "WorkingEmailId",
      label: "Working Email",
      type: "text",
      required: "text",
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "text",
      required: "true",
    },
    {
      name: "branch",
      label: "Branch",
      type: "select",
      options: ["MBA", "CS", "IT", "CIVIL", "MECHANICAL", "MCA", "EC", "EE"],
      required: "true",
    },
    {
      name: "batch",
      label: "Batch",
      type: "text",
      options: ["CS-A", "CS-B", "CS-C", "CS-D", "IT-A", "IT-B", "Others"],
      required: "true",
    },
    {
      name: "dateOfBirth",
      label: "Date Of Birth",
      type: "date",
      required: "true",
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options:['MALE',"FEMALE",'OTHERS'],
      required: "true",
    },
  ];

  const Page2Data = [
    {
      name: "noOfCurrentBacklogs",
      label: "No. of Current Backlogs",
      type: "text",
      required: true,
    },
    {
      name: "historyOfBacklogs",
      label: "History of Backlogs",
      type: "text",
      required: true,
    },
    {
      name: "tenthMarksPercentage",
      label: "10th Marks Percentage",
      type: "text",
      required: true,
    },
    {
      name: "tenthBoardName",
      label: "10th Board Name",
      type: "text",
      required: true,
    },
    {
      name: "tenthPassingYear",
      label: "10th Passing Year",
      type: "text",
      required: true,
    },
    {
      name: "tweelthMarksPercentage",
      label: "12th Marks Percentage",
      type: "text",
      required: true,
    },
    {
      name: "tweelthBoardName",
      label: "12th Board Name",
      type: "text",
      required: true,
    },
    {
      name: "tweelthPassingYear",
      label: "12th Passing Year",
      type: "text",
      required: true,
    },
    {
      name: "graduationBranch",
      label: "Graduation Branch",
      type: "text",
      required: true,
    },
    {
      name: "aggregatePercentageGraduation",
      label: "Aggregate Percentage (Graduation)",
      type: "text",
      required: true,
    },
    {
      name: "univercityNameGraduation",
      label: "University Name (Graduation)",
      type: "text",
      required: true,
    },
    {
      name: "yearOfPassingGraduation",
      label: "Year of Passing (Graduation)",
      type: "text",
      required: true,
    },
    {
      name: "youHaveLaptop",
      label: "Do you have a Laptop?",
      type: "select",
      options:['YES','NO'],
      required: true,
    },
    {
      name: "busFacility",
      label: "Bus Facility",
      type: "select",
      options:['YES','NO'],
      required: true,
    },
  ];

  useEffect(() => {
    axiosInstance.get('/users/'+userID).then(res=>{
      setFormData(res.data)
      setUnivercityName(res.data.currentUnivercity.name || "")
      setUnivercityType(res.data.currentUnivercity.type || "")
      setIsLoading(false)
    }).catch(err=>{
       alert('Something Went Wrong') 
      console.log(err)
    })
  }, [])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    axiosInstance
      .patch("/users/" + userID, formData)
      .then((res) => {
        if(res.data){
          alert('Successful')
          setIsLoading(false)
        }
      })
      .catch((er) => {alert('Something went Wrong') 
      setIsLoading(false)});
  };
  if(isLoading){
    
    return <>
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
      
  }
  else if (page == 0) {
    return (
      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-md-12">
              <ul className="nav nav-pills flex-column flex-md-row mb-3">
                <li className="nav-item">
                  <a
                    onClick={() => {
                      setPage(0);
                    }}
                    className="nav-link active"
                  >
                    <i className="bx bx-user me-1" /> Basic Information
                  </a>
                </li>
                <li className="nav-item">
                  <a onClick={() => {
                      setPage(1);
                    }} className="nav-link">
                    <i className="bx bx-bell me-1" /> Education Details
                  </a>
                </li>
                <li className="nav-item">
                  <a onClick={() => {
                      setPage(2);
                    }} className="nav-link">
                    <i className="bx bx-scan me-1" /> Face Scan
                  </a>
                </li>
              </ul>
              <div className="card mb-4">
                <h5 className="card-header">Basic Details</h5>
                {/* Account */}
                
                <hr className="my-0" />
                <div className="card-body">
                  <form onSubmit={()=>{
                    setPage(1)
                  }}>
                    <div className="row">
                      {Page1Data.map((field) => {
                        return (
                          <>
                            <>
                              {field.type === "select" ? (
                                <div className="mb-3 col-md-6">
                                  <label
                                    htmlFor="language"
                                    className="form-label"
                                  >
                                    {field.label}
                                  </label>
                                  <select
                                    required={field.required}
                                    type="select"
                                    id={field.name}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="select2 form-select"
                                  >
                                    <option value={""}>Choose</option>
                                    {field.options?.map((elem) => {
                                      return (
                                        <option value={elem}>{elem}</option>
                                      );
                                    })}
                                  </select>
                                </div>
                              ) : (
                                <div className="mb-3 col-md-6">
                                  <label
                                    htmlFor="firstName"
                                    className="form-label"
                                  >
                                    {field.label}
                                  </label>
                                  <input
                                    className="form-control"
                                    required={field.required}
                                    type={field.type}
                                    id={field.name}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    autofocus=""
                                  />
                                </div>
                              )}
                            </>
                          </>
                        );
                      })}
                      <div className="mb-3 col-md-6">
                        <label
                          htmlFor="selectUnivercityType"
                          className="form-label"
                        >
                          College Name
                        </label>
                        <select
                          required
                          type="select"
                          id={"selectUnivercityType"}
                          value={univercityType}
                          onChange={(e) => {
                            setUnivercityType(e.target.value);
                            if (e.target.value === "itmGoi") {
                              setUnivercityName("ITM GOI");
                            } else if (e.target.value === "itmUnivercity") {
                              setUnivercityName("ITM UNIVERCITY");
                            }
                          }}
                          className="select2 text-black form-select"
                        >
                          <option value={""}>Choose</option>
                          {[
                            { value: "itmGoi", label: "ITM GOI" },
                            { value: "itmUnivercity", label: "ITM UNIVERCITY" },
                            { value: "others", label: "Others" },
                          ].map((elem) => {
                            return (
                              <option value={elem.value}>{elem.label}</option>
                            );
                          })}
                        </select>
                      </div>
                      {univercityType === "others" && (
                        <div className="mb-3 col-md-6">
                          <label
                            htmlFor="selectUnivercityName"
                            className="form-label"
                          >
                            if Others, Select One Of These
                          </label>
                          <select
                            required
                            type="select"
                            id={"selectUnivercityName"}
                            value={univercityName}
                            onChange={(e) => {
                              setUnivercityName(e.target.value);
                            }}
                            className="select2 text-black form-select"
                          >
                            <option value={""}>Choose</option>
                            {CollegeData.map((elem) => {
                              return <option value={elem}>{elem}</option>;
                            })}
                          </select>
                        </div>
                      )}
                    </div>

                    <div className="mt-2">
                      <button type="submit" className="btn btn-primary me-2">
                        Next
                      </button>
                      
                    </div>
                  </form>
                </div>
                {/* /Account */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (page == 1) {
    return (
      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-md-12">
              <ul className="nav nav-pills flex-column flex-md-row mb-3">
                <li className="nav-item">
                  <a
                    onClick={() => {
                      setPage(0);
                    }}
                    className="nav-link "
                  >
                    <i className="bx bx-user me-1" /> Basic Information
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                  onClick={() => {
                    setPage(1);
                  }}
                  className="nav-link active">
                    <i className="bx bx-bell me-1" /> Education Details
                  </a>
                </li>
                <li className="nav-item">
                  <a onClick={() => {
                      setPage(2);
                    }} className="nav-link">
                    <i className="bx bx-scan me-1" /> Face Scan
                  </a>
                </li>
              </ul>
              <div className="card mb-4">
                <h5 className="card-header">Education Details</h5>
                {/* Account */}
                {/* <div className="card-body">
                  <div className="d-flex align-items-start align-items-sm-center gap-4">
                    <img
                      src="../assets/img/avatars/1.png"
                      alt="user-avatar"
                      className="d-block rounded"
                      height={100}
                      width={100}
                      id="uploadedAvatar"
                    />
                    <div className="button-wrapper">
                      <label
                        htmlFor="upload"
                        className="btn btn-primary me-2 mb-4"
                        tabIndex={0}
                      >
                        <span className="d-none d-sm-block">
                          Upload new photo
                        </span>
                        <i className="bx bx-upload d-block d-sm-none" />
                        <input
                          type="file"
                          id="upload"
                          className="account-file-input"
                          hidden=""
                          accept="image/png, image/jpeg"
                        />
                      </label>
                      <button
                        type="button"
                        className="btn btn-outline-secondary account-image-reset mb-4"
                      >
                        <i className="bx bx-reset d-block d-sm-none" />
                        <span className="d-none d-sm-block">Reset</span>
                      </button>
                      <p className="text-muted mb-0">
                        Allowed JPG, GIF or PNG. Max size of 800K
                      </p>
                    </div>
                  </div>
                </div> */}
                <hr className="my-0" />
                <div className="card-body">
                  <form id="formAccountSettings" onSubmit={(e)=>{
                    e.preventDefault()
                    setPage(2)
                  }}>
                    <div className="row">
                      {Page2Data.map((field) => {
                        return (
                          <>
                            <>
                              {field.type === "select" ? (
                                <div className="mb-3 col-md-6">
                                  <label
                                    htmlFor="language"
                                    className="form-label"
                                  >
                                    {field.label}
                                  </label>
                                  <select
                                    required={field.required}
                                    type="select"
                                    id={field.name}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="select2 form-select"
                                  >
                                    <option value={""}>Choose</option>
                                    {field.options?.map((elem) => {
                                      return (
                                        <option value={elem}>{elem}</option>
                                      );
                                    })}
                                  </select>
                                </div>
                              ) : (
                                <div className="mb-3 col-md-6">
                                  <label
                                    htmlFor="firstName"
                                    className="form-label"
                                  >
                                    {field.label}
                                  </label>
                                  <input
                                    className="form-control"
                                    required={field.required}
                                    type={field.type}
                                    id={field.name}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    autofocus=""
                                  />
                                </div>
                              )}
                            </>
                          </>
                        );
                      })}
                    </div>
                    <div className="mt-2">
                      <button type="submit" className="btn btn-primary me-2">
                        Next
                      </button>
                     
                    </div>
                  </form>
                </div>
                {/* /Account */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (page == 2) {
    return (
      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row">
            <div className="col-md-12">
              <ul className="nav nav-pills flex-column flex-md-row mb-3">
                <li className="nav-item">
                  <a onClick={()=>{
                    setPage(0)
                  }} className="nav-link ">
                    <i className="bx bx-user me-1" /> Basic Information
                  </a>
                </li>
                <li className="nav-item">
                  <a  onClick={()=>{
                    setPage(1)
                  }} className="nav-link ">
                    <i className="bx bx-bell me-1" /> Education Details
                  </a>
                </li>
                <li className="nav-item">
                  <a onClick={() => {
                      setPage(2);
                    }} className="nav-link active">
                    <i className="bx bx-scan me-1" /> Face Scan
                  </a>
                </li>
              </ul>
              <div className="card mb-4">
                <h5 className="card-header">Face Scan</h5>
                {/* Account */}
                {/* <div className="card-body">
                  <div className="d-flex align-items-start align-items-sm-center gap-4">
                    <img
                      src="../assets/img/avatars/1.png"
                      alt="user-avatar"
                      className="d-block rounded"
                      height={100}
                      width={100}
                      id="uploadedAvatar"
                    />
                    <div className="button-wrapper">
                      <label
                        htmlFor="upload"
                        className="btn btn-primary me-2 mb-4"
                        tabIndex={0}
                      >
                        <span className="d-none d-sm-block">
                          Upload new photo
                        </span>
                        <i className="bx bx-upload d-block d-sm-none" />
                        <input
                          type="file"
                          id="upload"
                          className="account-file-input"
                          hidden=""
                          accept="image/png, image/jpeg"
                        />
                      </label>
                      <button
                        type="button"
                        className="btn btn-outline-secondary account-image-reset mb-4"
                      >
                        <i className="bx bx-reset d-block d-sm-none" />
                        <span className="d-none d-sm-block">Reset</span>
                      </button>
                      <p className="text-muted mb-0">
                        Allowed JPG, GIF or PNG. Max size of 800K
                      </p>
                    </div>
                  </div>
                </div> */}
                <hr className="my-0" />
                <div className="card-body">
                  <form id="formAccountSettings" onSubmit={handleSubmit}>
                    {/* <div className="row">
                      {Page2Data.map(elem=>{return <>
                        <>
                          {field.type === "select" ? (
                            
                            <div className="mb-3 col-md-6">
                        <label htmlFor="language" className="form-label">
                        {field.label}
                        </label>
                        <select required={field.required}
                                type="select"
                                id={field.name}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                               className="select2 form-select">
                          <option value={""}>Choose</option>
                                {field.options.map((elem) => {
                                  return (
                                    <option value={elem}>{elem}</option>
                                  );
                                })}
                        </select>
                      </div>
                             ) : (
                            <div className="mb-3 col-md-6">
                        <label htmlFor="firstName" className="form-label">
                        {field.label}
                        </label>
                        <input
                          className="form-control"
                          required={field.required}
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          autofocus=""
                        />
                      </div>
                          )}
                        </>
                      
                      </>})}
                    </div> */}

                    <div className="mt-2">
                      <button type="submit" className="btn btn-primary me-2">
                        Save{" "}
                      </button>
                      
                    </div>
                  </form>
                </div>
                {/* /Account */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default EditProfile;