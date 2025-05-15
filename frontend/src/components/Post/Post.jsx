import React, { useState } from 'react'
import "./Post.css";
import { MoreVert } from '@mui/icons-material';
import { Users } from '../../DummyData'


export default function Post({ post }) {
    const [like, setlike] = useState(post.like);
    const [isliked, setIslike] = useState(false);

    const handlelile = () => {
        setlike(isliked ? like - 1 : like + 1);
        setIslike(!isliked);
    }

    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img src= {Users.filter((user) => user.id === post.id)[0].profilePicture} alt="" className="postProfileImg" />
                        <span className="postUsername">{Users.filter((user) => user.id === post.id)[0].username}</span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    <img src= {post.photo} alt="" className="postImg" />
                </div>
                <div className="postButtom">
                    <div className="postButtomLeft">
                        <img 
                            src="./assets/heart.png" 
                            alt="" className="likeIcon"  
                            onClick={() => handlelile()}
                        />
                        <span className="postLikeCounter"> {like}人がいいねを押しました</span>
                    </div>
                    <div className="postButtomRight">
                        <span className="postCommentText">{post.comment}:コメント</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
