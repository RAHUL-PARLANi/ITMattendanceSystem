import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../axiosInstance";
import { useSelector } from "react-redux";

const ShowForm = () => {
  const userData=useSelector(state=>state.users.value)
  const [data, setData] = useState([]);
  const axiosInstance = useAxiosInstance();
  const [isLoading, setIsLoading] = useState(true);

  const [FormTillNow, setFormTillNow] = useState([])
  const [formData,setFormData]=useState({});
  
  const [alreadyResponded,setAlreadyResponded]=useState(false);  
  const [isVisibile,setIsVisibile]=useState();
  
  useEffect(() => {
    axiosInstance
      .get("/feedbackform/" + window.location.href.split("/").pop())
      .then((res) => {
        setData(res.data);
        setFormTillNow(res.data.customFields)
        setIsLoading(false);

        if(res.data.data.find(elem=>elem.submittedBy==userData.id)){
            setAlreadyResponded(true)
        }

        if(res.data.studentsId){
            if(res.data.studentsId.find(elem=>elem==userData.id)){
                setIsVisibile(true)
            }else{
                setIsVisibile(false)
            }
        }
      })
      .catch((err) => {
        alert("Something went wrong");
        console.log(err)
        setIsLoading(false)
      });
  }, []);

 useEffect(()=>{
   axiosInstance.get('/users/'+userData.id).then(res=>{
       setFormData({
           ...formData,
           submittedBy:res.data._id,
           name:res.data.name,
           fatherName:res.data.fatherName,
           rollNo:res.data.rollNo,
           WorkingEmailId:res.data.WorkingEmailId,
           phoneNumber:res.data.phoneNumber,
           branch:res.data.branch,
           batch:res.data.batch,
           dateOfBirth:res.data.dateOfBirth,
           gender:res.data.gender,      
       })
   }).catch(err=>{
       alert('Something went wrong')
   })
 },[isLoading])

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
    axiosInstance.post('/feedbackform/submitData/'+window.location.href.split('/').pop(),{data:formData}).then(res=>{
        alert('Your data has been successfully submitted!')
        window.location=window.location.href;
    }).catch(err=>{
        console.log(err)
    })
  }
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

  if(isVisibile===false){
    return(<div className="container-fluid mt-4">
        <div className="card p-2">You don't have access to this form.</div>
    </div>)
  }

  
  if(alreadyResponded){
    return(<div className="container-fluid mt-4">
        <div className="card p-2">You have aready responed to this form.</div>
    </div>)
  }

  return (
    <div className="container-fluid mt-4">
      <div className="card col-12 mb-4">
        <div className="card-header">
          <h4 className="mb-0 text-primary">{data.formName}</h4>
          <br />
          <h6 className="mb-2">{data.description}</h6>
          {data.lastDate && <h6 className="mb-0">Last Date : {data.lastDate}</h6>}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {FormTillNow.map((field) => {
              return (
                <>
                  {field.type === "select" ? (
                    <div key={field.name} className="mb-3">
                      <label className="form-label" htmlFor={field.name}>
                        {field.label}
                      </label>
                      <select
                        required={field.required}
                        type="select"
                        id={field.name}
                        name={field.name}
                        disabled={field?.readOnly || false}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="form-select select2"
                      >
                        <option value={""}>Choose</option>
                        {field.options?.map((elem) => {
                          return <option value={elem}>{elem}</option>;
                        })}
                      </select>
                    </div>
                  ) : (
                    <div key={field.name} className="mb-3">
                      <label className="form-label" htmlFor={field.name}>
                        {field.label}
                      </label>
                      <input
                        className="form-control"
                        required={field.required}
                        type={field.type}
                        disabled={field?.readOnly || false}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </>
              );
            })}
            <input type="submit" className="btn btn-primary" value={'Submit Response'}/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShowForm;
