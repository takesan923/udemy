import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import { MoreVert } from "@mui/icons-material";
// import { Users } from "../../DummyData";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";

export default function Post({ post }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setlike] = useState(post.likes.length);
  const [isliked, setIslike] = useState(false);
  const [user, setUser] = useState({});

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users?userid=${post.userid}`);
      // console.log(response);
      setUser(response.data);
    };
    fetchUser();
  }, [post.userid]);

  const handlelike = async () => {
    try {
      //いいねAPIを叩く
      await axios.put(`/posts/${post._id}/like`, { userid: currentUser._id });
    } catch (err) {
      console.log(err);
    }

    setlike(isliked ? like - 1 : like + 1);
    setIslike(!isliked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PUBLIC_FOLDER + user.profilePicture
                    : PUBLIC_FOLDER + "/person/noAvatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
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
