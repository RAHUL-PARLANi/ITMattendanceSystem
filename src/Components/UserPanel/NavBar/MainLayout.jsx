import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/user";
import { NavLink, Link } from "react-router-dom";

const UserMainLayout = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.value);

  return (
    <div>
      <>
        {/* Layout wrapper */}
        <div className="layout-wrapper layout-content-navbar">
          <div id="MobileNav" className="layout-container ">
            {/*layout-menu-expanded*/}
            {/* Menu */}
            <aside
              id="layout-menu"
              className={`layout-menu menu-vertical menu bg-menu-theme`}
            >
              <div style={{ overflowY: "scroll", height: "100%" }}>
                <div className="app-brand demo">
                  <Link to="/" className="app-brand-link">
                    {/* <span className="app-brand-logo demo ">
              <img height={'25px'} src='ITM_LOGO.png' alt='Logo' />
            </span> */}
                    <span
                      style={{ textTransform: "uppercase" }}
                      className="app-brand-text demo menu-text fw-bolder text-primary ms-2"
                    >
                      ITM
                    </span>
                  </Link>

                  <a
                    onClick={() => {
                      document
                        .getElementById("MobileNav")
                        .classList.remove("layout-menu-expanded");
                      document
                        .getElementById("MobileNav")
                        .classList.remove("menu-open");
                    }}
                    className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
                  >
                    <i className="bx bx-chevron-left bx-sm align-middle" />
                  </a>
                </div>
                <div className="menu-inner-shadow" />
                <ul className="menu-inner py-1">
                  {/* Dashboard */}

                  <NavLink
                    exact="true"
                    to="/user/home"
                    activeClassName="active"
                    className="menu-item"
                  >
                    <a className="menu-link">
                      <i className="menu-icon tf-icons bx bx-home-circle" />
                      <div data-i18n="Analytics">Home</div>
                    </a>
                  </NavLink>
                  {/* Layouts */}
                  <NavLink
                    to={"/user/showforms"}
                    activeClassName="active"
                    className="menu-item"
                  >
                    <a className="menu-link menu-toggle">
                      <i className="menu-icon tf-icons bx bx-envelope-open" />
                      <div data-i18n="Boxicons">Feedback Forms</div>
                    </a>
                  </NavLink>
                  {/* Forms */}
                  <NavLink
                    to="/user/showSheets"
                    activeClassName="active"
                    className="menu-item"
                  >
                    <a className="menu-link menu-toggle">
                      <i className="menu-icon tf-icons bx bx-comment-edit" />
                      <div data-i18n="Form Elements">Attendance</div>
                    </a>
                  </NavLink>
                  <NavLink
                    to={"/user/batches"}
                    activeClassName="active"
                    className="menu-item"
                  >
                    <a className="menu-link menu-toggle">
                      <i className="menu-icon tf-icons bx bx-label" />
                      <div data-i18n="Form Layouts">Batches</div>
                    </a>
                  </NavLink>

                  <NavLink
                    to={"/user/studyMaterials"}
                    activeClassName="active"
                    className="menu-item"
                  >
                    <a className="menu-link menu-toggle">
                      <i className="menu-icon tf-icons bx bx-book-open" />
                      <div data-i18n="Form Layouts">Study Materials</div>
                    </a>
                  </NavLink>

                  <NavLink
                    to={"/user/Notices"}
                    activeClassName="active"
                    className="menu-item"
                  >
                    <a className="menu-link menu-toggle">
                      <i className="menu-icon tf-icons bx bx-info-square" />
                      <div data-i18n="Form Layouts">Notice</div>
                    </a>
                  </NavLink>
                </ul>
              </div>
            </aside>
            {/* / Menu */}
            {/* Layout container */}
            <div className="layout-page">
              {/* Navbar */}
              <nav
                className="layout-navbar  shadow-sm container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
                id="layout-navbar"
              >
                <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                  <a
                    onClick={() => {
                      document
                        .getElementById("MobileNav")
                        .classList.add("layout-menu-expanded");
                      document
                        .getElementById("MobileNav")
                        .classList.add("menu-open");
                    }}
                    className="nav-item nav-link px-0 me-xl-4"
                  >
                    <i className="bx bx-menu bx-sm" />
                  </a>
                </div>
                <div
                  className="navbar-nav-right  d-flex align-items-center"
                  id="navbar-collapse"
                >
                  <span className='app-brand-text h4 menu-text fw-bold mb-0'>
                    ITM TAP Cell Portal 
                  </span>
                  <ul className="navbar-nav flex-row align-items-center ms-auto">
                    {/* User */}
                    <li className="nav-item navbar-dropdown dropdown-user dropdown">
                      <a
                        className="nav-link dropdown-toggle hide-arrow"
                        data-bs-toggle="dropdown"
                      >
                        <div className="avatar avatar-online">
                          <img
                            src="../assets/img/avatars/1.png"
                            alt=""
                            className="w-px-40 h-auto rounded-circle"
                          />
                        </div>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <a className="dropdown-item">
                            <div className="d-flex">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar avatar-online">
                                  <img
                                    src="../assets/img/avatars/1.png"
                                    alt=""
                                    className="w-px-40 h-auto rounded-circle"
                                  />
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <span className="fw-semibold d-block">
                                  {userData.username}
                                </span>
                                <small className="text-muted">
                                  {userData.role}
                                </small>
                              </div>
                            </div>
                          </a>
                        </li>
                        <li>
                          <div className="dropdown-divider" />
                        </li>
                        <Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to={"/user/profile"}
                        >
                          <li>
                            <a className="dropdown-item">
                              <i className="bx bx-user me-2" />
                              <span className="align-middle">My Profile</span>
                            </a>
                          </li>
                        </Link>
                        <li>
                          <div className="dropdown-divider" />
                        </li>
                        <li>
                          <a className="dropdown-item">
                            <i className="bx bx-power-off me-2" />
                            <span
                              onClick={() => {
                                dispatch(logout());
                              }}
                              className="align-middle"
                            >
                              Log Out
                            </span>
                          </a>
                        </li>
                      </ul>
                    </li>
                    {/*/ User */}
                  </ul>
                </div>
              </nav>
              {/* / Navbar */}
              {/* Content wrapper */}
              <div className="content-wrapper">
                {/* Content */}
                {props.children}
                {/* / Content */}
                {/* Footer */}
                <footer className="content-footer footer bg-footer-theme">
                  <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                    <div className="mb-2 mb-md-0 text-left">
                      Copyright © 2023 <b>ITM Gwalior®</b>. All rights reserved.
                    </div>
                    <small>
                      Developed by{" "}
                      <a
                        style={{ color: "inherit" }}
                        target="_blank"
                        href="https://www.linkedin.com/in/rahul-parlani-b02a0a226/"
                      >
                        <b>Rahul Parlani</b>
                      </a>
                    </small>
                  </div>
                </footer>
                {/* / Footer */}
                <div className="content-backdrop fade" />
              </div>
              {/* Content wrapper */}
            </div>
            {/* / Layout page */}
          </div>
          {/* Overlay */}
          <div className="layout-overlay layout-menu-toggle" />
        </div>
      </>
    </div>
  );
};

export default UserMainLayout;