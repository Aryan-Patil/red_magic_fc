import React from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from 'react';
import { useState } from 'react';
import { storage } from '../firebase';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import {  addDoc } from "@firebase/firestore";


export default function Playerinfo() {


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

    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setMessage] = useState("");
  const [number, setNumber] = useState("");
  const [age, setAge] = useState("");

  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    await addDoc((collection(db, "player")), {
      name,
      position: email,
      number,
      address,
      age
    });
    setName("");
    setEmail("");
    setMessage("");
    setNumber("");
    setAge("");
    alert("your form got submitted");

  };

  return (
    <>
    <div className='player-form'>
        <h1>Player Information</h1>

<label>Name</label>
<input
  placeholder="Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
<br />

<label>Contact No.</label>
<input type="number"
  placeholder="Contact no."
  value={number}
  onChange={(e) => setNumber(e.target.value)}
/>
<br />
<label>Position</label>
<input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
<br />
<label>Age</label>
<input
  placeholder="Age"
  value={age}
  type= "number"
  onChange={(e) => setAge(e.target.value)}
/>
<br />
<label>Address</label>
<textarea
  placeholder="Address"
  value={address}
  onChange={(e) => setMessage(e.target.value)}
></textarea>
<br />
<button
  type="submit"
  onClick={handleSubmit}
>
  Submit
</button>
    </div>
    <table class="table table-striped table-dark reg-tab">
      <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Position</th>
            <th scope="col">Address</th>
            <th scope="col">Contact</th>
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
                    
                    <td>{item.address}</td>
                    <td>{item.number}</td>
                    <td>{item.age}</td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </>
  )
}
