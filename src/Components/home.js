import React from 'react'
import { useEffect, useState } from 'react'
import homebackground from '../Images/Home-background.png';
import './CSS/home.css';
import { NavLink } from 'react-router-dom';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Header from "./header";
import { db, storage } from '../admin/firebase';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { query } from 'firebase/database';
import { collection, getDocs, limit, orderBy, where } from 'firebase/firestore';

export default function Home() {
  function loader(){
    document.querySelector('.loader-container').classList.add('fade-out');
  }
  
  function fadeOut(){
    setInterval(loader, 3000);
  }
  
  window.onload = fadeOut();


  const listallimg = [];
  const match1info = [];
  const imageListRef = ref(storage, `features/`);
  const [imageList, setimageList] = useState([]);

  const [info, setInfo] = useState([]);
  let d = new Date();
  let dy = d.getFullYear();
  let dm = d.getMonth();
  if (dm < 10) {
    dm = `0${dm}`;
  }
  let dd = d.getDate();
  let dh = d.getHours();
  let dt = d.getMinutes();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (dh < 10) {
    dh = `0${dh}`;
  }
  if (dt < 10) {
    dt = `0${dt}`;
  }
  let date = dy.toString() + dm.toString() + dd.toString() + dh.toString() + dt.toString();
  let maindata = [];
  useEffect(() => {
    const matchinfo = async (date) => {

      let data = parseInt(date);
      const q = query(collection(db, "match-info"), where("date", ">", data), orderBy("date", "desc"), limit(6));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        maindata.push(doc.data());
      });
      setInfo(maindata);
    };
    matchinfo(date);
  }, [])



  for (let index = 0; index < 2; index++) {
    match1info.push(info[index]);

  }
  console.log(match1info);
  const match_info = [];
  for (let index = 1; index <= (info.length) / 2; index++) {
    match_info.push(info[index]);
  }
  console.log(match_info);


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
      <div className="loader-container">
      <Player
              className='loader-animation'
              autoplay
              loop
              src="https://assets1.lottiefiles.com/packages/lf20_bD8Yze.json"
            >
              <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>
            <p>Loading...</p>
    </div>
      <div className='home'>
        <img className='home_background' src={homebackground} alt="" />
        <div className="home-heading">
          FOOTBALL CLUB
        </div>
        <div className="home-basic-info">
          A football team is a group of players selected to play together in the various team sports known as football. Such teams could be selected to play in a match against an opposing team, to represent a football club, group, state or nation, an all-star team or even selected as a hypothetical team (such as a Dream Team or Team of the Century) and never play an actual match.
        </div>
        <NavLink to="/red_magic/contact" className='join-us-btn'> Join Us</NavLink>
        
          {match_info.map((item)=>{
            const date1=  item.date.toString();
            const dates = date1.slice(0,4)+"/"+date1.slice(4,6)+"/"+date1.slice(6,8);
            const time = date1.slice(8,10)+":"+date1.slice(10,12);
            return(<div className="next-match">
              <div className="next-match-info">
                <h1>Next match</h1>
                V/S
                <div className="team">
                  {item.team}
                </div>
              </div>
              <div className="next-match-timing"> Date:
                 <span className="next-match-date">{dates}
                </span>
                <br />
                Time:<span className="next-match-time">{time}
                </span>
                <br />
                Place:<span className="next-match-time">{item.place}</span>
                </div>
                
              </div>);
          })}
              
              
          





        
        <div className="listmatch">
        <h2 className='match-list'>Match List</h2>
        <table  className="table tbl-home table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Team 1</th>
            <th scope="col"></th>
            <th scope="col">Team 2</th>
            <th scope="col">Date</th>
            <th scope="col">Place</th>
          </tr>
        </thead>
              <tbody>
          {match_info.map((item)=>{
            const date1=  item.date.toString();
            const dates = date1.slice(0,4)+"/"+date1.slice(4,6)+"/"+date1.slice(6,8)+' T'+date1.slice(8,10)+":"+date1.slice(10,12);
            return(<tr>
              <td>Red Magic FC</td>
              <td>VS</td>
              <td>{item.team}</td>
              <td>{dates}</td>
              <td>{item.place}</td>
            </tr>)
          })}
          </tbody>
           </table>
           </div>
           {listallimg.map((item) => {
          return (
            <div className="special-offer">
              <h1 className='heading-offer'>SPECIAL OFFER</h1>
              <img className='img-offer' style={{ width: '550px' }} src={item} alt="" srcset="" />
            </div>
          );
        })}
        </div>



        

    <footer>
        <div>
            <div class="footeer card-img-top">
                <div class="wave wave1"></div>
                <div class="wave wave2"></div>
                <div class="wave wave3"></div>
                <div class="wave wave4"></div>
            </div>
            <div class="footer_info">
                <div class="card-body">
                    <div class="row text-center">
                        <div class="col-md-4 col-11 g-5 mx-auto">
                            <h3>Address</h3>
                            <a class="f_color"
                                href="https://www.google.com/maps/place/J.J.+Chords+Music+%26+Dance+Studio/@19.0054777,73.1094707,15z/data=!3m1!4b1!4m5!3m4!1s0x3be7e84f45555555:0x2da7e6d6efdc5c6f!8m2!3d19.0054779!4d73.1182255">
                                SHOP NO.8, Varad Vinayak Complex, Sector 5, New Panvel East, Panvel, Navi Mumbai,
                                Maharashtra 410206
                            </a>
                        </div>
                        <div class="col-md-4 col-11 g-5 mx-auto">
                            <h3>Follow US</h3>
                            <a class="f_icon" href="http://"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                    fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                    <path
                                        d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                </svg></a>
                            <a class="f_icon" href="http://"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                    fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                    <path
                                        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                </svg></a>
                            <a class="f_icon" href="http://"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                    fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
                                    <path
                                        d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                                </svg></a>
                        </div>
                        <div class="col-md-4 col-11 g-5 mx-auto">
                            <h3>Contact US</h3>
                            <div class="f_no">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-telephone" viewBox="0 0 16 16">
                                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                                  </svg>
                                 +91 9876543210
                            </div>
                            <div class="f_mail">
                                <a class="f_color" href="mailto:aryanpatil050103@gmail.com">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                                      </svg>
                                      aryanpatil050103@gmail.com
                                </a>
                            </div>
                            <div class="f_whatsapp">
                                <a href="https://wa.me/919870463580" class="f_color">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                                      </svg>
                                      9876543210
                                </a>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        


    </footer>


    </>

  )
  // }
  //     </>
  //   )

}
