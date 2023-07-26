import React, { useEffect, useState } from "react";
import useAxiosInstance from "../../axiosInstance";

const CreateFeedBackForm = () => {
  const [FormTillNow, setFormTillNow] = useState([
    {
      name: "name",
      label: "Name(Block Letter)",
      type: "text",
      required: true,
      readOnly:true
    },
    {
      name: "fatherName",
      label: "Father Name(Block Letter)",
      type: "text",
      required: true,
      readOnly:true
    },
    {
      name: "rollNo",
      label: "Roll Number",
      type: "text",
      required: true,
      readOnly:true
    },
    {
      name: "WorkingEmailId",
      label: "Working Email",
      type: "text",
      readOnly:true,
      required: "true",
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "text",
      required: true,
      readOnly:true
    },
    {
      name: "branch",
      label: "Branch",
      type: "select",
      options: ["MBA", "CS", "IT", "CIVIL", "MECHANICAL", "MCA", "EC", "EE"],
      required: true,
      readOnly:true
    },
    {
      name: "batch",
      label: "Batch",
      type: "text",
      options: ["CS-A", "CS-B", "CS-C", "CS-D", "IT-A", "IT-B", "Others"],
      required: true,
      readOnly:true
    },
    {
      name: "dateOfBirth",
      label: "Date Of Birth",
      type: "date",
      required: true,
      readOnly:true
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options:['MALE',"FEMALE",'OTHERS'],
      required: true,
      readOnly:true
    }
  ]);

  const [name, setName] = useState("");
  const [label, setLabel] = useState("");
  const [isRequired, setisRequired] = useState("");
  const [options, setOptions] = useState("");
  const [type, setType] = useState("");

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
    axiosInstance.get('/batch/all').then(res=>{
      setBatchDatas(res.data)
      setIsLoading(false)
    }).catch(err=>{
      alert('Something went wrong!')
      setIsLoading(false)
    })
  }, [])
  
  const addaField = (e) => {
    e.preventDefault();
    let Data = {};
    if (type == "select") {
      Data = {
        name: name,
        type: type,
        label: label,
        required: isRequired,
        options: options.split("|"),
      };
    } else {
      Data = {
        name: name,
        type: type,
        label: label,
        required: isRequired,
      };
    }
    setFormTillNow((prevState) => [...prevState, Data]);
    setName("")
    setType("")
    setLabel("")
    setisRequired("")
    setOptions([])
  };

  useEffect(() => {
    console.log(FormTillNow)
  }, [FormTillNow])
  
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
    axiosInstance.post('/feedbackform/',data)
    .then(res=>{
      alert(`${res.data.formName} is Created Successfully !`)
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
      <div className="container-xxl flex-grow-1 container-p-y mt-4" >
      
        <div className="card w-100 rounded shadow-sm col-12 mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Create Forms</h5>
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
              <button className="btn btn-primary">Publish This Form</button>
              </form>
            
          </div>
        </div>

        <div className="card w-100 rounded shadow-sm col-12 mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Create Fields</h5>
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
                Add
              </button>
            </form>
            
          </div>
        </div>

        <div className="card w-100 rounded shadow-sm col-12 mb-4">
          <div className="card-header">
            <h4 className="mb-0">{formName}</h4>
            <br/>
            <h6 className="mb-2">{desc}</h6>
            {lastDate&&<h6 className="mb-0">Last Date : {lastDate}</h6>}
          </div>
          <div className="card-body">
          <form >
              {FormTillNow.map((field) => { return <>
                {
                  field.type === "select" ? (
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
                        value={FormTillNow[field.name]}
                        onChange={handleChange}
                      />
                    </div>
                  )
                }
               
              </>
              })}
            </form>
        </div>
        </div>

      </div>
    </div>
  ); 
};

export default CreateFeedBackForm;
