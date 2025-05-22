import React, { useEffect, useState } from "react";
import "./Post.css";
import { MoreVert } from "@mui/icons-material";
// import { Users } from "../../DummyData";
import axios from "axios";
import { format } from "timeago.js";


export default function Post({ post }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setlike] = useState(post.likes.length);
  const [isliked, setIslike] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users/${post.userid}`);
      console.log(response);
      setUser(response.data);
    };
    fetchUser();
  }, []);

  const handlelike = () => {
    setlike(isliked ? like - 1 : like + 1);
    setIslike(!isliked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={user.profilePicture || PUBLIC_FOLDER + "/person/noAvatar.png"}
              alt=""
              className="postProfileImg"
            />
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img src={PUBLIC_FOLDER + post.img} alt="" className="postImg" />
        </div>
        <div className="postButtom">
          <div className="postButtomLeft">
            <img
              src={PUBLIC_FOLDER + "/heart.png"}
              alt=""
              className="likeIcon"
              onClick={() => handlelike()}
            />
            <span className="postLikeCounter">
              {" "}
              {like}人がいいねを押しました
            </span>
          </div>
          <div className="postButtomRight">
            <span className="postCommentText">{post.comment}:コメント</span>
          </div>
        </div>
      </div>
    </div>
  );
}
