
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { storage } from '../firebase';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
export default function AboutUs() {

    const [uploadImg, setuploadImg] = useState(null);
  const uploadImage = () => {
    if (uploadImg == null) return;
    console.log(uploadImg);
    const imgRef = ref(storage, `aboutus/${uploadImg.name}`);
    uploadBytes(imgRef, uploadImg).then(() => {
      alert('image Uploaded');
    })
  };
  const imageListUrl = [];
  const listallimg = [];
  const imageListRef = ref(storage, `aboutus/`);
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
    <h1>Red Magic FC</h1>
    <input type="file" onChange={(e) => setuploadImg(e.target.files[0])} name="" id="" />
    <button onClick={uploadImage} className="uplaod-img">Upload Image</button>

    <div className="">
      {imageListUrl.map((item) => {
        return (
          <>
            <img className='feature-image' src={item} alt="" srcset="" />
          </>
        );
      })}
      {
        listallimg.map((item) => {
          return(<>
          <button onClick={() => deleteimg(item)} >delete </button>
          </>);
        })
      }
    </div>

  </div>
  )
}
