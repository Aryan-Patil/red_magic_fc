
import React, { useState, useEffect } from "react";
import { Card, Button } from "antd";
import axios from "axios";
import "./CSS/news.css";
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Header from "./header";

const { Meta } = Card;

// npx create-react-app appname
// npm i antd
// npm i axios



function News() {

  const [post, setPost] = useState(false)
  useEffect(() => {
    setPost(true)
    setTimeout(() => {
      setPost(false)
    }, 3000);

  }, [])

  const [news, setNews] = useState([]);

  useEffect(() => {


    const loadNews = async () => {
      const response = await axios.get(
        "https://newsapi.org/v2/top-headlines?q=football&country=in&category=sports&apiKey=3da128da75bb4e819bb876090635ca8f"
      );
      console.log(response.data.articles);
      setNews(response.data.articles);
    };
    loadNews();
  }, []);
  console.log(news);
  
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
        <div className="news-main">
          <h1>Sports News</h1>
    <div className="news card-deck">
      {news &&
        news.map((item, index) => {
          return (
            <Card
              key={index}
              hoverable
              className="card-news"
              cover={<img alt="image" style={{width:"430px"}} src={item.urlToImage} />}
            >
              <Meta title={item.title} description={item.content} />
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <Button type="primary" style={{ marginTop: "10px" }}>
                  Read More
                </Button>
              </a>
            </Card>
          );
        })}
    </div>
    </div>
)
}
</>
  );
}

export default News;

