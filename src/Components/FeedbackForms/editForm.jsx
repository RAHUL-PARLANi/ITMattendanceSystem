import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../axiosInstance";

const EditFeedBackForm = () => {
  const [FormTillNow, setFormTillNow] = useState([]);

  const [name, setName] = useState("");
  const [label, setLabel] = useState("");
  const [isRequired, setisRequired] = useState("");
  const [options, setOptions] = useState("");
  const [type, setType] = useState("");
  const [fieldId,setFieldId]=useState("");

  const [formName, setFormName] = useState("FORM TITLE HERE");
  const [lastDate, setLastDate] = useState("");
  const [desc, setDesc] = useState("FORM DESCIRPTION HERE");
  const [visibile, setVisibile] = useState("");
  const [toAll,setToAll]=useState("");  
  const [isOn,setIsOn]=useState(true);

  const [isLoading,setIsLoading]=useState(true);
  const axiosInstance = useAxiosInstance();

  const [batchDatas,setBatchDatas]=useState([]);

  useEffect(() => {
    axiosInstance.get('/feedbackForm/'+window.location.href.split('/').pop()).then(elem=>{
        setFormTillNow(elem.data.customFields)
        setFormName(elem.data.formName)
        setLastDate(elem.data.lastDate)
        setDesc(elem.data.description)
        setIsOn(elem.data.isOn)
        if(elem.data.visibile){
            setToAll('No')
            setVisibile(elem.data.visibile)
        }else{
            setToAll('Yes')
        }
    }).catch(err=>{alert('Something Went Wrong')})
    axiosInstance.get('/batch/all').then(res=>{
      setBatchDatas(res.data)
      setIsLoading(false)
    }).catch(err=>{
      alert('Something went wrong!')
      setIsLoading(false)
    })
  }, [])
  
  const handleFormFieldUpdate = (e) => {
    e.preventDefault();
    let Data = {
        formFieldId:fieldId,
        name: name,
        type: type,
        label: label,
        required: isRequired,
        options: options.split('|'),
    }
    axiosInstance.patch('/feedbackform/formField',Data).then(
      res=>{
          if(res.data.acknowledged){
            alert('Updated')
          }        
      }
    ).catch(err=>{
      console.log(err)
    })
  };

  const handleChange = (event) => {
    setFormTillNow({
      ...FormTillNow,
      [event.target.name]: event.target.value,
    });
  };
  
  const handleSubmit=()=>{
    var data={}
    visibile?
    data={
      formName: formName,
      lastDate: lastDate,
      description: desc,
      isOn: isOn,
      visibile: visibile,
      customFields: FormTillNow
    }:data={
      formName: formName,
      lastDate: lastDate,
      description: desc,
      isOn: isOn,
      customFields: FormTillNow  
    }
    axiosInstance.patch('/feedbackform/'+window.location.href.split('/').pop(),data)
    .then(res=>{
      alert(`${res.data.formName} is Edited Successfully !`)
    })
    .catch(err=>{
      console.log(err)
      alert('Something Went Wrong !')
    })
  }
  
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
    <div>
      <div className="container-xxl flex-grow-1 container-p-y" >
      
        <div className="card w-100 col-12 mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Edit Forms</h5>
          </div>
          <div className="card-body">
            <form onSubmit={(e)=>{
                e.preventDefault()
                handleSubmit()
            }}>
              <div className="mb-3">
                <label className="form-label" htmlFor="basic-default-fullname">
                  Form Name
                </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  id="basic-default-fullname"
                  value={formName}
                  onChange={(e) => {
                    setFormName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="basic-default-company">
                  Description
                </label>
                <textarea
                  type="text"
                  required
                  className="form-control"
                  id="basic-default-company"
                  value={desc}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="basic-default-phone">
                  Last Date
                </label>
                <input
                  type="date"
                  required
                  
                  id="basic-default-phone"
                  className="form-control phone-mask"
                  value={lastDate}
                  onChange={(e) => {
                    setLastDate(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="basic-default-message">
                  Is On ?
                </label>
                <select
                  required
                  id="basic-default-message"
                  className="form-select"
                  value={isOn}
                  onChange={(e) => {
                    setIsOn(e.target.value);
                  }}
                >
                  {" "}
                  <option value={true}>On</option>
                  <option value={false}>Off</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="basic-default-message">
                  Visible to All ?
                </label>
                <select
                  required
                  id="basic-default-message"
                  className="form-select select2"
                  value={toAll}
                  onChange={(e) => {
                    setToAll(e.target.value);
                  }}
                >
                  {" "}
                  <option value={""}>Choose</option>
                  <option value={'Yes'}>Yes</option>
                  <option value={"No"}>No</option>
                </select>
              </div>
              {toAll=="No" &&<div className="mb-3">
                <label className="form-label" htmlFor="basic-default-message">
                  Batch 
                </label>
                <select
                  required
                  id="basic-default-message"
                  className="form-select select2"
                  value={visibile}
                  onChange={(e) => {
                    setVisibile(e.target.value);
                  }}
                >
                  <option value={""}>Choose</option>
                  {batchDatas.map(elem=>{
                    return <option value={elem._id} key={elem._id}>{elem.name}</option>
                  })}
                </select>
              </div>}
              <button className="btn btn-primary">Edit This Form</button>
              </form>
            
          </div>
        </div>

        <div className="mt-3">
  {/* Button trigger modal */}
  {/* Modal */}
  <div className="modal fade" id="basicModal" tabIndex={-1} aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel1">
          Edit Field
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
        <form onSubmit={handleFormFieldUpdate}>
              <div className="mb-3">
                <label className="form-label" htmlFor="basic-default-fullname">
                  Column Name('Single Word Only')
                </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  id="basic-default-fullname"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="basic-default-company">
                  Label
                </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  id="basic-default-company"
                  value={label}
                  onChange={(e) => {
                    setLabel(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="basic-default-phone">
                  Type
                </label>
                <select
                  type="text"
                  required
                  id="basic-default-phone"
                  className="form-select select2 phone-mask"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <option value={""}>Choose</option>
                  <option value={"text"}>Text</option>
                  <option value={"select"}>Select</option>
                  <option value={"date"}>Date</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="basic-default-message">
                  Required
                </label>
                <select
                  required
                  id="basic-default-message"
                  className="form-select select2"
                  value={isRequired}
                  onChange={(e) => {
                    setisRequired(e.target.value);
                  }}
                >
                  {" "}
                  <option value={""}>Choose</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              {type=='select'&&<div className="mb-3">
                <label className="form-label" htmlFor="basic-default-message">
                  Options use "|" for multiple 
                </label>
                <textarea
                  required
                  id="basic-default-message"
                  className="form-control"
                  value={options}
                  onChange={(e) => {
                    setOptions(e.target.value);
                  }}
                />
              </div>}
              <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="submit" className="btn btn-primary">
            Save changes
          </button>
        </div>
        
        </form>       
        </div>
        
      </div>
    </div>
  </div>
        </div>
         

{/* 
        <div className="card col-12 mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Edit Field</h5>
          </div>
          <div className="card-body">
            <form onSubmit={addaField}>
              <div className="mb-3">
                <label className="form-label" htmlFor="basic-default-fullname">
                  Column Name('Single Word Only')
                </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  id="basic-default-fullname"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="basic-default-company">
                  Label
                </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  id="basic-default-company"
                  value={label}
                  onChange={(e) => {
                    setLabel(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="basic-default-phone">
                  Type
                </label>
                <select
                  type="text"
                  required
                  id="basic-default-phone"
                  className="form-select select2 phone-mask"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <option value={""}>Choose</option>
                  <option value={"text"}>Text</option>
                  <option value={"select"}>Select</option>
                  <option value={"date"}>Date</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="basic-default-message">
                  Required
                </label>
                <select
                  required
                  id="basic-default-message"
                  className="form-select select2"
                  value={isRequired}
                  onChange={(e) => {
                    setisRequired(e.target.value);
                  }}
                >
                  {" "}
                  <option value={""}>Choose</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              {type=='select'&&<div className="mb-3">
                <label className="form-label" htmlFor="basic-default-message">
                  Options use "|" for multiple 
                </label>
                <textarea
                  required
                  id="basic-default-message"
                  className="form-control"
                  value={options}
                  onChange={(e) => {
                    setOptions(e.target.value);
                  }}
                />
              </div>}
              

              <button type="submit" className="btn btn-primary">
                Edit
              </button>
            </form>
            
          </div>
        </div> */}

        <div className="card w-100 col-12 mb-4">
          <div className="card-header">
            <h4 className="mb-0">{formName}</h4>
            <br/>
            <h6 className="mb-2">{desc}</h6>
            {lastDate&&<h6 className="mb-0">Last Date : {lastDate}</h6>}
          </div>
          <div className="card-body">
          <form >
              
              {
              FormTillNow.map((field) => { return <>
                <div style={{display:'flex',justifyContent:'space-around',marginTop:'20px'}}>
                <button 
                type="button"
                className="btn btn-outline-primary btn-sm me-2"
                data-bs-toggle="modal"
                data-bs-target="#basicModal"
                onClick={(e)=>{
                    e.preventDefault();
                    setFieldId(field._id)
                    setName(field.name)
                    setLabel(field.label)
                    setisRequired(field.required)
                    setOptions(field.options)
                    setType(field.type)                  
                }} >    
                <i className='bx bx-edit-alt' ></i>
                </button> 
                {
                  field.type === "select" ? (
                    <div key={field._id} className="mb-3 col-10">
                      <label className="form-label" htmlFor={field.name}>
                        {field.label}
                      </label>
                      <select
                        required={field.required}
                        type="select"
                        id={field.name}
                        name={field.name}
                        disabled={field?.readOnly || false}
                        value={FormTillNow[field.name]}
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
                    <div key={field._id} className="mb-3 col-10">
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
                        value={FormTillNow[field.name]}
                        onChange={handleChange}
                      />
                    </div>
                  )
                }
               </div>
              </>
              })}
            </form>
        </div>
        </div>

      </div>
    </div>
  ); 
};

export default EditFeedBackForm;