import React from 'react'
import "./TimeLine.css"
import Share from '../Share/Share'
import Post from '../Post/Post'


export default function TimeLine() {
  return (
    <div className='timeline'>
      <div className="timelineWrapper">
        <Share />
        <Post />
      </div>
    </div>
  )
}
