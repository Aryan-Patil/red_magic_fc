import React from "react";
import './home.css'
import Adminheader from "./admin-header";
import Registration_status from "./registration_status";
import Sponsors from "./sponsors";
import Info from "./info";


function Home(props) {
  return (
    <div className="admin-home">
      <Adminheader />
      <div className="admin_home">
      <div className="admin-name">{ `${props.name}` }</div>
      </div>
      <Registration_status />
      <Sponsors />
      <Info />
    </div>
  );
}

export default Home;
