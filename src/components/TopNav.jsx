import React from 'react'
import Contact from './Contact'

const TopNav = () => {
  return (
    <div className='topnav'>
    <span className='topnavtext'>
     <h1>  <b> KEYBOARD CONQUEROR </b></h1>
      {/* <span className='title'>KeyboardConqueror</span> */}
    </span>
    <span class='removeContact'>
      <Contact />
    </span>
  </div>
  )
}

export default TopNav