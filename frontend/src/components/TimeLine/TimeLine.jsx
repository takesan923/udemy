import React from 'react'
import "./TimeLine.css"
import Share from '../Share/Share'
import Post from '../Post/Post'
import { Posts } from '../../DummyData'



export default function TimeLine() {
  return (
    <div className='timeline'>
      <div className="timelineWrapper">
        <Share />
        {Posts.map((post) => (
          <Post post = {post} key ={post.id} />
        ))}
      </div>
    </div>
  )
}
