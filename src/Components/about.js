import React from 'react'
import Header from "./header";
import "./CSS/about.css";

import { useEffect, useState } from 'react'
import homebackground from '../Images/Home-background.png';
import { NavLink } from 'react-router-dom';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { storage } from '../admin/firebase';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';


export default function About() {

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

      <div className="sponsor">
        <h1>Sponsors</h1>
        <marquee className="sponsors" behavior="" direction="">
          {listallimg.map((item) => {
            return (
              <img style={{ width: '300px', margin: '10px' }} src={item} alt="" srcset="" />
            );
          })}
        </marquee>
      </div>
    </div>
  )
}
