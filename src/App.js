import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login } from "./features/user";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainLayout from "./Components/UnviersalComponents/MainLayout";
import CreateProfile from "./Components/Profile/CreateProfile";
import LoginPage from "./Components/Login/LoginPage";
import ShowAllUsers from "./Components/Batch/ShowAllUsers";
import EditProfile from "./Components/Profile/EditProfile";
import Dashboard from "./Components/Dashboard/Dashboard";
import CreateFeedBackForm from "./Components/FeedbackForms/createFeedBackForm";
import CreateBatch from "./Components/Batch/createBatch";
import ShowBatches from "./Components/Batch/showBatches";
import ShowBatch from "./Components/Batch/EditBatch";
import ShowALLFeedBackForms from "./Components/FeedbackForms/showALLFeedBackForms";
import ShowForm from "./Components/FeedbackForms/showForm";
import ShowFormData from "./Components/FeedbackForms/showFormData";
import EditFeedBackForm from "./Components/FeedbackForms/editForm";
import ShowRequests from "./Components/Request/ShowRequests";
import ShowAttendanceSheet from "./Components/AttendanceSheet/ShowAttendanceSheet";
import CreateAttendanceSheet from "./Components/AttendanceSheet/createAttendanceSheet";
import ShowAllAttendanceSheets from "./Components/AttendanceSheet/showAllAttendanceSheets";
import EditAttendanceSheet from "./Components/AttendanceSheet/editAttendanceSheet";
import FaceDetection from "./Components/FaceDetection/FaceDetection";
import MarkAttendanceSheet from "./Components/AttendanceSheet/markAttendanceSheet";
import UserMainLayout from "./Components/UserPanel/NavBar/MainLayout";
import UserLoginPage from "./Components/UserPanel/Login/UserLoginPage";
import Home from "./Components/UserPanel/Home/Home";
import BasePage from "./Components/UserPanel/Home/BasePage";
import ShowAllFormsUser from "./Components/UserPanel/FeedBackForms/showAllFormsUser";
import ShowAllAttendanceUser from "./Components/UserPanel/AttendanceSheet/showAllAttendanceUser";
import ShowAllBatchUser from "./Components/UserPanel/Batch/showAllBatchUser";
import ShowMails from "./Components/UserPanel/Mails/showMails";
import ShowAllCodes from "./Components/UserPanel/codes/showAllCodes";
import ShowAttendanceSheetUser from "./Components/UserPanel/AttendanceSheet/showAttendanceSheetUser";
import MarkAllAttendanceSheets from "./Components/AttendanceSheet/MarkAllAttendanceSheet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleStudentMarking from "./Components/AttendanceSheet/SingleStudentmarking";
import VerifyAttendanceSheet from "./Components/AttendanceSheet/verifyAttendanceSheet";
import CreateMod from "./Components/ModPanel/AdminPanel/createMod";
import ShowAllMods from "./Components/ModPanel/AdminPanel/showMods";
import ModHome from "./Components/ModPanel/UserPanel/Homepage";
import ModMainLayout from "./Components/ModPanel/UserPanel/ModMainLayout";
import ModLoginPage from "./Components/ModPanel/UserPanel/modLogin";
import ShowAllAttendanceSheetsMod from "./Components/ModPanel/UserPanel/showAllSheetMod";
import MarkAttendanceSheetMod from "./Components/ModPanel/UserPanel/markAttendanceSheet";
import VerifyAttendanceSheetMod from "./Components/ModPanel/UserPanel/verifyAttendanceSheet";
import SingleStudentMarkingMod from "./Components/ModPanel/UserPanel/SingleStudentmarking";
import ShowMail from "./Components/Mail/showMail";
import EditMail from "./Components/Mail/editMail";
import CreateMail from "./Components/Mail/createMail";
import ShowAllMail from "./Components/Mail/showAllMail";
import ShowMailUser from "./Components/UserPanel/Mails/showMail";
import { onMessageListener } from "./firebaseInit";

