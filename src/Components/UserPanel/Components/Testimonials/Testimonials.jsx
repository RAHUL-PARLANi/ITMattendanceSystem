import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "./testimonial.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.js";
import { TestimonialsData } from './TestimonialsData'
import TestimonialsComponent from "./TestimonialsComponent";

const Testimonials = () => {
  const sliderRef = useRef(null);
  const [primary, setprimary] = useState("#6610f2");
  useEffect(() => {
    // Initialize the Slick slider inside the useEffect hook
    if (sliderRef.current) {
      $(sliderRef.current).slick({
        dots: true,
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    }

    // Clean up and destroy the Slick slider when the component unmounts
    return () => {
      if (sliderRef.current) {
        $(sliderRef.current).slick("unslick");
      }
    };
  }, []); 
 
  return (
    <div ref={sliderRef} className="items" style={{ height: "450px" }}>
      {TestimonialsData.map((res) => {
        return <TestimonialsComponent data={res} colour={primary} />
      })}
    </div>
  );
};

export default Testimonials;