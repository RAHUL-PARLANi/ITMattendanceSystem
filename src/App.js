import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login } from "./features/user";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from './Components/UnviersalComponents/MainLayout';
import CreateProfile from './Components/Profile/CreateProfile';
import LoginPage from './Components/Login/LoginPage';
import ShowAllUsers from './Components/Batch/ShowAllUsers';
import EditProfile from './Components/Profile/EditProfile';
import Dashboard from './Components/Dashboard/Dashboard';
import CreateFeedBackForm from './Components/FeedbackForms/createFeedBackForm';
import CreateBatch from './Components/Batch/createBatch';
import ShowBatches from './Components/Batch/showBatches';
import ShowBatch from './Components/Batch/EditBatch';
import ShowALLFeedBackForms from './Components/FeedbackForms/showALLFeedBackForms';
import ShowForm from './Components/FeedbackForms/showForm';
import ShowFormData from './Components/FeedbackForms/showFormData';
import EditFeedBackForm from './Components/FeedbackForms/editForm';
import ShowRequests from './Components/Request/ShowRequests';
import ShowAttendanceSheet from './Components/AttendanceSheet/ShowAttendanceSheet';
import CreateAttendanceSheet from './Components/AttendanceSheet/createAttendanceSheet';
import ShowAllAttendanceSheets from './Components/AttendanceSheet/showAllAttendanceSheets';
import EditAttendanceSheet from './Components/AttendanceSheet/editAttendanceSheet';
import FaceDetection from './Components/FaceDetection/FaceDetection';


const App = () => {
  const dispatch = useDispatch();
  let isAuthenticated = useSelector(
    (state) => state.users.value.isAuthenticated
  );
  let role = useSelector((state) => state.users.value.role);
  useEffect(() => {
   // if (localStorage.getItem("user")) {
   //   const data = JSON.parse(localStorage.getItem("user"));
   //   console.log(data);
   //   dispatch(
   //     login({
   //       username: data.username,
   //       tokin: data.tokin,
   //       role: data.role,
   //       id: data.id,
   //       verified:data.verified,
   //       isSuccessFullyRegistered:data.isSuccessFullyRegistered
   //     })
   //   );
   // }
  }, []);
 
  return (
    <>
        <BrowserRouter>
            <Routes>
              {/* <Route path='/' element={<LoginPage/>}/>*/}
              <Route path='/profile' element={isAuthenticated ?<MainLayout><CreateProfile/></MainLayout>:<LoginPage/>}/>
              <Route path="/" element={ isAuthenticated? <MainLayout><Dashboard/></MainLayout> : <LoginPage/>} />
              <Route path="/test" element={ <FaceDetection/>} />
              

              {/*Attendance Sheets*/}
              <Route path="/showSheet/:id" element={isAuthenticated && role=='ADMIN'? <MainLayout><ShowAttendanceSheet/></MainLayout>:<LoginPage/>}/>
              <Route path="/editSheet/:id" element={isAuthenticated && role=='ADMIN'? <MainLayout><EditAttendanceSheet/></MainLayout>:<LoginPage/>}/>
              <Route path='/createSheet' element={isAuthenticated && role=='ADMIN'? <MainLayout><CreateAttendanceSheet/></MainLayout>:<LoginPage/>} />
              <Route path="/showSheets" element={isAuthenticated && role=='ADMIN'? <MainLayout><ShowAllAttendanceSheets/></MainLayout>:<LoginPage/>}/>
              

              {/*User Routes */}
              <Route path="/showusers" element={ isAuthenticated && role=='ADMIN'? <MainLayout><ShowAllUsers/></MainLayout> : <LoginPage/>} />
              <Route path="/requests" element={ isAuthenticated && role=='ADMIN'? <MainLayout><ShowRequests/></MainLayout> : <LoginPage/>} />
              <Route path="/edituser/:id" element={ isAuthenticated && role=='ADMIN'? <MainLayout><EditProfile/></MainLayout> : <LoginPage/>} />
              
              {/*Form*/}
              <Route path="/createForm" element={ isAuthenticated && role=='ADMIN'? <MainLayout><CreateFeedBackForm/></MainLayout> : <LoginPage/>} />
              <Route path="/showForm" element={ isAuthenticated && role=='ADMIN'? <MainLayout><ShowALLFeedBackForms/></MainLayout> : <LoginPage/>} />
              <Route path="/showForm/:id" element={ isAuthenticated ? <MainLayout><ShowForm/></MainLayout> : <LoginPage/>} />
              <Route path="/editForm/:id" element={ isAuthenticated && role=='ADMIN'? <MainLayout><EditFeedBackForm/></MainLayout> : <LoginPage/>} />
              <Route path="/showFormData/:id" element={ isAuthenticated && role=='ADMIN'? <MainLayout><ShowFormData/></MainLayout> : <LoginPage/>} />
              
              {/*Batch Routes*/}
              <Route path="/createBatch" element={ isAuthenticated && role=='ADMIN'? <MainLayout><CreateBatch/></MainLayout> : <LoginPage/>} />
              <Route path="/batch" element={ isAuthenticated && role=='ADMIN'? <MainLayout><ShowBatches/></MainLayout> : <LoginPage/>} />
              <Route path="/batch/:id" element={ isAuthenticated && role=='ADMIN'? <MainLayout><ShowBatch/></MainLayout> : <LoginPage/>} />
            </Routes>
        </BrowserRouter>
      </>
  );
};

export default App;