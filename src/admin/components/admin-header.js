import React from "react";
import { Link } from "react-router-dom";
import "./admin-header.css"

export default function admin_header(props) {
  return (
    <div className='admin-header'>
        <Link className="admin-header-info" to="/red_magic/admin/info">Info</Link>
        <Link className="admin-header-info" to="/red_magic/admin/sponsors">Main</Link>
        <Link className="admin-header-info" to="/red_magic/admin/registration_status">Addmission</Link>
          <Link className="admin-header-info mar-left" to="/red_magic/admin">LogOut</Link>

          

    </div>
  )
}
