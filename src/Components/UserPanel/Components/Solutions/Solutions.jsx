import React from "react";
import { SolutionData } from "./SolutionsData";
import SolutionsComponent from "./SolutionsComponent";

const Solutions = () => {
  return (
    <div className="row g-4">
      {SolutionData.map((elem) => {
        return <SolutionsComponent data={elem} />;
      })}
    </div>
  );
};
export default Solutions;
