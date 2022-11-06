import React from 'react'
import Header from "./header";
import { useEffect, useState } from 'react';
import Contact from "./Components/Contact";
import "./CSS/contact.css"
import { Player, Controls } from '@lottiefiles/react-lottie-player';

export default function Contacts() {
  const [post, setPost] = useState(false)
  useEffect(() => {
    setPost(true)
    setTimeout(() => {
      setPost(false)
    }, 3000);

  }, [])
  return (
    <>
    <Header />
    {post ? (<div className='loader'>
      <Player
        className='loader-animation'
        autoplay
        loop
        src="https://assets1.lottiefiles.com/packages/lf20_bD8Yze.json"
      >
        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
      </Player>
      <p>Loading...</p>
    </div>) : (
    <div >
      <Header />
      <div className="contact-info">
      <Player
        className='contact-animation'
        autoplay
        loop
        src="https://assets8.lottiefiles.com/packages/lf20_kfcwv9hc.json"
      >
        <h1>
          Let's get in Touch
        </h1>
        <div className="information">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus harum suscipit quidem, magni ab nesciunt veritatis delectus ipsam quisquam reprehenderit. Possimus quos asperiores dignissimos corporis omnis repudiandae at dolorum beatae.
        </div>
        <div className="address">
          Address: Lorem ipsum dolor sit amet.
        </div>
        <div className="email"> Email: <a href="mailto:apple@gmail.com">apple@gmail.com</a></div>
        <div className="contact-nu">
          Contact no. : +91 9876543210
        </div>
        
        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
      </Player>
      </div>
      <div className="contact-home">
      <Contact />
      </div>
      <div className="footer">
            Red_Magic | All rights Reserved.
          </div> 
      
      </div>

)
}
</>
  )
}
