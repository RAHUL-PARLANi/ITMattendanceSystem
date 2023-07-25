import React, { useState } from "react";
import GalleryComponent from "./galleryComponent";
import { GalleryData } from "./galleryData";

const Gallery = (props) => {
  const [filter , setFilter] = useState("placements")
  return (
    <div>
      <div className="row mt-n2 wow fadeInUp" data-wow-delay="0.1s">
              <div className="col-12 text-center">
                <ul className="list-inline mb-5" id="portfolio-flters">
                  <li
                    className={
                      filter === "placements"
                        ? "btn px-3 pe-4 active"
                        : "btn px-3 pe-4"
                    }
                    onClick={() => setFilter("placements")}
                  >
                    Placements
                  </li>
                  <li
                    className={
                      filter === "trainings"
                        ? "btn px-3 pe-4 active"
                        : "btn px-3 pe-4"
                    }
                    onClick={() => setFilter("trainings")}
                  >
                    Trainings
                  </li>
                  <li
                    className={
                      filter === "activities"
                        ? "btn px-3 pe-4 active"
                        : "btn px-3 pe-4"
                    }
                    onClick={() => setFilter("activities")}
                  >
                    Activities
                  </li>
                </ul>
              </div>
     </div>
     <div class="row g-4 portfolio-container">
                  
      {GalleryData.filter((res) => res.type === filter).map((elem) => {
        return (
            <GalleryComponent data={elem}/>
        );
      })}
      </div>
    </div>
  );
};

export default Gallery;