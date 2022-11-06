import React from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from 'react';
import { useState } from 'react';
import { storage } from '../firebase';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';



export default function Registration_status() {




  const [uploadImg, setuploadImg] = useState(null);
  const uploadImage = () => {
    if (uploadImg == null) return;
    const imgRef = ref(storage, `features/${uploadImg.name}`);
    uploadBytes(imgRef, uploadImg).then(() => {
      alert('image Uploaded');
    })
  };
  const imageListUrl = [];
  const listallimg = [];
  const imageListRef = ref(storage, `features/`);
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
    

  




  const [registration, setRegistration] = useState([]);
  const [registrationId, setRegistrationId] = useState([]);

  useEffect(() => {
    const resinfo = [];
    const resinfoid = [];
    const registrationStatus = async () => {
      const querySnapshot = await getDocs(collection(db, "registration"));
      querySnapshot.forEach((doc) => {
        resinfo.push(doc.data());
        resinfoid.push(doc.id);
      });
      setRegistration(resinfo)
      setRegistrationId(resinfoid)
    }; registrationStatus();
  }, []);

  console.log(registration);
  console.log(registrationId);

  return (
    <div>
      <div className="registration-heading">Admission Enquiry</div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Contact no.</th>
            <th scope="col">Address</th>
            <th scope="col">Age</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {registration &&
            registration.map((item) => {
              return (
                <>
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.number}</td>
                    <td>{item.address}</td>
                    <td>{item.age}</td>
                    <td>{item.email}</td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>



      <div className="special-features">
        <h1>Special Offers</h1>
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


    </div>

  )
}
