import React from "react";
import { Link } from "react-router-dom";
import "./admin-header.css"

export default function admin_header() {
  return (
    <div className='admin-header'>
        <Link className="admin-header-info" to="/red_magic/admin/signup">Add Account</Link>
          <Link className="admin-header-info" to="/red_magic/admin">LogOut</Link>
          

    </div>
  )
}
