import React, { useState, useEffect } from "react";
import "../CSS/contact.css";
import { db } from "../../admin/firebase";
import { collection, addDoc } from "@firebase/firestore";


const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [number, setNumber] = useState("");
  const [age, setAge] = useState("");

  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    await addDoc((collection(db, "registration")), {
      name,
      email,
      number,
      address: message,
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
    <form className="form" onSubmit={handleSubmit}>
      <h1>Registration Form 🤳</h1>

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

      <label>Email</label>
      <input
        placeholder="Email"
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
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button
        type="submit"
        style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}
      >
        Submit
      </button>
    </form>
  );
};


export default Contact;
