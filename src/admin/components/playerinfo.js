import React from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from 'react';
import { useState } from 'react';
import { storage } from '../firebase';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import {  addDoc } from "@firebase/firestore";


export default function Playerinfo() {

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
    <div>
        <h1>Player Information</h1>

<label>Name</label>
<input
  placeholder="Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>


<label>Contact No.</label>
<input type="number"
  placeholder="Contact no."
  value={number}
  onChange={(e) => setNumber(e.target.value)}
/>

<label>Position</label>
<input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
<label>Age</label>
<input
  placeholder="Age"
  value={age}
  type= "number"
  onChange={(e) => setAge(e.target.value)}
/>

<label>Address</label>
<textarea
  placeholder="Address"
  value={address}
  onChange={(e) => setMessage(e.target.value)}
></textarea>
<button
  type="submit"
  onClick={handleSubmit}
>
  Submit
</button>
    </div>
  )
}
