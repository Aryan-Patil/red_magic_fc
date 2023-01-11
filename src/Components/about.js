import React from 'react'
import Header from "./header";
import "./CSS/about.css";

import { useEffect, useState } from 'react'
import homebackground from '../Images/Home-background.png';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../admin/firebase";
import { NavLink } from 'react-router-dom';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { storage } from '../admin/firebase';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';


export default function About() {

  const [registration, setRegistration] = useState([]);
  const [registrationId, setRegistrationId] = useState([]);

  useEffect(() => {
    const resinfo = [];
    const resinfoid = [];
    const registrationStatus = async () => {
      const querySnapshot = await getDocs(collection(db, "player"));
      querySnapshot.forEach((doc) => {
        resinfo.push(doc.data());
        resinfoid.push(doc.id);
      });
      setRegistration(resinfo)
      setRegistrationId(resinfoid)
    }; registrationStatus();
  }, []);



  const listallimg = [];
  const imageListRef = ref(storage, `sponsors/`);
  const [imageList, setimageList] = useState([]);


  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setimageList((prev) => [...prev, url]);
        })
      })
    });

  }, [])
  for (let index = 0; index < (imageList.length) / 2; index++) {
    listallimg.push(imageList[index]);
  }




  return (
    <div>
      <Header />

<div className="mar-5">
<div class="card wid-card bg-dark text-white">
  <img src="https://firebasestorage.googleapis.com/v0/b/football-web-development.appspot.com/o/aboutus%2FScreenshot%202022-11-07%20at%204.29.40%20AM.png?alt=media&token=09964e7b-6a90-4852-aad8-d25c464bc9a3" class="card-img" alt="..." />
  <div class="card-img-overlay">
    <h1 class="card-title">Red Magic Fan Club</h1>
    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
  </div>
</div>
      </div>
      <div className="sponsor">
        <h1 style={{textAlign:"center", margin:"20px"}}>Sponsors</h1>
        <marquee className="sponsors" behavior="" direction="">
          {listallimg.map((item) => {
            return (
              <img style={{ width: '300px', margin: '10px' }} src={item} alt="" srcset="" />
            );
          })}
        </marquee>
      </div>


      <div className="registration-heading">Player Information</div>
      <table class="table table-striped table-dark reg-tab">
      <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Position</th>
            <th scope="col">Age</th>
          </tr>
        </thead>
        <tbody>
          {registration &&
            registration.map((item) => {
              return (
                <>
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.position}</td>
                    <td>{item.age}</td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
      <div  className="foote">
            Red_Magic | All rights Reserved.
          </div> 
    </div>
  )
}
