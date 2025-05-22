import React, { useEffect, useState } from 'react'
import "./TimeLine.css"
import Share from '../Share/Share'
import Post from '../Post/Post'
// import { Posts } from '../../DummyData'
import axios from "axios"



export default function TimeLine() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchposts = async () => {
      const response = await axios.get("/posts/timeline/680ca50b2b763af9630443ee");
      // console.log(response);
      setPosts(response.data);
    };
    fetchposts();
  }, []);

  return (
    <div className='timeline'>
      <div className="timelineWrapper">
        <Share />
        {posts.map((post) => (
          <Post post = {post} key ={post.id} />
        ))}
      </div>
    </div>
  )
}
