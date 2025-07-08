import "../styles/dashboard.css";
import React, { useState } from "react";

const Dashboard = () => {
  const [Data, SetData] = useState([{
  "role": "Surveyor",
  "message": "Human Resources Assistant IV"
}, {
  "role":"Engineer",
  "message" : "fgiktityyreehjkliukyjthrg"
}, {
  "role":"Engineer",
  "message" : "fgiktityyreehjkliukyjthrg"
}, {
  "role":"Engineer",
  "message" : "fgiktityyreehjkliukyjthrg"
}, {
  "role":"Engineer",
  "message" : "fgiktityyreehjkliukyjthrg"
},{
  "role": "Surveyor",
  "message": "Human Resources Assistant IV"
},{
  "role": "Surveyor",
  "message": "Human Resources Assistant IV"
},{
  "role": "Surveyor",
  "message": "Human Resources Assistant IV"
}]
);
  return (
    <dashboard className="dashboard">
      <div className="history"></div>
      <div className="home">
        <div className="mid">
          {Data ? (
            <div>
              
                {Data.map((e, index) => (
                  <div key={index}>
                    {e.role === "Engineer" ? <p className="message1">{e.message}</p> : null}
                    {e.role === "Surveyor" ? <p className="message2">{e.message}</p> : null}
                  </div>
                ))}
              
            </div>
          ) : (
            <div>
              <h1>What can I help with?</h1>
            </div>
          )}
        </div>
        <div className="searchbar"></div>
      </div>
    </dashboard>
  );
};

export default Dashboard;
