import React from "react";
import TeamComponent from "./TeamComponent";
const Teams = (props) => {
 const colour = props.colour
 const TeamData = props.data
  return (
    <div>
      <div 
        className="row g-4" 
        style={{ justifyContent: "space-evenly" }}>
            <TeamComponent data={TeamData[0]} colour={colour} />
            <TeamComponent data={TeamData[1]} colour={colour}/>
        </div>
      <div
        className="row g-4 mt-2"
        style={{ justifyContent: "space-evenly" }}
      >
        <TeamComponent data={TeamData[2]} colour={colour}/>
        <TeamComponent data={TeamData[3]} colour={colour}/>
      </div>
    </div>
  );
};

export default Teams;
