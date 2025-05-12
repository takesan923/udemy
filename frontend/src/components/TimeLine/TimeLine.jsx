import React from 'react'
import "./TimeLine.css"
import Share from '../Share/Share'

export default function TimeLine() {
  return (
    <div className='timeline'>
      <div className="timelineWrapper">
        <Share />
        {/* <Post /> */}
      </div>
    </div>
  )
}
