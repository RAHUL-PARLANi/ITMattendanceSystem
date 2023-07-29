import React, { useRef, useState } from "react";
import "./style.css";
import Teams from "../Components/Team/Teams";
import Testimonials from "../Components/Testimonials/Testimonials";
import Gallery from "../Components/Gallery/gallery";
import Solutions from "../Components/Solutions/Solutions";
import CompanyList from "../Components/CompanyList/CompanyList";
import { Link } from 'react-router-dom'

const BasePage = () => {
  const [primary, setprimary] = useState("#2124B1");
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const serviceRef = useRef(null);
  const galleryRef = useRef(null);
  const testimonialsRef = useRef(null);
  const teamRef = useRef(null);
  const recruitersRef = useRef(null);
  const contactUs = useRef(null);

  const executeScroll = (elemtRed) => elemtRed.current.scrollIntoView();
  return (
    <>
      <div className="container-xxl bg-white p-0">
        {/* Navbar & Hero Start */}
        <div className="container-xxl position-relative p-0">
          <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
            <a href="" className="navbar-brand p-0">
              <h1 className="m-0">
                <img
                  style={{ borderRadius: "50%" }}
                  src="ITM_LOGO.png"
                  alt="Logo"
                />{" "}
                ITM
              </h1>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span style={{ color: primary, fontWeight: "bold" }}>
                <i style={{ fontSize: "30px" }} className="bx bx-menu" />
              </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav text-white fw-bold ms-auto py-0">
                <a
                  onClick={() => executeScroll(homeRef)}
                  className="nav-item nav-link"
                >
                  Home
                </a>
                <a
                  onClick={() => executeScroll(aboutRef)}
                  className="nav-item nav-link"
                >
                  About
                </a>
                <a
                  onClick={() => executeScroll(serviceRef)}
                  className="nav-item nav-link"
                >
                  Service
                </a>
                <a
                  onClick={() => executeScroll(galleryRef)}
                  className="nav-item nav-link"
                >
                  Gallery
                </a>
                <a
                  onClick={() => executeScroll(testimonialsRef)}
                  className="nav-item nav-link"
                >
                  Testimonials
                </a>
                <a
                  onClick={() => executeScroll(teamRef)}
                  className="nav-item nav-link"
                >
                  Team
                </a>
                <a
                  onClick={() => executeScroll(recruitersRef)}
                  className="nav-item nav-link"
                >
                  Recruiters
                </a>
              </div>
              <Link to={'/user/home'}><button className="btn btn-primary text-white rounded-pill py-2 px-4 ms-lg-3">
                Get Started
              </button>
              </Link>
            </div>
          </nav>
          <div
            ref={homeRef}
            className="container-xxl py-5 hero-header mb-5"
            style={{ backgroundColor: primary }}
          >
            <div className="container my-5 py-5 px-lg-5">
              <div className="row g-5 py-5">
                <div className="col-lg-6 text-center text-lg-start">
                  <h1 className="text-white mb-4 animated zoomIn">
                    Welcome to ITM TAP Cell: Empowering Your Career Growth
                  </h1>
                  <p className="text-white pb-3 h6 animated zoomIn">
                    ITM TAP Cell: Your gateway to a thriving future. Access
                    training resources, attendance records, and feedback forms.
                    Stay updated with upcoming events and placements. Join ITM's
                    premier Training and Placement Portal for enhanced career
                    opportunities.
                  </p>
                  <Link
                    to='/user/home'
                    className="btn btn-light py-sm-3 px-sm-5 rounded-pill me-3 animated slideInLeft"
                  >
                    Get Started
                  </Link>
                  <button
                    onClick={() => executeScroll(contactUs)}
                    className="btn btn-outline-light py-sm-3 px-sm-5 rounded-pill animated slideInRight"
                  >
                    Contact Us
                  </button>
                </div>
                <div className="col-lg-6 text-center text-lg-start">
                  <img
                    className="img-fluid"
                    style={{ maxHeight: "350px" }}
                    src="https://res.cloudinary.com/dvg9z8ugk/image/upload/v1689967020/vecteezy_isometric-flat-illustration-concept-courses-and-online_-removebg-preview_mdkdlx.png"
                    alt="Hero-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Navbar & Hero End */}

        {/* About Start */}
        <div className="container-xxl py-5" ref={aboutRef}>
          <div className="container px-lg-5">
            <div className="row g-5">
              <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                <div className="section-title position-relative mb-4 pb-2">
                  <h6
                    style={{ color: primary }}
                    className="position-relative ps-4"
                  >
                    About Us
                  </h6>
                  <h2 className="mt-2" style={{ color: "black" }}>
                    ITM TAP Cell: Forging Pathways to Career Success
                  </h2>
                </div>
                <p className="mb-4 h6">
                  ITM Gwalior has always given training, augmentation and
                  placements an utmost priority and to implement it into action
                  an exclusive training, augmentation and placement assistance
                  cell (TAP) has been established with state–of-art facilities.
                  The cell is headed by experienced professionals from Industry.
                  <div className="mt-2" />
                  We bridge the gap between student skills and industry demands
                  through comprehensive workshops and recruitment training. Our
                  relentless commitment to achieving 100% placements drives us
                  to collaborate with top HR teams and provide personalized
                  counseling, ensuring students seize the best opportunities for
                  vigorous career growth.
                </p>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <h6 style={{ color: "black" }} className="mb-3 fw-bold">
                      <i
                        style={{
                          color: primary,
                          fontSize: "25px",
                          fontWeight: 900,
                        }}
                        className="bx bx-check fw-bold me-2"
                      />
                      Empowerment Through Training
                    </h6>
                    <h6 style={{ color: "black" }} className="mb-0 fw-bold">
                      <i
                        style={{
                          color: primary,
                          fontWeight: 900,
                          fontSize: "25px",
                        }}
                        className="bx bx-check fw-bold me-2"
                      />
                      Bridging Skill-Industry Gap
                    </h6>
                  </div>
                  <div className="col-sm-6">
                    <h6 className="mb-3 fw-bold" style={{ color: "black" }}>
                      <i
                        style={{
                          color: primary,
                          fontWeight: 90,
                          fontSize: "25px",
                        }}
                        className="bx bx-check fw-bold me-2"
                      />
                      100% Placement Commitment
                    </h6>
                    <h6 style={{ color: "black" }} className="mb-0 fw-bold">
                      <i
                        style={{
                          color: primary,
                          fontWeight: 900,
                          fontSize: "25px",
                        }}
                        className="bx bx-check fw-bold me-2"
                      />
                      Collaborative Excellence
                    </h6>
                  </div>
                </div>
                <div className="d-flex align-items-center mt-4">
                  <a 
                    style={{color:primary,border:`1px solid ${primary}`}}
                    className="btn btn-square me-3"
                    href="https://www.itmgoi.in" target="_blank"
                  >
                    <i className="bx bx-globe" />
                  </a>
                  <a
                  
                  style={{color:primary,border:`1px solid ${primary}`}}
                  className="btn btn-square me-3"
                    href="https://www.linkedin.com/school/itm-gwalior-cp/"
                  >
                    <i className="bx bxl-linkedin"></i>
                  </a>
                  <a
                    style={{color:primary,border:`1px solid ${primary}`}}
                    className="btn btn-square me-3"
                    href="https://www.facebook.com/ITMGOIGWALIOR/"
                  >
                    <i className="bx bxl-facebook"></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-6">
                <img
                  className="img-fluid wow zoomIn"
                  data-wow-delay="0.5s"
                  src="https://res.cloudinary.com/dvg9z8ugk/image/upload/v1689971252/My_project_chtxqt.png"
                />
              </div>
            </div>
          </div>
        </div>
        {/* About End */}

        {/* Service Start */}
        <div ref={serviceRef} className="container-xxl py-5">
          <div className="container px-lg-5">
            <div
              className="section-title position-relative text-center mb-5 pb-2 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <h6
                style={{ color: primary }}
                className="position-relative d-inline fw-bold ps-4"
              >
                Our Services
              </h6>
              <h2 className="mt-2" style={{ color: "black" }}>
                What Solutions We Provide
              </h2>
            </div>
            <Solutions />
          </div>
        </div>
        {/* Service End */}

        {/* Gallery Start */}
        <div ref={galleryRef} className="container-xxl py-5">
          <div className="container px-lg-5">
            <div
              className="section-title position-relative text-center mb-5 pb-2 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <h6
                style={{ color: primary, fontWeight: 900 }}
                className="position-relative d-inline  ps-4"
              >
                Our Gallery
              </h6>
              <h2 className="mt-2 " style={{ color: "black" }}>
                Recent Activities
              </h2>
            </div>
            <Gallery />
          </div>
        </div>
        {/* Gallery End */}

        {/* Testimonial Start */}
        <div
          ref={testimonialsRef}
          class="container-xxl wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <div
            className="section-title position-relative mt-5 text-center pb-2 wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <h6
              style={{ color: primary }}
              className="position-relative d-inline fw-bold ps-4"
            >
              Our Testimonials
            </h6>
            <h2 className="mt-2" style={{ color: "black" }}>
              What Industry Speaks of ITM Gwalior
            </h2>
          </div>
          <div className="container-xxl">
            <Testimonials colour={primary} />
          </div>
        </div>
        {/* Testimonial End */}

        {/* Team Start */}
        <div ref={teamRef} className="container-xxl py-5">
          <div className="container px-lg-5">
            <div
              className="section-title position-relative text-center mb-5 pb-2 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <h6
                style={{ color: primary }}
                className="position-relative d-inline ps-4"
              >
                Our Team
              </h6>
              <h2 style={{ color: "black" }} className="mt-2">
                Meet Our Team Members
              </h2>
            </div>
            <Teams colour={primary} />
          </div>
        </div>
        {/* Team End */}

        {/*Companies List Start*/}
        <div ref={recruitersRef} className="container-xxl py-5">
          <div className="container px-lg-5">
            <div
              className="section-title position-relative text-center mb-5 pb-2 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <h6
                style={{ color: primary }}
                className="position-relative d-inline ps-4"
              >
                Our Major Recruiters
              </h6>
              <h2 style={{ color: "black" }} className="mt-2">
                Major Recruiters Drive
              </h2>
            </div>
            <CompanyList />
          </div>
        </div>
        {/*Companies List End*/}

        {/* Footer Start */}
        <div
          className="container-fluid  text-light footer mt-5 pt-5 wow fadeIn"
          data-wow-delay="0.1s"
          style={{ backgroundColor: primary }}
        >
          <div className="container py-5 px-lg-5">
            <div
              className="row g-5"
              style={{ justifyContent: "space-between" }}
            >
              <div className="col-md-6 col-lg-3">
                <h5 className="text-white mb-4">Get In Touch</h5>
                <p>
                  <a
                    href="https://www.google.com/maps/place/ITM+Gwalior/@26.147408,78.1880256,15z/data=!4m6!3m5!1s0x3976c4964532abdd:0xe71fa0450b77e0a5!8m2!3d26.147408!4d78.1880256!16s%2Fg%2F11b807ywkr?entry=ttu"
                    className="text-white d-flex"
                  >
                    <i className="bx bx-current-location me-2 mt-2"></i>
                    <div>
                      ITM Campus,
                      <br />
                      Opp. Sithouli Railway Station,
                      <br />
                      NH-75 Sithouli, Jhansi Road,
                      <br />
                      Gwalior - 475001, ( M.P. ), INDIA
                    </div>
                  </a>
                </p>
                <p className="text-white mt-2">
                  <a className="text-white" href="tel:+91-751-2440058">
                    <i className="bx bxs-phone-call me-2"></i>
                    +91-751-2440058
                  </a>
                </p>
                <p className="text-white mt-2">
                  <a className="text-white" href="mailTo:admission@itmgoi.in">
                    <i className="bx bxs-envelope me-2"></i>
                    admission@itmgoi.in
                  </a>
                </p>
                <div className="d-flex pt-2">
                  <a
                    className="btn btn-outline-primary btn-square me-3 text-white"
                    href="https://www.itmgoi.in"
                  >
                    <i className="bx bx-globe" />
                  </a>
                  <a
                    className="btn btn-outline-primary btn-square me-3 text-white"
                    href="https://www.linkedin.com/in/tap-cell-661019213/"
                  >
                    <i className="bx bxl-linkedin"></i>
                  </a>
                  <a
                    className="btn btn-outline-primary btn-square me-3 text-white"
                    href="https://www.facebook.com/ITMGOIGWALIOR/"
                  >
                    <i className="bx bxl-facebook"></i>
                  </a>
                </div>
              </div>

              <div className="col-md-6 col-lg-3" ref={contactUs}>
                <h5 className="text-white mb-4">Contact Us</h5>
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="">
                        <input
                          style={{ height: 50 }}
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Your Name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="">
                        <input
                          style={{ height: 50 }}
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Your Email"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="">
                        <input
                          style={{ height: 50 }}
                          type="text"
                          className="form-control"
                          id="subject"
                          placeholder="Subject"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="">
                        <textarea
                          className="form-control"
                          placeholder="Leave a message here"
                          id="message"
                          style={{ height: 100 }}
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-50 py-1"
                        type="submit"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="col-md-6 col-lg-3">
                <h5 className="text-white mb-4">Disclaimer</h5>
                <p className="text-white ">
                  This portal is owned and maintained by{" "}
                  <span style={{ fontWeight: 600 }}>
                    ITM Gwalior's Training and Placement (TAP) Cell
                  </span>
                  , with the vision to empower students with industry-relevant
                  skills and career opportunities.<div className="mt-1"></div>
                  The portal serves as a dedicated platform to provide seamless
                  access to career guidance, training resources, campus
                  placements, important study materials, and timely notices.
                </p>
              </div>
            </div>
          </div>
          <div className="container px-lg-5">
            <div className="copyright">
              <div className="row">
                <div className="col-md-6 h6 fw-bold text-white text-center text-md-start mb-3 mb-md-0">
                  © 2023{" "}
                  <a className="border-bottom" href="#">
                    ITM Gwalior
                  </a>
                  , All Right Reserved.
                  {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
                </div>
                <div className="col-md-6  text-center text-md-end">
                  <small className="footer-menu  text-white">
                    Developed By{" "}
                    <a
                      className="border-bottom"
                      href="https://www.linkedin.com/in/rahul-parlani-b02a0a226/"
                    >
                      Rahul Parlani 
                    </a>
                    {" "}(ITM Student)
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer End */}

        {/* Back to Top */}
        <a
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            height: "40px",
            width: "40px",
          }}
          className="btn btn-square btn-dark back-to-top pt-2"
        >
          <i class="bx bx-up-arrow-alt" style={{ fontSize: "25px" }}></i>
        </a>
      </div>
    </>
  );
};

export default BasePage;
