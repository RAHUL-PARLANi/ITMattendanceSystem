import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/user";
import { NavLink, Link } from "react-router-dom";

const CMLayout = (props) => {
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
              <div
                style={{ position: "fixed", height: "90vh", width: "250px" }}
              >
                <div className="app-brand demo">
                  <Link to="/cm" className="app-brand-link">
                    <span className="app-brand-logo demo ">
              <img height={'50px'} src='ITM_LOGO.png' alt='Logo' />
            </span>
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
                <ul className="menu-inner py-1 " style={{ overflowY: "auto" }}>
                  {/* Dashboard */}

                  <NavLink
                    exact="true"
                    to="/cm"
                    activeClassName="active"
                    className="menu-item"
                  >
                    <a className="menu-link">
                      <i className="menu-icon tf-icons bx bx-home-circle" />
                      <div data-i18n="Analytics">Dashboard</div>
                    </a>
                  </NavLink>

                  <NavLink
                    to="/ShowTeam"
                    activeClassName="active"
                    className="menu-item"
                  >
                    <a className="menu-link">
                      <i className="menu-icon tf-icons bx bx-group" />
                      <div data-i18n="Analytics">Team</div>
                    </a>
                  </NavLink>

                  <NavLink
                    to="/ShowSolution"
                    activeClassName="active"
                    className="menu-item"
                  >
                    <a className="menu-link">
                      <i className="menu-icon tf-icons bx bx-palette" />
                      <div data-i18n="Analytics">Solution</div>
                    </a>
                  </NavLink>


                  {/* Layouts */}
                  <li className="menu-header small text-uppercase">
                    <span className="menu-header-text fw-bold">Gallery</span>
                  </li>
                  {/* Cards */}
                  <NavLink
                    to={"/showGallery"}
                    activeClassName="active"
                    className="menu-item"
                  >
                    <a className="menu-link menu-toggle">
                      <i className="menu-icon tf-icons bx bx-dock-top" />
                      <div data-i18n="Boxicons">Show Gallery</div>
                    </a>
                  </NavLink>
                  <NavLink
                    activeClassName="active"
                    to={"/createGallery"}
                    className="menu-item"
                  >
                    <a className="menu-link menu-toggle">
                      <i className="menu-icon tf-icons bx bx-images" />
                      <div data-i18n="Basic">Create Gallery</div>
                    </a>
                  </NavLink>

                  {/* Testimonials*/}
                  <li className="menu-header small text-uppercase">
                    <span className="menu-header-text fw-bold">
                      Testimonials
                    </span>
                  </li>
                  {/* Cards */}
                  <NavLink
                    to={"/showTestimonial"}
                    activeClassName="active"
                    className="menu-item"
                  >
                    <a className="menu-link menu-toggle">
                      <i className="menu-icon tf-icons bx bx-dock-top" />
                      <div data-i18n="Boxicons">Show Testimonial</div>
                    </a>
                  </NavLink>
                  <NavLink
                    activeClassName="active"
                    to={"/createTestimonial"}
                    className="menu-item"
                  >
                    <a className="menu-link menu-toggle">
                      <i className="menu-icon tf-icons bx bxs-quote-left" />
                      <div data-i18n="Basic">Create Testimonial</div>
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
                className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
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
                  className="navbar-nav-right d-flex align-items-center"
                  id="navbar-collapse"
                >
                  <span className='className="app-brand-text demo menu-text fw-bolder '>
                    TAP Cell's OFFICIAL SYSTEM
                  </span>
                  <ul className="navbar-nav flex-row align-items-center ms-auto">
                    {/* User */}
                    <li className="nav-item navbar-dropdown dropdown-user dropdown">
                      <a
                        className="nav-link dropdown-toggle hide-arrow"
                        data-bs-toggle="dropdown"
                      >
                        <div
                          style={{ display: "flex", alignItems: "center" }}
                          className="avatar avatar-online"
                        >
                          <img
                            src={userData.picUrl}
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
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                  className="avatar avatar-online"
                                >
                                  <img
                                    src={userData.picUrl}
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
                          to={"/profile"}
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
                        <b>Rahul Parlani </b>(ITM Student CS'24)
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

export default CMLayout;
