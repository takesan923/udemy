import React, { useContext, useEffect, useState } from "react";
import "./TimeLine.css";
import Share from "../Share/Share";
import Post from "../Post/Post";
// import { Posts } from '../../DummyData'
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";

export default function TimeLine({ username }) {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchposts = async () => {
      const response = username
        ? await axios.get(`/posts/profile/${username}`) //プロフィールの場合
        : await axios.get(`/posts/timeline/${user._id}`); //ホームの場合
      // console.log(response);
      setPosts(
        response.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );
    };
    fetchposts();
  }, [username, user._id]);

  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
}
