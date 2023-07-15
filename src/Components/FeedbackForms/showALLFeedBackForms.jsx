import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../axios";
import { Link } from "react-router-dom";

const ShowALLFeedBackForms = () => {
  const [data, setData] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(true);
  const [render,setRender]=useState(0);
  useEffect(() => {
    axiosInstance
      .get("/feedbackform/all")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  },[render]);

  function handleIsOn(id, isOn, lastDate,formName){
    let data = {};
    if (isOn==true) {
      data = { isOn: false , formName:formName, lastDate:lastDate };

      axiosInstance
        .patch("/feedbackform/" + id, data)
        .then((res) => {
           alert(`${res.data.formName} is now OFF !`);
           setRender(render+1)  
        })
        .catch((err) => {
          console.log(err);
        });
    } else if( isOn==false ){
      data = { isOn: true ,formName:formName, lastDate:lastDate};
      axiosInstance
        .patch("/feedbackform/" + id, data)
        .then((res) => {
          if (res.data.isOn) {
            alert(`${res.data.formName} is now ON !`);
            setRender(render+1)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (isLoading) {
    return (
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
    );
  }
  return (
    <div className="container-fluid mt-4">
      <div className="row mt-4">
        {data.map((elem) => {
          return (
            <div className="col-md-6  col-lg-4">
              <div className="card mb-3 ">
                <div className="card-body">
                  <h5 className="card-title h4 text-primary mb-2">{elem.formName}</h5>
                  
                  <p 
                    className="mb-0"><span className="h6">Last Date</span> : {elem.lastDate}</p>

                  <p 
                    style={{ height: "100px", overflowY: "auto" }}
                  >
                  <span className="h6">Description</span> : {elem.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      height: "40px",
                      alignItems: "center",
                    }}
                  >
                    <Link
                      to={`/editform/${elem._id}`}
                      className="btn btn-icon btn-primary me-2"
                    >
                      <span className="tf-icons bx bxs-edit-alt"></span>
                    </Link>
                    
                    <Link
                      to={`/showform/${elem._id}`}
                      className="btn btn-icon btn-warning me-2"
                    >
                      <i className="bx bxs-show"></i>
                    </Link>

                    <Link
                      to={`/showformData/${elem._id}`}
                      className="btn btn-info btn-icon me-2"
                    >
                      <i className="bx bxs-spreadsheet"></i>
                    </Link>

                    <button
                      onClick={() => {
                        var con = window.prompt(
                          `Do you want to delete ${elem.formName}? if yes type ${elem.formName} int the box below`
                        );
                        if (con === elem.formName) {
                          axiosInstance
                            .delete("/feedbackform/" + elem._id)
                            .then((res) => {
                              if (res.data.msg) {
                                alert("Successfully Deleted");
                                setData(
                                  data.filter((re) => {
                                    return re._id != elem._id;
                                  })
                                );
                              }
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }
                      }}
                      className="btn btn-dark btn-icon me-2"
                    >
                      <i className="bx bx-trash"></i>
                    </button>
                    
                      
                    <div className="form-check form-switch">
                      <input
                        style={{ height: "25px", width: "50px" }}
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked"
                        checked={elem.isOn}
                        onChange={()=>{handleIsOn(elem._id, elem.isOn , elem.lastDate, elem.formName)}}
                      />
                    </div>
                      
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowALLFeedBackForms;
