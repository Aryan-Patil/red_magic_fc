import React from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from 'react';
import { useState } from 'react';
import { addDoc } from "@firebase/firestore";
import { orderBy } from '@firebase/firestore';
import { query, set } from 'firebase/database';
import Playerinfo from './playerinfo';
export default function Info() {

    const [team,setTeam] = useState('');
    const [place,setPlace] = useState('');
    const [date, setDate] = useState([]);
    const [loader, setLoader] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        let yeardate = date.slice(0,4);
      let monthdate= date.slice(5,7);
      let dadate = date.slice(8,10);
      let hrdate = date.slice(11,13);
      let mindate = date.slice(14,16);
      let maindate =yeardate+monthdate+dadate+hrdate+mindate;
      let mainDate = parseInt(maindate);

        await addDoc((collection(db, "match-info")), {
          team,
          date:mainDate,
          place
        });
        setTeam("");
        setPlace("");
        alert("your form got submitted");
    
      };
      const [registration, setRegistration] = useState([]);
      const resinfo = [];
      useEffect(() => {
        
        const registrationStatus = async () => {
            const q = query(collection(db, "match-info"), orderBy("date", "desc"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setRegistration((prev)=>[...prev,doc.data()])
            });
        };registrationStatus();
      }, [])
      
      for (let index = 0; index < (registration.length)/2; index++) {
        resinfo.push(registration[index]);
      }console.log(resinfo);
      
  return (
    <div className='info'>
        <Playerinfo />
        <input type="text" onChange={(e) => setTeam(e.target.value)} value={team} />
        <input type="datetime-local" id="birthdaytime" name="birthdaytime"onChange={(e) => setDate(e.target.value)} ></input>
        <input type="text" onChange={(e) => setPlace(e.target.value)} value={place} />
        <button onClick={handleSubmit}>Submit</button>

        <table>
        <tr>
    <th>Team</th>
    <th>Address</th>
    <th>Date and Time</th>
  </tr>
  {resinfo.map((item)=>{
    const d = item.date.toString();
    const date= d.slice(0,4)+'/'+d.slice(4,6)+'/'+d.slice(6,8)+" "+"T"+d.slice(8,10)+':'+d.slice(10,12);
    return(<tr>
        <td>{item.team}</td>
        <td>{item.place}</td>
        <td>{date}</td>
      </tr>);
  })}
        </table>
    </div>
  )
}
