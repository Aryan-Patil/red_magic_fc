
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { storage } from '../firebase';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import Homeinfo from './home-info';
import Adminheader from './admin-header';
export default function Sponsors() {

    const [uploadImg, setuploadImg] = useState(null);
  const uploadImage = () => {
    if (uploadImg == null) return;
    console.log(uploadImg);
    const imgRef = ref(storage, `sponsors/${uploadImg.name}`);
    uploadBytes(imgRef, uploadImg).then(() => {
      alert('image Uploaded');
    })
  };
  const imageListUrl = [];
  const listallimg = [];
  const imageListRef = ref(storage, `sponsors/`);
  const [imageList, setimageList] = useState([]);
  const [listAllImg, setlistAllImg] = useState([]);

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        setlistAllImg((prev) =>[...prev,item._location.path_]);
        getDownloadURL(item).then((url) => {
          setimageList((prev) => [...prev, url]);
        })
      })
    });
  }, [])
  for (let index = 0; index < (imageList.length) / 2; index++) {
    imageListUrl.push(imageList[index]);
    listallimg.push(listAllImg[index]);
  }
  console.log(listAllImg);
  
  const deleteimg = (item) =>{deleteObject(ref(storage, item)).then(() => {
    alert('image deleted');
  })};


  return (
    <div className="special-features">
        <Adminheader />
        <br />
        <br />
    <h1>Sponsors</h1>
<br />
    <h4>Add Sponsors</h4>
    <input type="file" onChange={(e) => setuploadImg(e.target.files[0])} name="" id="" />
    <button onClick={uploadImage} className="uplaod-img">Upload Image</button>
<br />
<br />
<h4>View Sponsors</h4>
    <div className="">
      {imageListUrl.map((item) => {
        return (
          <>
            <img className='feature-image' src={item} alt="" srcset="" />
          </>
        );
      })}
      <br />
      <br />
      {
        listallimg.map((item) => {
          return(<>
          <button className='mar0-img' onClick={() => deleteimg(item)} >delete </button>
          </>);
        })
      }
    </div>
    <br />
    <br />
    <br />
    <Homeinfo />
  </div>
  )
}