const App = () => {
  onMessageListener().then((payload) => {
    <Link to={payload.data.link}>{toast.info(`New Mail : `+payload.data.body)}</Link>
  });
  const dispatch = useDispatch();
  const isModVerified = useSelector(
    (state) => state.attendanceMod.value.isAuthenticated
  );
  let isAuthenticated = useSelector(
    (state) => state.users.value.isAuthenticated
  );
  let role = useSelector((state) => state.users.value.role);
  // console.log(useSelector((state) => state.users.value))

  console.log(isModVerified);
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BasePage />} />
          <Route
            path="/user/home"
            element={
              isAuthenticated ? (
                <UserMainLayout>
                  <Home />
                </UserMainLayout>
              ) : (
                <UserLoginPage />
              )
            }
          />
          <Route
            path="/user/profile"
            element={
              isAuthenticated ? (
                <UserMainLayout>
                  <CreateProfile />
                </UserMainLayout>
              ) : (
                <UserLoginPage />
              )
            }
          />

          <Route
            path="/user/showforms"
            element={
              isAuthenticated ? (
                <UserMainLayout>
                  <ShowAllFormsUser />
                </UserMainLayout>
              ) : (
                <UserLoginPage />
              )
            }
          />
          <Route
            path="/user/showForm/:id"
            element={
              isAuthenticated ? (
                <UserMainLayout>
                  <ShowForm />
                </UserMainLayout>
              ) : (
                <LoginPage />
              )
            }
          />

          <Route
            path="/user/showsheets"
            element={
              isAuthenticated ? (
                <UserMainLayout>
                  <ShowAllAttendanceUser />
                </UserMainLayout>
              ) : (
                <UserLoginPage />
              )
            }
          />
          <Route
            path="/user/showsheet/:id"
            element={
              isAuthenticated ? (
                <UserMainLayout>
                  <ShowAttendanceSheetUser />
                </UserMainLayout>
              ) : (
                <UserLoginPage />
              )
            }
          />

          <Route
            path="/user/batches"
            element={
              isAuthenticated ? (
                <UserMainLayout>
                  <ShowAllBatchUser />
                </UserMainLayout>
              ) : (
                <UserLoginPage />
              )
            }
          />
          <Route
            path="/user/mails"
            element={
              isAuthenticated ? (
                <UserMainLayout>
                  <ShowMails />
                </UserMainLayout>
              ) : (
                <UserLoginPage />
              )
            }
          />
          <Route
            path="/user/mail/:id"
            element={
              isAuthenticated ? (
                <UserMainLayout>
                  <ShowMailUser />
                </UserMainLayout>
              ) : (
                <UserLoginPage />
              )
            }
          />
          <Route
            path="/user/codes"
            element={
              isAuthenticated ? (
                <UserMainLayout>
                  <ShowAllCodes />
                </UserMainLayout>
              ) : (
                <UserLoginPage />
              )
            }
          />

          {/* Moderator Panel */}   

          <Route
            path="/mod"
            element={
              isAuthenticated && role==='MOD' ? (
                <ModMainLayout>
                  <ModHome />
                </ModMainLayout>
              ) : (
                <ModLoginPage />
              )
            }
          />
          <Route
            path="/moderator/showSheets"
            element={
              isAuthenticated && role==='MOD' ? (
                <ModMainLayout>
                  <ShowAllAttendanceSheetsMod />
                </ModMainLayout>
              ) : (
                <ModLoginPage />
              )
            }
          />
          <Route
            path="/moderator/profile"
            element={
              isAuthenticated && role==='MOD' ? (
                <ModMainLayout>
                  <CreateProfile />
                </ModMainLayout>
              ) : (
                <ModLoginPage />
              )
            }
          />
          <Route
            path="/moderator/markAttendance/:id"
            element={
              isAuthenticated && role == "MOD" ? (
                isModVerified ? (
                  <ModMainLayout>
                    <MarkAttendanceSheetMod />
                  </ModMainLayout>
                ) : (
                  <ModMainLayout>
                    <VerifyAttendanceSheetMod />
                  </ModMainLayout>
                )
              ) : (
                <ModLoginPage />
              )
            }
          />
          <Route
            path="/moderator/markSingleAttendance/:date/:sid/:id"
            element={
              isAuthenticated && role == "MOD" ? (
                isModVerified ? (
                  <ModMainLayout>
                    <SingleStudentMarkingMod />
                  </ModMainLayout>
                ) : (
                  <>
                    <ModMainLayout>
                      <VerifyAttendanceSheetMod />
                    </ModMainLayout>
                  </>
                )
              ) : (
                <ModLoginPage />
              )
            }
          />
          
         {/* Mail Box Routes */}
         <Route
            path="/showMail/:id"
            element={
              isAuthenticated && role == "ADMIN" ? (
                <MainLayout>
                  <ShowMail />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/editMail/:id"
            element={
              isAuthenticated && role == "ADMIN" ? (
                <MainLayout>
                  <EditMail />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/createMail"
            element={
              isAuthenticated && role == "ADMIN" ? (
                <MainLayout>
                  <CreateMail />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/showMails"
            element={
              isAuthenticated && role == "ADMIN" ? (
                <MainLayout>
                  <ShowAllMail />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />



          {/*Admin Routes Here */}

          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <MainLayout>
                  <CreateProfile />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/admin"
            element={
              isAuthenticated ? (
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/markAttendance/:id"
            element={
              isAuthenticated && role == "ADMIN" ? (
                isModVerified ? (
                  <MainLayout>
                    <MarkAttendanceSheet />
                  </MainLayout>
                ) : (
                  <MainLayout>
                    <VerifyAttendanceSheet />
                  </MainLayout>
                )
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/markSingleAttendance/:date/:sid/:id"
            element={
              isAuthenticated && role == "ADMIN" ? (
                isModVerified ? (
                  <MainLayout>
                    <SingleStudentMarking />
                  </MainLayout>
                ) : (
                  <>
                    <MainLayout>
                      <VerifyAttendanceSheet />
                    </MainLayout>
                  </>
                )
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/MarkAttendance"
            element={
              isAuthenticated && role == "ADMIN" ? (
                <MainLayout>
                  <MarkAllAttendanceSheets />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />

          {/*Attendance Sheets*/}
          <Route
            path="/showSheet/:id"
            element={
              isAuthenticated && role == "ADMIN" ? (
                <MainLayout>
                  <ShowAttendanceSheet />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/editSheet/:id"
            element={
              isAuthenticated && role == "ADMIN" ? (
                <MainLayout>
                  <EditAttendanceSheet />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/createSheet"
            element={
              isAuthenticated && role == "ADMIN" ? (
                <MainLayout>
                  <CreateAttendanceSheet />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/showSheets"
            element={
              isAuthenticated && role == "ADMIN" ? (
                <MainLayout>
                  <ShowAllAttendanceSheets />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />

          {/*User Routes */}
          <Route
            path="/showusers"
            element={
              isAuthenticated && role == "ADMIN" ? (
                <MainLayout>
                  <ShowAllUsers />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/requests"
            element={
              isAuthenticated && role == "ADMIN" ? (
                <MainLayout>
                  <ShowRequests />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/edituser/:id"
            element={
              isAuthenticated && role == "ADMIN" ? (
                <MainLayout>
                  <EditProfile />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />

         {/* Moderator*/} 
         <Route
            path="/createMod"
            element={
              isAuthenticated && role == "ADMIN" ? (
                <MainLayout>
                  <CreateMod />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/showAllMod"
            element={
              isAuthenticated && role == "ADMIN" ? (
                <MainLayout>
                  <ShowAllMods />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />

          {/*Form*/}
          <Route
            path="/createForm"
            element={
              isAuthenticated && role == "ADMIN" ? (
                <MainLayout>
                  <CreateFeedBackForm />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/showForm"
            element={
              isAuthenticated && role == "ADMIN" ? (
                <MainLayout>
                  <ShowALLFeedBackForms />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/showForm/:id"
            element={
              isAuthenticated ? (
                <MainLayout>
                  <ShowForm />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/editForm/:id"
            element={
              isAuthenticated && role == "ADMIN" ? (
                <MainLayout>
                  <EditFeedBackForm />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/showFormData/:id"
            element={
              isAuthenticated && role == "ADMIN" ? (
                <MainLayout>
                  <ShowFormData />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />

          {/*Batch Routes*/}
          <Route
            path="/createBatch"
            element={
              isAuthenticated && role == "ADMIN" ? (
                <MainLayout>
                  <CreateBatch />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/batch"
            element={
              isAuthenticated && role == "ADMIN" ? (
                <MainLayout>
                  <ShowBatches />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/batch/:id"
            element={
              isAuthenticated && role == "ADMIN" ? (
                <MainLayout>
                  <ShowBatch />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
