import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../axios";
import { Link } from "react-router-dom";

const ShowBatches = () => {
  const [data, setData] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [isLoading,setIsLoading]=useState(true)
  useEffect(() => {
    axiosInstance.get('/batch/all').then(res=>{
        setData(res.data)
        setIsLoading(false)
    }).catch(err=>{
        alert("Something went wrong0")
    })
  }, []);

  if(isLoading){
    return  <div
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
    <div className="container-fluid mt-2">
      <div className="row mt-4">
        {data.map(elem=>{return <div className="col-md-6  col-lg-4">
          <div className="card mb-3 ">
            <div className="card-body">
              <h5 className="card-title text-primary">{elem.name}</h5>
              <p className="card-text" style={{height:'100px',overflowY:'auto'}}>
                {elem.desciption}
              </p>
              <div >
              <Link to={`/batch/${elem._id}`} className="btn btn-primary me-2">
              <i className='bx bxs-edit-alt' ></i>
              </Link>

              <button onClick={()=>{
                var con=window.prompt(`Do you want to delete ${elem.name}? if yes type ${elem.name} int the box below`)
                if(con === elem.name ){
                    axiosInstance.delete('/batch/'+elem._id).then(res=>{
                        if(res.data.msg){
                            alert('Successfully Deleted')
                            setData(data.filter(re=>{return re._id!=elem._id}))
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }
              }} className="btn btn-danger">
                <i className='bx bx-trash'></i>
              </button>
              </div>
            </div>
          </div>
        </div>
    })}
      </div>
    </div>
  );
};

export default ShowBatches;
