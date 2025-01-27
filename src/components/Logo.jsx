import React from 'react'
import LogoImage from '../assets/Logo.png'

function Logo({width = '100px'}) {
  return (
    <div>
      <img 
        src={LogoImage} 
        alt="Your Logo"
        style={{ width }}
        className="object-contain h-auto" // this ensures image maintains its aspect ratio
      />
    </div>
  )
}

export default Logo