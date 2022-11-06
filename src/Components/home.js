import React from 'react'
import { useEffect, useState } from 'react'
import homebackground from '../Images/Home-background.png';
import './CSS/home.css';
import { NavLink } from 'react-router-dom';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Header from "./header";
import { storage } from '../admin/firebase';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';

export default function Home() {
  const listallimg = [];
  const imageListRef = ref(storage, `features/`);
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
  for (let index = 0; index < (imageList.length)/2; index++) {
    listallimg.push(imageList[index]);
  }
  return(
   
  
//   const [post, setPost] = useState(false)
//   useEffect(() => {
//     setPost(true)
//     setTimeout(() => {
//       setPost(false)
//     }, 3000);
   
//   }, [])
  
//   return (
//     <>
//     
//       {post ? (
//       <div className='loader'>
//         <Player
//           className='loader-animation'
//           autoplay
//           loop
//           src="https://assets1.lottiefiles.com/packages/lf20_bD8Yze.json"
//         >
//           <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
//         </Player>
//         <p>Loading...</p>
//       </div>) :
      
      
//       (
  <>
  <Header />
        <div className='home'>
          <img className='home_background' src={homebackground} alt="" />
          <div className="home-heading">
            FOOTBALL CLUB
          </div>
          <div className="home-basic-info">
            A football team is a group of players selected to play together in the various team sports known as football. Such teams could be selected to play in a match against an opposing team, to represent a football club, group, state or nation, an all-star team or even selected as a hypothetical team (such as a Dream Team or Team of the Century) and never play an actual match.
          </div>
          <NavLink  to="/red_magic/contact" className='join-us-btn'> Join Us</NavLink>
          <div className="next-match">
            <div className="next-match-info">
              <h1>Next match</h1>
              V/S
              <div className="team">
                Bengal FC
              </div>
            </div>
            <div className="next-match-timing">
              Date: <span className="next-match-date">20/10/2022
              </span>
              <br />
              Time:<span className="next-match-time">12.00
              </span>
            </div>
          </div>
          {listallimg.map((item) => {
            return (
              <div className="special-offer">
              <h1 className='heading-offer'>SPECIAL OFFER</h1>
                <img style={{width:'550px'}} src={item} alt="" srcset="" />
                </div>
            );
          })}
          <div className="past-matches">
           
          </div>
        
        </div>
        </>
        
      )
      // }
//     </>
//   )

}
