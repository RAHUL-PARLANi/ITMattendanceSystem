import React from "react";
import SolutionsComponent from "./SolutionsComponent";

const Solutions = (props) => {
  const SolutionData = props.data
  return (
    <div className="row g-4">
      {SolutionData.map((elem) => {
        return <SolutionsComponent data={elem} />;
      })}
    </div>
  );
};
export default Solutions;
